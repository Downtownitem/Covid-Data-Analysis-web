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
    data = postgres_conn.execute(text("""
        SELECT date, country_region, confirmed
        FROM full_grouped
        WHERE country_region IN (SELECT country_region
                        FROM country_wise_latest
                        ORDER BY confirmed DESC
                        LIMIT 12);
    """)).all()

    countries = {}
    for d in data:
        if d.country_region not in countries:
            countries[d.country_region] = []
        
        countries[d.country_region].append({ "time": d.date, "value": d.confirmed })
        
    mapped = []
    for country in countries.keys():
        mapped.append({ "name": country, "data": countries[country] })

    return mapped


@router.get("/confirm_death_top_country")
async def get_confirm_death_top_country(current_user: User = Depends(get_current_active_user)):
    top_3 = postgres_conn.execute(text("SELECT country_region, confirmed, deaths FROM country_wise_latest ORDER BY deaths DESC LIMIT 8")).all()

    others = postgres_conn.execute(text("SELECT SUM(confirmed) as confirmed, SUM(deaths) as deaths FROM country_wise_latest WHERE country_region NOT IN (SELECT country_region FROM country_wise_latest ORDER BY deaths DESC LIMIT 8)")).first()

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

@router.get("/country_stats")
async def get_country_stats(current_user: User = Depends(get_current_active_user)):
    countries = postgres_conn.query(CountryWiseLatest).all()
    return [{
        "country_region": country.country_region,
        "confirmed": country.confirmed,
        "deaths": country.deaths,
        "recovered": country.recovered,
        "active": country.active
    } for country in countries]


@router.get("/total_stats")
async def get_total_stats(current_user: User = Depends(get_current_active_user)):
    total = postgres_conn.execute(text(
    """
    SELECT SUM(confirmed) as confirmed_cases, SUM(deaths) as deaths, SUM(recovered) as recovered, SUM(active) as active
    FROM country_wise_latest;
    """
        )).first()
    
    return {
        "confirmed": f"{total.confirmed_cases:,}",
        "deaths": f"{total.deaths:,}",
        "recovered": f"{total.recovered:,}",
        "active": f"{total.active:,}"
    }
    

@router.get("/continent_stats")
async def get_continent_stats(current_user: User = Depends(get_current_active_user)):
    countries = postgres_conn.query(WorldometerData).all()
    return [{
        "country_region": country.country_region,
        "confirmed": country.totalcases,
        "deaths": country.totaldeaths,
        "recovered": country.totalrecovered,
        "active": country.activecases,
        "continent": country.continent
    } for country in countries]
