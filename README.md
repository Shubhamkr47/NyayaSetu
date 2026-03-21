# ⚖️ NyayaSetu – AI Legal Research Platform

> Cross-lingual AI-powered legal research for Indian courts. Search 4.65 crore cases across 22 languages.

---

##  Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set your Gemini API key

Create a `.env` file in the root of the project:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

> Get your FREE API key from https://aistudio.google.com/app/apikey

### 3. Run locally
```bash
npm run dev
```

Open http://localhost:5173

---

## 📦 Build for Production
```bash
npm run build
```
Output goes to the `dist/` folder.

---

## 🌐 Deploy to Vercel

### Option A – Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B – GitHub + Vercel Dashboard
1. Push this project to a GitHub repo
2. Go to https://vercel.com → New Project → Import your repo
3. Add environment variable: `VITE_GEMINI_API_KEY` = your key
4. Click Deploy 

---

## 🌐 Deploy to Netlify

### Option A – Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --build
```

### Option B – Netlify Dashboard
1. Push to GitHub
2. Go to https://app.netlify.com → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_GEMINI_API_KEY` = your key
6. Deploy 

---

## 🗂️ Project Structure

```
nyayasetu/
├── index.html
├── vite.config.js
├── package.json
├── .env                    
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.module.css
    ├── index.css
    ├── data/
    │   └── cases.js        ← sample case data
    └── components/
        ├── Header.jsx
        ├── Header.module.css
        ├── Sidebar.jsx
        ├── Sidebar.module.css
        ├── SplitView.jsx
        ├── SplitView.module.css
        ├── Chat.jsx
        ├── Chat.module.css
        ├── StatsBar.jsx
        └── StatsBar.module.css
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 Split View | Original judgment (left) + AI-structured English summary (right) |
| 💬 Legal Chat | Ask questions in natural language, get verified case results |
| 🌐 Multilingual | Cases in Marathi, Tamil, Hindi, Malayalam, and more |
| ✅ Citation Verified | AI confidence score + verified badge on every summary |
| 🔍 Smart Search | Filter by court type, language, section, keyword |
| ⚡ Fast | Average search response under 2 seconds |

---

## 🛠️ Adding More Cases

Edit `src/data/cases.js` and add more entries following the same structure:

```js
{
  id: 5,
  name: 'Case Name v. Respondent',
  court: 'Court Name',
  year: '2024',
  section: 'IPC §XYZ',
  lang: 'hi',           // Language code: hi, mr, ta, te, ml, bn, en
  langLabel: 'Hindi',
  type: 'high',         // supreme | high | district
  tags: ['Tag1', 'Tag2'],
  relevance: 90,
  originalText: `...original text in the source language...`,
  issues: ['Issue 1', 'Issue 2'],
  sections: ['IPC §XYZ', 'CrPC §ABC'],
  reasoning: 'Summary of the judge\'s reasoning...',
  verdict: 'Final order and outcome...',
  confidence: 95,
}
```

---
