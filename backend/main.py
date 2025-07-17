from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from src.api import chat

app = FastAPI() 

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database


# Include all routers
app.include_router(chat.router, prefix="/api", tags=["chat"])


@app.get("/") 
def read_root(): 
    return {"message": "Hello from FastAPI backend!"} 