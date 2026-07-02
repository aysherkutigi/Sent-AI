from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import uuid

from app.database import get_db
from app.models import Community
from app.schemas import Community as CommunitySchema, CommunityCreate, CommunityUpdate, BatchResponse

router = APIRouter(prefix="/api/communities", tags=["communities"])

# Create Community
@router.post("/", response_model=CommunitySchema, status_code=201)
def create_community(
    community: CommunityCreate,
    db: Session = Depends(get_db)
):
    """Create a new community"""
    # Check if community already exists
    existing = db.query(Community).filter(Community.name == community.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Community already exists")
    
    db_community = Community(
        id=f"comm_{uuid.uuid4().hex[:12]}",
        name=community.name,
        state=community.state,
        latitude=community.latitude,
        longitude=community.longitude,
        population=community.population,
        description=community.description
    )
    db.add(db_community)
    db.commit()
    db.refresh(db_community)
    return db_community

# Get all communities with pagination
@router.get("/", response_model=BatchResponse)
def list_communities(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    state: str = Query(None),
    db: Session = Depends(get_db)
):
    """List all communities with optional filtering"""
    query = db.query(Community)
    
    if state:
        query = query.filter(Community.state == state)
    
    total = query.count()
    communities = query.offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "count": len(communities),
        "page": skip // limit + 1,
        "per_page": limit,
        "data": communities
    }

# Get community by ID
@router.get("/{community_id}", response_model=CommunitySchema)
def get_community(
    community_id: str = Path(..., description="Community ID"),
    db: Session = Depends(get_db)
):
    """Get a specific community by ID"""
    community = db.query(Community).filter(Community.id == community_id).first()
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    return community

# Update community
@router.put("/{community_id}", response_model=CommunitySchema)
def update_community(
    community_id: str = Path(..., description="Community ID"),
    community_update: CommunityUpdate = None,
    db: Session = Depends(get_db)
):
    """Update a community"""
    db_community = db.query(Community).filter(Community.id == community_id).first()
    if not db_community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    update_data = community_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_community, field, value)
    
    db_community.updated_at = datetime.utcnow()
    db.add(db_community)
    db.commit()
    db.refresh(db_community)
    return db_community

# Delete community
@router.delete("/{community_id}", status_code=204)
def delete_community(
    community_id: str = Path(..., description="Community ID"),
    db: Session = Depends(get_db)
):
    """Delete a community"""
    db_community = db.query(Community).filter(Community.id == community_id).first()
    if not db_community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    db.delete(db_community)
    db.commit()
    return None
