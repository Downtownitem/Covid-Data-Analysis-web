from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Date, Numeric, String, text as executable
from sqlalchemy.dialects.postgresql import INTEGER, TEXT
from database.postgresql.connect import engine

base = declarative_base()


class User(base):
    __tablename__ = 'users'
    __table_args__ = {'schema': 'users'}

    id = Column(INTEGER, primary_key=True, autoincrement=True)
    username = Column(TEXT, nullable=False)
    name = Column(TEXT, nullable=False)
    hashed_password = Column(TEXT, nullable=False)
    
class CountryWiseLatest(base):
    __tablename__ = 'country_wise_latest'

    country_region = Column(String, primary_key=True)
    confirmed = Column(INTEGER)
    deaths = Column(INTEGER)
    recovered = Column(INTEGER)
    active = Column(INTEGER)
    new_cases = Column(INTEGER)
    new_deaths = Column(INTEGER)
    new_recovered = Column(INTEGER)
    deaths_per_100_cases = Column(Numeric)
    recovered_per_100_cases = Column(Numeric)
    deaths_per_100_recovered = Column(Numeric)
    confirmed_last_week = Column(INTEGER)
    one_week_change = Column(INTEGER)
    one_week_percent_increase = Column(Numeric)
    who_region = Column(String)


class Covid19CleanComplete(base):
    __tablename__ = 'covid_19_clean_complete'

    province_state = Column(String)
    country_region = Column(String, primary_key=True)
    lat = Column(Numeric)
    long = Column(Numeric)
    date = Column(Date, primary_key=True)
    confirmed = Column(INTEGER)
    deaths = Column(INTEGER)
    recovered = Column(INTEGER)
    active = Column(INTEGER)
    who_region = Column(String)


class DayWise(base):
    __tablename__ = 'day_wise'

    date = Column(Date, primary_key=True)
    confirmed = Column(INTEGER)
    deaths = Column(INTEGER)
    recovered = Column(INTEGER)
    active = Column(INTEGER)
    new_cases = Column(INTEGER)
    new_deaths = Column(INTEGER)
    new_recovered = Column(INTEGER)
    deaths_per_100_cases = Column(Numeric)
    recovered_per_100_cases = Column(Numeric)
    deaths_per_100_recovered = Column(Numeric)
    number_of_countries = Column(INTEGER)


class FullGrouped(base):
    __tablename__ = 'full_grouped'

    date = Column(Date, primary_key=True)
    country_region = Column(String, primary_key=True)
    confirmed = Column(INTEGER)
    deaths = Column(INTEGER)
    recovered = Column(INTEGER)
    active = Column(INTEGER)
    new_cases = Column(INTEGER)
    new_deaths = Column(INTEGER)
    new_recovered = Column(INTEGER)
    who_region = Column(String)


class UsaCountryWise(base):
    __tablename__ = 'usa_country_wise'

    uid = Column(INTEGER, primary_key=True)
    iso2 = Column(String)
    iso3 = Column(String)
    code3 = Column(INTEGER)
    fips = Column(Numeric)
    admin2 = Column(String)
    province_state = Column(String)
    country_region = Column(String)
    lat = Column(Numeric)
    long = Column(Numeric)
    combined_key = Column(String)
    date = Column(Date)
    confirmed = Column(INTEGER)
    deaths = Column(INTEGER)


class WorldometerData(base):
    __tablename__ = 'worldometer_data'

    country_region = Column(String, primary_key=True)
    continent = Column(String)
    population = Column(INTEGER)
    totalcases = Column(INTEGER)
    newcases = Column(INTEGER)
    totaldeaths = Column(INTEGER)
    newdeaths = Column(INTEGER)
    totalrecovered = Column(INTEGER)
    newrecovered = Column(INTEGER)
    activecases = Column(INTEGER)
    serious_critical = Column(INTEGER)
    total_casesper_1m_pop = Column(Numeric)
    deaths_per_1m_pop = Column(Numeric)
    totaltests = Column(INTEGER)
    tests_per_1m_pop = Column(Numeric)
    who_region = Column(String)


try:
    schemas = set(table.schema for table in base.metadata.tables.values() if table.schema)

    with engine.connect() as conn:
        for schema in schemas:
            conn.execute(executable(f"CREATE SCHEMA IF NOT EXISTS {schema}"))

        conn.commit()

    base.metadata.create_all(bind=engine)
except Exception as e:
    print(e)
    pass
