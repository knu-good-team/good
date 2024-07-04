from typing import Any, List
from fastapi import HTTPException
from pymysql import OperationalError
from sqlalchemy.orm import Session

from app.model.job_posting import PublicJobsModel


class PublicJobsRepository:
    def __init__(self) -> None:
        pass

    async def get_public_jobs_list(db: Session) -> Any:
        try:
            result = db.query(PublicJobsModel).limit(10).all()
            return result
        except OperationalError as e:
            raise HTTPException(status_code=500, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))