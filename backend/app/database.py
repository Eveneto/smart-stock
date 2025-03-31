from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# URL de conexão com o banco de dados (utilizando variável de ambiente ou configurando diretamente)
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://admin_estoque:Estoque2025!@localhost:3306/estoque_inteligente")

# Cria a engine de conexão com o banco de dados
engine = create_engine(DATABASE_URL, connect_args={"charset": "utf8mb4"})

# Base para os modelos
Base = declarative_base()

# Criação da sessão para manipulação de dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Função para obter a sessão
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
