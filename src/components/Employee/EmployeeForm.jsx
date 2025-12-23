import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employeeToEdit, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        department: '',
        role: '',
        salary: '',
        rfid: ''
    });

    useEffect(() => {
        if (employeeToEdit) {
            setFormData(employeeToEdit);
        }
    }, [employeeToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);

        if (!employeeToEdit) {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                department: '',
                role: '',
                salary: '',
                rfid: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <h3 className="text-xl font-semibold text-slate-800 mb-6 border-b pb-2">
                {employeeToEdit ? 'Edit Employee Details' : 'Add New Employee'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="e.g. John"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="e.g. Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="john.doe@company.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <input
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="e.g. Engineering"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <input
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="e.g. Senior Developer"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Base Salary ($)</label>
                    <input
                        name="salary"
                        type="number"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="80000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">RFID Tag ID</label>
                    <input
                        name="rfid"
                        value={formData.rfid}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="RFID-XXXX"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                >
                    {employeeToEdit ? 'Update Employee' : 'Create Employee'}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 bg-white text-slate-700 border border-slate-300 rounded-md font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors shadow-sm"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default EmployeeForm;
