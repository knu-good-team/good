from app.db.database import SessionLocal
from app.services.disability_jobs import DisabilityJobsService

def get_disability_jobs_service() -> DisabilityJobsService:
    return DisabilityJobsService()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
