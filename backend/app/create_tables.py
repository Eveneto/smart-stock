from app.database import engine, Base
from app import models

# Cria todas as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

print("Tabelas criadas com sucesso!")
