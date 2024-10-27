import json
from datetime import timedelta
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from routes.auth import Token, authenticate_user, create_access_token, get_current_active_user, get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
from models.people import Register, User, get_user

from routes.exceptions import unauthorized_exception, bad_request_exception

from database.postgresql.connect import postgres_conn
from database.postgresql import models

router = APIRouter()


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise unauthorized_exception("Incorrect username or password")

    access_token = create_access_token(
        data={
            "username": user.username
        }
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.post("/register")
async def register(form_data: Register):
    user = get_user(form_data.username)

    if user:
        raise bad_request_exception("User already exists")

    postgres_conn.add(models.User(
        username=form_data.username,
        name=form_data.name,
        hashed_password=get_password_hash(form_data.password),
    ))
    postgres_conn.commit()

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": form_data.username}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer"}
