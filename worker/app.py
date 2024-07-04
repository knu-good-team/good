from fastapi import FastAPI, Depends, Path, HTTPException
from pydantic import BaseModel
from database2 import engineconn
from job_posting import Test

app = FastAPI()

engine = engineconn()
session = engine.sessionmaker()


class Item(BaseModel):
    name : str
    number : int

@app.get("/")
async def first_get():
    example = session.query(Test).all()
    return example