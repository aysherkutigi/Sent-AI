from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
import uuid

from app.database import get_db
from app.models import FloodForecast, Community
from app.schemas import FloodForecast as FloodForecastSchema, FloodForecastCreate, BatchResponse

router = APIRouter(prefix="/api/forecasts", tags=["forecasts"])

# Create flood forecast
@router.post("/flood", response_model=FloodForecastSchema, status_code=201)
def create_flood_forecast(
    forecast: FloodForecastCreate,
    db: Session = Depends(get_db)
):
    """Create a flood forecast for a community"""
    # Verify community exists
    community = db.query(Community).filter(Community.id == forecast.community_id).first()
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    db_forecast = FloodForecast(
        id=f"frc_{uuid.uuid4().hex[:12]}",
        community_id=forecast.community_id,
        forecast_time=forecast.forecast_time,
        rainfall_mm=forecast.rainfall_mm,
        river_level_m=forecast.river_level_m,
        flood_probability=forecast.flood_probability,
        severity=forecast.severity,
        confidence=forecast.confidence,
        forecast_model=forecast.forecast_model
    )
    db.add(db_forecast)
    db.commit()
    db.refresh(db_forecast)
    return db_forecast

# Get all flood forecasts
@router.get("/flood", response_model=BatchResponse)
def list_flood_forecasts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    community_id: str = Query(None),
    db: Session = Depends(get_db)
):
    """List flood forecasts"""
    query = db.query(FloodForecast)
    
    if community_id:
        query = query.filter(FloodForecast.community_id == community_id)
    
    total = query.count()
    forecasts = query.order_by(FloodForecast.forecast_time.desc()).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "count": len(forecasts),
        "page": skip // limit + 1,
        "per_page": limit,
        "data": forecasts
    }

# Get forecast by ID
@router.get("/flood/{forecast_id}", response_model=FloodForecastSchema)
def get_flood_forecast(
    forecast_id: str = Path(..., description="Forecast ID"),
    db: Session = Depends(get_db)
):
    """Get a specific flood forecast"""
    forecast = db.query(FloodForecast).filter(FloodForecast.id == forecast_id).first()
    if not forecast:
        raise HTTPException(status_code=404, detail="Forecast not found")
    return forecast

# Get community flood forecast
@router.get("/flood/community/{community_id}", response_model=List[FloodForecastSchema])
def get_community_flood_forecast(
    community_id: str = Path(..., description="Community ID"),
    days_ahead: int = Query(7, ge=1, le=30),
    db: Session = Depends(get_db)
):
    """Get flood forecasts for a community for the next N days"""
    community = db.query(Community).filter(Community.id == community_id).first()
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    now = datetime.utcnow()
    future = now + timedelta(days=days_ahead)
    
    forecasts = db.query(FloodForecast).filter(
        FloodForecast.community_id == community_id,
        FloodForecast.forecast_time >= now,
        FloodForecast.forecast_time <= future
    ).order_by(FloodForecast.forecast_time.asc()).all()
    
    return forecasts

# Get high-probability flood forecasts
@router.get("/flood/high-risk/all", response_model=List[FloodForecastSchema])
def get_high_risk_forecasts(
    probability_threshold: float = Query(70, ge=0, le=100),
    db: Session = Depends(get_db)
):
    """Get forecasts with high flood probability"""
    forecasts = db.query(FloodForecast).filter(
        FloodForecast.flood_probability >= probability_threshold
    ).order_by(FloodForecast.flood_probability.desc()).limit(20).all()
    
    return forecasts
