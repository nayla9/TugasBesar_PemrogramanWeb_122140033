from sqlalchemy import Column, Integer, ForeignKey, Float, Text, DateTime, func
from sqlalchemy.orm import relationship
from .meta import Base

class Review(Base):
    __tablename__ = 'reviews'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    cafe_id = Column(Integer, ForeignKey('cafes.id'), nullable=False)
    rating = Column(Float, nullable=False)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship('User', back_populates='reviews')
    cafe = relationship('Cafe', back_populates='reviews')
