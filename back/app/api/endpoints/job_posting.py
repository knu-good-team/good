from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.services.public_jobs import PublicJobsService
from dependencies import get_db, get_public_jobs_service

router = APIRouter()


@router.get(
    "",
)
async def first_get(
    service: PublicJobsService = Depends(get_public_jobs_service),
    db: Session = Depends(get_db),
) -> Any:
    result = await service.get_public_jobs_list(db)
    return {
        "data": result,
    }
