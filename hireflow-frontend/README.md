# HireFlow Frontend: Next-Gen AI Talent Acquisition 💎

HireFlow is a premium, AI-driven recruitment platform designed to bridge the gap between top-tier talent and forward-thinking companies. This repository contains the high-performance React frontend, featuring a state-of-the-art glassmorphic UI and deep AI integrations.

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```

## 🏗️ Technical Stack

- **Core**: [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- **State Management**: React Hooks (useMemo, useCallback, custom hooks)
- **Styling**: Vanilla CSS3 + [Bootstrap 5.3](https://getbootstrap.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Visualization**: [Chart.js 4](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Real-time**: [STOMP.js](https://stomp-js.github.io/stomp-websocket/) + [SockJS](https://github.com/sockjs/sockjs-client) (WebSocket Notifications)
- **AI Integration**: [Google Gemini AI](https://aistudio.google.com/)

## 🔗 System Architecture

The frontend acts as an intelligent orchestration layer connecting to:
1. **Java Core API**: `http://localhost:8081/api` (Spring Boot)
2. **Python AI Engine**: Integrated via Core API for job matching and resume analysis.
3. **Gemini Direct**: Client-side integration for real-time interview screening and roadmaps.

## 🎨 Professional Features

### 🤖 AI Assistant (HireFlow Intelligence)
- **Technical Screening**: Automated, role-specific interview conduction with real-time feedback.
- **Career Roadmaps**: Personalized 4-week learning paths based on skill gap analysis.
- **Resume Insight**: Deep analysis of PDF resumes for technical alignment scoring.

### 📊 Advanced Analytics
- **Multi-Role Dashboards**: Specialized views for Administrators, Recruiters, and Candidates.
- **PowerBI-Style Reports**: Real-time platform metrics, including recruiter funnel analysis and success trends.
- **Skill Distribution**: Dynamic Radar charts visualizing candidate technical proficiency vs. market average.

### 💎 Premium UI/UX
- **Glassmorphic Design**: Modern, semi-transparent interface with high-fidelity blur effects.
- **Dynamic Themes**: Interactive components with atmospheric background transitions.
- **Real-time Notifications**: Instant alerts for job updates, interview requests, and platform events.
- **PDF Export**: Generate professional technical reports and roadmaps on-the-fly.

## 🛠️ Project Structure
- `/src/api`: Centralized API services and Axios interceptors for JWT security.
- `/src/components`: Reusable UI components including the advanced AI Chatbot.
- `/src/hooks`: Custom React logic for WebSockets and UI state management.
- `/src/pages`: Feature-rich modules (Job Market, Admin Control, Report Hub, etc.).
- `/public/sw.js`: Optimized Service Worker for asset caching and performance.

---
*Built with precision for the future of work.*
