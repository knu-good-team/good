from sqlalchemy import Column, TEXT, INT, BIGINT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class PublicJobsModel(Base):
   __tablename__ = "public_jobs"
   idx = Column(BIGINT, nullable=False, primary_key=True)
   areaCode = Column(TEXT, nullable=True)
   deptName = Column(TEXT, nullable=True)
   enddate = Column(BIGINT, nullable=True)
   readnum = Column(BIGINT, nullable=True)
   regdate = Column(BIGINT, nullable=True)
   title = Column(TEXT, nullable=True)
   typeinfo02 = Column(TEXT, nullable=True)
   username = Column(TEXT, nullable=True)


   def to_dict(self):
      return {
         column.name: getattr(self, column.name) for column in self.__table__.columns
      }
