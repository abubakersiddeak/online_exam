# 📝 Online Exam Platform

![Online Exam Platform Banner](https://res.cloudinary.com/dmb58pab9/image/upload/v1751973489/2_ytvtya.png)

## Overview
The **Online Exam Platform** is a modern web application built with **Next.js**, **React**, **MongoDB**, and **Tailwind CSS**.  
It enables students to take exams online and allows admins/teachers to create, manage, and evaluate exams efficiently.  

**Live Demo:** [https://online-exam-nine.vercel.app/](#)

---

## Technology Stack

| Layer          | Technologies & Libraries |
|----------------|------------------------|
| **Frontend**   | React 19, Next.js 15, Tailwind CSS 4, DaisyUI |
| **Backend**    | Node.js, NextAuth, Express.js |
| **Database**   | MongoDB, Mongoose |
| **Authentication** | bcryptjs, next-auth, @auth/mongodb-adapter |
| **Utilities & Libraries** | framer-motion, react-icons, lucide-react |
---

## Features
- **Admin Dashboard:** Create, manage, and evaluate exams    
- **Real-time Exam Reports:** Generate PDF reports after exams  
- **Secure Authentication** for students and admins  

---

## Dependencies
```json
{
  "dependencies": {
    "@auth/mongodb-adapter": "^3.9.0",
    "bcryptjs": "^3.0.2",
    "framer-motion": "^12.7.4",
    "lucide-react": "^0.503.0",
    "mongodb": "^6.16.0",
    "mongoose": "^8.13.2",
    "next": "15.3.1",
    "next-auth": "^5.0.0-beta.27",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.5.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "daisyui": "^5.0.28",
    "eslint": "^9",
    "eslint-config-next": "15.3.1",
    "tailwindcss": "^4"
  }
}
````
---
## Run Locally

Follow these steps to run **WealApp** on your local machine:


### 1️⃣ Clone the repository
```bash
git clone <https://github.com/abubakersiddeak/online_exam.git>
```

## 2️⃣ Navigate into the project folder
```bash
cd online_exam
```

## 3️⃣ Install dependencies
```bash
npm install
```
## 4️⃣ Create a .env.local file
```.env.local
MONGODB_URI="your mongodb uri"

NEXT_PUBLIC_BASE_URL="your url"
AUTH_SECRET="your auth secret"

```
## 5️⃣ Start the development server
```bash
npm run dev
```
## 6️⃣ Build for production 
```bash
npm run build
npm start
```

