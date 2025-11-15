<div align="center">
  <br />
  
  <div>
    <img src="https://img.shields.io/badge/-Next.JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=black" alt="next.js" />
    <img src="https://img.shields.io/badge/-Vapi-white?style=for-the-badge&color=5dfeca" alt="vapi" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=white&logo=firebase&color=DD2C00" alt="firebase" />
  </div>

  <h1 align="center">PrepWise</h1>

  <h3 align="center">AI-Powered Job Interview Preparation Platform</h3>

  <p align="center">
    Practice real interview questions with AI voice agents and get instant feedback to ace your next job interview.
  </p>
</div>

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Project Structure](#project-structure)

## 🤖 Introduction

PrepWise is a comprehensive job interview preparation platform that leverages AI technology to help candidates practice and improve their interview skills. Built with Next.js, Firebase, and Vapi AI, the platform offers realistic interview simulations with voice-based interactions and detailed performance feedback.

## ✨ Features

- **AI-Generated Questions** - Automatically generate interview questions tailored to specific roles, experience levels, and tech stacks using Google Gemini AI
- **Voice Interviews** - Conduct realistic mock interviews with Vapi AI voice agents
- **Interview Scheduling** - Schedule interviews for future dates and times
- **Smart Time Management** - Automatic tracking of scheduled, incomplete, and completed interviews
- **Instant Feedback** - Get detailed AI-powered feedback on your performance across multiple categories
- **Firebase Authentication** - Secure email/password authentication
- **Interview History** - Track all your past interviews and review feedback
- **Responsive Design** - Fully responsive UI that works seamlessly across all devices
- **Modern UI/UX** - Sleek dark-themed interface with smooth animations

## ⚙️ Tech Stack

- **Frontend & Backend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: 
  - Google Gemini AI for question generation and feedback analysis
  - Vapi AI for voice interview functionality
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: shadcn/ui

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/en) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aloktyp/PrepWise.git
cd PrepWise
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Vapi AI Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_assistant_id

# Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

### Getting API Keys

- **Firebase**: Create a project at [Firebase Console](https://console.firebase.google.com/)
- **Google Gemini**: Get API key from [Google AI Studio](https://aistudio.google.com/)
- **Vapi AI**: Sign up at [Vapi Dashboard](https://vapi.ai/)

## 📁 Project Structure

```
PrepWise/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (root)/          # Main application pages
│   └── api/             # API routes
├── components/          # React components
│   ├── ui/             # UI components
│   └── ...             # Feature components
├── lib/
│   ├── actions/        # Server actions
│   └── utils.ts        # Utility functions
├── firebase/           # Firebase configuration
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## 🎯 How It Works

1. **Sign Up/Sign In** - Create an account or log in
2. **Create Interview** - Fill in job details (role, level, tech stack, type)
3. **Schedule** - Choose to start immediately or schedule for later
4. **Practice** - Review AI-generated questions or start voice interview
5. **Get Feedback** - Receive detailed performance analysis
6. **Improve** - Review feedback and retake interviews to improve

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

---

<div align="center">
  <br />
  <p>Made with ❤️ by <strong>Alok</strong></p>
</div>
