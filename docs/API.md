# Sentinel Africa AI - API Documentation

## Base URL
`http://localhost:8000/api`

## Endpoints

### Health Check

**GET** `/health`

Returns server health status.

**Response:**
```json
{
  "status": "healthy"
}
```

### Communities

**GET** `/communities`

List all communities.

**GET** `/communities/:id`

Get community details.

**POST** `/communities`

Create a new community.

### Incidents

**POST** `/incidents`

Submit a new incident report.

**Body:**
```json
{
  "community_id": 1,
  "category": "flood",
  "severity": "high",
  "description": "...",
  "latitude": 9.0765,
  "longitude": 7.3986
}
```

**GET** `/incidents`

List incidents with filters.

**GET** `/incidents/:id`

Get incident details.

### Risk Assessment

**POST** `/risk-assessment`

Generate AI risk assessment for an incident.

**Body:**
```json
{
  "incident_id": 1
}
```

### Alerts

**GET** `/alerts`

List active alerts.

**POST** `/alerts/:id/resolve`

Resolve an alert.

### Reports

**POST** `/reports/generate`

Generate a report.

**Body:**
```json
{
  "type": "flood_intelligence",
  "start_date": "2026-01-01",
  "end_date": "2026-07-02",
  "format": "pdf"
}
```

---

Full API documentation to be expanded with detailed request/response schemas.
