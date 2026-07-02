from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import create_tables
from app.config import settings
from app.routers import communities, incidents, assessments, alerts, forecasts, analytics

# Lifecycle events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting Sentinel AI Server...")
    create_tables()
    print("✓ Database initialized")
    yield
    # Shutdown
    print("🛑 Shutting down Sentinel AI Server")

# Create FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description=settings.API_DESCRIPTION,
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_CREDENTIALS,
    allow_methods=settings.CORS_METHODS,
    allow_headers=settings.CORS_HEADERS,
)

# Include routers
app.include_router(communities.router)
app.include_router(incidents.router)
app.include_router(assessments.router)
app.include_router(alerts.router)
app.include_router(forecasts.router)
app.include_router(analytics.router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "name": "Sentinel AI",
        "version": settings.API_VERSION,
        "status": "online",
        "mode": "offline" if settings.ENABLE_OFFLINE_MODE else "online",
        "endpoints": {
            "documentation": "/docs",
            "communities": "/api/communities",
            "incidents": "/api/incidents",
            "assessments": "/api/assessments",
            "alerts": "/api/alerts",
            "forecasts": "/api/forecasts",
            "analytics": "/api/analytics"
        }
    }

# Health check
@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "sentinel-api",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    from datetime import datetime
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
