import React from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { useAuth } from '../../context/AuthContext';
import AttendanceRow from './AttendanceRow';

const AttendanceTable = ({ records }) => {
    const { userData } = useAuth();
    const { getEmployeeAttendance } = useAttendance();

    // Use passed records or fetch from context
    const data = records || (userData?.data?.id ? getEmployeeAttendance(userData.data.id) : []);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Date / ID</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Check In</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Check Out</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest text-center">In Tag</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Out Tag</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 italic-last-row">
                    {data.length > 0 ? (
                        data.map(record => <AttendanceRow key={record.id} record={record} />)
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-12 text-center">
                                <p className="text-slate-400 font-medium">No attendance records found for this period.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
