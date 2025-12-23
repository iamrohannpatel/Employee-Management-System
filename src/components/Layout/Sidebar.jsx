import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, CheckSquare, ClipboardList, UserCircle, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { userData } = useAuth();
    const role = userData?.role;

    if (!role) return null;

    const navItems = {
        admin: [
            { path: '/admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { path: '/tasks', label: 'Task Management', icon: CheckSquare },
        ],
        hr: [
            { path: '/hr-dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { path: '/tasks', label: 'Task Management', icon: CheckSquare },
        ],
        employee: [
            { path: '/employee-dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { path: '/tasks', label: 'My Tasks', icon: ClipboardList },
        ]
    };

    const links = navItems[role] || [];

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 w-72 bg-slate-950 text-white flex flex-col shadow-2xl z-40 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-20 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-xl shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <LayoutDashboard size={22} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight text-white leading-tight">EMS PRO</h2>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">{role} Panel</span>
                        </div>
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-6 py-4 overflow-y-auto">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 pl-2">Menu</p>

                    {links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => isOpen && toggleSidebar()}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                        ? 'bg-indigo-600/10 text-indigo-400'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.6)]"></div>}
                                        <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110'}`} />
                                        <span className={`font-medium text-sm tracking-wide ${isActive ? 'font-semibold' : ''}`}>{link.label}</span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-6 bg-slate-950">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800/50">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <UserCircle size={18} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-white truncate">TechNova Inc.</p>
                                <p className="text-[10px] text-slate-500 truncate">Enterprise Lic.</p>
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-600 text-center border-t border-slate-800 pt-2 mt-2">
                            © 2024 All rights reserved.
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
