# 🧠 The Pulse — AI Mental Health Companion

> *A safe, intelligent, and real-time emotional support system powered by AI.*

---

## 🌟 Overview

**The Pulse** is an AI-powered mental wellness application designed to help users:

* Express emotions freely 💬
* Track mental health trends 📊
* Receive intelligent emotional support 🤖

It combines **real-time chat, mood tracking, and AI-driven insights** to create a safe and empathetic digital companion.

---

## 🎯 Problem Statement

Mental health support today is often:

* ❌ Expensive
* ❌ Inaccessible
* ❌ Stigmatized

Many individuals hesitate to seek help due to fear of judgment or lack of resources.

👉 **The Pulse solves this by providing a private, AI-powered emotional support system available 24/7.**

---

## 📄 Research & Innovation

This project is backed by research work, making it more than just an application.

### 🧠 Research Contribution

* **Ritika Raghav**
* Focus: AI-driven mental health support and emotion analysis
* Explores how conversational AI can assist users in real-time emotional expression and guidance

📌 *This research forms the foundation of The Pulse and guides its AI-driven features such as mood detection and emotional support responses.*

---

## 🚀 Features

### 💬 AI Emotional Chat

* Real-time conversation with AI
* Context-aware responses
* Typing animation for realistic experience

### 😊 Mood Tracking

* Track emotions (Happy, Sad, Neutral, Stressed)
* Store and analyze mood history
* Visual feedback on emotional trends

### 🎤 Voice Input (Planned)

* Speak instead of typing
* Faster emotional expression

### 🎨 Emotion-Based UI

* UI dynamically adapts to user's mood
* Enhances emotional connection

### 🧠 AI Mood Detection (Upcoming)

* Detect mood from chat automatically
* Intelligent sentiment analysis using LLM

---

## 🏗️ Tech Stack

### 📱 Frontend (Web)
* React with TypeScript
* Vite for fast development
* Tailwind CSS for modern UI
* Recharts for mood analytics
* Lucide React for iconography

### 📱 Frontend (Mobile)
* Kotlin
* Jetpack Compose
* Material 3 UI

### ⚙️ Backend
* FastAPI (Python)
* SQLite with SQLAlchemy for data persistence
* AI Engines (Automated Fallback):
  1. **OpenAI GPT-3.5/4**: Best emotional understanding (Paid)
  2. **Google Gemini 1.5 Flash**: High quality, very generous free tier (Recommended Free Option)
  3. **Hugging Face (Mistral)**: Fully free fallback

### 🤖 AI / ML
* Emotion Detection: `j-hartmann/emotion-english-distilroberta-base`
* AI Assistant: Multi-model support with Gemini/OpenAI/Mistral

---

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
# Copy .env.example to .env and add your HF_API_KEY
cp .env.example .env
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```
The-Pulse/
│
├── backend/          # FastAPI backend
│   ├── main.py
│   ├── mood.py
│
├── android-app/      # Android application
│   └── (Jetpack Compose code)
│
├── README.md
└── .gitignore
```

---

## ⚡ Getting Started

### 🔹 Backend Setup

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

API Docs:

```
http://127.0.0.1:8000/docs
```

---

### 🔹 Android Setup

1. Open `android-app` in Android Studio
2. Run on Emulator / Device

---

## 🔌 API Endpoints

### POST `/mood`

Save user mood

```json
{
  "mood": "Happy"
}
```

### GET `/mood`

Retrieve mood history

---

## 🏆 Hackathon Impact

* Improves accessibility to mental health support
* Provides stigma-free emotional interaction
* Scalable AI-driven solution
* Research-backed innovation

---

## 🧠 Future Scope

* 🔥 Deploy backend on cloud (AWS)
* 🔥 Real-time database integration
* 🔥 Personalized AI therapy
* 🔥 Wearable integration (heart rate, stress levels)
* 🔥 Multilingual support

---

## 👩‍💻 Team

| Name              | Role                                     | GitHub                              |
| ----------------- | ---------------------------------------- | ----------------------------------- |
| **Riya Sharma**   | Android Developer, AI Integration        | https://github.com/riyasharma-coder |
| **Ritika Raghav** | Frontend Developer, Research Contributor | https://github.com/ritikaraghav     |

---

## ❤️ Contributing

Contributions are welcome!
Feel free to fork, improve, and submit pull requests.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it

---

> *“Your mental health matters. The Pulse listens.”* 💜
