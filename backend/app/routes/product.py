from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud
from app.schemas import product as product_schema

router = APIRouter(prefix="/products", tags=["products"])

@router.post("/", response_model=product_schema.ProductResponse)
def create_product(product: product_schema.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db=db, name=product.name, description=product.description, price=product.price, stock=product.stock)

@router.get("/{product_id}", response_model=product_schema.ProductResponse)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = crud.get_product(db=db, product_id=product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=product_schema.ProductResponse)
def update_product(product_id: int, product: product_schema.ProductUpdate, db: Session = Depends(get_db)):
    updated_product = crud.update_product(db=db, product_id=product_id, new_data=product_update)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    success = crud.delete_product(db=db, product_id=product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}