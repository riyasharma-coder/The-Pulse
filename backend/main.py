from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List

import models, schemas, database, utils
from database import engine, get_db

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="The Pulse API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "The Pulse API is running 🚀"}

@app.post("/chat", response_model=schemas.ChatMessageResponse)
async def chat(request: schemas.ChatRequest, db: Session = Depends(get_db)):
    """
    Main chat endpoint. 
    1. Detects emotion from user input.
    2. Checks for crisis keywords.
    3. Saves user message to SQLite.
    4. Generates an empathetic AI response using context history.
    5. Saves AI response to SQLite.
    """
    user_id = request.user_id
    message_content = request.message

    # 1. Detect Emotion
    emotion, confidence = utils.detect_emotion(message_content)

    # 2. Save User Message
    user_msg = models.ChatMessage(
        user_id=user_id,
        role="user",
        content=message_content,
        emotion=emotion,
        confidence=confidence
    )
    db.add(user_msg)
    db.commit()
    db.refresh(user_msg)

    # 3. Get History for AI context (Increased limit for better memory)
    history = db.query(models.ChatMessage).filter(
        models.ChatMessage.user_id == user_id
    ).order_by(models.ChatMessage.timestamp.desc()).limit(20).all() # Increased from 10 to 20
    history.reverse()

    # 4. Generate AI Response
    if utils.check_crisis(message_content):
        reply = (
            "I'm really sorry you're feeling this much pain. You're not alone. "
            "Please consider reaching out to someone you trust or a mental health professional. "
        )
    else:
        reply = utils.generate_ai_response(user_id, message_content, emotion, history)

    # 5. Save AI Message
    ai_msg = models.ChatMessage(
        user_id=user_id,
        role="assistant",
        content=reply,
        emotion=emotion # Associate the same emotion for context
    )
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)

    return ai_msg

@app.get("/history/{user_id}", response_model=List[schemas.ChatMessageResponse])
def get_history(user_id: str, db: Session = Depends(get_db)):
    messages = db.query(models.ChatMessage).filter(
        models.ChatMessage.user_id == user_id
    ).order_by(models.ChatMessage.timestamp.asc()).all()
    return messages

@app.delete("/history/{user_id}")
def delete_history(user_id: str, db: Session = Depends(get_db)):
    """
    Deletes all chat history for a specific user to start a new chat.
    """
    db.query(models.ChatMessage).filter(models.ChatMessage.user_id == user_id).delete()
    db.commit()
    return {"message": "Chat history cleared successfully"}

@app.get("/analytics/{user_id}", response_model=schemas.AnalyticsResponse)
def get_analytics(user_id: str, db: Session = Depends(get_db)):
    # 1. Total messages
    total_msgs = db.query(models.ChatMessage).filter(
        models.ChatMessage.user_id == user_id,
        models.ChatMessage.role == "user"
    ).count()

    # 2. Mood trends (last 7 days)
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    trends = db.query(
        func.date(models.ChatMessage.timestamp).label('date'),
        models.ChatMessage.emotion,
        func.count(models.ChatMessage.id).label('emotion_count')
    ).filter(
        models.ChatMessage.user_id == user_id,
        models.ChatMessage.role == "user",
        models.ChatMessage.timestamp >= seven_days_ago
    ).group_by(
        func.date(models.ChatMessage.timestamp),
        models.ChatMessage.emotion
    ).all()

    mood_trends = [
        schemas.MoodTrend(date=str(t.date), emotion=t.emotion, count=t.emotion_count)
        for t in trends
    ]

    # 3. Top emotions
    emotions_count = db.query(
        models.ChatMessage.emotion,
        func.count(models.ChatMessage.id).label('emotion_count')
    ).filter(
        models.ChatMessage.user_id == user_id,
        models.ChatMessage.role == "user"
    ).group_by(models.ChatMessage.emotion).order_by(func.count(models.ChatMessage.id).desc()).all()

    top_emotions = [{"emotion": e.emotion, "count": e.emotion_count} for e in emotions_count]

    # 4. Generate AI Insight
    weekly_insight = utils.generate_weekly_insight(user_id, top_emotions)

    return schemas.AnalyticsResponse(
        mood_trends=mood_trends,
        top_emotions=top_emotions,
        total_messages=total_msgs,
        weekly_insight=weekly_insight
    )
