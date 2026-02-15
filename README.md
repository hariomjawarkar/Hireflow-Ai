# HireFlow – AI-Powered Talent Intelligence 🚀

![HireFlow Banner](./hireflow_github_banner.png)

HireFlow is a next-generation, AI-driven recruitment platform that uses semantic intelligence to bridge the gap between technical talent and world-class product teams.

## 🏗️ System Architecture
- **Frontend**: React 18 + Vite (Premium Glassmorphic UI)
- **Backend**: Spring Boot 3 (Java 17) + MySQL
- **Intelligence**: Built-in AI logic for resume analysis and semantic matching.

---

## 🚦 Getting Started: Run Commands

To run the project, follow these two steps.

### 1️⃣ Step 1: Spring Boot Backend
The core platform logic, user management, and database integration.

**Prerequisites:** 
- Ensure your MySQL service is running.
- Create a database named `hireflow`.

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

### 2️⃣ Step 2: React Frontend
The high-fidelity user interface with premium glassmorphism.

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
- **AI Talent Matching**: Intelligent analysis of candidate profiles against job requirements.
- **Executive Intelligence**: Real-time admin analytics with sophisticated reporting.
- **Glassmorphic UI**: High-end visual design with dark mode and atmospheric effects.
- **Role-Based Access**: Specialized dashboards for Admins and Job Seekers.

## 📊 Infrastructure Status
| Component | Status | Port |
| :--- | :--- | :--- |
| **Core API** | Java 17 / Spring Boot 3 | 8080 |
| **Frontend** | React 18 / Vite | 5173 |
| **Database** | MySQL | 3306 |

---
*Built for the next generation of technical capital.*

**Technologies Used:** Java 17, Spring Boot, React v18, MySQL, JWT, Axios, Glassmorphism CSS.