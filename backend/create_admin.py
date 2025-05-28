from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.backend.models import User  # sesuaikan import dengan lokasi modelmu
from hash_password import hash_password

# Sesuaikan connection string dengan setting database kamu
DATABASE_URL = "postgresql://postgres:nana123123@localhost:5432/cafe"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def create_admin(email, username, password):
    hashed_pwd = hash_password(password)
    admin_user = User(email=email, username=username, password=hashed_pwd, role='admin')
    session.add(admin_user)
    session.commit()
    print(f"Admin user {username} berhasil dibuat!")

if __name__ == "__main__":
    email = input("Email admin: ")
    username = input("Username admin: ")
    password = input("Password admin: ")
    create_admin(email, username, password)
