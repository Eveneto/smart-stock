from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud
from app.schemas import user as user_schema
from app.dependencies.auth import get_current_user  # Importação correta

router = APIRouter(prefix="/users", tags=["users"])

# ✅ Defina a rota `/users/me` primeiro para evitar conflitos
@router.get("/me", response_model=user_schema.UserResponse)
def get_my_profile(current_user=Depends(get_current_user)):
    return {"username": current_user.username, "email": current_user.email}

@router.post("/", response_model=user_schema.UserResponse)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, username=user.username, email=user.email, password_hash=user.password_hash, role=user.role)

@router.get("/{user_id}", response_model=user_schema.UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db=db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
