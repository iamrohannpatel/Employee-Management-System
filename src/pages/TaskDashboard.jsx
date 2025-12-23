import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import TaskForm from '../components/Task/TaskForm';
import TaskList from '../components/Task/TaskList';
import MainLayout from '../components/Layout/MainLayout';

const TaskDashboard = () => {
    const { userData } = useAuth();

    if (!userData) return <MainLayout><p className="text-slate-600 p-6">Loading...</p></MainLayout>;

    const user = userData;
    const isAdminOrHR = user.role === 'admin' || user.role === 'hr';

    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Task Management</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                {isAdminOrHR && (
                    <div className="mb-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <TaskForm />
                    </div>
                )}
                <TaskList />
            </div>
        </MainLayout>
    );
};

export default TaskDashboard;
