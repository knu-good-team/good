from app.db.database import SessionLocal
from app.repositories.disability_jobs import DisabilityRepository
from app.repositories.public_jobs import PublicJobsRepository
from app.services.disability import DisabilityService
from app.services.public_jobs import PublicJobsService

def get_disability_service() -> DisabilityService:
    return DisabilityService(disability_repo=DisabilityRepository)

def get_public_jobs_service() -> PublicJobsService:
    return PublicJobsService(public_jobs_repo=PublicJobsRepository)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
