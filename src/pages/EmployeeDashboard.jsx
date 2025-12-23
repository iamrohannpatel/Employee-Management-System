import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAttendance } from '../context/AttendanceContext';
import AttendanceButton from '../components/Attendance/AttendanceButton';
import AttendanceTable from '../components/Attendance/AttendanceTable';
import NFCScanner from '../components/Attendance/NFCScanner';
import MainLayout from '../components/Layout/MainLayout';

const EmployeeDashboard = () => {
    const { userData } = useAuth();
    const { getEmployeeAttendance, getTodayStatus, markAttendance } = useAttendance();
    const [attendanceHistory, setAttendanceHistory] = useState([]);

    useEffect(() => {
        if (userData?.data?.id) {
            setAttendanceHistory(getEmployeeAttendance(userData.data.id));
        }
    }, [userData, getEmployeeAttendance, markAttendance]);

    const status = userData?.data?.id ? getTodayStatus(userData.data.id) : 'not_marked';

    return (
        <MainLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Employee Dashboard</h2>
                    <p className="text-slate-500 text-sm mt-1">Personal performance & attendance hub</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 hidden sm:block">
                    <span className="text-blue-700 font-bold text-xs uppercase tracking-widest italic">User Active</span>
                </div>
            </div>

            {/* Attendance Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                {/* Left Column: Stats and Info */}
                <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                    <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm transition-all hover:shadow-md">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Attendance Status</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                                <span className="text-slate-500 font-medium text-sm">Today's Date</span>
                                <span className="text-slate-900 font-bold">{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                                <span className="text-slate-500 font-medium text-sm">Status</span>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${status === 'checked_out' ? 'bg-green-100 text-green-700' :
                                        status === 'checked_in' ? 'bg-amber-100 text-amber-700' :
                                            'bg-slate-100 text-slate-600'
                                    }`}>
                                    {status.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 rounded-3xl shadow-xl text-white relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                        <h2 className="text-xl font-bold mb-2 relative z-10">Quick Actions</h2>
                        <p className="text-white/70 text-sm mb-6 relative z-10">Use your mobile phone's NFC or the digital simulation to mark attendance.</p>
                        <div className="relative z-10">
                            <AttendanceButton />
                        </div>
                    </div>
                </div>

                {/* Middle Column: NFC Scanner */}
                <div className="lg:col-span-1">
                    <div className="h-full flex flex-col">
                        <NFCScanner
                            status={status}
                            onScan={() => {
                                const type = status === 'not_marked' ? 'in' : 'out';
                                markAttendance(userData.data.id, type, `SIM-NFC-${Math.random().toString(36).substring(7).toUpperCase()}`);
                                setAttendanceHistory(getEmployeeAttendance(userData.data.id));
                            }}
                        />
                    </div>
                </div>

                {/* Right Column: Mini History */}
                <div className="lg:col-span-1">
                    <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm h-full flex flex-col transition-all hover:shadow-md">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Records</h2>
                        <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                            {attendanceHistory.slice(0, 5).map(record => (
                                <div key={record.id} className="p-4 bg-slate-50 border border-slate-100/50 rounded-2xl hover:border-indigo-100 transition-all group">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-sm font-bold text-slate-900">{record.date}</span>
                                        <span className="text-[9px] text-slate-400 font-mono bg-white px-2 py-0.5 rounded-full border border-slate-100 group-hover:text-indigo-500 transition-colors uppercase">{record.id}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                        <div>
                                            <p className="text-slate-400 mb-1 flex items-center gap-1">
                                                <div className="w-1 h-1 bg-cyan-400 rounded-full" /> In
                                            </p>
                                            <span className="text-slate-900 font-bold">{record.inTime ? new Date(record.inTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 mb-1 flex items-center gap-1">
                                                <div className="w-1 h-1 bg-pink-400 rounded-full" /> Out
                                            </p>
                                            <span className="text-slate-900 font-bold">{record.outTime ? new Date(record.outTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {attendanceHistory.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                        <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-slate-400 text-sm italic">No records found yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Attendance History</h2>
                    <div className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter">{attendanceHistory.length} Total Records</div>
                </div>
                <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <AttendanceTable />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default EmployeeDashboard;
