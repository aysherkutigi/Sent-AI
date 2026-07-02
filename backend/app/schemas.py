# Pydantic models for API request/response validation

from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum

class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class IncidentType(str, Enum):
    FLOOD = "flood"
    DISEASE = "disease"
    SECURITY = "security"
    ENVIRONMENTAL = "environmental"
    OTHER = "other"

# Community Schemas
class CommunityBase(BaseModel):
    name: str
    state: str
    latitude: float
    longitude: float
    population: int
    description: Optional[str] = None

class CommunityCreate(CommunityBase):
    pass

class CommunityUpdate(BaseModel):
    name: Optional[str] = None
    population: Optional[int] = None
    description: Optional[str] = None

class Community(CommunityBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Incident Schemas
class IncidentBase(BaseModel):
    incident_type: IncidentType
    severity: RiskLevel
    community_id: str
    description: str
    reporter_name: str
    reporter_phone: str
    reporter_email: Optional[EmailStr] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class IncidentCreate(IncidentBase):
    pass

class IncidentUpdate(BaseModel):
    severity: Optional[RiskLevel] = None
    status: Optional[str] = None
    description: Optional[str] = None

class Incident(IncidentBase):
    id: str
    status: str
    risk_score: float
    confidence: float
    ai_analysis: Optional[dict] = None
    recommendations: Optional[List[str]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Risk Assessment Schemas
class RiskAssessmentBase(BaseModel):
    community_id: str
    risk_level: RiskLevel
    risk_score: float
    confidence: float
    flood_risk: float = 0.0
    disease_risk: float = 0.0
    security_risk: float = 0.0
    environmental_risk: float = 0.0

class RiskAssessmentCreate(RiskAssessmentBase):
    key_factors: Optional[List[str]] = None
    recommendations: Optional[List[str]] = None

class RiskAssessment(RiskAssessmentBase):
    id: str
    key_factors: Optional[List[str]] = None
    recommendations: Optional[List[str]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Alert Schemas
class CommunityAlertBase(BaseModel):
    community_id: str
    alert_type: str
    title: str
    message: str
    severity: RiskLevel

class CommunityAlertCreate(CommunityAlertBase):
    expires_at: Optional[datetime] = None

class CommunityAlert(CommunityAlertBase):
    id: str
    is_active: bool
    created_at: datetime
    acknowledged_count: int

    class Config:
        from_attributes = True

# Disease Outbreak Schemas
class DiseaseOutbreakBase(BaseModel):
    community_id: str
    disease_name: str
    confirmed_cases: int = 0
    suspected_cases: int = 0
    deaths: int = 0
    severity: RiskLevel

class DiseaseOutbreakCreate(DiseaseOutbreakBase):
    source: Optional[str] = None
    notes: Optional[str] = None

class DiseaseOutbreak(DiseaseOutbreakBase):
    id: str
    status: str
    first_reported_at: datetime
    last_updated_at: datetime

    class Config:
        from_attributes = True

# Flood Forecast Schemas
class FloodForecastBase(BaseModel):
    community_id: str
    forecast_time: datetime
    rainfall_mm: float
    flood_probability: float
    severity: RiskLevel
    confidence: float

class FloodForecastCreate(FloodForecastBase):
    river_level_m: Optional[float] = None
    forecast_model: str = "sentinel-ai-v1"

class FloodForecast(FloodForecastBase):
    id: str
    created_at: datetime
    forecast_model: str

    class Config:
        from_attributes = True

# Batch Response
class BatchResponse(BaseModel):
    total: int
    count: int
    page: int
    per_page: int
    data: List[dict]

# Error Response
class ErrorResponse(BaseModel):
    detail: str
    status_code: int
