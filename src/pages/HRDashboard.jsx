import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployee } from '../context/EmployeeContext';
import EmployeeTable from '../components/Employee/EmployeeTable';
import EmployeeForm from '../components/Employee/EmployeeForm';
import PayrollSummary from '../components/Payroll/PayrollSummary';
import MainLayout from '../components/Layout/MainLayout';

const HRDashboard = () => {
    const { userData } = useAuth(); // Unused here but available if needed
    const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployee();
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('employees');

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
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">HR Dashboard</h2>
                    <p className="text-slate-500 text-sm mt-1">Personnel management & operations hub</p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-emerald-700 font-bold text-[10px] uppercase tracking-widest">HR Active</span>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center transition-all hover:shadow-md">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Staff</p>
                        <p className="text-2xl font-black text-slate-900">{employees.length}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center transition-all hover:shadow-md">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Tasks</p>
                        <p className="text-2xl font-black text-slate-900">12</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
                    <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</p>
                        <p className="text-2xl font-black text-slate-900">3</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide space-x-2">
                <button
                    onClick={() => setActiveTab('employees')}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'employees'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                        : 'bg-white text-slate-500 border border-slate-100 hover:border-indigo-100 hover:text-indigo-600'
                        }`}
                >
                    Employee Hub
                </button>
                <button
                    onClick={() => setActiveTab('payroll')}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'payroll'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                        : 'bg-white text-slate-500 border border-slate-100 hover:border-indigo-100 hover:text-indigo-600'
                        }`}
                >
                    Payroll Center
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-8">
                {activeTab === 'employees' ? (
                    <>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h3 className="text-xl font-bold text-slate-900">Personnel Roster</h3>
                            <button
                                onClick={() => { setShowForm(!showForm); setEditingEmployee(null); }}
                                className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${showForm ? 'bg-slate-100 text-slate-600' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'}`}
                            >
                                {showForm ? (
                                    <><span>✕</span> Close Form</>
                                ) : (
                                    <><span>+</span> New Registration</>
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

export default HRDashboard;
