from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

HF_API_KEY = os.getenv("HF_API_KEY")

# Models
class ChatRequest(BaseModel):
    message: str
    user_id: str = "default"

# Memory
chat_memory = {}

# APIs
EMOTION_API = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"
LLM_API = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"

headers = {
    "Authorization": f"Bearer {HF_API_KEY}"
}

# Normalize Emotion Labels
def normalize_emotion(label):
    mapping = {
        "joy": "happy",
        "anger": "stress",
        "fear": "anxiety",
        "sadness": "sad",
        "surprise": "neutral"
    }
    return mapping.get(label, label)

# Emotion Detection
def detect_emotion(text):
    payload = {"inputs": text}

    try:
        response = requests.post(
            EMOTION_API,
            headers=headers,
            json=payload,
            timeout=10
        )

        if response.status_code != 200:
            return "neutral", 0.0

        result = response.json()
        emotions = result[0]

        top_emotion = max(emotions, key=lambda x: x['score'])

        label = normalize_emotion(top_emotion['label'])
        score = round(top_emotion['score'], 2)

        return label, score

    except:
        return "neutral", 0.0


# AI Response
def generate_ai_response(user_id, user_message, emotion):

    history = chat_memory[user_id][-4:]

    history_text = ""
    for msg in history:
        history_text += f"{msg['role']}: {msg['content']}\n"

    prompt = f"""
You are a highly empathetic AI mental health assistant.

Rules:
- Be warm, calm, and supportive
- Keep response under 3–4 lines
- Do NOT sound robotic
- Do NOT give medical advice
- Suggest small helpful actions if needed

Conversation:
{history_text}

User Emotion: {emotion}
User Message: {user_message}

Respond like a caring human.
"""

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 120,
            "temperature": 0.7
        }
    }

    try:
        response = requests.post(
            LLM_API,
            headers=headers,
            json=payload,
            timeout=15
        )

        if response.status_code != 200:
            return fallback_response()

        result = response.json()

        return result[0]["generated_text"].split(prompt)[-1].strip()

    except:
        return fallback_response()


# Fallback Response
def fallback_response():
    return "I'm here for you. I might be a little slow right now, but please tell me more about what you're feeling."


# Crisis Detection
def check_crisis(message):
    crisis_keywords = [
        "suicide", "kill myself", "want to die",
        "end my life", "no reason to live"
    ]

    message = message.lower()

    return any(word in message for word in crisis_keywords)


# Root endpoint (for demo)
@app.get("/")
def home():
    return {"status": "The Pulse Backend Running 🚀"}


# Chat Endpoint
@app.post("/chat")
async def chat(request: ChatRequest):

    user_id = request.user_id
    message = request.message

    if user_id not in chat_memory:
        chat_memory[user_id] = []

    # Store user message
    chat_memory[user_id].append({
        "role": "user",
        "content": message
    })

    # Step 1: Emotion Detection
    emotion, confidence = detect_emotion(message)

    # Step 2: Crisis Handling
    if check_crisis(message):
        reply = (
            "I'm really sorry you're feeling this much pain. You're not alone. "
            "Please consider reaching out to someone you trust or a mental health professional. "
        )

    # Step 3: AI Response
    else:
        reply = generate_ai_response(user_id, message, emotion)

    # Store AI reply
    chat_memory[user_id].append({
        "role": "assistant",
        "content": reply
    })

    return {
        "response": reply,
        "emotion": emotion,
        "confidence": confidence,
        "conversation_turns": len(chat_memory[user_id]) // 2
    }
