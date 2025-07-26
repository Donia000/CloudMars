
# 🌐 CloudMars – AI-Powered Online Course Platform

## 📌 Project Description  
CloudMars is an AI-powered online learning platform that allows users to register, purchase and follow programming and data science courses. It features gamified progress tracking, in-browser code execution, AI-generated quizzes, and chatbot-assisted learning.

---

## ✅ Requirements

index.html          # Main entry point
css/                # All styles
js/
auth/           # Role-based auth logic
firebase/       # Firebase config
pyodide/        # In-browser Python
assets/             # Course materials

---

## 🚀 How to Run the Project

1. Clone or download the project files.  
2. Open the project folder in **VS Code** (or any code editor).  
3. Run the following command to install dependencies:

  

4. Open the file `firebaseauth.js` and replace the placeholder values with your own Firebase credentials.  
   **For simple static testing, right-click on `index.html` and select "Open with Live Server" in VS Code.**
5. Start the project by running:


## ⚠️ Notes

- Make sure Firebase Authentication (Email/Password) is enabled in your Firebase console.  
- Firestore database rules must allow read/write for testing or be configured securely for production.  
- Pyodide must be properly integrated to support in-browser Python execution.  
- For multilingual support, ensure i18n configuration is properly set.

---

## 💡 Features Summary

- 🔐 Role-based Authentication (Student)  
- 📚 Course & Quiz Management  
- 🧠 AI-Powered Quiz Generation  
- 🧑‍💻 In-Browser Python Execution (via Pyodide)  
- 🏆 XP, Skill Points, and Daily Challenges  
- 💬 Smart Chatbot Assistant  
- 📈 User Progress Tracking  
- 🌍 Multilingual Interface (English & Arabic)

---

## 📜 License

CloudMars is an academic project developed for educational purposes at the Faculty of Information Technology – Sinai University.  
All rights reserved © 2025.  
This project is not intended for commercial use without permission.


