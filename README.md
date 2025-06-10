# 📱 Taskly - A Mobile Task Management App

![Project Status](https://img.shields.io/badge/status-active-success)
![Platform](https://img.shields.io/badge/platform-React%20Native-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Taskly is a comprehensive mobile task management application built with React Native. It empowers users to efficiently organize their daily activities through a rich feature set, including biometric authentication, task prioritization, and profile customization. The application's UI/UX was meticulously crafted based on the design specifications from [this Figma project](https://www.figma.com/design/4CRUTjHYX89xCfdUhFl8ft/Taskly-UI?node-id=0-1&p=f&t=UpMIbWXKVb1WbQdA-0).

This project is now fully functional, with its backend API hosted on **AWS EC2** and user avatars stored and served via **AWS S3**.

---

## 📋 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [📂 Project Structure](#️-project-structure)
- [🏆 Project Status](#-project-status)
- [🧑‍💻 The Team](#-the-team)
- [📄 License](#-license)

---

## ✨ Key Features

-   **🔐 Secure Authentication:** Full user registration and login system with a `Remember me` option powered by biometric authentication and secure token handling.
-   **👤 Profile Customization:** Users can select a custom avatar during registration and edit their profile information, including name, phone, and theme preferences.
-   **🗂️ Advanced Task Management:** Create, edit, and delete tasks with detailed attributes like title, description, due date, priority level, and up to five tags.
-   **✅ Subtask Checklists:** Break down complex tasks into smaller, manageable subtasks for detailed progress tracking.
-   **🔍 Powerful Filtering & Sorting:** Easily find tasks by filtering by priority (high/low) or sorting by due date, tags, or priority.
-   **☁️ Cloud-Powered:** Backend API is deployed on **AWS EC2** for reliability, and user avatars are hosted on **AWS S3** for efficient delivery.

---

## 🛠️ Tech Stack

### Frontend (Mobile)

-   [React Native](https://reactnative.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [React Navigation](https://reactnavigation.org/)
-   [Axios](https://axios-http.com/ptbr/docs/intro)
-   [Async Storage](https://react-native-async-storage.github.io/async-storage/)
-   [React Native Biometrics](https://www.npmjs.com/package/react-native-biometrics)
-   [React Native Keychain](https://github.com/oblador/react-native-keychain)
-   [Date-fns](https://www.npmjs.com/package/date-fns) & [Date-fns-tz](https://www.npmjs.com/package/date-fns-tzz)
-   [JWT Decode](https://www.npmjs.com/package/jwt-decode)

### Backend & Infrastructure

-   **Runtime:** Node.js with Express.js (Assumed for API)
-   **Compute:** AWS EC2
-   **Storage:** AWS S3 for media assets
-   **Monitoring:** AppCenter (Analytics & Crashes)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later recommended)
-   NPM or Yarn
-   Android Studio or Xcode for running the mobile application
-   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AmandaMeneghini/RN-MAR25-taskly.git
    ```
    ```
    cd RN-MAR25-taskly
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```


### Running the App

1.  **Start the Metro server:**
    ```bash
    npm start
    ```

2.  **Run on Android platform (in a new terminal):**
    ```bash
    npm run android
    ```

---

## 📂 Project Structure

The project has evolved to a more robust and scalable architecture. The main directories under `src/` are organized as follows:

```
📁 src/
├── 📁 assets/         # Static assets (images, fonts, icons)
├── 📁 components/     # Reusable global React components (Button, Input, Card)
├── 📁 config/         # Configuration files (e.g., API base URL, environment settings)
├── 📁 context/        # React Context API for global state management
├── 📁 hooks/          # Custom React hooks (e.g., useApi, useAuth)
├── 📁 interfaces/     # TypeScript type and interface definitions
├── 📁 navigation/     # Navigation logic and stack definitions (React Navigation)
├── 📁 screens/        # All application screens, organized by feature
├── 📁 services/       # API communication layer (Axios instances, endpoint functions)
├── 📁 theme/          # Global theme definitions (colors, fonts, spacing)
└── 📁 utils/          # Utility functions for specific domains
    ├── 📄 authUtils.ts
    ├── 📄 imageUtils.ts
    ├── 📄 textFormatters.ts
    └── 📄 validateDate.ts
```

---

## 🏆 Project Status

This project is functionally complete. All core features listed above have been implemented and are working as expected.

- [x] Authentication (Login, Register, Biometrics)
- [x] Task Management (CRUD)
- [x] Subtask Management
- [x] Profile Editing
- [x] Task Filtering and Sorting
- [x] Backend integration with AWS EC2 and S3

The only planned feature that has not been implemented is **offline-first support**.

---

## 🧑‍💻 The Team

This project was brought to life by a dedicated team of developers and planners.

| Role               | Name                            |
| ------------------ | ------------------------------- |
| 👑 **Presenter (P.O)** | [Amanda Duarte Meneghini do Carmo](https://github.com/AmandaMeneghini)|
| 🧠 **Scrum Master** | Camila Cardozo Rocha            |
| 💻 **Developer** | [Diogo da Silva Souza](https://github.com/Caoscrystal)            |
| 💻 **Developer** | Jailson Rodrigues de Neiva      |
| 🔍 **QA Engineer** | [João Victor Santos da Costa](https://github.com/JoaoVicttor07)     |


## Challenge proposed/developed by
<p>
    <img 
      align=left 
      margin=10 
      width=80
      src="https://media.licdn.com/dms/image/v2/D4D03AQEQuzbUjylR-w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698328855703?e=1755129600&v=beta&t=O30Cc2VfLu_FYXnhWiSJE7gjIhEXJDhSnyatVW4-Oeg"
        alt="Imagem do perfil do LinkedIn"
    />
    <p>&nbsp&nbsp&nbspGabriel Santos<br>
    &nbsp&nbsp&nbsp
    <a href="https://www.linkedin.com/in/gabriel-santos-devjs/" target="_blank">LinkedIn</a>
    &nbsp;&nbsp;
    </p>
<br><br>





