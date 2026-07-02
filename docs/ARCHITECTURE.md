# Sentinel Africa AI - System Architecture

## Overview

Sentinel Africa AI is an offline-first, AI-powered desktop application designed for community risk intelligence and early warning in African contexts.

## System Design

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Electron for desktop deployment
- Tailwind CSS + shadcn/ui for UI
- Zustand for state management
- Leaflet.js for maps
- Recharts for data visualization

**Key Components:**
1. **Landing Page** - Initial user interface
2. **Dashboard** - Real-time risk overview
3. **AI Copilot** - Chat-based intelligence assistant
4. **Risk Map** - Interactive geospatial visualization
5. **Community Reports** - Incident submission portal
6. **Analytics Hub** - Historical trend analysis
7. **Alert Center** - Emergency notifications
8. **Report Generator** - PDF/Excel export

### Backend Architecture

**Technology Stack:**
- Python 3.10+ with FastAPI
- SQLite for local data storage
- Ollama/LM Studio for local LLM inference
- Celery for async tasks (optional)

**API Layers:**
1. **REST API** - HTTP endpoints for frontend communication
2. **Database Layer** - SQLAlchemy ORM
3. **Service Layer** - Business logic
4. **AI Layer** - LLM integration and inference

### Data Flow

```
User Input (Frontend)
    ↓
 REST API Request
    ↓
 FastAPI Router
    ↓
 Service Layer (Business Logic)
    ↓
 SQLite Database / Local LLM
    ↓
 JSON Response
    ↓
Frontend Display (React)
```

## Database Schema

Key tables:
- **communities** - Community metadata
- **incidents** - Community incident reports
- **risk_assessments** - AI-generated risk analysis
- **alerts** - Generated alerts and recommendations
- **historical_data** - Trend tracking
- **users** - User management (optional)

## Deployment Model

**Offline-First Requirements:**
1. No external API dependencies
2. All data stored locally (SQLite)
3. AI models run locally (Ollama/LM Studio)
4. Optional sync when internet is available
5. Single executable package (Electron app)

## Security Considerations

- No sensitive data transmitted externally
- Local encryption for sensitive fields
- User authentication (optional)
- Role-based access control

---

See [DATABASE.md](./DATABASE.md) for schema details and [API.md](./API.md) for endpoint documentation.
