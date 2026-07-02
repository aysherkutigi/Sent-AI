# Sentinel Africa AI - Database Schema

## Overview

SQLite database schema for storing community risk intelligence data.

## Core Tables

### communities
```sql
CREATE TABLE communities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    state TEXT NOT NULL,
    lga TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    population INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### incidents
```sql
CREATE TABLE incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    community_id INTEGER NOT NULL,
    category TEXT NOT NULL,  -- 'flood', 'disease', 'security', 'environment'
    severity TEXT NOT NULL,  -- 'low', 'medium', 'high', 'critical'
    description TEXT NOT NULL,
    reporter TEXT,
    photo_path TEXT,
    latitude REAL,
    longitude REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (community_id) REFERENCES communities(id)
);
```

### risk_assessments
```sql
CREATE TABLE risk_assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    incident_id INTEGER NOT NULL,
    overall_risk_score REAL NOT NULL,
    confidence_score REAL NOT NULL,
    threat_classification TEXT,
    predicted_impact TEXT,
    affected_population INTEGER,
    urgency_level TEXT,
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (incident_id) REFERENCES incidents(id)
);
```

### alerts
```sql
CREATE TABLE alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    community_id INTEGER NOT NULL,
    risk_assessment_id INTEGER,
    alert_type TEXT NOT NULL,  -- 'flood', 'disease', 'security', 'environmental'
    severity TEXT NOT NULL,
    message TEXT NOT NULL,
    recommendations TEXT,
    status TEXT DEFAULT 'active',  -- 'active', 'resolved', 'escalated'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (community_id) REFERENCES communities(id),
    FOREIGN KEY (risk_assessment_id) REFERENCES risk_assessments(id)
);
```

## Indexes

For performance optimization:

```sql
CREATE INDEX idx_incidents_community ON incidents(community_id);
CREATE INDEX idx_incidents_created ON incidents(created_at);
CREATE INDEX idx_alerts_community ON alerts(community_id);
CREATE INDEX idx_alerts_created ON alerts(created_at);
CREATE INDEX idx_risk_assessments_incident ON risk_assessments(incident_id);
```

---

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system design overview.
