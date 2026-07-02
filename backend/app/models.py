from sqlalchemy import Column, String, Integer, Float, DateTime, Text, Boolean, ForeignKey, Enum as SQLEnum, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base

class RiskLevel(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class IncidentType(str, enum.Enum):
    FLOOD = "flood"
    DISEASE = "disease"
    SECURITY = "security"
    ENVIRONMENTAL = "environmental"
    OTHER = "other"

class IncidentStatus(str, enum.Enum):
    REPORTED = "reported"
    ANALYZING = "analyzing"
    ACTIVE = "active"
    RESOLVED = "resolved"
    ARCHIVED = "archived"

class Community(Base):
    """Community/Location model"""
    __tablename__ = "communities"

    id = Column(String, primary_key=True, index=True)
    name = Column(String(255), index=True, unique=True)
    state = Column(String(100))
    latitude = Column(Float)
    longitude = Column(Float)
    population = Column(Integer)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    incidents = relationship("Incident", back_populates="community")
    risk_assessments = relationship("RiskAssessment", back_populates="community")

    def __repr__(self):
        return f"<Community {self.name}>"

class Incident(Base):
    """Incident report model"""
    __tablename__ = "incidents"

    id = Column(String, primary_key=True, index=True)
    incident_type = Column(SQLEnum(IncidentType), index=True)
    severity = Column(SQLEnum(RiskLevel), index=True)
    status = Column(SQLEnum(IncidentStatus), default=IncidentStatus.REPORTED, index=True)
    community_id = Column(String, ForeignKey("communities.id"), index=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    description = Column(Text)
    reporter_name = Column(String(255))
    reporter_phone = Column(String(20))
    reporter_email = Column(String(255), nullable=True)
    risk_score = Column(Float, default=0.0)
    confidence = Column(Float, default=0.0)
    ai_analysis = Column(JSON, nullable=True)
    recommendations = Column(JSON, nullable=True)
    photo_urls = Column(JSON, nullable=True)  # Array of photo URLs
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    reported_at = Column(DateTime)  # When the incident occurred

    # Relationships
    community = relationship("Community", back_populates="incidents")
    updates = relationship("IncidentUpdate", back_populates="incident", cascade="all, delete-orphan")
    risk_assessment = relationship("RiskAssessment", back_populates="incident", uselist=False)

    def __repr__(self):
        return f"<Incident {self.id}>"

class IncidentUpdate(Base):
    """Track updates/timeline for incidents"""
    __tablename__ = "incident_updates"

    id = Column(String, primary_key=True, index=True)
    incident_id = Column(String, ForeignKey("incidents.id"), index=True)
    update_type = Column(String(50))  # status_change, new_info, media_added, etc.
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    incident = relationship("Incident", back_populates="updates")

    def __repr__(self):
        return f"<IncidentUpdate {self.id}>"

class RiskAssessment(Base):
    """AI-generated risk assessment"""
    __tablename__ = "risk_assessments"

    id = Column(String, primary_key=True, index=True)
    community_id = Column(String, ForeignKey("communities.id"), index=True)
    incident_id = Column(String, ForeignKey("incidents.id"), nullable=True, index=True)
    risk_level = Column(SQLEnum(RiskLevel))
    risk_score = Column(Float)  # 0-100
    confidence = Column(Float)  # 0-100
    flood_risk = Column(Float, default=0.0)
    disease_risk = Column(Float, default=0.0)
    security_risk = Column(Float, default=0.0)
    environmental_risk = Column(Float, default=0.0)
    key_factors = Column(JSON)  # List of contributing factors
    recommendations = Column(JSON)  # List of recommendations
    analysis_details = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    community = relationship("Community", back_populates="risk_assessments")
    incident = relationship("Incident", back_populates="risk_assessment")

    def __repr__(self):
        return f"<RiskAssessment {self.id}>"

class CommunityAlert(Base):
    """Emergency alerts for communities"""
    __tablename__ = "community_alerts"

    id = Column(String, primary_key=True, index=True)
    community_id = Column(String, ForeignKey("communities.id"), index=True)
    incident_id = Column(String, ForeignKey("incidents.id"), nullable=True, index=True)
    alert_type = Column(String(50))  # warning, emergency, info, etc.
    title = Column(String(255))
    message = Column(Text)
    severity = Column(SQLEnum(RiskLevel))
    is_active = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    expires_at = Column(DateTime, nullable=True)
    acknowledged_count = Column(Integer, default=0)

    def __repr__(self):
        return f"<CommunityAlert {self.id}>"

class User(Base):
    """User/Reporter model"""
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String(255))
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(20), nullable=True)
    role = Column(String(50), default="reporter")  # reporter, admin, responder, etc.
    is_active = Column(Boolean, default=True, index=True)
    is_verified = Column(Boolean, default=False)
    community_id = Column(String, ForeignKey("communities.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email}>"

class DiseaseOutbreak(Base):
    """Disease surveillance tracking"""
    __tablename__ = "disease_outbreaks"

    id = Column(String, primary_key=True, index=True)
    community_id = Column(String, ForeignKey("communities.id"), index=True)
    disease_name = Column(String(255))
    confirmed_cases = Column(Integer, default=0)
    suspected_cases = Column(Integer, default=0)
    deaths = Column(Integer, default=0)
    severity = Column(SQLEnum(RiskLevel))
    source = Column(String(255), nullable=True)
    first_reported_at = Column(DateTime)
    last_updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = Column(String(50), default="active")  # active, contained, resolved
    notes = Column(Text, nullable=True)

    def __repr__(self):
        return f"<DiseaseOutbreak {self.disease_name}>"

class EnvironmentalHazard(Base):
    """Environmental hazard tracking"""
    __tablename__ = "environmental_hazards"

    id = Column(String, primary_key=True, index=True)
    community_id = Column(String, ForeignKey("communities.id"), index=True)
    hazard_type = Column(String(255))  # flooding, drought, erosion, etc.
    description = Column(Text)
    severity = Column(SQLEnum(RiskLevel))
    affected_area_km2 = Column(Float, nullable=True)
    affected_population = Column(Integer, nullable=True)
    first_reported_at = Column(DateTime)
    last_updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = Column(String(50), default="active")
    remediation_plan = Column(Text, nullable=True)

    def __repr__(self):
        return f"<EnvironmentalHazard {self.hazard_type}>"

class SecurityIncident(Base):
    """Security incident tracking"""
    __tablename__ = "security_incidents"

    id = Column(String, primary_key=True, index=True)
    community_id = Column(String, ForeignKey("communities.id"), index=True)
    incident_type = Column(String(255))  # conflict, theft, violence, etc.
    description = Column(Text)
    severity = Column(SQLEnum(RiskLevel))
    people_affected = Column(Integer, nullable=True)
    injuries = Column(Integer, default=0)
    fatalities = Column(Integer, default=0)
    first_reported_at = Column(DateTime)
    last_updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = Column(String(50), default="active")
    response_actions = Column(JSON, nullable=True)  # List of actions taken

    def __repr__(self):
        return f"<SecurityIncident {self.incident_type}>"

class FloodForecast(Base):
    """Flood prediction/forecast"""
    __tablename__ = "flood_forecasts"

    id = Column(String, primary_key=True, index=True)
    community_id = Column(String, ForeignKey("communities.id"), index=True)
    forecast_time = Column(DateTime)  # When the forecast is for
    rainfall_mm = Column(Float)  # Expected rainfall in mm
    river_level_m = Column(Float, nullable=True)  # Expected river level
    flood_probability = Column(Float)  # 0-100
    severity = Column(SQLEnum(RiskLevel))
    confidence = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    forecast_model = Column(String(100))  # Which AI model generated this

    def __repr__(self):
        return f"<FloodForecast {self.community_id}>"

class ResponseAction(Base):
    """Track emergency response actions"""
    __tablename__ = "response_actions"

    id = Column(String, primary_key=True, index=True)
    incident_id = Column(String, ForeignKey("incidents.id"), index=True)
    action_type = Column(String(255))  # evacuation, medical_response, etc.
    description = Column(Text)
    resources_deployed = Column(JSON, nullable=True)  # Personnel, equipment, etc.
    status = Column(String(50), default="planned")  # planned, in_progress, completed
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    created_by = Column(String(255), nullable=True)  # User/agency that created action

    def __repr__(self):
        return f"<ResponseAction {self.id}>"
