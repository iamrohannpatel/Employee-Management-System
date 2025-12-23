import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, Search, Bell, LogOut } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
    const { userData, logout } = useAuth();

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 h-20 flex items-center justify-between px-6 sm:px-10 z-20 sticky top-0">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors md:hidden"
                    aria-label="Toggle Navigation"
                >
                    <Menu size={24} />
                </button>

                {/* Search Bar - Modern Placeholder */}
                <div className="hidden md:flex items-center relative w-full max-w-md ml-4">
                    <Search className="absolute left-3 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for employees, tasks, or files..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-slate-700 placeholder-slate-400 font-medium"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
                {/* Notifications */}
                <button className="relative p-2.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-all">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* Divider */}
                <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

                {/* Profile Section */}
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-800 leading-none">{userData?.data?.firstName || 'User'}</p>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1">{userData?.role}</p>
                    </div>

                    <div className="relative group cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-700 font-bold text-lg overflow-hidden">
                            {userData?.data?.firstName ? userData.data.firstName[0] : 'U'}
                        </div>

                        {/* Hover functionality could go here, for now we keep the button separate or make this the trigger */}
                    </div>

                    <button
                        onClick={logout}
                        className="ml-2 p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
