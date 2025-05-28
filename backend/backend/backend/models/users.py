from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .meta import Base
from utils.security import hash_password, verify_password

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), default='user')

    reviews = relationship('Review', back_populates='user', cascade='all, delete-orphan')

def is_admin(self):
        return self.role == 'admin'