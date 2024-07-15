from fastapi import APIRouter

from app.api.endpoints import health
from app.api.endpoints import disability
from app.api.endpoints import gps
from app.api.endpoints import public_jobs


api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(disability.router, prefix="/disability", tags=["disability"])
api_router.include_router(gps.router, prefix="/gps", tags=["gps"])
api_router.include_router(public_jobs.router, prefix="/public_jobs", tags=["public_jobs"])
