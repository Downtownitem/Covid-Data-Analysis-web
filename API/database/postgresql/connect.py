import os
from typing import Optional

import dotenv
from sqlalchemy import create_engine, URL, Engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session

dotenv.load_dotenv()

postgres_conn: Optional[Session] = None
url_object: Optional[URL] = None
engine: Optional[Engine] = None


def connect():
    global postgres_conn, url_object, engine

    if postgres_conn is not None:
        return

    url_object = URL.create(
        drivername="postgresql+psycopg2",
        username=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD'),
        host=os.getenv('POSTGRES_HOST'),
        port=os.getenv('POSTGRES_PORT'),
        database=os.getenv('POSTGRES_DB')
    )

    engine = create_engine(url_object, echo=False)
    session = sessionmaker(bind=engine)
    postgres_conn = session()

    return postgres_conn


connect()
