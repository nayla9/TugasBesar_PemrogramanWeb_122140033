from sqlalchemy import Column, Integer, String, Text, Float
from sqlalchemy.orm import relationship
from .meta import Base
from utils.security import hash_password, verify_password

class Cafe(Base):
    __tablename__ = 'cafes'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=True)
    open_hours = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    image = Column(String(500), nullable=True)
    rating = Column(Float, default=0.0)

    reviews = relationship('Review', back_populates='cafe', cascade='all, delete-orphan')
