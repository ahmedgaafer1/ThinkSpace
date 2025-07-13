# 🚀 ThinkSpace | Full Stack Blogging Platform

ThinkSpace is a modern full-stack blogging platform that enables users to register, log in, manage their profiles, create, edit, and manage blog posts. The project consists of a **React Frontend** and an **Express + Prisma + SQLite Backend**, designed with a clean and scalable architecture.

---

## 📑 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Environment Variables](#environment-variables)
- [Installation Guide](#installation-guide)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [File Uploads](#file-uploads)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## ✨ About the Project

ThinkSpace is a blogging platform where users can share their ideas. It supports authentication, profile management, post creation, and file uploads. The project was built as a learning exercise but structured to production standards.

---

## 🌟 Features

- 🔑 **Authentication System**

  - Register & Login with JWT Authentication
  - Refresh Token Support
  - Password validation

- 👤 **User Profile Management**

  - Edit profile (Name, Username, Email, Phone, Avatar)
  - Upload profile picture
  - View personal post stats

- 📝 **Post Management**

  - Create, Edit, Delete, and View posts
  - Personal post management dashboard

- 🖼️ **File Uploads**

  - Avatar image uploads stored locally

- 🔗 **REST API**

  - Built with Express and Prisma ORM

- 💡 **Frontend (React)**

  - Fully responsive
  - Clean UI with Bootstrap and custom styling

- 🔐 **Security**

  - JWT Access/Refresh tokens
  - Validation with Yup and Prisma
  - CORS and Helmet

- 📜 **API Documentation**
  - Swagger ready (optional)

---
## 📸 Screenshots

Here are some screenshots of the **ThinkSpace** app:
### Login Page
![Login](/Project/screens/login.png)

### Home Page
![Home](/Project/screens/home.png)

### All Posts
![All Posts](/Project/screens/allposts.png)

### My Posts
![My Posts](/Project/screens/myposts.png)

### My Profile
![My Profile](/Project/screens/myprofile.png)


## 🛠️ Tech Stack

### 🔥 Backend

- Node.js + Express
- Prisma ORM + SQLite (or MySQL)
- Multer (File Uploads)
- JWT Authentication
- TypeScript
- Swagger (API Docs)

### 💻 Frontend

- React + Vite
- React Router DOM
- Axios
- Bootstrap + Custom CSS
- React Hook Form + Yup
- Toastify (Notification)

---

## 🗺️ Project Architecture

```
thinkspace/
├── client/          # React Frontend
├── server/          # Express Backend with Prisma
│   ├── prisma/      # Prisma schema & migrations
│   ├── uploads/     # Uploaded avatars/images
│   ├── routes/      # API endpoints
│   ├── controllers/ # API logic
│   ├── middleware/  # Auth, error handling, file upload
│   ├── server.ts    # Entry point
├── README.md
```

---

## ⚙️ Environment Variables

### Backend `.env`

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
```

---

## 🚀 Installation Guide

### Clone the Repository

```bash
git clone https://github.com/ahmedgaafer1/ThinkSpace.git
cd ThinkSpace
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Database Setup

```bash
cd ../server
npx prisma migrate dev --name init
npx prisma generate
```

### Run Backend

```bash
cd server
npm run dev
```

### Run Frontend

```bash
cd client
npm run dev
```

---

## 🏃 Available Scripts

### Frontend

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |

### Backend

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start backend with Nodemon |
| `npm run build` | Build backend              |
| `npm start`     | Start backend (production) |

---

## 📁 Folder Structure Explanation

- `/client` – React App
- `/server/routes` – API route handlers (users, auth, posts)
- `/server/controllers` – Logic for handling API requests
- `/server/middleware` – Auth middleware, file upload
- `/server/prisma` – Prisma schema, migrations
- `/server/uploads` – Stores uploaded files (avatars)
- `/server/server.ts` – Entry point of backend

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint                  | Description       |
| ------ | ------------------------- | ----------------- |
| POST   | `/api/auth/signup`        | Register new user |
| POST   | `/api/auth/login`         | Login user        |
| POST   | `/api/auth/refresh-token` | Refresh tokens    |

### User

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/api/users`     | Get all users         |
| GET    | `/api/users/:id` | Get user by ID        |
| PUT    | `/api/users/:id` | Update user info      |
| DELETE | `/api/users/:id` | Delete user           |
| GET    | `/api/me`        | Get current user info |

### Posts

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | `/api/posts`     | Get all posts  |
| GET    | `/api/posts/:id` | Get post by ID |
| POST   | `/api/posts`     | Create a post  |
| PUT    | `/api/posts/:id` | Update a post  |
| DELETE | `/api/posts/:id` | Delete a post  |

---

## 🖼️ File Uploads

- Uploaded images are stored in `/server/uploads/`.
- Accessible via:

```
http://localhost:<backend-port>/uploads/<filename>
```

---

## 🚧 Future Improvements

- Password encryption with bcrypt
- Role-based access (Admin/User)
- Post images (cover images for posts)
- Full unit & integration testing (Jest + Supertest)
- Docker support for easy deployment

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

- Developed by **Ahmed Gaafer**
- GitHub: [github/ahmedgaafer1](https://github.com/ahmedgaafer1)

---
