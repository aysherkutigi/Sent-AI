from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import uuid

from app.database import get_db
from app.models import RiskAssessment, Community, Incident
from app.schemas import RiskAssessment as RiskAssessmentSchema, RiskAssessmentCreate, BatchResponse

router = APIRouter(prefix="/api/assessments", tags=["risk-assessments"])

# Create risk assessment
@router.post("/", response_model=RiskAssessmentSchema, status_code=201)
def create_assessment(
    assessment: RiskAssessmentCreate,
    db: Session = Depends(get_db)
):
    """Create a new risk assessment"""
    # Verify community exists
    community = db.query(Community).filter(Community.id == assessment.community_id).first()
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    db_assessment = RiskAssessment(
        id=f"rsk_{uuid.uuid4().hex[:12]}",
        community_id=assessment.community_id,
        incident_id=assessment.incident_id if hasattr(assessment, 'incident_id') else None,
        risk_level=assessment.risk_level,
        risk_score=assessment.risk_score,
        confidence=assessment.confidence,
        flood_risk=assessment.flood_risk,
        disease_risk=assessment.disease_risk,
        security_risk=assessment.security_risk,
        environmental_risk=assessment.environmental_risk,
        key_factors=assessment.key_factors if hasattr(assessment, 'key_factors') else [],
        recommendations=assessment.recommendations if hasattr(assessment, 'recommendations') else [],
        analysis_details={
            "model": "sentinel-ai-risk-v1",
            "timestamp": datetime.utcnow().isoformat(),
            "risk_calculation_method": "weighted_ensemble"
        }
    )
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

# Get all assessments
@router.get("/", response_model=BatchResponse)
def list_assessments(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    risk_level: str = Query(None),
    db: Session = Depends(get_db)
):
    """List risk assessments"""
    query = db.query(RiskAssessment)
    
    if risk_level:
        query = query.filter(RiskAssessment.risk_level == risk_level)
    
    total = query.count()
    assessments = query.order_by(RiskAssessment.created_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "count": len(assessments),
        "page": skip // limit + 1,
        "per_page": limit,
        "data": assessments
    }

# Get assessment by ID
@router.get("/{assessment_id}", response_model=RiskAssessmentSchema)
def get_assessment(
    assessment_id: str = Path(..., description="Assessment ID"),
    db: Session = Depends(get_db)
):
    """Get a specific risk assessment"""
    assessment = db.query(RiskAssessment).filter(RiskAssessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return assessment

# Get community risk assessment
@router.get("/community/{community_id}", response_model=RiskAssessmentSchema)
def get_community_assessment(
    community_id: str = Path(..., description="Community ID"),
    db: Session = Depends(get_db)
):
    """Get latest risk assessment for a community"""
    community = db.query(Community).filter(Community.id == community_id).first()
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    assessment = db.query(RiskAssessment).filter(
        RiskAssessment.community_id == community_id
    ).order_by(RiskAssessment.created_at.desc()).first()
    
    if not assessment:
        raise HTTPException(status_code=404, detail="No assessment found for this community")
    return assessment

# Get critical assessments
@router.get("/critical/all", response_model=List[RiskAssessmentSchema])
def get_critical_assessments(db: Session = Depends(get_db)):
    """Get all critical risk assessments"""
    assessments = db.query(RiskAssessment).filter(
        RiskAssessment.risk_level == "critical"
    ).order_by(RiskAssessment.risk_score.desc()).limit(20).all()
    return assessments

# Get high-risk communities
@router.get("/high-risk/communities", response_model=List[dict])
def get_high_risk_communities(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """Get communities with high or critical risk"""
    assessments = db.query(RiskAssessment).filter(
        RiskAssessment.risk_level.in_(["high", "critical"])
    ).order_by(RiskAssessment.risk_score.desc()).limit(limit).all()
    
    return [
        {
            "community_id": a.community_id,
            "risk_level": a.risk_level,
            "risk_score": a.risk_score,
            "confidence": a.confidence
        }
        for a in assessments
    ]
