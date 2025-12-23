import React, { createContext, useState, useEffect, useContext } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const TaskContext = createContext();

export const useTask = () => {
    return useContext(TaskContext);
};

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedTasks = getLocalStorage('tasks');
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    const addTask = (newTask) => {
        setTasks(prev => {
            const updated = [...prev, newTask];
            setLocalStorage('tasks', updated);
            return updated;
        });
    };

    const updateTaskStatus = (id, newStatus) => {
        setTasks(prev => {
            const updated = prev.map(task =>
                task.id === id ? { ...task, status: newStatus } : task
            );
            setLocalStorage('tasks', updated);
            return updated;
        });
    };

    const deleteTask = (id) => {
        setTasks(prev => {
            const updated = prev.filter(task => task.id !== id);
            setLocalStorage('tasks', updated);
            return updated;
        });
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
