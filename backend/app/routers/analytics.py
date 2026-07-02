from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from sqlalchemy import func

from app.database import get_db
from app.models import Incident, Community, RiskAssessment, CommunityAlert, DiseaseOutbreak

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

# Dashboard summary
@router.get("/dashboard/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    """Get dashboard summary statistics"""
    # Total incidents
    total_incidents = db.query(func.count(Incident.id)).scalar() or 0
    
    # Critical incidents
    critical_incidents = db.query(func.count(Incident.id)).filter(
        Incident.severity == "critical"
    ).scalar() or 0
    
    # Active incidents
    active_incidents = db.query(func.count(Incident.id)).filter(
        Incident.status == "active"
    ).scalar() or 0
    
    # Communities at risk
    high_risk_communities = db.query(func.count(RiskAssessment.community_id)).filter(
        RiskAssessment.risk_level.in_(["high", "critical"])
    ).scalar() or 0
    
    # Active alerts
    active_alerts = db.query(func.count(CommunityAlert.id)).filter(
        CommunityAlert.is_active == True
    ).scalar() or 0
    
    # Recent incidents (last 24 hours)
    last_24h = datetime.utcnow() - timedelta(hours=24)
    recent_incidents = db.query(func.count(Incident.id)).filter(
        Incident.created_at >= last_24h
    ).scalar() or 0
    
    return {
        "total_incidents": total_incidents,
        "critical_incidents": critical_incidents,
        "active_incidents": active_incidents,
        "high_risk_communities": high_risk_communities,
        "active_alerts": active_alerts,
        "recent_incidents_24h": recent_incidents,
        "timestamp": datetime.utcnow().isoformat()
    }

# Incident statistics by type
@router.get("/incidents/by-type")
def get_incidents_by_type(db: Session = Depends(get_db)):
    """Get incident counts grouped by type"""
    results = db.query(
        Incident.incident_type,
        func.count(Incident.id).label("count")
    ).group_by(Incident.incident_type).all()
    
    return {"data": [{"type": r[0], "count": r[1]} for r in results]}

# Incident statistics by severity
@router.get("/incidents/by-severity")
def get_incidents_by_severity(db: Session = Depends(get_db)):
    """Get incident counts grouped by severity"""
    results = db.query(
        Incident.severity,
        func.count(Incident.id).label("count")
    ).group_by(Incident.severity).all()
    
    severity_order = {"low": 0, "medium": 1, "high": 2, "critical": 3}
    sorted_results = sorted(results, key=lambda x: severity_order.get(x[0], 4))
    
    return {"data": [{"severity": r[0], "count": r[1]} for r in sorted_results]}

# Incident timeline (last 7 days)
@router.get("/incidents/timeline")
def get_incident_timeline(days: int = Query(7, ge=1, le=30), db: Session = Depends(get_db)):
    """Get incident timeline for the last N days"""
    start_date = datetime.utcnow() - timedelta(days=days)
    
    results = db.query(
        func.date(Incident.created_at).label("date"),
        func.count(Incident.id).label("count")
    ).filter(
        Incident.created_at >= start_date
    ).group_by(func.date(Incident.created_at)).order_by(
        func.date(Incident.created_at)
    ).all()
    
    return {
        "data": [{"date": str(r[0]), "incidents": r[1]} for r in results],
        "period_days": days
    }

# Community risk distribution
@router.get("/communities/risk-distribution")
def get_community_risk_distribution(db: Session = Depends(get_db)):
    """Get distribution of communities by risk level"""
    results = db.query(
        RiskAssessment.risk_level,
        func.count(RiskAssessment.community_id).label("count")
    ).group_by(RiskAssessment.risk_level).all()
    
    risk_order = {"low": 0, "medium": 1, "high": 2, "critical": 3}
    sorted_results = sorted(results, key=lambda x: risk_order.get(x[0], 4))
    
    return {"data": [{"risk_level": r[0], "count": r[1]} for r in sorted_results]}

# Top affected communities
@router.get("/communities/top-affected")
def get_top_affected_communities(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """Get communities with most incidents"""
    results = db.query(
        Community.name,
        Community.id,
        func.count(Incident.id).label("incident_count")
    ).join(Incident, Community.id == Incident.community_id).group_by(
        Community.id, Community.name
    ).order_by(func.count(Incident.id).desc()).limit(limit).all()
    
    return {
        "data": [
            {"community": r[0], "community_id": r[1], "incident_count": r[2]}
            for r in results
        ]
    }

# Disease statistics
@router.get("/disease/outbreak-summary")
def get_disease_outbreak_summary(db: Session = Depends(get_db)):
    """Get summary of active disease outbreaks"""
    outbreaks = db.query(DiseaseOutbreak).filter(
        DiseaseOutbreak.status == "active"
    ).all()
    
    total_confirmed = sum(o.confirmed_cases for o in outbreaks)
    total_suspected = sum(o.suspected_cases for o in outbreaks)
    total_deaths = sum(o.deaths for o in outbreaks)
    
    return {
        "active_outbreaks": len(outbreaks),
        "total_confirmed_cases": total_confirmed,
        "total_suspected_cases": total_suspected,
        "total_deaths": total_deaths,
        "outbreaks": [
            {
                "disease": o.disease_name,
                "confirmed": o.confirmed_cases,
                "suspected": o.suspected_cases,
                "deaths": o.deaths,
                "community": db.query(Community).filter(Community.id == o.community_id).first().name
            }
            for o in outbreaks
        ]
    }

# Risk score distribution
@router.get("/risk-scores/distribution")
def get_risk_score_distribution(db: Session = Depends(get_db)):
    """Get distribution of risk scores"""
    assessments = db.query(RiskAssessment.risk_score).all()
    
    if not assessments:
        return {"data": [], "min": 0, "max": 0, "avg": 0}
    
    scores = [a[0] for a in assessments]
    
    return {
        "total": len(scores),
        "min": min(scores),
        "max": max(scores),
        "avg": sum(scores) / len(scores),
        "median": sorted(scores)[len(scores) // 2],
        "distribution": {
            "0-25": len([s for s in scores if 0 <= s < 25]),
            "25-50": len([s for s in scores if 25 <= s < 50]),
            "50-75": len([s for s in scores if 50 <= s < 75]),
            "75-100": len([s for s in scores if 75 <= s <= 100])
        }
    }
