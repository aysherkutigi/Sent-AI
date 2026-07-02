# Sentinel AI Backend

## Overview
Comprehensive backend infrastructure for the Sentinel AI offline community intelligence platform.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI entry point
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection & session
│   ├── models.py            # SQLAlchemy ORM models
│   ├── schemas.py           # Pydantic validation schemas
│   ├── migrations.py        # Database migrations
│   ├── schema_docs.py       # Schema documentation
│   ├── routers/             # API route handlers
│   │   ├── communities.py
│   │   ├── incidents.py
│   │   ├── assessments.py
│   │   ├── alerts.py
│   │   └── forecasts.py
│   ├── services/            # Business logic
│   │   ├── incident_service.py
│   │   ├── risk_service.py
│   │   ├── ai_service.py
│   │   └── alert_service.py
│   └── utils/               # Utility functions
│       ├── logger.py
│       └── validators.py
├── tests/                   # Test suite
├── requirements.txt         # Python dependencies
├── .env.example            # Environment template
└── README.md
```

## Database Schema

### Core Tables (11 tables)

1. **communities** - Geographic locations & communities
2. **incidents** - Incident reports (flood, disease, security, etc.)
3. **incident_updates** - Timeline of incident updates
4. **risk_assessments** - AI-generated risk scores & recommendations
5. **community_alerts** - Emergency alerts for communities
6. **users** - Reporters, responders, admins
7. **disease_outbreaks** - Disease surveillance data
8. **environmental_hazards** - Environmental risks
9. **security_incidents** - Security threat tracking
10. **flood_forecasts** - Flood predictions & forecasts
11. **response_actions** - Emergency response tracking

### Key Features
- Full referential integrity with foreign keys
- Timestamp tracking (created_at, updated_at)
- Enum types for status/severity/type
- JSON columns for flexible data (recommendations, analysis)
- Performance indexes on frequently queried columns

## API Endpoints (Planned)

### Communities
- `GET /api/communities` - List all communities
- `GET /api/communities/{id}` - Get community details
- `POST /api/communities` - Create community
- `PUT /api/communities/{id}` - Update community

### Incidents
- `GET /api/incidents` - List incidents (with filters)
- `GET /api/incidents/{id}` - Get incident details
- `POST /api/incidents` - Submit new incident
- `PUT /api/incidents/{id}` - Update incident
- `GET /api/incidents/{id}/updates` - Get incident timeline

### Risk Assessments
- `GET /api/assessments` - List assessments
- `POST /api/assessments` - Create assessment
- `GET /api/assessments/community/{id}` - Community risk

### Alerts
- `GET /api/alerts` - List active alerts
- `GET /api/alerts/community/{id}` - Community alerts
- `POST /api/alerts` - Create alert

### Forecasts
- `GET /api/forecasts/flood` - Flood forecasts
- `GET /api/forecasts/flood/{community_id}` - Community forecast

## Models Overview

### Incident
```python
- id: str (PK)
- incident_type: enum (flood, disease, security, environmental, other)
- severity: enum (low, medium, high, critical)
- status: enum (reported, analyzing, active, resolved, archived)
- community_id: str (FK)
- coordinates: latitude, longitude
- description: text
- reporter: name, phone, email
- risk_score: float (0-100)
- confidence: float (0-100)
- ai_analysis: json
- recommendations: json array
- timestamps
```

### RiskAssessment
```python
- id: str (PK)
- community_id: str (FK)
- risk_level: enum
- risk_score: float (0-100)
- confidence: float (0-100)
- sub-scores:
  - flood_risk
  - disease_risk
  - security_risk
  - environmental_risk
- key_factors: json array
- recommendations: json array
- timestamps
```

## Setup Instructions

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Initialize database**
   ```bash
   python -c "from app.database import create_tables; create_tables()"
   ```

4. **Run server**
   ```bash
   python app/main.py
   # or
   uvicorn app.main:app --reload
   ```

5. **Access API documentation**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Database Operations

### Create Tables
```python
from app.database import create_tables
create_tables()
```

### Insert Data
```python
from app.database import SessionLocal
from app.models import Community

db = SessionLocal()
community = Community(
    id="comm_1",
    name="Mokwa",
    state="Niger",
    latitude=9.3075,
    longitude=5.3389,
    population=45000
)
db.add(community)
db.commit()
```

### Query Data
```python
from app.database import SessionLocal
from app.models import Incident

db = SessionLocal()
incidents = db.query(Incident).filter(
    Incident.severity == "critical"
).all()
```

## Configuration

Key settings in `config.py`:
- `DEBUG` - Development mode
- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - JWT secret
- `CORS_ORIGINS` - Frontend URLs
- `ENABLE_OFFLINE_MODE` - Offline capability
- `MAX_UPLOAD_SIZE` - File upload limit

## Dependencies

### Core
- **FastAPI** - Modern web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### Data Processing
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **SciPy** - Scientific computing

### AI/ML
- **Scikit-learn** - Machine learning
- **TensorFlow** - Deep learning

### Security
- **python-jose** - JWT tokens
- **passlib** - Password hashing
- **bcrypt** - Password encryption

## Next Steps

1. Implement API route handlers in `routers/`
2. Create service layer in `services/`
3. Add authentication & authorization
4. Implement AI analysis logic
5. Add comprehensive tests
6. Deploy with Docker

