from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ChatRequest(BaseModel):
    message: str
    user_id: str = "default"

class ChatMessageResponse(BaseModel):
    id: int
    user_id: str
    role: str
    content: str
    emotion: Optional[str] = None
    confidence: Optional[float] = None
    timestamp: datetime

    class Config:
        from_attributes = True

class MoodTrend(BaseModel):
    date: str
    emotion: str
    count: int

class AnalyticsResponse(BaseModel):
    mood_trends: List[MoodTrend]
    top_emotions: List[dict]
    total_messages: int
    weekly_insight: Optional[str] = None
