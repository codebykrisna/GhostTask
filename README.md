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
