# Architecture & Data Flow

## Global State Management (Context API)
The application uses two primary contexts:
1. **AuthContext**: Manages authentication state (`userData`), login, and logout functions. It initializes the `localStorage` with mock data on the first load.
2. **EmployeeContext**: Manages the list of employees. It syncs with `localStorage` to persist data updates.

## Data Flow
1. **Initialization**: 
   - `AuthContext` checks `localStorage` for `employees` and `admin` data. If missing, it populates it from `mockData.js`.
   - It also checks for an existing session (`loggedInUser`).

2. **Login Process**:
   - User submits credentials.
   - `login` function in `AuthContext` validates against stored data.
   - On success, `userData` is updated and persisted in `localStorage`.

3. **Employee Data**:
   - `EmployeeContext` reads from `localStorage` on mount.
   - Future mutations (e.g., adding tasks) will update the `employees` state and sync back to `localStorage`.

## Folder Structure
- `src/context`: Global state providers.
- `src/utils`: Helper functions (storage) and constants (mock data).
- `src/components`: Reusable UI components.
- `src/pages`: Route components (AdminDashboard, EmployeeDashboard, Login).
- `src/services`: (Optional) API/Data abstraction layer.
