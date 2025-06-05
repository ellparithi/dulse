# DULSE

**Dulse** is a privacy-first, AI-powered outreach assistant that generates personalized LinkedIn messages and cold emails based on your resume and goals — all locally on your machine, with no API costs or cloud dependencies.

---

## 🔍 Features

-  **Local LLM-Powered Generation** – Runs using [Ollama](https://ollama.com) + `phi3` on your MacBook M2 (or similar Apple Silicon).
-  **Resume-Aware Messaging** – Accepts PDF resumes or prompt inputs to personalize messages.
-  **Flexible Use Cases** – Supports job inquiry, referral, coffee chat, or mentorship goals.
-  **LinkedIn / Email Format** – Outputs 2–3 messages for both formats, with retry & copy options.
-  **No APIs Required** – 100% local: no OpenAI/Gemini API keys needed.

---

##  Tech Stack

| Frontend              | Backend             | AI Layer        |
|-----------------------|---------------------|------------------|
| React + TypeScript    | Node.js + Express   | Ollama + Phi-3   |
| TailwindCSS           | REST API            | Local model call |

---

##  Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ellparithi/dulse.git
cd dulse
```

### 2. Set up frontend

```bash
cd client
npm install
npm run dev
```

### 3. Set up backend

In another terminal tab:

```bash
cd server
npm install
node index.js
```

### 4. Install Ollama & Pull a Model

```bash
brew install ollama
ollama run phi3
```

---

## ✨ How It Works

1. Upload your resume or fill out a prompt.
2. Choose the tone, goal, and recipient details.
3. Dulse generates personalized outreach messages using a local LLM.
4. You can preview, edit, copy, or retry messages instantly.

---

##  Status

MVP complete. Fully functional locally. Future roadmap includes:
- Resume parsing for context auto-fill
- Editable output + message history
- Browser extension (LinkedIn/Gmail overlay)

---

##  License

MIT © 2025 Elamparithi Elango

---

##  Author

**Elamparithi Elango**  
> Building private, personal, AI-native tools that respect user ownership and run locally.
