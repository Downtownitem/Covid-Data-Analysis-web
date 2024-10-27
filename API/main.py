from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import dotenv

from routes.users import router as user_router
from routes.graphs import router as place_router

dotenv.load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/users")
app.include_router(place_router, prefix="/graphs")
