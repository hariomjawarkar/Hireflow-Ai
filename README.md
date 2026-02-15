# HireFlow – AI-Powered Semantic Intelligence 🚀

HireFlow is a next-generation, AI-driven recruitment platform that uses semantic intelligence to bridge the gap between technical talent and world-class product teams.

## 🏗️ System Architecture
- **Frontend**: React 18 + Vite (Premium Glassmorphic UI)
- **Primary Backend**: Spring Boot 3 (Java 17) + MySQL
- **AI Engine**: FastAPI (Python 3.13) + BERT (Sentinel Transformers)

---

## 🚦 Getting Started: Run Commands

To run the full project, you need to start three separate components in order.

### 1️⃣ Step 1: Python AI Semantic Engine
This service provides the "brains" of the platform, handling semantic matching and job recommendations.

```bash
# Navigate to the engine directory
cd hireflow-ai-engine

# Install dependencies
pip install -r requirements.txt

# Start the AI Server
python main.py
```
*The engine runs on `http://localhost:8000`*

---

### 2️⃣ Step 2: Spring Boot Backend
The core platform logic, user management, and database integration.

**Prerequisites:** Ensure your MySQL service is running and you have created a database named `hireflow`.

```bash
# Navigate to the backend directory
cd hireflow-ai-backend/hireflow-ai-backend

# Build the project (requires Maven)
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```
*The API runs on `http://localhost:8080`*

---

### 3️⃣ Step 3: React Frontend
The high-fidelity user interface.

```bash
# Navigate to the frontend directory
cd hireflow-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```
*The dashboard will be available at `http://localhost:5173`*

---

## 🛠️ Key Features
- **AI Resume matching**: BERT-powered semantic analysis of candidates vs requirements.
- **Executive Intelligence**: Real-time admin analytics with PowerBI-style reporting.
- **Glassmorphic UI**: High-end visual design with dark mode and atmospheric effects.
- **Smart Recommendations**: Concept-based matching (e.g., matching "React" skills with "Frontend" roles automatically).

## 📊 Infrastructure Status
| Component | Status | Port |
| :--- | :--- | :--- |
| **AI Engine** | Python 3.13 | 8000 |
| **Core API** | Java 17 | 8080 |
| **Frontend** | React/Vite | 5173 |

---
*Built for the next generation of technical capital.*


Technologies Used: Java 17, Spring Boot, Python 3.10+, FastAPI, React v18, MySQL, Sentence Transformers (MiniLM), JWT, Axios, Tika.