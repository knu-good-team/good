from typing import List
from fastapi import HTTPException
from pymysql import OperationalError
from sqlalchemy.orm import Session

from app.model.disability_jobs import DisabilityJobsModel
from app.model.disability_workers import DisabilityWorkersModel
from app.schemas.disability_jobs import DisabilityWorkers


class DisailityRepository:
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

    async def get_disability_workers_list(db: Session) -> List[DisabilityWorkers]:
        try:
            return db.query(DisabilityWorkersModel).all()
        except OperationalError as e:
            raise HTTPException(status_code=500, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            db.close()
