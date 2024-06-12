from app.db.database import SessionLocal
from app.repositories.disability_jobs import DisailityRepository
from app.services.disability import DisabilityService

def get_disability_service() -> DisabilityService:
    return DisabilityService(disability_repo=DisailityRepository)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
