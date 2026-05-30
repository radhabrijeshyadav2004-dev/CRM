# Support CRM System

A full-stack Customer Support Ticketing CRM built using the MERN stack. This application enables support teams to create, track, manage, and update customer support tickets through a clean and intuitive web interface.

## 🚀 Live Demo

Frontend: [Add Deployment URL]

Backend API: [Add Deployment URL]

## 📂 GitHub Repository

[Add Repository URL]

---

## 📖 Project Overview

This project was developed as part of a hiring assessment to demonstrate full-stack development skills, API design, database modeling, frontend development, and deployment.

The system allows support teams to:

- Create customer support tickets
- View all tickets
- Search tickets instantly
- Filter tickets by status
- Update ticket status
- Add notes and comments
- Track ticket history

---

## ✨ Features

### Ticket Management

- Create support tickets with customer details
- Auto-generated Ticket IDs
- Store ticket creation timestamps

### Search & Filtering

Search by:

- Ticket ID
- Customer Name
- Customer Email
- Subject
- Description

Filter tickets by status:

- Open
- In Progress
- Closed

### Ticket Updates

- View complete ticket details
- Update ticket status
- Add support notes/comments
- Track ticket activity

### Dashboard

- Total Tickets
- Open Tickets
- In Progress Tickets
- Closed Tickets

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Frontend: Vercel
- Backend: Render

---

## 📁 Project Structure

```text
project-root/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── public/
│
└── README.md
```

---

## 🔌 API Endpoints

### Create Ticket

```http
POST /api/tickets
```

Request Body:

```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "subject": "Login Issue",
  "description": "Unable to login to account"
}
```

---

### Get All Tickets

```http
GET /api/tickets
```

Optional Query Parameters:

```http
/api/tickets?status=Open

/api/tickets?search=john
```

---

### Get Single Ticket

```http
GET /api/tickets/:ticketId
```

Example:

```http
GET /api/tickets/TKT-1
```

---

### Update Ticket

```http
PUT /api/tickets/:ticketId
```

Request Body:

```json
{
  "status": "Closed",
  "note": "Issue resolved successfully"
}
```

---

## 🗄️ Database Schema

### Ticket

```javascript
{
  ticketId: String,
  customerName: String,
  customerEmail: String,
  subject: String,
  description: String,
  status: String,
  notes: [
    {
      text: String,
      createdAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>

cd support-crm-system
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 📈 Future Improvements

- User Authentication
- Role-Based Access Control
- Email Notifications
- Ticket Priority Levels
- Dashboard Analytics
- Pagination
- File Attachments
- Activity Logs

---

## 🧩 Challenges Faced

- Designing a scalable ticket schema
- Implementing dynamic search and filtering
- Managing frontend-backend integration
- Creating a responsive user interface
- Maintaining clean API architecture

---

## 📚 Key Learnings

- Building RESTful APIs with Express
- MongoDB data modeling using Mongoose
- State management in React
- API integration using Axios
- Full-stack deployment workflow
- Structuring scalable MERN applications

---
<!-- 
## 👨‍💻 Author

**Your Name**

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile -->