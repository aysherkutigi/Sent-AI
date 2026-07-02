# Database migrations and version management

from datetime import datetime
from app.database import get_db, create_tables, drop_tables

MIGRATIONS = [
    {
        "version": "001",
        "date": "2026-07-01",
        "name": "initial_schema",
        "description": "Create initial database schema with all core tables"
    },
    {
        "version": "002",
        "date": "2026-07-02",
        "name": "add_indexes",
        "description": "Add performance indexes on frequently queried columns"
    },
    {
        "version": "003",
        "date": "2026-07-02",
        "name": "add_analytics_views",
        "description": "Add materialized views for analytics and reporting"
    }
]

def migrate():
    """Run all pending migrations"""
    print("Running database migrations...")
    create_tables()
    print("✓ Database schema created successfully")

def rollback():
    """Rollback database"""
    print("Rolling back database...")
    drop_tables()
    print("✓ Database rolled back successfully")

def get_migration_status():
    """Get current migration status"""
    return {
        "applied_migrations": len(MIGRATIONS),
        "migrations": MIGRATIONS,
        "latest_version": MIGRATIONS[-1]["version"] if MIGRATIONS else "000"
    }
