from app.database import SessionLocal
from app import crud
from app.models.models import User
import uuid

# Gerar o sufixo único para garantir que o usuário seja único
unique_suffix = uuid.uuid4()

# Variáveis de teste, usando o sufixo gerado
username = f"testuser_{unique_suffix}"
email = f"testuser{unique_suffix}@example.com"
password = "password"
role = "user"

# Instância do banco de dados
db = SessionLocal()

# Criar o usuário uma vez antes dos testes
user = crud.create_user(db=db, username=username, email=email, password_hash=password, role=role)

def test_create_user():
    # Verificando se os dados foram inseridos corretamente
    assert user.username == username
    assert user.email == email
    print(f"User created: {user.username}, {user.email}")


def test_read_user():
    # Recuperando o usuário pelo user_id
    user_from_db = crud.get_user(db=db, user_id=user.id)
    assert user_from_db is not None
    assert user_from_db.username == username
    print(f"User found: {user_from_db.username}")


def test_update_user():
    # Atualizando o nome de usuário
    new_username = f"updateduser_{unique_suffix}"
    user.username = new_username
    db.commit()
    db.refresh(user)
    
    # Verificando se a atualização foi realizada
    assert user.username == new_username
    print(f"User updated: {user.username}")


def test_delete_user():
    # Deletando o usuário
    crud.delete_user(db=db, user_id=user.id)
    
    # Verificando se o usuário foi deletado
    user_deleted = crud.get_user(db=db, user_id=user.id)
    assert user_deleted is None
    print(f"User deleted: {username}")


if __name__ == "__main__":
    test_create_user()
    test_read_user()
    test_update_user()
    test_delete_user()
    print("All tests passed.")
