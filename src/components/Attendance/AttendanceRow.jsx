import React from 'react';

const AttendanceRow = ({ record }) => {
    return (
        <tr className="hover:bg-blue-50/30 transition-all group">
            <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-sm font-bold text-slate-800">{record.date}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{record.id}</div>
            </td>
            <td className="px-6 py-5 whitespace-nowrap">
                <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-lg font-bold text-sm">
                    {record.inTime ? new Date(record.inTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </span>
            </td>
            <td className="px-6 py-5 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-lg font-bold text-sm ${record.outTime ? 'bg-pink-50 text-pink-700' : 'bg-slate-50 text-slate-300'}`}>
                    {record.outTime ? new Date(record.outTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </span>
            </td>
            <td className="px-6 py-5 whitespace-nowrap text-center">
                <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {record.inTagId || 'N/A'}
                </span>
            </td>
            <td className="px-6 py-5 whitespace-nowrap text-center">
                <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {record.outTagId || 'N/A'}
                </span>
            </td>
            <td className="px-6 py-5 whitespace-nowrap">
                {record.outTime ? (
                    <span className="px-4 py-1.5 inline-flex text-xs font-black rounded-full bg-green-100 text-green-700 uppercase tracking-tighter">
                        Completed
                    </span>
                ) : (
                    <span className="px-4 py-1.5 inline-flex text-xs font-black rounded-full bg-blue-100 text-blue-700 uppercase tracking-tighter animate-pulse">
                        Clocked In
                    </span>
                )}
            </td>
        </tr>
    );
};

export default AttendanceRow;
