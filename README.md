# ⏱️ Focus

## 🧐 The Why
Most productivity apps are productivity traps—too many buttons, ads, and complex settings. Get It Done was built with one philosophy: Friction Reduction. It combines a Pomodoro timer with a prioritized task list in a single view, allowing you to manage your work without breaking your focus. I bulit it to fix one of my biggest issues when working: planning. Instead of spending hours of creating tasks, grouping them, adding tags, deadlines, etc, I just add tasks I want to do this session and hit start on the timer.

## ⚡ Key Features
### 🎯 Focus-First Architecture
Integrated Workflow: Add, edit, and complete tasks while the timer is running. No context switching.
Persistent History: Uses Dexie.js to log every session locally, visualizing your productivity trends over time.
Customize: Pick one of the 5 theme available and choose what you want to see on your timer
No overplanning: One list for all your tasks, ordered by priority and the order they were added. Spend your time on completing the tasks, not planning them


## 🛠️ Tech Stack
Frontend: React.js
State Management: Redux Toolkit (handling timer logic & UI state)
Database: Dexie.js (IndexedDB wrapper for offline storage)
Styling: CSS Modules / Styled Components for storing tasks and logs

## 🚀 How to Run Locally

1. Clone this repo
```bash
https://github.com/Stefan0712/focus.git
```
2. Install dependencies
```bash
npm install
```
3. Start the app
```bash
npm run dev
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions, ideas, or bug fixes, feel free to:

Fork this repository. Create a new branch. Submit a pull request.


## 📜 License
This project is licensed under the MIT License, which means you’re free to use, modify, and distribute it as long as you provide attribution.
