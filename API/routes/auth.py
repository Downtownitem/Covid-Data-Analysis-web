import os
import dotenv

from fastapi import Depends
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

from models.people import User, get_user
from routes.exceptions import unauthorized_exception, bad_request_exception

dotenv.load_dotenv()

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
user_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")
sensor_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/")


def get_password_hash(password):
    return pwd_context.hash(password)


class Token(BaseModel):
    access_token: str
    token_type: str


def create_hashed_password(password: str):
    return pwd_context.hash(password)


def authenticate_user(username: str, password: str):
    # Get the partial data of the user and user company
    user = get_user(username)

    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False

    return user


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, os.getenv('SECRET_KEY'), algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(user_oauth2_scheme)):
    credentials_exception = unauthorized_exception("Could not validate credentials")

    try:
        payload = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=[ALGORITHM])
        username: str = payload.get("username")

        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = get_user(username=username)

    if user is None:
        raise credentials_exception

    return user


def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise bad_request_exception("Inactive user")

    return current_user
