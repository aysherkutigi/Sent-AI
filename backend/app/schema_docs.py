# Schema documentation

DATABASE_SCHEMA = """
Sentinel AI Database Schema
============================

Core Tables:

1. COMMUNITIES
   - id (PK)
   - name
   - state
   - latitude, longitude
   - population
   - description
   - timestamps

2. INCIDENTS
   - id (PK)
   - incident_type (flood, disease, security, environmental, other)
   - severity (low, medium, high, critical)
   - status (reported, analyzing, active, resolved, archived)
   - community_id (FK)
   - coordinates (lat, lng)
   - description
   - reporter info (name, phone, email)
   - risk_score, confidence
   - ai_analysis (JSON)
   - recommendations (JSON)
   - photo_urls (JSON)
   - timestamps

3. INCIDENT_UPDATES
   - id (PK)
   - incident_id (FK)
   - update_type
   - content
   - created_at

4. RISK_ASSESSMENTS
   - id (PK)
   - community_id (FK)
   - incident_id (FK)
   - risk_level
   - risk_score (0-100)
   - confidence (0-100)
   - sub-scores: flood, disease, security, environmental
   - key_factors (JSON)
   - recommendations (JSON)
   - timestamps

5. COMMUNITY_ALERTS
   - id (PK)
   - community_id (FK)
   - incident_id (FK)
   - alert_type
   - title, message
   - severity
   - is_active
   - created_at, expires_at
   - acknowledged_count

6. USERS
   - id (PK)
   - name, email (unique), phone
   - role (reporter, admin, responder)
   - is_active, is_verified
   - community_id (FK)
   - timestamps

7. DISEASE_OUTBREAKS
   - id (PK)
   - community_id (FK)
   - disease_name
   - confirmed_cases, suspected_cases, deaths
   - severity
   - source
   - first_reported_at, last_updated_at
   - status
   - notes

8. ENVIRONMENTAL_HAZARDS
   - id (PK)
   - community_id (FK)
   - hazard_type
   - description
   - severity
   - affected_area_km2, affected_population
   - timestamps
   - status
   - remediation_plan

9. SECURITY_INCIDENTS
   - id (PK)
   - community_id (FK)
   - incident_type
   - description
   - severity
   - people_affected, injuries, fatalities
   - timestamps
   - status
   - response_actions (JSON)

10. FLOOD_FORECASTS
    - id (PK)
    - community_id (FK)
    - forecast_time
    - rainfall_mm
    - river_level_m
    - flood_probability (0-100)
    - severity
    - confidence
    - forecast_model
    - created_at

11. RESPONSE_ACTIONS
    - id (PK)
    - incident_id (FK)
    - action_type
    - description
    - resources_deployed (JSON)
    - status (planned, in_progress, completed)
    - started_at, completed_at
    - created_by

Relationships:
- Community (1) -> (N) Incidents
- Community (1) -> (N) RiskAssessments
- Community (1) -> (N) Alerts
- Community (1) -> (N) DiseaseOutbreaks
- Community (1) -> (N) EnvironmentalHazards
- Community (1) -> (N) SecurityIncidents
- Community (1) -> (N) FloodForecasts
- Incident (1) -> (N) IncidentUpdates
- Incident (1) -> (1) RiskAssessment
- Incident (1) -> (N) ResponseActions

Indexes:
- incidents.created_at (for time-series queries)
- incidents.community_id (for filtering by location)
- incidents.severity (for alerts)
- communities.name (for lookups)
- risk_assessments.created_at (for analytics)
- community_alerts.is_active (for active alerts)
"""

print(DATABASE_SCHEMA)
