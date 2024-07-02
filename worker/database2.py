import os
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path=env_path)

USER = os.getenv('DB_USER')
HOST = os.getenv('DB_HOST')
PORT = os.getenv('DB_PORT')
PASSWORD = os.getenv('DB_PW')
DATABASE = os.getenv('DB_DATABASE')

DB_URL = f'mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}'

class engineconn:

    def __init__(self):
        self.engine = create_engine(DB_URL, pool_recycle = 500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn