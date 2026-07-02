from fastapi import APIRouter, Depends, HTTPException, Query, Path, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import uuid

from app.database import get_db
from app.models import Incident, Community, IncidentUpdate
from app.schemas import Incident as IncidentSchema, IncidentCreate, IncidentUpdate as IncidentUpdateSchema, BatchResponse

router = APIRouter(prefix="/api/incidents", tags=["incidents"])

# Create incident
@router.post("/", response_model=IncidentSchema, status_code=201)
def create_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db)
):
    """Submit a new incident report"""
    # Verify community exists
    community = db.query(Community).filter(Community.id == incident.community_id).first()
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    # Generate risk score based on incident type and severity
    risk_scores = {
        "critical": 85,
        "high": 65,
        "medium": 45,
        "low": 25
    }
    risk_score = risk_scores.get(incident.severity, 50)
    
    db_incident = Incident(
        id=f"inc_{uuid.uuid4().hex[:12]}",
        incident_type=incident.incident_type,
        severity=incident.severity,
        community_id=incident.community_id,
        latitude=incident.latitude,
        longitude=incident.longitude,
        description=incident.description,
        reporter_name=incident.reporter_name,
        reporter_phone=incident.reporter_phone,
        reporter_email=incident.reporter_email,
        risk_score=float(risk_score),
        confidence=0.85,
        reported_at=datetime.utcnow(),
        ai_analysis={
            "model": "sentinel-ai-v1",
            "timestamp": datetime.utcnow().isoformat(),
            "incident_type": incident.incident_type,
            "severity": incident.severity
        },
        recommendations=[
            "Deploy emergency response team",
            "Initiate community alert system",
            "Coordinate with local authorities",
            "Establish response coordination center"
        ]
    )
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    
    return db_incident

# Get all incidents with filtering
@router.get("/", response_model=BatchResponse)
def list_incidents(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    community_id: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    incident_type: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """List incidents with optional filtering and pagination"""
    query = db.query(Incident)
    
    if community_id:
        query = query.filter(Incident.community_id == community_id)
    if severity:
        query = query.filter(Incident.severity == severity)
    if incident_type:
        query = query.filter(Incident.incident_type == incident_type)
    if status:
        query = query.filter(Incident.status == status)
    
    total = query.count()
    incidents = query.order_by(Incident.created_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "count": len(incidents),
        "page": skip // limit + 1,
        "per_page": limit,
        "data": incidents
    }

# Get incident by ID
@router.get("/{incident_id}", response_model=IncidentSchema)
def get_incident(
    incident_id: str = Path(..., description="Incident ID"),
    db: Session = Depends(get_db)
):
    """Get a specific incident by ID"""
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident

# Update incident
@router.put("/{incident_id}", response_model=IncidentSchema)
def update_incident(
    incident_id: str = Path(..., description="Incident ID"),
    incident_update: IncidentUpdateSchema = None,
    db: Session = Depends(get_db)
):
    """Update incident details"""
    db_incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not db_incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    update_data = incident_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_incident, field, value)
    
    db_incident.updated_at = datetime.utcnow()
    
    # Create update record
    update_record = IncidentUpdate(
        id=f"upd_{uuid.uuid4().hex[:12]}",
        incident_id=incident_id,
        update_type="status_change" if "status" in update_data else "modification",
        content=f"Incident updated: {', '.join(update_data.keys())}"
    )
    db.add(update_record)
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident

# Get incident updates/timeline
@router.get("/{incident_id}/updates", response_model=List[dict])
def get_incident_updates(
    incident_id: str = Path(..., description="Incident ID"),
    db: Session = Depends(get_db)
):
    """Get the timeline of updates for an incident"""
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    updates = db.query(IncidentUpdate).filter(
        IncidentUpdate.incident_id == incident_id
    ).order_by(IncidentUpdate.created_at.desc()).all()
    
    return [{"id": u.id, "type": u.update_type, "content": u.content, "created_at": u.created_at} for u in updates]

# Get critical incidents
@router.get("/critical/all", response_model=List[IncidentSchema])
def get_critical_incidents(db: Session = Depends(get_db)):
    """Get all critical severity incidents"""
    incidents = db.query(Incident).filter(
        Incident.severity == "critical"
    ).order_by(Incident.created_at.desc()).limit(20).all()
    return incidents

# Get incidents by community
@router.get("/community/{community_id}", response_model=List[IncidentSchema])
def get_community_incidents(
    community_id: str = Path(..., description="Community ID"),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Get incidents for a specific community"""
    community = db.query(Community).filter(Community.id == community_id).first()
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    incidents = db.query(Incident).filter(
        Incident.community_id == community_id
    ).order_by(Incident.created_at.desc()).limit(limit).all()
    return incidents
