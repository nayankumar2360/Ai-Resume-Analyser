# 🤖 AI Resume Analyzer & Job Recommender

An AI-powered resume analysis tool built with the MERN stack that provides ATS evaluation, structured skill extraction, and intelligent job role recommendations.

## ✨ Features

- **PDF/DOCX Parsing** — Upload resumes in PDF or DOCX format
- **ATS Score Evaluation** — Get a comprehensive ATS compatibility score (0-100) with breakdown
- **Skill Extraction** — Automatic categorization of technical, soft, tools, and certifications
- **Job Recommendations** — AI-powered job role suggestions with match percentages
- **Missing Skills Analysis** — Identify skill gaps for each recommended role
- **Analysis History** — Save and revisit past resume analyses

## 🛠 Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Framer Motion, Recharts
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **AI:** Google Gemini API (gemini-1.5-flash)
- **Auth:** JWT + bcrypt

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API Key ([Get one here](https://aistudio.google.com/))

### Setup

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd "Ai Resume Analyzer"
   ```

2. **Backend setup**
   ```bash
   cd server
   npm install
   # Create .env file with:
   # PORT=5000
   # MONGO_URI=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret
   # GEMINI_API_KEY=your_gemini_api_key
   npm run dev
   ```

3. **Frontend setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

## 📁 Project Structure

```
├── client/          # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── ...
├── server/          # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
└── README.md
```

## 📜 License

MIT
