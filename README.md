<img width="1741" height="866" alt="Screenshot 2026-08-13 165849" src="https://github.com/user-attachments/assets/0907278d-5674-423d-babd-5c24c8f02a65" /># 🤖 AI Resume Analyzer & Job Recommender

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini_3.5_Flash-8E44AD.svg)](https://aistudio.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An AI-powered web application built using the **MERN Stack** (MongoDB, Express, React, Node.js), **Tailwind CSS**, and **Google Gemini AI API**. The system evaluates resumes against ATS standards, extracts categorized skills, recommends relevant career job roles, and highlights missing skill gaps per role.

---

website link -- https://ai-resume-analyser-r31n.vercel.app/

## ✨ Features

- 📄 **PDF & DOCX Support**: Seamless text parsing from PDF (`pdf-parse`) and Word (`mammoth`) documents.
- 🎯 **ATS Compatibility Evaluation**: Calculates an overall ATS score (0-100) along with detailed sub-scores for Formatting, Content, and Keyword density.
- 💡 **Actionable Feedback**: Generates tailored resume improvement tips, top strengths, and weaknesses.
- 🛠️ **Categorized Skill Extraction**: Automatically tags and categorizes candidate skills into Technical, Soft Skills, Tools/Platforms, and Certifications.
- 🚀 **AI Job Recommendations**: Identifies 5-8 matching job roles with match percentage, matching skills, missing skills, and recommended learning resources.
- 📜 **Analysis History**: Secure dashboard to review, track, and manage past resume evaluations.
- 🔒 **Secure Authentication**: Full JWT-based user registration and authentication with encrypted passwords (`bcryptjs`).
- 🎨 **Modern Dark UI/UX**: Premium glassmorphism design system built with Tailwind CSS, Framer Motion animations, and Recharts radar visualization.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS v3 (Glassmorphism & animated dark theme)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Data Visualization:** Recharts (Radar Chart & Score Gauges)
- **HTTP Client:** Axios with interceptors
- **Notifications:** React Hot Toast

### **Backend**
- **Runtime:** Node.js & Express.js
- **Database:** MongoDB Atlas & Mongoose ORM
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **File Upload & Parsing:** Multer, `pdf-parse`, `mammoth`
- **AI Engine:** `@google/generative-ai` (`gemini-3.5-flash`)

---

## 🚀 Quick Start Guide

### **1. Prerequisites**
- Node.js 18+ installed on your system
- MongoDB Atlas database connection URI
- Google Gemini API Key ([Get a free key from Google AI Studio](https://aistudio.google.com/))

### **2. Clone Repository**
```bash
git clone https://github.com/nayankumar2360/Ai-Resume-Analyser.git
cd Ai-Resume-Analyser
```

### **3. Backend Setup**
Navigate to the `server/` folder and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Run the backend development server:
```bash
npm run dev
```

### **4. Frontend Setup**
In a new terminal window, navigate to the `client/` folder and install dependencies:
```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
```

Open your browser at **`http://localhost:5173`** 🎉

---

## 📂 Project Architecture

```
Ai-Resume-Analyser/
├── client/                      # React Frontend (Vite)
│   ├── src/
│   │   ├── components/          # Reusable UI components (Navbar, FileUpload, ScoreGauge, JobCard, etc.)
│   │   ├── context/             # AuthContext state management
│   │   ├── pages/               # LandingPage, LoginPage, RegisterPage, DashboardPage, AnalysisPage, HistoryPage
│   │   ├── services/            # Axios API client setup
│   │   ├── App.jsx              # Main router configuration
│   │   ├── index.css            # Tailwind global design system & glassmorphism
│   │   └── main.jsx             # React entry point
│   ├── tailwind.config.js       # Custom colors, animations & keyframes
│   └── vite.config.js
│
├── server/                      # Express Node.js Backend
│   ├── config/                  # Database connection (db.js with DNS fallback)
│   ├── controllers/             # Auth & Resume analysis controllers
│   ├── middleware/              # Auth protection & Multer upload filter
│   ├── models/                  # Mongoose schemas (User.js, Resume.js)
│   ├── routes/                  # API routes (/api/auth, /api/resume)
│   ├── services/                # Text parser & Gemini AI service integration
│   ├── utils/                   # Structured JSON prompt templates
│   └── server.js                # Express app entry point
│
└── README.md
```

---

## 📡 API Endpoints

### **Auth Routes (`/api/auth`)**
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Authenticate user & get JWT |
| `GET` | `/api/auth/me` | Private | Get authenticated user profile |

### **Resume Routes (`/api/resume`)**
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/resume/analyze` | Private | Upload PDF/DOCX resume & run full AI pipeline |
| `GET` | `/api/resume/history` | Private | Fetch list of past resume analyses |
| `GET` | `/api/resume/:id` | Private | Get full evaluation data for a specific analysis |
| `DELETE` | `/api/resume/:id` | Private | Remove an evaluation from history |

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
