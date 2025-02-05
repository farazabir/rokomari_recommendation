from app.database import get_db_connection

def get_recommendations(book_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = '''
    SELECT b.book_name, b.book_id,b.book_link
    FROM recommendations r
    JOIN books b ON r.similar_book_id = b.book_id
    WHERE r.book_id = ?
    ORDER BY r.similarity_score DESC
    LIMIT 10
    '''
    
    cursor.execute(query, (book_id,))
    results = cursor.fetchall()
    conn.close()
    
    return [{"book_name": row["book_name"], "link": row["book_link"], "book_id": row["book_id"]} for row in results]
