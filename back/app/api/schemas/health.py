from pydantic import BaseModel


class Health(BaseModel):
    hello: str = "world"
    web_server: str = "ok"
    db: str = "ok"