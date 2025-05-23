from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(10), default='user')  # user atau admin

class Cafe(Base):
    __tablename__ = 'cafes'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    location = Column(String(100))
    open_hours = Column(String(100))
    description = Column(Text)
    image = Column(Text)
    rating = Column(Float, default=0.0)
    
    reviews = relationship("Review", back_populates="cafe", cascade="all, delete-orphan")

class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    cafe_id = Column(Integer, ForeignKey('cafes.id'), nullable=False)
    username = Column(String(100))
    comment = Column(Text)
    rating = Column(Integer)

    cafe = relationship("Cafe", back_populates="reviews")
