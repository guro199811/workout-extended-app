from fastapi import FastAPI
from database import engine, Base
from seed import populate_database
from fastapi.middleware.cors import CORSMiddleware

from routes import (
    auth, exercise_routes, goal_routes,
    history_routes, schedule_routes, user_routes
)

origins = [
    "http://localhost:5173",
    'http://172.18.0.2:5173'
]

app = FastAPI()

# Adding Auth Router
app.include_router(auth.auth)
app.include_router(user_routes.user_route)
app.include_router(exercise_routes.exercise)
app.include_router(goal_routes.goal)
app.include_router(schedule_routes.schedule)
app.include_router(history_routes.hist)


Base.metadata.create_all(bind=engine)


populate_database()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
