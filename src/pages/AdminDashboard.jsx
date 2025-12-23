import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployee } from '../context/EmployeeContext';
import EmployeeTable from '../components/Employee/EmployeeTable';
import EmployeeForm from '../components/Employee/EmployeeForm';
import PayrollSummary from '../components/Payroll/PayrollSummary';
import MainLayout from '../components/Layout/MainLayout';

const AdminDashboard = () => {
    const { userData } = useAuth(); // Unused here but available if needed
    const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployee();
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('employees'); // 'employees' or 'payroll'

    const handleFormSubmit = (employeeData) => {
        if (editingEmployee) {
            updateEmployee(editingEmployee.id, employeeData);
            setEditingEmployee(null);
        } else {
            const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
            addEmployee({ ...employeeData, id: newId, taskCounts: { active: 0, newTask: 0, completed: 0, failed: 0 }, tasks: [] });
        }
        setShowForm(false);
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(id);
        }
    };

    return (
        <MainLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h2>
                    <p className="text-slate-500 text-sm mt-1">Overview of system performance and controls</p>
                </div>
                <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 hidden sm:block">
                    <span className="text-indigo-700 font-bold text-xs uppercase tracking-widest italic">Live System</span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 mr-4 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Employees</p>
                        <p className="text-3xl font-black text-slate-900">{employees.length}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <div className="p-3 bg-green-50 rounded-2xl text-green-600 mr-4 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payroll Status</p>
                        <p className="text-3xl font-black text-slate-900">Current</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center transition-all hover:shadow-lg hover:-translate-y-1 duration-300 sm:col-span-2 lg:col-span-1">
                    <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 mr-4 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Tasks</p>
                        <p className="text-3xl font-black text-slate-900">5</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-fit mb-6">
                <button
                    onClick={() => setActiveTab('employees')}
                    className={`whitespace-nowrap px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'employees'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                        }`}
                >
                    Employee Directory
                </button>
                <button
                    onClick={() => setActiveTab('payroll')}
                    className={`whitespace-nowrap px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === 'payroll'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                        }`}
                >
                    Financial Overview
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-8">
                {activeTab === 'employees' ? (
                    <>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h3 className="text-xl font-bold text-slate-900">Staff Management</h3>
                            <button
                                onClick={() => { setShowForm(!showForm); setEditingEmployee(null); }}
                                className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${showForm ? 'bg-slate-100 text-slate-600' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'}`}
                            >
                                {showForm ? (
                                    <><span>✕</span> Close Editor</>
                                ) : (
                                    <><span>+</span> Hire New Talent</>
                                )}
                            </button>
                        </div>

                        {showForm && (
                            <div className="mb-10 bg-slate-50 p-5 sm:p-8 rounded-3xl border border-slate-200">
                                <EmployeeForm
                                    employeeToEdit={editingEmployee}
                                    onSubmit={handleFormSubmit}
                                    onCancel={() => { setShowForm(false); setEditingEmployee(null); }}
                                />
                            </div>
                        )}

                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="min-w-full inline-block align-middle px-4 sm:px-0">
                                <EmployeeTable
                                    employees={employees}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <PayrollSummary />
                )}
            </div>
        </MainLayout>
    );
};

export default AdminDashboard;
