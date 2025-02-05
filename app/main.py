from fastapi import FastAPI, HTTPException
from app.crud import get_recommendations
from app.schemas import RecommendationResponse

app = FastAPI()

@app.get("/recommend/{book_id}", response_model=RecommendationResponse)
async def recommend_books(book_id: int):
    recommendations = get_recommendations(book_id)
    if not recommendations:
        raise HTTPException(status_code=404, detail="No recommendations found for this book ID.")
    return {"book_id": book_id, "recommendations": recommendations}
