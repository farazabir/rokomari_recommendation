# Book Recommendation System

This project provides a book recommendation system based on similarity scores, stored in an SQLite database. 
The system runs as a FastAPI service inside a Docker container. The chrome extension pass the current book id from url to the backend to get recommendation and 
create a list of recommended book. 

## Features
- Computes book similarity using TF-IDF and cosine similarity.
- Stores book details and recommendations in an SQLite database.
- Provides an API endpoint to fetch recommendations based on a book ID.
- Runs inside a Docker container for easy deployment.

## Prerequisites
Make sure you have the following installed:
- [Docker](https://www.docker.com/get-started)

## Running the Project with Docker

### 1. Build the Docker Image
```sh
docker build -t book-recommender .
```

### 2. Run the Container
```sh
docker run -p 8000:8000 book-recommender
```

This will start the FastAPI service, which you can access at `http://localhost:8000`.

## API Usage

### Get Book Recommendations
To get recommendations for a book, use the following API endpoint:
```sh
GET http://localhost:8000/recommend/{book_id}
```

Example:
```sh
GET http://localhost:8000/recommend/1
```

### Example Response
```json
{
  "book_id": 1,
  "recommendations": [
    {
      "book_id": 45,
      "book_name": "Python for Beginners",
      "author": "John Doe",
      "book_link": "http://example.com/python",
      "similarity_score": 0.8234
    },
    {
      "book_id": 102,
      "book_name": "Machine Learning Basics",
      "author": "Jane Smith",
      "book_link": "http://example.com/ml",
      "similarity_score": 0.8012
    }
  ]
}
```

