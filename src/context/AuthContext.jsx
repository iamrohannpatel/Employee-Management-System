import React, { createContext, useState, useEffect, useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { adminData, employeesData, hrData } from '../utils/mockData';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Initialize mock data in localStorage if not present or empty
        const storedEmployees = getLocalStorage('employees');
        const storedAdmin = getLocalStorage('admin');
        const storedHR = getLocalStorage('hr');

        if (!storedEmployees || storedEmployees.length === 0) {
            setLocalStorage('employees', employeesData);
        }
        if (!storedAdmin || storedAdmin.length === 0) {
            setLocalStorage('admin', adminData);
        }
        if (!storedHR || storedHR.length === 0) {
            setLocalStorage('hr', hrData);
        }

        // Check for logged in user
        const loggedInUser = getLocalStorage('loggedInUser');
        if (loggedInUser) {
            setUserData(loggedInUser);
        }
    }, []);

    const login = (email, password) => {
        // Admin Login
        if (email === 'admin@ems.com' && password === '123456') {
            const user = { role: 'admin', data: { email: 'admin@ems.com', id: 'admin1' } };
            setUserData(user);
            setLocalStorage('loggedInUser', user);
            return { success: true, role: 'admin' };
        }

        // HR Login
        if (email === 'hr@ems.com' && password === '123456') {
            const user = { role: 'hr', data: { email: 'hr@ems.com', id: 'hr1' } };
            setUserData(user);
            setLocalStorage('loggedInUser', user);
            return { success: true, role: 'hr' };
        }

        // Employee Login (Direct Mock Credential)
        if (email === 'employee@ems.com' && password === '123456') {
            // Find the first employee to map this generic login to
            const firstEmp = employeesData[0] || { email: 'employee@ems.com', id: 'emp1', firstName: 'Employee' };
            const user = { role: 'employee', data: firstEmp };
            setUserData(user);
            setLocalStorage('loggedInUser', user);
            return { success: true, role: 'employee' };
        }


        // Fallback: Check existing mock data in localStorage
        const storedEmployees = getLocalStorage('employees');
        let employees = (storedEmployees && storedEmployees.length > 0) ? storedEmployees : employeesData;
        let employee = employees.find(e => e.email === email && e.password === password);

        // Final fallback to mockData if not in local storage yet (for robustness)
        if (!employee) {
            employee = employeesData.find(e => e.email === email && e.password === password);
        }

        if (employee) {
            const user = { role: 'employee', data: employee };
            setUserData(user);
            setLocalStorage('loggedInUser', user);
            return { success: true, role: 'employee' };
        }

        // Also check Admin/HR from mock arrays if they were modified/created dynamically
        const storedHR = getLocalStorage('hr');
        const hrs = (storedHR && storedHR.length > 0) ? storedHR : hrData;
        const hr = hrs.find(h => h.email === email && h.password === password);
        if (hr) {
            const user = { role: 'hr', data: hr };
            setUserData(user);
            setLocalStorage('loggedInUser', user);
            return { success: true, role: 'hr' };
        }

        return { success: false, message: 'Invalid credentials' };
    };

    const logout = () => {
        setUserData(null);
        setLocalStorage('loggedInUser', null);
    };

    return (
        <AuthContext.Provider value={{ userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
