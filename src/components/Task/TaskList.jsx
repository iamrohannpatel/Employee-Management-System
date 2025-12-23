import React from 'react';
import { useTask } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import TaskCard from './TaskCard';

const TaskList = () => {
    const { tasks } = useTask();
    const { userData } = useAuth();

    // Safety check if userData is null (e.g. reload before auth check completes)
    if (!userData) return <p className="text-slate-600">Loading...</p>;

    const user = userData;

    // Filter tasks: Admin/HR sees all, Employee sees only theirs
    const filteredTasks = (user.role === 'admin' || user.role === 'hr')
        ? tasks
        : tasks.filter(task => task.assignedTo === user.data.id);

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Task List</h3>
            {filteredTasks.length === 0 ? (
                <p className="text-slate-500 italic">No tasks found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTasks.map(task => (
                        <TaskCard key={task.id} task={task} isEditable={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
