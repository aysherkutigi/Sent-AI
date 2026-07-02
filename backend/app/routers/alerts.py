from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import uuid

from app.database import get_db
from app.models import CommunityAlert, Community, Incident
from app.schemas import CommunityAlert as CommunityAlertSchema, CommunityAlertCreate, BatchResponse

router = APIRouter(prefix="/api/alerts", tags=["alerts"])

# Create alert
@router.post("/", response_model=CommunityAlertSchema, status_code=201)
def create_alert(
    alert: CommunityAlertCreate,
    db: Session = Depends(get_db)
):
    """Create an emergency alert for a community"""
    # Verify community exists
    community = db.query(Community).filter(Community.id == alert.community_id).first()
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    db_alert = CommunityAlert(
        id=f"alr_{uuid.uuid4().hex[:12]}",
        community_id=alert.community_id,
        incident_id=alert.incident_id if hasattr(alert, 'incident_id') else None,
        alert_type=alert.alert_type,
        title=alert.title,
        message=alert.message,
        severity=alert.severity,
        is_active=True,
        expires_at=alert.expires_at if hasattr(alert, 'expires_at') else None
    )
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

# Get all active alerts
@router.get("/", response_model=BatchResponse)
def list_alerts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    active_only: bool = Query(True),
    severity: str = Query(None),
    db: Session = Depends(get_db)
):
    """List community alerts"""
    query = db.query(CommunityAlert)
    
    if active_only:
        query = query.filter(CommunityAlert.is_active == True)
    
    if severity:
        query = query.filter(CommunityAlert.severity == severity)
    
    total = query.count()
    alerts = query.order_by(CommunityAlert.created_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "count": len(alerts),
        "page": skip // limit + 1,
        "per_page": limit,
        "data": alerts
    }

# Get alert by ID
@router.get("/{alert_id}", response_model=CommunityAlertSchema)
def get_alert(
    alert_id: str = Path(..., description="Alert ID"),
    db: Session = Depends(get_db)
):
    """Get a specific alert"""
    alert = db.query(CommunityAlert).filter(CommunityAlert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

# Get community alerts
@router.get("/community/{community_id}", response_model=List[CommunityAlertSchema])
def get_community_alerts(
    community_id: str = Path(..., description="Community ID"),
    active_only: bool = Query(True),
    db: Session = Depends(get_db)
):
    """Get alerts for a specific community"""
    community = db.query(Community).filter(Community.id == community_id).first()
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    query = db.query(CommunityAlert).filter(CommunityAlert.community_id == community_id)
    
    if active_only:
        query = query.filter(CommunityAlert.is_active == True)
    
    alerts = query.order_by(CommunityAlert.created_at.desc()).all()
    return alerts

# Acknowledge alert
@router.post("/{alert_id}/acknowledge", response_model=CommunityAlertSchema)
def acknowledge_alert(
    alert_id: str = Path(..., description="Alert ID"),
    db: Session = Depends(get_db)
):
    """Acknowledge an alert (increment acknowledgement count)"""
    alert = db.query(CommunityAlert).filter(CommunityAlert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    alert.acknowledged_count += 1
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert

# Deactivate alert
@router.post("/{alert_id}/deactivate", response_model=CommunityAlertSchema)
def deactivate_alert(
    alert_id: str = Path(..., description="Alert ID"),
    db: Session = Depends(get_db)
):
    """Deactivate an alert"""
    alert = db.query(CommunityAlert).filter(CommunityAlert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    alert.is_active = False
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert

# Get critical alerts
@router.get("/critical/all", response_model=List[CommunityAlertSchema])
def get_critical_alerts(db: Session = Depends(get_db)):
    """Get all critical severity alerts"""
    alerts = db.query(CommunityAlert).filter(
        CommunityAlert.is_active == True,
        CommunityAlert.severity == "critical"
    ).order_by(CommunityAlert.created_at.desc()).all()
    return alerts
