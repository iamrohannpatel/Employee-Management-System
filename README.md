# Employee Management System (EMS)

## Project Overview

This **Employee Management System (EMS)** is a production-ready frontend application developed as an internship selection assignment for **Obzen Technolabs**. The project demonstrates advanced frontend architecture, clean business logic implementation, and scalable component design using **React (Vite)** and **Tailwind CSS**.

The system is designed to streamline workforce management by offering distinct interfaces for **Admins**, **HR Managers**, and **Employees**, covering everything from onboarding to payroll and attendance tracking.

### Why this exists?
To showcase the ability to build a complex, interactive web application with a focus on:
-   **Clean Architecture**: Separation of concerns between UI, State, and Logic.
-   **Scalable Codebase**: Component reusability and modular file structure.
-   **Business Logic**: Implementation of real-world scenarios like payroll calculation and role-based access control (RBAC).

---

## Features

### 🔐 Role-Based Access Control (RBAC)
-   **Admin**: Full system control, manage HRs and Employees, view global analytics.
-   **HR**: Manage Employees, oversee attendance, handle payroll.
-   **Employee**: View simple dashboard, mark attendance, view tasks, download payslips.

### 👥 Employee Management
-   Complete **CRUD operations** (Create, Read, Update, Delete) for employee records.
-   Digital onboarding with detailed profile management.

### 🕒 Smart Attendance System (Simulated NFC)
-   Simulates **NFC/RFID tag scanning** for clock-in/clock-out.
-   Real-time tracking of check-in status.
-   Prevents duplicate entries and ensures data integrity.

### 💰 Payroll Processing
-   Automated salary calculation based on attendance.
-   **Payroll Logic**: Calculates payable amount based on days present in the current month.
-   **Payslip Generation**: Instant PDF download for employees.

### 📋 Task & Ticket Management
-   Assign tasks to employees with priorities (High, Medium, Low).
-   Track status: *New*, *Active*, *Completed*, *Failed*.

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | [React 19](https://react.dev/) (via [Vite](https://vitejs.dev/)) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **State Management** | React Context API |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **PDF Generation** | jsPDF |
| **Utilities** | UUID, LocalStorage Custom Hooks |

---

## Architecture & Design Decisions

### Why Context API?
Given the requirements to simulate a full-stack application purely on the frontend, **Context API** was chosen over Redux to minimize boilerplate while maintaining a clean global state for:
-   **AuthContext**: Manages user sessions and role validation.
-   **AttendanceContext**: Centralizes attendance logic to prevent prop-drilling.
-   **EmployeeContext**: Handles CRUD operations and data syncing.

### Production-Ready Mindset
-   **Service Layer Simulation**: API calls are mocked using a utility layer that interacts with `localStorage`. This allows the app to be "backend-ready"—swapping `localStorage` utility with actual `fetch`/`axios` calls would be seamless.
-   **Component Reusability**: UI elements like `Header`, `TaskList`, and `Card` are modularized.
-   **Custom Hooks**: Logic for data persistence (`useLocalStorage`) is abstracted away from components.

---

## Authentication Strategy

**Note: Authentication is SIMULATED for this frontend-focused assignment.**

-   **Mock Credentials**:
    -   **Admin**: `admin@ems.com` / `123456`
    -   **HR**: `hr@ems.com` / `123456`
    -   **Employee**: `employee@ems.com` / `123456`
-   **Implementation**: Steps are verified against pre-seeded data in `mockData.js`.
-   **Session Persistence**: Login state is persisted via `localStorage` to survive page reloads.

*In a real production environment, this would be replaced by JWT-based authentication with secure HTTP-only cookies.*

---

## Attendance Simulation (Virtual NFC)

To meet the requirement of an "IoT-enabled" feel without physical hardware, the system simulates an **NFC Scanner**:
1.  **Tag Simulation**: When "Scan Card" is clicked, unique RFID tag data (e.g., `SCAN_SIM_88x2`) is generated.
2.  **Logic**: The system captures the specialized tag ID and timestamps it to mark entry/exit.
3.  **Validation**: Ensures an employee cannot check in twice without checking out.

---

## Payroll Logic

The simulated payroll engine calculates salary dynamically:
-   **Formula**: `(Base Salary / 30) × Days Present`
-   **Attendance Data**: Fetches "Present" days from the `AttendanceContext` for the current month.
-   **Assumptions**: A standardized 30-day work month is used for calculation simplicity in this assignment.

---

## Folder Structure

```
src/
├── components/        # Reusable UI components
│   ├── Attendance/    # NFC Scanner, Attendance Lists
│   ├── Auth/          # Login forms
│   ├── Dashboard/     # Role-specific dashboard layouts
│   ├── Employee/      # Create/List Employee components
│   └── Shared/        # Buttons, Cards, Headers
├── context/           # Global State (Auth, Task, Attendance)
├── pages/             # Route views (AdminDashboard, EmployeeDashboard, etc.)
├── utils/             # Helper functions (localStorage, payroll, PDF)
├── App.jsx            # Main application root
└── main.jsx           # Entry point
```

---

## Setup & Run Instructions

**Prerequisites**: Node.js (v18+)

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/employee-management-system.git
    cd employee-management-system
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to view the application.

---

## Future Improvements

1.  **Backend Integration**: Connect to Node.js/Express with MongoDB for real data persistence.
2.  **Physical IoT Integration**: Replace the button simulator with a WebUSB or WebSerial API to read actual NFC tags.
3.  **Real-time Notifications**: Integrate Socket.io for instant task updates.
4.  **Advanced Analytics**: Add charts to the Admin Dashboard for workforce insights.

---

**Developed by Rohan Patel**
