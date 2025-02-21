# React Frontend for Java Spring Boot Authentication Project

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Authentication Flow](#authentication-flow)
- [Available Pages](#available-pages)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 📖 Project Overview
This React frontend application serves as the user interface for a Java Spring Boot authentication system. It provides a login page and a secured main page with menu options like Contacts, Reservations, Orders, Profile, and Settings.

## ✨ Features
- User Authentication with JWT
- Login form with error handling
- Protected routes after authentication
- Responsive UI with React Router
- Menu navigation: Contacts, Reservations, Orders, Profile, and Settings
- Persistent login using `localStorage`

## 🛠 Tech Stack
- **React** (19.0)
- **TypeScript**
- **React Router DOM** (6.11.2)
- **Vite** (for faster builds and development)
- **Tailwind CSS** (for styling)

## 📂 Project Structure
```
frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Login/
│   │   │   │   └── Login.tsx
│   │   │   ├── MainPage/
│   │   │   │   └── MainPage.tsx
│   │   │   ├── Contacts/
│   │   │   │   └── Contacts.tsx
│   │   │   ├── Reservations/
│   │   │   │   └── Reservations.tsx
│   │   │   ├── Orders/
│   │   │   │   └── Orders.tsx
│   │   │   ├── Profile/
│   │   │   │   └── Profile.tsx
│   │   │   └── Settings/
│   │   │       └── Settings.tsx
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── routes.tsx
│   ├── main.tsx
│   └── styles.css
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) (v9.x or later)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/frontend.git
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App
1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   Visit [http://localhost:4200](http://localhost:4200)

## ⚙️ Environment Variables
Create a `.env` file in the root directory with the following:

```bash
VITE_API_URL=http://localhost:5000/api
```

## 🔐 Authentication Flow
1. User logs in via `/login` page.
2. JWT token is returned on successful login.
3. Token is stored in `localStorage`.
4. Protected routes validate the token before granting access.

## 📄 Available Pages
- **Login Page:** `/login`
- **Main Page:** `/`
    - **Contacts:** `/contacts`
    - **Reservations:** `/reservations`
    - **Orders:** `/orders`
    - **Profile:** `/profile`
    - **Settings:** `/settings`

## 📡 API Endpoints
- **POST** `/api/auth/login` — Authenticate user and return JWT.

## 🐛 Troubleshooting
- **CORS Issues:** Ensure backend has proper CORS configuration.
- **Invalid Hook Call:** Verify React and React DOM versions are compatible.
- **401 Unauthorized:** Check if JWT is correctly stored and sent in headers.

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License.
