# Task Automation Dashboard

 Modern, responsive web application built with React for managing and monitoring automated tasks. The dashboard allows users to view, create, edit, and run tasks, visualize task statuses, view logs, and download logs as PDFs. It features a light/dark theme toggle and persists user-created and edited tasks in `localStorage`.

## Features

- **Task Management**:
  - View a list of tasks with details (name, category, status, last run time, triggered by, description, icon).
  - Create new tasks with customizable fields (name, category, description, icon, trigger type).
  - Edit all tasks, including default tasks (e.g., `Daily Database Backup`) and user-created tasks (e.g., `tania sangotra`).
  - Run tasks manually with a "Run Now" button, showing a loading state during execution.
  - Persist task data in `localStorage`, with default tasks initialized on first load.

- **Task Visualization**:
  - Display tasks as cards with status badges (e.g., `Completed`, `Running`, `Scheduled`, `Failed`).
  - Show task-specific icons (e.g., `Database`, `Mail`, `Shield`) from Lucide React.
  - Summarize task statuses in stats cards (e.g., `Scheduled: 2`, `Running: 1`).

- **Log Management**:
  - View task logs in a modal, replacing the default `alert` with a user-friendly interface.
  - Download task logs as a PDF file using `jspdf`, including task details and log entries.

- **Theme Switching**:
  - Toggle between light and dark themes with a button, using Tailwind CSS for styling.
  - Persistent theme preference via `ThemeContext`.

- **Responsive Design**:
  - Grid-based layout for task and stats cards, adapting to mobile, tablet, and desktop screens.
  - Smooth transitions and hover effects for enhanced user experience.

- **Data Persistence**:
  - Merge default tasks (hardcoded in `TaskService.js`) with user-created/edited tasks in `localStorage`.
  - Prioritize `localStorage` tasks to override default tasks with the same `id`.

## Tech Stack

### Libraries and Frameworks
- **React**: ^18.2.0 (Frontend framework for building the UI)
- **Vite**: ^5.0.0 (Build tool and development server)
- **Tailwind CSS**: ^3.4.1 (Utility-first CSS framework for styling)
- **shadcn/ui**: (UI components like `Button`, `Card`, `Dialog`, customized with Tailwind)
- **lucide-react**: ^0.446.0 (Icon library for task-specific icons like `Database`, `Mail`)
- **jspdf**: ^2.5.1 (Client-side PDF generation for log downloads)

### Utilities
- **localStorage**: For persisting user-created and edited tasks.
- **Custom Utilities**:
  - `delay.js`: Simulates API delays for task operations.
  - `storage.js`: Handles `localStorage` get/set operations.

### Project Structure

```plaintext
src/
├── components/
│   └── dashboard/
│       ├── Dashboard.js          # Main dashboard component
│       ├── TaskCard.js           # Task card with run, logs, and edit buttons
│       ├── ViewLogsModal.js      # Modal for viewing and downloading logs
│       ├── NewTaskModal.js       # Modal for creating/editing tasks
│       ├── StatsCard.js          # Card for task status summaries
│       └── StatusBadge.js        # Badge for task status visualization
├── contexts/
│   ├── TaskContext.js            # Context for task data and operations
│   └── ThemeContext.js           # Context for theme toggling
├── services/
│   └── TaskService.js            # Task data management (fetch, create, update)
├── utils/
│   ├── delay.js                  # Simulated API delay utility
│   └── storage.js                # localStorage utility
├── App.js                        # Root component
├── index.css                     # Tailwind CSS imports
└── main.js                       # Entry point

```
# Steps to run:
```
git clone https://github.com/Kish202/Habot-taskautomation.git
cd task-automation-dashboard
```
```
npm install
```
```
npm run dev
```
Open http://localhost:5173 (or the port shown in the terminal) in your browser.

Now you have happy fully functional task automation project with you.
