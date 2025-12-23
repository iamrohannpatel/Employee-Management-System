import React from 'react';
import { useTask } from '../../context/TaskContext';

const TaskCard = ({ task, isEditable }) => {
    const { updateTaskStatus } = useTask();

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'Open': return 'border-l-yellow-500';
            case 'In Progress': return 'border-l-blue-500';
            case 'Completed': return 'border-l-green-500';
            default: return 'border-l-slate-400';
        }
    };

    const getStatusTextClass = (status) => {
        switch (status) {
            case 'Open': return 'text-yellow-600';
            case 'In Progress': return 'text-blue-600';
            case 'Completed': return 'text-green-600';
            default: return 'text-slate-500';
        }
    };

    return (
        <div className={`bg-white rounded-lg p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow border-l-4 ${getStatusColorClass(task.status)}`}>
            <h3 className="text-lg font-semibold text-slate-800 mb-2 truncate" title={task.title}>{task.title}</h3>
            <p className="text-slate-600 text-sm mb-4 h-10 overflow-hidden line-clamp-2" title={task.description}>{task.description}</p>

            <div className="flex justify-between items-center text-xs mb-3">
                <span className="text-slate-500 font-medium">Assigned to: <span className="text-slate-700">{task.assignedToName || 'Unknown'}</span></span>
                <span className={`font-bold ${getStatusTextClass(task.status)}`}>{task.status}</span>
            </div>

            {isEditable && (
                <div className="mt-2">
                    <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className="w-full text-sm p-2 rounded-md border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
