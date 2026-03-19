# Focus — The Developer's Pomodoro & Task Manager

A minimal, highly customizable Pomodoro timer and task manager built to improve my productivity. I wanted a split-screen tool that keeps my immediate tasks front-and-center while giving me absolute control over my timer's UI and workflow. 

**[🔗 Live Preview](https://stefan0712.github.io/focus/)**

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-State-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Dexie.js-IndexedDB-336699?style=for-the-badge&logo=sqlite&logoColor=white" alt="Dexie.js" />
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA" />
</p>

---

## 🎯 Why I Built This
There are hundreds of Pomodoro apps out there, but most are either too cluttered or entirely lack a built-in task manager. I built **Focus** to have a unified dashboard where I can track my exact work sessions, manage prioritized tasks, and strip away the UI entirely when I need deep work.

---

## ✨ Core Features

### ✅ Integrated Task Management & Timer
* **Split-Screen UI:** Tasks live right next to the timer. You can instantly swap the layout panels to fit your preference or stack them naturally on mobile.
* **Triaging:** Add tasks with distinct priority levels, pin important tasks to the top, and mark them as complete to automatically push them out of the way.
* **Session Tracking:** A live counter tracks your current cycle (Focus / Short Break / Long Break), keeping you aware of how many blocks you've completed without needing to check a separate log.

### 🎨 Distraction-Free UI (Zen Mode)
* **Deep Focus Mode:** Hide all buttons, task panels, and controls. The UI fades away—accessible only via a minimal edge arrow—leaving just the bare essential countdown on your screen.
* **Maximized States:** Expand the timer to take up the full browser window for absolute, tunnel-vision focus.
* **Adaptive Visuals:** Features a clean, rounded-square progress loop indicator that subtly shows time elapsed without being a distraction.

### ⚙️ Total Customization
* **Custom Intervals:** Fully tweak the duration of Focus sessions, Short Breaks, and Long Breaks, as well as how frequently those long breaks occur.
* **Always On:** Built-in toggles for Fullscreen mode and a "Keep Screen Awake" lock using the browser's native Wake Lock API so your device never goes to sleep mid-session.
* **Theme Control:** Multiple pre-built themes, including a true AMOLED dark mode, to perfectly match your developer setup.

---
## 📸 App Gallery

### The Dashboard
The core workspace. Manage tasks, pin priorities, and track your Pomodoro intervals side-by-side. Seamlessly adapts from wide desktop views to vertical mobile layouts.

<p align="center">
  <img src="screenshots/timer-tasks-landscape.png" width="48%" alt="Desktop Dashboard" />
  <img src="screenshots/timer-tasks-landscape-zen.png" width="48%" alt="Zen Dashboard" />
</p>

### Deep Focus & Settings
Eliminate distractions completely with Maximized and Zen modes, or dive into the settings to customize your flow.

<p align="center">
  <img src="screenshots/full-timer-landscape.png" width="48%" alt="Maximized Timer" />
  <img src="screenshots/full-timer-landscape-zen.png" width="48%" alt="Zen Mode Timer" />
</p>

<p align="center">
  <img src="screenshots/settings-1.png" width="32%" alt="Settings 1" />
  <img src="screenshots/settings-2.png" width="32%" alt="Settings 2" />
  <img src="screenshots/settings-3.png" width="32%" alt="Settings 3" />
</p>
<p align="center">
  <img src="screenshots/theme-1.png" width="25%" alt="Theme 1" />
  <img src="screenshots/theme-2.png" width="25%" alt="Theme 2" />
  <img src="screenshots/theme-3.png" width="25%" alt="Theme 3" />
  <img src="screenshots/theme-4.png" width="25%" alt="Theme 3" />
</p>

## 🏗️ How It Works Under the Hood

Because this tool is meant to be reliable and snappy, I focused heavily on offline capabilities and strict state management.

### 1. Local-First Data with Dexie.js
Task management and session history are completely offline. I used `Dexie.js` as a wrapper for IndexedDB. By creating specific database indexes, the app uses `useLiveQuery` to instantly re-sort the task list the millisecond you click a button—pushing completed tasks to the bottom and pinned tasks to the top without any loading states.

### 2. Complex UI State with Redux Toolkit
With features like swapping panels, maximizing the timer, hiding UI controls, and saving "snapshots" of the timer state, passing props down the tree wasn't going to cut it. I used **Redux Toolkit** to manage the global application settings and UI states cleanly. 

### 3. Progressive Web App (PWA)
Focus is a fully configured PWA using `vite-plugin-pwa`. It can be installed directly to your phone or desktop home screen. Once installed, it runs as a standalone native app without browser URL bars taking up valuable screen space.

---

## 💻 Running Locally

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/stefan0712/focus.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd focus
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   *Open `http://localhost:5173` in your browser.*

---

## 👤 Author & License

**Stefan Vladulescu**
* **Portfolio:** [stefanvladulescu.com](https://stefanvladulescu.com)
* **GitHub:** [@stefan0712](https://github.com/stefan0712)

Distributed under the **MIT License**.