# 🌱 GreenBin

### Smart Waste. Cleaner Future.

**GreenBin** is an AI-powered smart waste management platform that uses **Computer Vision** to identify waste, classify it into appropriate categories, and provide users with smart disposal and recycling recommendations.

The platform combines **AI, waste management, gamification, and community participation** to make waste segregation simple and accessible.

---

## 🚀 Problem

Improper waste segregation causes recyclable materials to be mixed with organic, hazardous, and general waste.

This leads to:

* Increased landfill waste
* Reduced recycling efficiency
* Environmental pollution
* Higher waste-management costs
* Improper disposal of e-waste and hazardous materials

Many people also don't know which bin a particular item belongs to or how it should be recycled.

---

## 💡 Solution

GreenBin provides an intelligent solution:

```text
📸 Scan Waste
      ↓
🤖 AI Detection
      ↓
♻️ Waste Classification
      ↓
🗑️ Correct Bin Recommendation
      ↓
🌱 Disposal Guidance
      ↓
🏆 Eco Points
```

Users can simply upload or capture an image of waste, and GreenBin provides an AI-powered recommendation for responsible disposal.

---

## ✨ Features

### 🤖 AI Waste Scanner

Upload or capture a waste image and let AI identify the item.

Supported categories include:

* 🧴 Plastic
* 📄 Paper
* 🍾 Glass
* 🔩 Metal
* 🥦 Organic Waste
* 🔋 E-Waste
* ☣️ Hazardous Waste
* 🗑️ General Waste

---

### 🗑️ Smart Bin Recommendation

After identifying the waste, GreenBin provides:

* Waste category
* AI confidence score
* Recommended bin
* Recyclability status
* Disposal instructions
* Reuse suggestions

Example:

```text
Detected Item: Plastic Bottle
Category: Plastic
Confidence: 96%

Recommended Bin:
♻️ Recyclable Waste

Recyclable:
✓ Yes

Eco Points:
+10
```

---

### 📊 Eco Dashboard

Users can track:

* Total waste scans
* Recyclable waste
* Organic waste
* E-waste
* Eco Points
* Recycling progress
* Waste-category statistics

---

### 🏆 Eco Points & Gamification

Users earn points for sustainable activities.

| Activity                  | Points |
| ------------------------- | -----: |
| Correct waste segregation |    +10 |
| E-waste report            |    +20 |
| Community report          |    +15 |
| EcoLearn completion       |     +5 |
| Daily challenge           |    +50 |

### 🌱 Levels

* Eco Beginner
* Green Explorer
* Eco Champion
* Planet Protector

---

### 🏆 Leaderboard

Users can compete through:

* Weekly rankings
* Monthly rankings
* All-time rankings
* College rankings
* Community rankings

---

### 📚 EcoLearn

Educational content about:

* Waste segregation
* Plastic recycling
* Paper recycling
* E-waste disposal
* Composting
* Reuse vs recycling
* Sustainable habits

---

### 📍 Recycling Center Locator

Find nearby:

* Recycling centers
* E-waste collection centers
* Composting facilities
* Waste collection points

Users can view:

* Location
* Address
* Accepted waste types
* Opening hours
* Distance

---

### 🚨 Community Waste Reporting

Users can report:

* Overflowing bins
* Illegal dumping
* Uncollected waste
* Plastic accumulation
* E-waste dumping

Report workflow:

```text
Submitted
    ↓
Under Review
    ↓
Assigned
    ↓
Resolved
```

---

### 👨‍💼 Admin Dashboard

Administrators can monitor:

* Total users
* Waste scans
* Waste categories
* Community reports
* Recycling activity
* Pending reports
* Resolved reports

---

# 🧠 AI Architecture

GreenBin follows this workflow:

```text
User Image
    ↓
Image Preprocessing
    ↓
Computer Vision Model
    ↓
Object Detection / Classification
    ↓
Waste Category
    ↓
Confidence Score
    ↓
Recommendation Engine
    ↓
Disposal Recommendation
```

Possible AI models:

* YOLO
* MobileNet
* EfficientNet
* TensorFlow
* PyTorch

The AI layer is designed to be modular so that the model can be upgraded without changing the entire application.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │     User         │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React Frontend   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Node.js / API    │
                    └──────┬─────┬─────┘
                           │     │
                 ┌─────────┘     └─────────┐
                 ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │ AI Service      │       │ MongoDB         │
        │ Python/FastAPI  │       │ Database        │
        └─────────────────┘       └─────────────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Waste Prediction│
        └─────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Lucide React
* Recharts

## Backend

* Node.js
* Express.js

## AI

* Python
* FastAPI
* TensorFlow / PyTorch
* YOLO / MobileNet / EfficientNet

## Database

* MongoDB
* MongoDB Atlas

## Authentication

* JWT
* bcrypt

## Maps

* Google Maps API
* OpenStreetMap

## Deployment

* Vercel
* Render / Railway
* AWS
* MongoDB Atlas

---

# 📂 Project Structure

```text
GreenBin/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── ai-service/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── main.py
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/greenbin.git
cd greenbin
```

---

## 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## 4. AI Service Setup

```bash
cd ai-service

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux/macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the AI service:

```bash
uvicorn main:app --reload
```

---

# 🔐 Environment Variables

Create a `.env` file in the backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=http://localhost:8000
```

For frontend:

```env
VITE_API_URL=http://localhost:5000
```

Never commit `.env` files to GitHub.

---

# 🔌 API Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

## Waste

```text
POST /api/waste/anal
```
