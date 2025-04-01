from fastapi import FastAPI
from app.routes import user, product # Novas rotas

app = FastAPI()

# Registra as rotas de usuário e produto
app.include_router(user.router)
app.include_router(product.router) 

@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI application!"}