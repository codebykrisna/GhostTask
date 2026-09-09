# 👻 GhostTask — Full-Stack Task Manager

A modern, responsive full-stack task management application built with **Angular**, **Spring Boot**, and **MySQL**.

GhostTask provides a clean productivity dashboard where users can create, manage, prioritize, search, filter, edit, complete, and delete tasks.

🔗 **Live Demo:** https://ghosttask-frontend.onrender.com/

---

## ✨ Features

- 📋 Create and manage tasks
- ✏️ Edit task title and description
- ✅ Mark tasks as completed
- 🗑️ Delete tasks with confirmation
- ⭐ Set task priority — High, Medium, Low
- 🔍 Search tasks by title or description
- 🎯 Filter tasks by:
  - All
  - Active
  - Completed
  - Important
- 📊 Dynamic productivity progress indicator
- 🌙 Dark neon/glassmorphism UI
- 📱 Responsive design for desktop and mobile
- ⚡ RESTful backend API
- 🛡️ Backend request validation
- 🚨 Global exception handling
- 💾 Persistent MySQL database storage
- ☁️ Production deployment with Docker and Render

---

## 🖥️ Live Application

**Frontend:**  
https://ghosttask-frontend.onrender.com/

**Backend API:**  
https://ghosttask-backend.onrender.com/

---

## 🛠️ Tech Stack

### Frontend

- Angular
- TypeScript
- HTML5
- CSS3
- Angular HttpClient
- RxJS

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Bean Validation
- Maven

### Database

- MySQL 8

### Deployment

- GitHub
- Docker
- Render
- Aiven MySQL

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      User Browser    │
                    └──────────┬───────────┘
                               │
                               │ HTTPS
                               ▼
                    ┌──────────────────────┐
                    │   Angular Frontend   │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                               │ JPA / Hibernate
                               ▼
                    ┌──────────────────────┐
                    │      MySQL DB        │
                    │       Aiven          │
                    └──────────────────────┘


📁 Project Structure

GhostTask/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/krishna/taskmanager/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── entity/
│   │   │   │       ├── exception/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── Dockerfile
│   ├── pom.xml
│   └── mvnw
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── services/
    │   │   ├── app.component.ts
    │   │   ├── app.component.html
    │   │   └── app.component.css
    │   │
    │   ├── styles.css
    │   └── main.ts
    │
    ├── angular.json
    ├── package.json
    └── package-lock.json

🧠 Backend Architecture

The backend follows a layered architecture:

Controller
    ↓
Service
    ↓
Repository
    ↓
Database
Controller

Handles HTTP requests and API endpoints.

Service

Contains business logic and task operations.

Repository

Uses Spring Data JPA to communicate with MySQL.

Entity

Represents the Task database model.

DTO

TaskRequest handles incoming request data and validation.

Exception Handling

A global exception handler provides consistent responses for:

Task not found
Invalid request data
🗄️ Database

GhostTask uses MySQL with Hibernate/JPA.

The main Task entity contains:

Field	Type	Description
id	Long	Unique task identifier
title	String	Task title
description	String	Task description
completed	Boolean	Completion status
priority	String	HIGH / MEDIUM / LOW

Hibernate automatically manages the database schema using:

spring.jpa.hibernate.ddl-auto=update
🔐 Environment Variables

Database credentials are not stored in the repository.

The backend uses environment variables:

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

Required variables:

DB_URL
DB_USERNAME
DB_PASSWORD

For production deployment, these values should be configured through the hosting platform's environment-variable settings.

🚀 Running Locally
Prerequisites

Make sure you have installed:

Java 21
Maven
Node.js
Angular CLI
MySQL
1. Clone the repository
git clone https://github.com/codebykrisna/GhostTask.git
cd GhostTask
Backend Setup

Navigate to the backend:

cd backend

Configure your MySQL database and environment variables.

Example:

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update

server.port=${PORT:8080}

Run the backend:

./mvnw spring-boot:run

On Windows:

mvnw.cmd spring-boot:run

The backend will run on:

http://localhost:8080
Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start Angular:

ng serve

Open:

http://localhost:4200
🐳 Docker Deployment

The Spring Boot backend includes a Dockerfile for production deployment.

Build the backend image:

docker build -t ghosttask-backend ./backend

Run the container:

docker run -p 8080:8080 ghosttask-backend

Production deployment is currently hosted using Render.

☁️ Deployment

GhostTask is deployed using:

GitHub
   ↓
Render
   ├── Angular Static Site
   │
   └── Spring Boot Docker Web Service
          ↓
       Aiven MySQL

The production backend connects to MySQL using environment variables, keeping database credentials outside the source code.

🧪 Testing

The application has been tested end-to-end in production, including:

Task creation
Task retrieval
Task editing
Priority changes
Task completion
Task deletion
Search
Filtering
Browser refresh
Database persistence
