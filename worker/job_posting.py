from sqlalchemy import Column, TEXT, INT, BIGINT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Test(Base):
   __tablename__ = "jobposting"
   idx = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
   areaCode = Column(TEXT, nullable=False)
   deptName = Column(TEXT, nullable=False)
   enddate = Column(BIGINT, nullable=False)
   readnum = Column(BIGINT, nullable=False)
   regdate = Column(BIGINT, nullable=False)
   title = Column(TEXT, nullable=False)
   typeinfo02 = Column(TEXT, nullable=False)
   username = Column(TEXT, nullable=False)