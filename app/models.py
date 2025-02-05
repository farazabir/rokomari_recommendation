from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Book(Base):
    __tablename__ = "books"
    
    book_id = Column(Integer, primary_key=True, index=True)
    book_name = Column(String, index=True)
    author = Column(String)

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.book_id"))
    similar_book_id = Column(Integer, ForeignKey("books.book_id"))
    similarity_score = Column(Float)
