from fastapi import APIRouter

from app.api.endpoints import health
from app.api.endpoints import disability_jobs


api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(disability_jobs.router, prefix="/disability_jobs", tags=["disability_jobs"])
