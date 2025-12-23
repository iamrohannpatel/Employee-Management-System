import React from 'react';
import { useAttendance } from '../../context/AttendanceContext';
import { useAuth } from '../../context/AuthContext';

const AttendanceButton = () => {
    const { userData } = useAuth();
    const { markAttendance, getTodayStatus } = useAttendance();

    if (!userData) return null;

    const status = getTodayStatus(userData.data.id);

    const handleClick = () => {
        if (status === 'not_marked') {
            markAttendance(userData.data.id, 'in');
        } else if (status === 'checked_in') {
            markAttendance(userData.data.id, 'out');
        }
    };

    if (status === 'checked_out') {
        return (
            <button disabled className="w-full px-6 py-4 bg-green-50 text-green-600 border border-green-200 rounded-2xl font-bold cursor-not-allowed flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span>Attendance Complete</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`w-full px-6 py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 shadow-lg flex items-center justify-center space-x-2 ${status === 'checked_in'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:shadow-rose-200'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-emerald-200'
                }`}
        >
            {status === 'checked_in' ? (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    <span>Manual Check Out</span>
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    <span>Manual Check In</span>
                </>
            )}
        </button>
    );
};

export default AttendanceButton;
