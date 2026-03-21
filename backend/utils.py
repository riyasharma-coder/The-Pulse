import requests
import os
from dotenv import load_dotenv
from openai import OpenAI
import google.generativeai as genai

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Clients
openai_client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    try:
        # Discover available models that support text generation
        models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        # Prefer gemini-1.5-flash if available, else take the first one
        preferred = next((m for m in models if 'gemini-1.5-flash' in m), models[0] if models else None)
        gemini_model = genai.GenerativeModel(preferred) if preferred else None
        if preferred:
            print(f"Using Gemini model: {preferred}")
    except Exception as e:
        print(f"Gemini Discovery Error: {e}")
        gemini_model = None
else:
    gemini_model = None

# APIs
EMOTION_API = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"
LLM_API = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3"

headers = {
    "Authorization": f"Bearer {HF_API_KEY}" if HF_API_KEY else ""
}

# Normalize Emotion Labels
def normalize_emotion(label):
    mapping = {
        "joy": "happy",
        "anger": "stress",
        "fear": "anxiety",
        "sadness": "sad",
        "surprise": "neutral",
        "neutral": "neutral",
        "disgust": "unwell"
    }
    return mapping.get(label, label)

# Emotion Detection
def detect_emotion(text):
    if not HF_API_KEY:
        return "neutral", 0.0
    
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
def generate_ai_response(user_id, user_message, emotion, history=[]):
    """
    Generates a deeply empathetic and emotionally intelligent AI response.
    Acts as a thoughtful human companion, adapting tone and length based on context.
    """
    # Format conversation history for deep context
    history_context = ""
    for msg in history[-15:]:
        role_label = "User" if msg.role == "user" else "The Pulse"
        history_context += f"{role_label}: {msg.content}\n"

    # 1. Prefer OpenAI (if key provided)
    if OPENAI_API_KEY and openai_client:
        try:
            messages = [
                {"role": "system", "content": f"""You are 'The Pulse', a deeply empathetic and emotionally intelligent companion. 
Your goal is to provide a safe, warm, and human-like space for the user.

Core Principles:
- EMOTIONAL INTELLIGENCE: Deeply understand the user's tone, intent, and current emotion ({emotion}).
- EMPATHY FIRST: If the user is emotional, acknowledge and validate their feelings BEFORE responding helpfully.
- ADAPTIVE LENGTH: Adjust your response length naturally. Be concise for casual chat, and provide detailed, thoughtful support (2-4 paragraphs) when the user is sharing something deep or difficult.
- MEMORY: Use the provided conversation history to refer back to earlier topics or emotions. Show the user you are truly listening.
- HUMAN-LIKE: Avoid robotic, repetitive, or generic answers. Use supportive, comforting, and encouraging language.
- FOLLOW-UP: Ask gentle, appropriate follow-up questions to encourage the user to express themselves further.
- IDENTITY: Never mention you are an AI unless explicitly asked.

Current Context:
Detected Emotion: {emotion}"""}
            ]
            
            for msg in history[-10:]:
                messages.append({"role": msg.role, "content": msg.content})
            messages.append({"role": "user", "content": user_message})

            response = openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages, # type: ignore
                max_tokens=800,
                temperature=0.85 # Slightly higher for more natural variety
            )
            content = response.choices[0].message.content
            return content.strip() if content else fallback_response()
        except Exception as e:
            print(f"OpenAI Error: {e}")

    # 2. Prefer Google Gemini (Recommended Free Tier)
    if GEMINI_API_KEY and gemini_model:
        try:
            prompt = f"""
You are 'The Pulse', a deeply empathetic and emotionally intelligent companion. 
Your goal is to provide a safe, warm, and human-like space for the user.

Guidelines:
- Understand the user's tone and current emotion: {emotion}.
- Acknowledge feelings first if the user is emotional.
- Respond with genuine warmth and empathy.
- Adjust your response length naturally—don't be the same length every time.
- Use the history below to remember past context and refer back to it.
- Ask thoughtful follow-up questions when appropriate.
- Avoid sounding robotic or like a machine.
- Never say you are an AI unless asked.

Conversation History:
{history_context}

User's Latest Message: {user_message}

The Pulse:"""
            
            response = gemini_model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.9,
                    max_output_tokens=1000
                )
            )
            if response and response.text:
                return response.text.strip()
        except Exception as e:
            print(f"Gemini Error: {e}")

    # 3. Hugging Face Fallback (Free, but can be slow/limited)
    if not HF_API_KEY:
        return fallback_response()

    history_text = ""
    for msg in history[-4:]:
        role = "User" if msg.role == "user" else "Assistant"
        history_text += f"{role}: {msg.content}\n"

    prompt = f"""
You are a highly empathetic AI mental health assistant.
User Message: {user_message}
Respond like a warm, caring human. Keep it short.
"""

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 120,
            "temperature": 0.9, # Increased for variety
            "do_sample": True,
            "top_p": 0.95
        }
    }

    try:
        response = requests.post(
            LLM_API,
            headers=headers,
            json=payload,
            timeout=15
        )
        if response.status_code == 200:
            result = response.json()
            # Handle list or dict response from HF
            if isinstance(result, list):
                text = result[0].get("generated_text", "")
            else:
                text = result.get("generated_text", "")
            
            # Clean up the response (remove prompt if present)
            if prompt in text:
                text = text.split(prompt)[-1]
            return text.strip() or fallback_response()
    except:
        pass
        
    return fallback_response()

# Fallback Response
def fallback_response():
    responses = [
        "I'm here for you. Tell me more about what's on your mind.",
        "I hear you, and I'm listening. How has this been affecting you lately?",
        "Thank you for sharing that with me. I'm here to support you in any way I can.",
        "That sounds like a lot to handle. I'm here if you want to talk more about it."
    ]
    import random
    return random.choice(responses)

# Crisis Detection
def check_crisis(message):
    crisis_keywords = [
        "suicide", "kill myself", "want to die",
        "end my life", "no reason to live"
    ]
    message = message.lower()
    return any(word in message for word in crisis_keywords)

# AI-Generated Weekly Insight
def generate_weekly_insight(user_id, emotions_list):
    """
    Generates a text summary of the user's weekly mood and provides helpful actions.
    """
    if GEMINI_API_KEY and gemini_model:
        try:
            emotion_summary = ", ".join([f"{e['emotion']} ({e['count']} times)" for e in emotions_list])
            prompt = f"Provide a 3-sentence empathetic insight for a user with this weekly mood: {emotion_summary}. Summarize trend, identify patterns, suggest one exercise."
            response = gemini_model.generate_content(prompt)
            if response and response.text:
                return response.text.strip()
        except Exception as e:
            print(f"Gemini Insight Error: {e}")

    if OPENAI_API_KEY and openai_client:
        try:
            emotion_summary = ", ".join([f"{e['emotion']} ({e['count']} times)" for e in emotions_list])
            messages = [
                {"role": "user", "content": f"Provide a 3-sentence empathetic insight for a user with this weekly mood: {emotion_summary}."}
            ]
            response = openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages, # type: ignore
                max_tokens=200
            )
            content = response.choices[0].message.content
            return content.strip() if content else "Focus on small wins today."
        except:
            pass

    return "Focus on small wins today. Your commitment to tracking your mood is helping you build better self-awareness."
