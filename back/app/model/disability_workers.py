from sqlalchemy import BIGINT, Column, TEXT, INT, DateTime, Double, null
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class DisabilityWorkersModel(Base):
    __tablename__ = "disability_workers"

    연번 = Column(BIGINT, primary_key=True, index=True)
