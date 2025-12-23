import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { useEmployee } from '../../context/EmployeeContext';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = () => {
    const { addTask } = useTask();
    const { employees } = useEmployee();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !assignedTo) return;

        const assignedEmployee = employees.find(emp => emp.id === assignedTo);

        const newTask = {
            id: uuidv4(),
            title,
            description,
            assignedTo,
            assignedToName: assignedEmployee ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}` : 'Unknown',
            status: 'Open',
            createdAt: new Date().toISOString()
        };

        addTask(newTask);

        // Reset form
        setTitle('');
        setDescription('');
        setAssignedTo('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Create New Task</h3>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm min-h-[80px]"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign To</label>
                <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                            {emp.firstName} {emp.lastName} ({emp.role})
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
                Assign Task
            </button>
        </form>
    );
};

export default TaskForm;
