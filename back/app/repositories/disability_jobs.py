from typing import List
from fastapi import HTTPException
from pymysql import OperationalError
from sqlalchemy.orm import Session

from app.model.disability_jobs import DisabilityJobsModel


class DisailityJobsRepository:
    def __init__(self) -> None:
        pass

    async def get_disability_jobs_list(db: Session) -> List:
        try:
            return db.query(DisabilityJobsModel).all()[:2]
        except OperationalError as e:
            raise HTTPException(status_code=500, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            db.close()
