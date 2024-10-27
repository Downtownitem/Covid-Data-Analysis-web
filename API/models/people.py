from pydantic import BaseModel
from typing import Optional
from database.postgresql.connect import postgres_conn
from database.postgresql import models


class User(BaseModel):
    id: int
    username: str
    name: str


class UserInDB(User):
    hashed_password: str
    disabled: bool = False


class Register(BaseModel):
    username: str
    password: str
    name: str


def get_user(username: str):
    user = postgres_conn.query(models.User).filter_by(username=username).first()

    if user is not None:
        return UserInDB(**user.__dict__)
    else:
        return None
    
    