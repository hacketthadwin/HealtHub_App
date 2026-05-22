
# 🏥 CardiaMind (Healthub) 

CardiaMind is a comprehensive, full-stack healthcare and telemedicine application built to seamlessly connect patients, doctors, and healthcare administrators. It features real-time chat, AI-driven medical record parsing, OTP-based secure authentication, and role-based dashboards to manage consultations, schedules, and medical histories.

---

## ✨ Key Features

### 🔐 Authentication & Security
*   **Role-Based Access Control:** Distinct flows for **Admin**, **Doctor**, and **Patient**.
*   **Dual Login Methods:** Supports both Email/Password and secure OTP-based login (via Nodemailer).
*   **JWT Authorization:** Secure token-based API routing.

### 👨‍⚕️ Doctor Portal
*   **Dashboard Overview:** View daily appointment summaries, patient counts, and new reports.
*   **Patient Management:** Access detailed patient profiles, medical histories, and past lab/vital reports.
*   **Real-Time Consultations:** Socket.io integrated chat to communicate directly with assigned patients.
*   **Notifications:** Real-time alerts for incoming messages, appointment reminders, and report uploads.

### 🧑‍🤝‍🧑 Patient Portal
*   **Consultation Requests:** Book appointments and seek consultations.
*   **AI Health Assistant:** Integrated AI chatbot for preliminary health queries and guidance.
*   **Medical Records Management:** View past reports and prescriptions.
*   **Emergency SOS:** Quick access to emergency contacts and support.

### ⚙️ Admin Panel
*   **User Management:** Centralized hub to view and manage all registered admins, doctors, and patients.
*   **Onboarding:** Add new doctors to the system securely.

### 🤖 AI & Medical Record Parsing
*   **Gemini/RAG Integration:** Backend routes designed to handle and store AI-parsed medical records, vitals, and diagnoses.

---

## 🛠 Tech Stack

**Frontend (Mobile App)**
*   **Framework:** React Native with [Expo](https://expo.dev/)
*   **Styling:** NativeWind (Tailwind CSS for React Native) & React Native Paper
*   **Navigation:** React Navigation (Stack & Tab Navigators)
*   **Chat UI:** React Native Gifted Chat
*   **Animations:** Lottie React Native
*   **Real-time:** Socket.io-client

**Backend (API Server)**
*   **Environment:** Node.js with Express.js
*   **Database:** MongoDB & Mongoose
*   **Authentication:** JWT, bcrypt, OTP-generator
*   **Real-time:** Socket.io
*   **Email Services:** Nodemailer

---

## 📂 Project Structure

```text
hacketthadwin-healthub_app/
├── backend/                  # Node.js / Express Server
│   ├── config/               # Database connection setup
│   ├── controller/           # Business logic (Auth, Appointments, Medical Records)
│   ├── middlewares/          # JWT Auth & Role-check middlewares
│   ├── models/               # Mongoose Schemas (User, Doctor, Message, Task)
│   ├── routes/               # API endpoint definitions
│   └── index.js              # Server entry point & Socket.io setup
│
└── frontend/                 # React Native / Expo App
    ├── assets/               # Images, icons, and Lottie JSON animations
    ├── components/
    │   ├── admin/            # Admin dashboard and gatekeeping
    │   ├── auth/             # SignIn, SignUp, and OTP screens
    │   ├── doctor/           # Doctor dashboard, patient list, schedules
    │   ├── patient/          # Patient dashboard, AI Chatbot, SOS
    │   ├── profile/          # User profile management
    │   └── settings/         # App settings, Theme, and Language preferences
    ├── contexts/             # React Contexts (Theme, Auth)
    ├── App.js                # Main application wrapper & Navigation stack
    └── global.css            # Tailwind base imports

```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

* [Node.js](https://nodejs.org/) (v16 or newer)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)
* [Expo CLI](https://www.google.com/search?q=https://docs.expo.dev/get-started/installation/)
* Android Studio / Xcode (for emulation) or the Expo Go app on your physical device.

### 1. Backend Setup

1. Navigate to the backend directory:

```bash
   cd backend

```

2. Install dependencies:

```bash
   npm install

```

3. Create a `.env` file in the `backend` directory and add the following variables:

```env
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

```

4. Start the server:

```bash
   npm run dev
   # Server will start on http://localhost:5000 (accessible via your local IP)

```

### 2. Frontend Setup

1. Navigate to the frontend directory:

```bash
   cd frontend

```

2. Install dependencies:

```bash
   npm install

```

3. Configure the API URL:
* Open `SignIn.jsx`, `Signup.jsx`, and `PatientChatRoom.js` (or set up a global config).
* Update the `API_BASE_URL` and `SOCKET_URL` to match your computer's local IP address (e.g., `http://192.168.1.X:5000`). *Do not use `localhost` if testing on a physical mobile device.*


4. Start the Expo development server:

```bash
   npx expo start

```

5. Scan the QR code with your **Expo Go** app (Android/iOS) or press `a` / `i` to launch in a local emulator.

---

## 🎨 UI/UX Highlights

* **Theming:** Full support for Light and Dark modes (`contexts/ThemeContext.js`).
* **Animations:** Smooth, interactive Lottie animations used for loaders, success states, and avatars.
* **Accessibility:** Clean, readable Tailwind-based design using standard medical color palettes.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
