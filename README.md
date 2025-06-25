
# 🚀 ThinkSpace | Modern Blogging Platform

ThinkSpace is a full-stack web application designed for individuals to create, share, and manage blog posts easily. Built with React, Node.js, Express, Prisma, and MySQL, it delivers a seamless user experience with secure authentication, user profile management, and CRUD operations for posts.

---

## 📑 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Environment Setup](#environment-setup)
- [Installation Guide](#installation-guide)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## ✨ About the Project

ThinkSpace is a lightweight yet powerful blogging platform. It supports user authentication, profile management, and a simple post management system. The goal is to provide developers and bloggers a clean and efficient space to share content.

---

## 🌟 Features

- 🔐 **Authentication**
  - Secure Login & Register
  - JSON Web Tokens (JWT)
  - Profile Picture Upload

- 👤 **User Profile**
  - Edit profile information (name, email, phone, username)
  - Upload or change avatar
  - View number of posts

- ✍️ **Post Management**
  - Create, edit, delete, and view posts
  - Filter personal posts easily

- 💾 **File Uploads**
  - Profile images stored securely on the server

- 🎯 **User Interface**
  - Responsive and mobile-friendly
  - Clean, modern design

- 🔗 **REST API**
  - Built with Express and Prisma ORM

- 🔒 **Security**
  - JWT-based authentication
  - Validation on frontend and backend

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + Vite
- React Router DOM
- Axios
- Bootstrap + Custom CSS
- React Hook Form + Yup
- Toastify

### Backend
- Node.js + Express.js
- Prisma ORM
- MySQL
- Multer (File Uploads)
- JWT Authentication
- CORS & Helmet (Security)

---

## 🗺️ Project Architecture

```
├── client          # React Frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── api
│   └── public
├── server          # Node Backend with Prisma
│   ├── prisma      # Prisma schema & migrations
│   ├── uploads     # Uploaded avatars/images
│   ├── routes      # API routes
│   ├── controllers # Request logic
│   ├── middleware  # Auth, error handlers, upload handlers
│   └── .env        # Environment variables
```

---

## ⚙️ Environment Setup

### 🗂️ .env Example (Backend)

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/thinkspace_db"
JWT_SECRET="your_secret_key"
```

---

## 🚀 Installation Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/thinkspace.git
cd thinkspace
```

### 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

### 4️⃣ Configure the Database

- Create a MySQL database (e.g. `thinkspace_db`).
- Update `/server/.env` with your credentials.

### 5️⃣ Run Prisma Migration

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6️⃣ Start Servers

- Frontend:

```bash
cd client
npm run dev
```

- Backend:

```bash
cd server
npm run dev
```

---

## 🏃 Available Scripts

### Frontend

| Command         | Description                 |
| ----------------|-----------------------------|
| `npm run dev`   | Start dev server            |
| `npm run build` | Build for production        |

### Backend

| Command         | Description                 |
| ----------------|-----------------------------|
| `npm run dev`   | Start backend with nodemon  |
| `npm start`     | Start backend (production)  |

---

## 📁 Folder Structure Explanation

- **/client/src/api** – Axios API configurations
- **/client/src/pages** – Home, Login, Register, Profile, Posts, etc.
- **/client/src/styles** – Global and component-specific CSS
- **/server/prisma** – Prisma schema, migrations, and seed files
- **/server/routes** – Authentication, User, Post APIs
- **/server/controllers** – Logic for each route
- **/server/uploads** – Uploaded avatars/images
- **/server/middleware** – Auth check, multer upload handler

---

## 🔥 Best Practices

- Follow MVC architecture in backend.
- Use `.env` for secrets and DB credentials.
- Use Prisma ORM for database integrity.
- File upload restricted to `uploads/` folder only.
- Strong validation using Yup on frontend + Prisma on backend.
- JWT token-based authentication for security.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo.
2. Create your branch: `git checkout -b feature/feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/feature-name`.
5. Open a Pull Request.

---

## 📜 License

Distributed under the MIT License.

---

## 🙋‍♂️ Author

- 🚀 Developed by **Your Name**
- 🌐 [Your Website] (optional)
- 💼 LinkedIn: [linkedin.com/in/yourname] (optional)
- 🐙 GitHub: [github.com/yourusername]

---
