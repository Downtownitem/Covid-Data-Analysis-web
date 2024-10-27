import json

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy import text

from routes.auth import get_current_active_user
from models.people import User
import time

from database.postgresql.connect import postgres_conn
from database.postgresql.models import *

router = APIRouter()


@router.get("/confirm_death_per_time")
async def get_confirm_death_per_time(current_user: User = Depends(get_current_active_user)):
    data = postgres_conn.query(DayWise)

    mapped1 = []
    mapped2 = []
    for d in data:
        mapped1.append({
            "time": d.date,
            "value": d.confirmed
        })
        mapped2.append({
            "time": d.date,
            "value": d.deaths
        })

    return {
        "confirmed": mapped1,
        "deaths": mapped2
    }


@router.get("/confirm_death_top_country")
async def get_confirm_death_top_country(current_user: User = Depends(get_current_active_user)):
    top_3 = postgres_conn.execute(text("""
        SELECT country_region, confirmed, deaths
        FROM country_wise_lastest
        ORDER BY deaths DESC
        LIMIT 3;
    """)).all()

    others = postgres_conn.execute(text("""
        SELECT SUM(confirmed) as confirmed, SUM(deaths) as deaths
        FROM country_wise_lastest
        WHERE country_region NOT IN (SELECT country_region
                                    FROM country_wise_lastest
                                    ORDER BY deaths DESC
                                    LIMIT 3)
    """)).first()

    mapped1 = []
    mapped2 = []

    for d in top_3:
        mapped1.append({ "value": d.confirmed, "name": d.country_region })
        mapped2.append({ "value": d.deaths, "name": d.country_region })
        
    mapped1.append({ "value": others.confirmed, "name": "Others" })
    mapped2.append({ "value": others.deaths, "name": "Others" })

    return {
        "confirmed": mapped1,
        "deaths": mapped2
    }
