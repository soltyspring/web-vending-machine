from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from ai.schemas import TemplateGenerateRequest, TemplateGenerateResponse
from ai.shopping_service import generate_shopping_template
from routers.auth import router as auth_router

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "Vending API Server"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/generate-template", response_model=TemplateGenerateResponse)
def generate_template(payload: TemplateGenerateRequest):
    return generate_shopping_template(payload)
