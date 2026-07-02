# Backend main entry point

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import create_tables
from app.config import settings

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

# Root endpoint
@app.get("/")
async def root():
    return {
        "name": "Sentinel AI",
        "version": settings.API_VERSION,
        "status": "online",
        "mode": "offline" if settings.ENABLE_OFFLINE_MODE else "online"
    }

# Health check
@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "sentinel-api"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
