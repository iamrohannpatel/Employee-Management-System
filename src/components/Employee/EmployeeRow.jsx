import React from 'react';

const EmployeeRow = ({ employee, onEdit, onDelete }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{employee.firstName} {employee.lastName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.department}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.role}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${employee.salary}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.rfid}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                <button
                    onClick={() => onEdit(employee)}
                    className="mr-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors font-medium"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(employee.id)}
                    className="px-3 py-1 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors font-medium"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default EmployeeRow;
