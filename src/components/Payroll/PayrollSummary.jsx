import React from 'react';
import { useEmployee } from '../../context/EmployeeContext';
import { useAttendance } from '../../context/AttendanceContext';
import { calculatePayableSalary, getDaysPresent } from '../../utils/payrollUtils';
import { generatePayslip } from '../../utils/pdfGenerator';

const PayrollSummary = () => {
    const { employees } = useEmployee();
    const { attendanceRecords } = useAttendance();

    const handleDownloadPayslip = (employee, daysPresent, payable) => {
        const currentDate = new Date();
        const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        generatePayslip(
            employee,
            { daysPresent, payable },
            monthYear
        );
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Monthly Payroll Summary</h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-slate-100 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Employee Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Base Salary</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Days Present</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Payable Salary</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {employees.length > 0 ? (
                            employees.map(employee => {
                                const daysPresent = getDaysPresent(employee.id, attendanceRecords);
                                const payable = calculatePayableSalary(employee.salary, daysPresent);

                                return (
                                    <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{employee.firstName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{employee.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${employee.salary}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{daysPresent}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                                            ${payable}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => handleDownloadPayslip(employee, daysPresent, payable)}
                                                className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 transition-colors shadow-sm"
                                            >
                                                Download Payslip
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-slate-500">No Employees Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayrollSummary;
