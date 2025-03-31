from sqlalchemy.orm import Session
from app.models import models

# CRUD para User

def create_user(db: Session, username: str, email: str, password_hash: str, role: str):
    # Verificar se o nome de usuário já existe
    db_user = db.query(models.User).filter(models.User.username == username).first()
    if db_user:
        raise ValueError(f"Usuário com o nome {username} já existe.")
    
    db_user = models.User(username=username, email=email, password_hash=password_hash, role=role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# Read (Ler) - Obter um usuário pelo ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

# Read (Ler) - Obter todos os usuários
def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()

# Update (Atualizar) - Atualizar um usuário
def update_user(db: Session, user_id: int, username: str, email: str, role: str):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
       db_user.username = username
       db_user.email = email
       db_user.role = role
       db.commit()
       db.refresh(db_user)
       return db_user
    return None

# Delete (Deletar) - Deletar um usuário
def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return db_user
    return None

# CRUD para Product

# Create (Criar) - Criar um novo produto
def create_product(db: Session, name: str, description: str, price: float, quantity: int):
    db_product = models.Product(name=name, description=description, price=price, quantity=quantity)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# Read (Ler) - Obter um produto pelo ID
def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

# Read (Ler) - Obter todos os produtos
def get_products(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Product).offset(skip).limit(limit).all()

# Update (Atualizar) - Atualizar um produto
def update_product(db: Session, product_id: int, name: str, description: str, price: float, quantity: int):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        db_product.name = name
        db_product.description = description
        db_product.price = price
        db_product.quantity = quantity
        db.commit()
        db.refresh(db_product)
        return db_product
    return None

# Delete (Deletar) - Deletar um produto
def delete_product(db: Session, product_id: int):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return db_product
    return None

# CRUD para Sale

# Create (Criar) - Criar uma nova venda
def create_sale(db: Session, user_id: int, product_id: int, quantity: int, total_price: float):
    db_sale = models.Sale(user_id=user_id, product_id=product_id, quantity=quantity, total_price=total_price)
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

# Read (Ler) - Obter uma venda pelo ID
def get_sale(db: Session, sale_id: int):
    return db.query(models.Sale).filter(models.Sale.id == sale_id).first()

# Read (Ler) - Obter todas as vendas
def get_sales(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Sale).offset(skip).limit(limit).all()

# Delete (Deletar) - Deletar uma venda
def delete_sale(db: Session, sale_id: int):
    db_sale = db.query(models.Sale).filter(models.Sale.id == sale_id).first()
    if db_sale:
        db.delete(db_sale)
        db.commit()
        return db_sale
    return None

# CRUD para InventoryMovement

# Create (Criar) - Criar um novo movimento de inventário
def create_inventory_movement(db: Session, product_id: int, movement_type: str, quantity: int):
    db_movement = models.InventoryMovement(product_id=product_id, movement_type=movement_type, quantity=quantity)
    db.add(db_movement)
    db.commit()
    db.refresh(db_movement)
    return db_movement

# Read (Ler) - Obter um movimento de inventário pelo ID
def get_inventory_movement(db: Session, movement_id: int):
    return db.query(models.InventoryMovement).filter(models.InventoryMovement.id == movement_id).first()

# Read (Ler) - Obter todos os movimentos de inventário
def get_inventory_movements(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.InventoryMovement).offset(skip).limit(limit).all()

# Delete (Deletar) - Deletar um movimento de inventário
def delete_inventory_movement(db: Session, movement_id: int):
    db_movement = db.query(models.InventoryMovement).filter(models.InventoryMovement.id == movement_id).first()
    if db_movement:
        db.delete(db_movement)
        db.commit()
        return db_movement
    return None