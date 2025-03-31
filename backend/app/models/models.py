from sqlalchemy import Column, Integer, String, Text, DECIMAL, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"  # Alterado para 'users' (plural)

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password_hash = Column(String(255))
    role = Column(String(50))  # 'admin' ou 'user'
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    sales = relationship("Sale", back_populates="user")

class Product(Base):
    __tablename__ = "products"  # Alterado para 'products' (plural)

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(Text)
    price = Column(DECIMAL(10, 2))
    quantity = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    sales = relationship("Sale", back_populates="product")
    inventory_movements = relationship("InventoryMovement", back_populates="product")

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))  # Referência ajustada para 'users.id'
    product_id = Column(Integer, ForeignKey("products.id"))  # Referência ajustada para 'products.id'
    quantity = Column(Integer)
    total_price = Column(DECIMAL(10, 2))
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="sales")
    product = relationship("Product", back_populates="sales")

class InventoryMovement(Base):
    __tablename__ = "inventory_movements"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    movement_type = Column(String(50))  # 'entrada' ou 'saida'
    created_at = Column(DateTime, default=func.now())
    quantity = Column(Integer)

    product = relationship("Product", back_populates="inventory_movements")
