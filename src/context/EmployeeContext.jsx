import React, { createContext, useState, useEffect, useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const EmployeeContext = createContext();

export const useEmployee = () => {
    return useContext(EmployeeContext);
};

const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Sync with localStorage on mount (assuming AuthContext initializes it)
        const storedEmployees = getLocalStorage('employees');
        if (storedEmployees) {
            setEmployees(storedEmployees);
        }
    }, []);

    // CRUD Operations
    const addEmployee = (newEmployee) => {
        setEmployees(prev => {
            const updated = [...prev, newEmployee];
            setLocalStorage('employees', updated);
            return updated;
        });
    };

    const updateEmployee = (id, updatedData) => {
        setEmployees(prev => {
            const updated = prev.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp);
            setLocalStorage('employees', updated);
            return updated;
        });
    };

    const deleteEmployee = (id) => {
        setEmployees(prev => {
            const updated = prev.filter(emp => emp.id !== id);
            setLocalStorage('employees', updated);
            return updated;
        });
    };

    return (
        <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee, updateEmployee, deleteEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export default EmployeeProvider;
