# Sentinel AI Backend API Documentation

## API Endpoints Overview

### Base URL
```
http://localhost:8000/api
```

### Authentication
Currently no authentication required (will be added in future version)

---

## Communities Endpoints

### List Communities
```
GET /api/communities
```
Query Parameters:
- `skip` (int, default: 0) - Pagination offset
- `limit` (int, default: 10) - Results per page
- `state` (string, optional) - Filter by state

Response:
```json
{
  "total": 100,
  "count": 10,
  "page": 1,
  "per_page": 10,
  "data": [...]
}
```

### Create Community
```
POST /api/communities
```
Request Body:
```json
{
  "name": "Mokwa",
  "state": "Niger",
  "latitude": 9.3075,
  "longitude": 5.3389,
  "population": 45000,
  "description": "Optional description"
}
```

### Get Community
```
GET /api/communities/{community_id}
```

### Update Community
```
PUT /api/communities/{community_id}
```

### Delete Community
```
DELETE /api/communities/{community_id}
```

---

## Incidents Endpoints

### List Incidents
```
GET /api/incidents
```
Query Parameters:
- `skip` (int, default: 0) - Pagination offset
- `limit` (int, default: 10) - Results per page
- `community_id` (string, optional) - Filter by community
- `severity` (string, optional) - Filter by severity (low, medium, high, critical)
- `incident_type` (string, optional) - Filter by type
- `status` (string, optional) - Filter by status

### Create Incident
```
POST /api/incidents
```
Request Body:
```json
{
  "incident_type": "flood",
  "severity": "high",
  "community_id": "comm_123",
  "latitude": 9.3075,
  "longitude": 5.3389,
  "description": "Heavy rainfall causing flooding",
  "reporter_name": "John Doe",
  "reporter_phone": "08012345678",
  "reporter_email": "john@example.com"
}
```

### Get Incident
```
GET /api/incidents/{incident_id}
```

### Update Incident
```
PUT /api/incidents/{incident_id}
```

### Get Incident Timeline
```
GET /api/incidents/{incident_id}/updates
```

### Get Critical Incidents
```
GET /api/incidents/critical/all
```

### Get Community Incidents
```
GET /api/incidents/community/{community_id}
Query: limit=10
```

---

## Risk Assessments Endpoints

### List Assessments
```
GET /api/assessments
```

### Create Assessment
```
POST /api/assessments
```
Request Body:
```json
{
  "community_id": "comm_123",
  "risk_level": "high",
  "risk_score": 75.5,
  "confidence": 0.92,
  "flood_risk": 0.65,
  "disease_risk": 0.45,
  "security_risk": 0.30,
  "environmental_risk": 0.50,
  "key_factors": ["Heavy rainfall", "Poor drainage"],
  "recommendations": ["Deploy pumps", "Evacuate areas"]
}
```

### Get Assessment
```
GET /api/assessments/{assessment_id}
```

### Get Community Assessment
```
GET /api/assessments/community/{community_id}
```

### Get Critical Assessments
```
GET /api/assessments/critical/all
```

### Get High-Risk Communities
```
GET /api/assessments/high-risk/communities
Query: limit=10
```

---

## Alerts Endpoints

### List Alerts
```
GET /api/alerts
```
Query Parameters:
- `active_only` (bool, default: true)
- `severity` (string, optional)

### Create Alert
```
POST /api/alerts
```
Request Body:
```json
{
  "community_id": "comm_123",
  "alert_type": "warning",
  "title": "Flood Warning",
  "message": "Heavy rainfall expected",
  "severity": "high",
  "expires_at": "2026-07-03T12:00:00"
}
```

### Get Alert
```
GET /api/alerts/{alert_id}
```

### Get Community Alerts
```
GET /api/alerts/community/{community_id}
```

### Acknowledge Alert
```
POST /api/alerts/{alert_id}/acknowledge
```

### Deactivate Alert
```
POST /api/alerts/{alert_id}/deactivate
```

### Get Critical Alerts
```
GET /api/alerts/critical/all
```

---

## Forecasts Endpoints

### List Flood Forecasts
```
GET /api/forecasts/flood
Query: community_id=comm_123
```

### Create Flood Forecast
```
POST /api/forecasts/flood
```
Request Body:
```json
{
  "community_id": "comm_123",
  "forecast_time": "2026-07-03T12:00:00",
  "rainfall_mm": 75.5,
  "river_level_m": 2.5,
  "flood_probability": 85,
  "severity": "high",
  "confidence": 0.9,
  "forecast_model": "sentinel-ai-v1"
}
```

### Get Forecast
```
GET /api/forecasts/flood/{forecast_id}
```

### Get Community Forecast
```
GET /api/forecasts/flood/community/{community_id}
Query: days_ahead=7
```

### Get High-Risk Forecasts
```
GET /api/forecasts/flood/high-risk/all
Query: probability_threshold=70
```

---

## Analytics Endpoints

### Dashboard Summary
```
GET /api/analytics/dashboard/summary
```
Response:
```json
{
  "total_incidents": 150,
  "critical_incidents": 12,
  "active_incidents": 45,
  "high_risk_communities": 23,
  "active_alerts": 8,
  "recent_incidents_24h": 5,
  "timestamp": "2026-07-02T13:15:00"
}
```

### Incidents by Type
```
GET /api/analytics/incidents/by-type
```

### Incidents by Severity
```
GET /api/analytics/incidents/by-severity
```

### Incident Timeline
```
GET /api/analytics/incidents/timeline
Query: days=7
```

### Community Risk Distribution
```
GET /api/analytics/communities/risk-distribution
```

### Top Affected Communities
```
GET /api/analytics/communities/top-affected
Query: limit=10
```

### Disease Outbreak Summary
```
GET /api/analytics/disease/outbreak-summary
```

### Risk Score Distribution
```
GET /api/analytics/risk-scores/distribution
```

---

## Error Responses

All errors follow this format:
```json
{
  "detail": "Error message"
}
```

Common Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## Response Examples

### Community Object
```json
{
  "id": "comm_abc123",
  "name": "Mokwa",
  "state": "Niger",
  "latitude": 9.3075,
  "longitude": 5.3389,
  "population": 45000,
  "description": "Community description",
  "created_at": "2026-07-02T12:00:00",
  "updated_at": "2026-07-02T12:00:00"
}
```

### Incident Object
```json
{
  "id": "inc_xyz789",
  "incident_type": "flood",
  "severity": "high",
  "status": "active",
  "community_id": "comm_abc123",
  "latitude": 9.3075,
  "longitude": 5.3389,
  "description": "Incident description",
  "reporter_name": "John Doe",
  "reporter_phone": "08012345678",
  "reporter_email": "john@example.com",
  "risk_score": 75.5,
  "confidence": 0.85,
  "ai_analysis": {...},
  "recommendations": [...],
  "created_at": "2026-07-02T12:00:00",
  "updated_at": "2026-07-02T12:00:00"
}
```

---

## Usage Examples

### Get Dashboard Summary
```bash
curl http://localhost:8000/api/analytics/dashboard/summary
```

### Create Incident
```bash
curl -X POST http://localhost:8000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "incident_type": "flood",
    "severity": "high",
    "community_id": "comm_123",
    "description": "Heavy rainfall",
    "reporter_name": "John",
    "reporter_phone": "08012345678"
  }'
```

### Get Critical Incidents
```bash
curl http://localhost:8000/api/incidents/critical/all
```

### List Communities
```bash
curl "http://localhost:8000/api/communities?state=Niger&limit=5"
```

---

## Swagger Documentation

Interactive API docs available at:
```
http://localhost:8000/docs
```

Alternative ReDoc documentation:
```
http://localhost:8000/redoc
```
