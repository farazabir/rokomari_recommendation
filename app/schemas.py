from pydantic import BaseModel
from typing import List

class BookRecommendation(BaseModel):
    book_name: str
    link: str
    book_id: int

class RecommendationResponse(BaseModel):
    book_id: int
    recommendations: List[BookRecommendation]
