# 📱 Taskly - Task App

Taskly is a mobile task management application developed to help users organize their activities, offering a range of features including biometric authentication, setting deadlines and priorities, and profile customization. The interface of this application was developed following the design specified in the provided Figma link.

---

## 📑 Table of Contents

- [⚙️ Features](#-features)
- [✍️ Mandatory Validations](#mandatory-validations)
- [🛠️ Technologies Used](#️-technologies-used)
- [📦 Installation](#-installation)
- [📂 Project Structure](#️-project-structure)
- [🧩 Organization](#️-organization)
- [🧑‍💻 Developers](#-developers)

## ⚙️ Features

#### 🔐 Authentication
- Login with `Remember me` option and complete registration with validations, integrated with the proposed API.

#### 🧑‍🎨 Initial Customization
- Avatar selection upon registration and in profile editing.

#### 🗂️ Task Management
- Add, edit, and remove tasks with title, description, due date, tags, and priority.

#### ✅ Detailed Subtasks
- Divide tasks into subtasks (checklist) for detailed tracking.

#### 🔍 Filtering
- View tasks by priority (high or low).

#### 📅 Organization
- Sort tasks by due date, tags, and priority.

#### 👤 Profile Editing
- View and edit information, choose avatar, and preferences for theme selection.

---

## ✍️ Mandatory Validations

#### 🔐 Login

- **Email:** Valid format (regex)
- **Password:** Minimum 8 characters
- **Error:** "Incorrect email and/or password"

#### ✍️ Sign Up

- **Full Name:** Minimum two names, up to 120 characters
- **Email:** Valid format
- **Phone:** Format (DDD) 9 dddd-dddd
- **Password:**
    - 8 to 20 characters
    - At least: 1 uppercase letter, 1 lowercase letter, 1 special character
- **Confirmation:** Passwords must match

#### 📌 Tasks

- **Title:** Text only, up to 100 characters, no emojis
- **Description:** Up to 500 characters, no emojis
- **Due Date:** Valid date
- **Tags:** Maximum 5, no spaces
- **Subtasks:** Text up to 200 characters

#### 👤 Profile

- **Full Name:** Compound name required
- **Phone:** (DD) 9 dddd-dddd

---

## 🛠️ Technologies Used

- [React Native](https://reactnative.dev/) - Framework for native mobile development with JavaScript.
- [React Navigation](https://reactnavigation.org/) - Navigation between screens.
- [Async Storage](https://react-native-async-storage.github.io/async-storage/) - Asynchronous local storage.
- [TypeScript](https://www.typescriptlang.org/pt/docs/)
- [Axios](https://axios-http.com/ptbr/docs/intro) - For making HTTP requests.
- [Date-fns](https://date-fns.org/) and [Date-fns-tz](https://date-fns.org/tz) - For date and timezone manipulation.
- [React Native Collapsible](https://github.com/oblador/react-native-collapsible) - For collapsible sections.
- [JWT Decode](https://www.npmjs.com/package/jwt-decode) - For decoding JWT tokens.
- [React Native Biometrics](https://github.com/fingerprintjs/react-native-biometrics) - For biometric authentication.
- [React Native Date Picker](https://github.com/mmazzarolo/react-native-date-picker) - For date selection.
- [React Native Keychain](https://github.com/oblador/react-native-keychain) - For secure credential storage.
- [React Native Webview](https://github.com/react-native-webview/react-native-webview) - For displaying web content.
- [AppCenter](https://appcenter.ms/) and its modules (Analytics, Crashes) - For app monitoring and analytics.

---

## 📦 Installation

#### Clone the repository


```bash
git clone https://github.com/JoaoVicttor07/RN-MAR25-taskly.git
cd RN-MAR25-taskly
```

#### Install dependencies
```bash
npm install
```

#### Start the Server
```bash
npm start
```

#### Run the application
```bash
npm run android
```

---

## 📂 Project Structure
The file and folder structure of the project is organized as follows:
```
📁 src                         # Main source code
├── 📁 Assets                  # Static files
│   ├── 📁 Images              # Image files
│   ├── 📁 fonts               # Font files
│   └── 📁 icons               # Icon files
│
├── 📁 Navigation              # Application navigation logic
│       ├── index.tsx
│       └── types.ts
│
├── 📁 Screens                  # Application screens
│   ├── 📁 Home                 # Main application screen
│   │   ├── Index.tsx            # Home screen component
│   │   └── style.ts             # Styles for the Home screen
│   └── 📁 Login                 # Login screen
│       ├── 📁 Modal             # Specific modal component for the Login screen
│       │   ├── Index.tsx         # Login modal component
│       │   └── style.ts          # Styles for the Login modal
│       ├── Index.tsx             # Login screen component
│       └── style.ts              # Styles for the Login screen
│
├── 📁 Theme                     # Theme definitions for the application
│   └── fonts.ts                  # Font styles and configurations
│
├── 📁 Utils                     # Reusable utility functions
│   ├── authUtils.ts              # Functions related to authentication
│   └── validateDate.ts           # Functions to validate dates
│
├── 📁 components                # Reusable React components
│   ├── 📁 button                # Custom button component
│   │   ├── index.tsx             # Button component
│   │   └── style.ts              # Styles for the button component
│   └── 📁 input                 # Custom input component
│       ├── index.tsx             # Input component
│       └── style.ts              # Styles for the input component
│
├── 📁 hooks                     # Custom React hooks
│   └── useApi.ts                 # Hook to interact with an API
│
├── 📁 screens/Notifications     # Notifications screen
│   ├── index.tsx                 # Notifications screen component
│   └── style.ts                  # Styles for the notifications screen
│
└── App.tsx                       # Main entry point of the React Native application

```

## 🧩 Organization

The development team for this project is organized as follows:

- **Presenter (P.O):** Amanda Duarte Meneghini do Carmo
- **Developer (Dev):** Diogo da Silva Souza
- **Developer (Dev):** Jailson Rodrigues de Neiva
- **Quality Assurance (QA):** João Victor Santos da Costa
- **Scrum Master:** Camila Cardozo Rocha


## 🧑‍💻 Developers

This project was developed by a team of dedicated collaborators:

- Amanda Duarte Meneghini do Carmo
- Camila Cardozo Rocha
- Diogo da Silva Souza
- Jailson Rodrigues de Neiva
- João Victor Santos da Costa

