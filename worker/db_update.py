import os
import pandas as pd
from sqlalchemy import create_engine

from dotenv import load_dotenv

load_dotenv()

# PATH = "./data/disability_jobs_20231231.csv"
PATH = "./data/public_work_data.csv"
USER = os.getenv('DB_USER')
HOST = os.getenv('DB_HOST')
PORT = os.getenv('DB_PORT')
PASSWORD = os.getenv('DB_PW')
DATABASE = os.getenv('DB_DATABASE')

df = pd.read_csv(PATH, encoding='utf-8')
# print(f'mysql+pymysql:///{USER}:@{HOST}:{PORT}/{DATABASE}')
engine = create_engine(f'mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}')
df.to_sql('public_jobs', con=engine, if_exists='fail', index=False)