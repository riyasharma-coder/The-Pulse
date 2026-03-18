# 🧠 The Pulse — AI Mental Health Companion

> *A safe, intelligent, and real-time emotional support system powered by AI.*

---

## 🌟 Overview

**The Pulse** is an AI-powered mental wellness application designed to help users:

* Express emotions freely 💬
* Track mental health trends 📊
* Receive intelligent emotional support 🤖

It combines **real-time chat, mood tracking, and AI-driven insights** to create a safe digital companion.

---

## 🎯 Problem Statement

Mental health support is often:

* ❌ Expensive
* ❌ Inaccessible
* ❌ Stigmatized

**The Pulse solves this by providing a private, AI-powered emotional support system available 24/7.**

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

### 📱 Frontend

* Kotlin
* Jetpack Compose
* Material 3 UI

### ⚙️ Backend

* FastAPI (Python)
* REST APIs
* Uvicorn server

### 🤖 AI / ML

* Hugging Face Transformers (Planned)
* LLM Integration (Planned)

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

## 🧠 Future Scope

* 🔥 Deploy backend on cloud (AWS)
* 🔥 Real-time database integration
* 🔥 Personalized AI therapy
* 🔥 Wearable integration (heart rate, stress levels)
* 🔥 Multilingual support

---

## 🏆 Hackathon Impact

* Improves accessibility to mental health support
* Reduces stigma via private AI interaction
* Scalable and deployable globally

---

## 👩‍💻 Developer

**Riya Sharma**

* Android Developer
* AI Enthusiast

GitHub: https://github.com/riyasharma-coder

---

## ❤️ Contributing

Contributions are welcome!
Feel free to fork, improve, and submit PRs.

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
