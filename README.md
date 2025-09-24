# 🧠 My AI Chatbot

A modern AI-powered chatbot with a sleek interface that connects to LM Studio for local AI model inference. Built with modern web technologies and a focus on user experience.

## � Tech Stack

### Frontend
- ⚛️ **Next.js 13+** with App Router
- 💅 **Tailwind CSS** for styling
- 📱 Responsive design with mobile-first approach
- 🔄 Real-time chat interface with loading states

### Backend
- 🐍 **Python + FastAPI** for high-performance API
- 🤖 **LM Studio** integration for local LLM inference
- 🔌 RESTful API endpoints for chat functionality

## 🛠️ Setup Instructions

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd my-chatbot-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r ../docs/requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   Backend API will be available at `http://localhost:8000`

### LM Studio Setup
1. Download and install [LM Studio](https://lmstudio.ai/)
2. Load your preferred local LLM model
3. Start the local inference server in LM Studio
4. The backend will automatically connect to LM Studio's API

## 🎯 Features
- 💬 Real-time chat interface
- ⚡️ Fast responses using local LLM
- 🎨 Modern and clean UI design
- 🔄 Loading states and error handling
- 📱 Fully responsive on all devices

## 🔧 Configuration
- Frontend API URL: `http://localhost:8000` (configurable in `page.tsx`)
- Backend Server: Runs on port 8000
- LM Studio: Default configuration uses local inference server

## 📝 Development Notes
- Uses TypeScript for type safety
- Implements modern React patterns with hooks
- Error handling for backend connectivity
- Clean and maintainable code structure

## 🚀 Deployment
- Frontend: Ready for deployment on Vercel
- Backend: Can be deployed to any Python-compatible hosting
- Ensure LM Studio server is accessible from your backend deployment

## 📄 License
This project is MIT licensed. Feel free to use it as a starting point for your own chatbot applications.
