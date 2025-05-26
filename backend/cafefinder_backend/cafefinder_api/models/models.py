from sqlalchemy import Column, Integer, String, Float
from . import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default='user')

class Cafe(Base):
    __tablename__ = 'cafes'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    open_hours = Column(String)
    description = Column(String)
    image = Column(String)
    rating = Column(Float)
