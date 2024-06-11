from app.db.database import SessionLocal
from app.repositories.disability_jobs import DisailityJobsRepository
from app.services.disability_jobs import DisabilityJobsService

def get_disability_jobs_service() -> DisabilityJobsService:
    return DisabilityJobsService(disability_jobs_repo=DisailityJobsRepository)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
