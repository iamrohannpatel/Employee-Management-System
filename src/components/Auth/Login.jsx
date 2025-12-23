import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const result = await login(email, password);
            if (result.success) {
                // Determine destination based on role
                const { role } = result;
                if (role === 'admin') navigate('/admin-dashboard');
                else if (role === 'hr') navigate('/hr-dashboard');
                else if (role === 'employee') navigate('/employee-dashboard');
                else navigate('/'); // Fallback
            } else {
                setError(result.message || 'Invalid email or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
            {/* Branding Section - Minimalistic & Elegant */}
            <div className="w-full lg:w-1/2 min-h-[40vh] lg:min-h-screen bg-[#0a0c10] text-white relative flex flex-col justify-center lg:justify-between p-8 lg:p-16 transition-all duration-700 shrink-0 overflow-hidden">
                {/* Subtle Geometric Background Elements */}
                {/* Subtle Geometric Background Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-screen"></div>
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

                {/* Grid Overlay for Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

                {/* Logo & Header - Premium & Elegant */}
                <div className="relative z-10 flex flex-col items-start animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] group cursor-pointer transition-all duration-500 hover:scale-105 hover:border-indigo-500/30 hover:shadow-indigo-500/20">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                </svg>
                            </div>
                        </div>
                        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                        <div>
                            <h1 className="text-3xl font-extralight tracking-[0.2em] text-white leading-none">
                                EMS
                                <span className="font-bold relative ml-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-indigo-200 animate-gradient">
                                    PRO
                                    <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                                </span>
                            </h1>
                            <p className="text-[10px] text-indigo-300/80 font-medium tracking-[0.3em] uppercase mt-1 ml-1">Enterprise Edition</p>
                        </div>
                    </div>
                </div>

                {/* Main Content - Minimalist Centerpiece */}
                <div className="relative z-10 mt-8 lg:mt-0 lg:mb-20 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                    <div className="space-y-2">
                        <span className="text-indigo-400 text-[10px] lg:text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-80">Easy and Efficient</span>
                        <h2 className="text-4xl lg:text-7xl font-extralight leading-[1.1] tracking-tighter text-white/95">
                            Workforce <br />
                            <span className="font-black italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">Management.</span>
                        </h2>
                    </div>
                    <div className="w-12 h-[2px] bg-indigo-500 my-8 lg:my-10 opacity-50"></div>
                    <p className="text-slate-400 text-sm lg:text-lg max-w-sm leading-relaxed font-light">
                        Manage workforce efficiently through <span className="text-white/80 font-medium">minimalist design</span> and powerful features.
                    </p>
                </div>

                {/* Navigation Hint or Credit - Minimalist */}
                <div className="relative z-10 hidden lg:flex items-center gap-6 text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold animate-in fade-in duration-1000 delay-700">
                    <span className="hover:text-indigo-400 cursor-pointer transition-colors">Security</span>
                    <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                    <span className="hover:text-indigo-400 cursor-pointer transition-colors">Performance</span>
                    <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                    <span className="text-slate-600">© 2024 Obzen Technolabs</span>
                </div>
            </div>

            {/* Login Form Section - Compact & No Scroll */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white flex-1">
                <div className="w-full max-w-sm lg:max-w-md space-y-4 lg:space-y-6">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">Sign In</h2>
                        <p className="text-slate-500 mt-1 text-sm lg:text-base">Enter your credentials below</p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-sm text-xs lg:text-sm flex items-center">
                            <span className="mr-2">⚠️</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 text-sm lg:text-base"
                                placeholder="name@company.com"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
                                <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Forgot?</a>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 text-sm lg:text-base"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-slate-600 text-xs font-medium cursor-pointer">Stay signed in</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-indigo-500/20 transition-all active:scale-[0.98] outline-none focus:ring-4 focus:ring-indigo-500/30 text-base lg:text-lg"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Quick Login - Compact Buttons */}
                    <div className="pt-4 border-t border-slate-100">
                        <p className="text-[10px] text-center text-slate-400 mb-3 uppercase tracking-wider font-bold underline underline-offset-4 decoration-indigo-200">Test Accounts</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={() => { setEmail('admin@ems.com'); setPassword('123456') }}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] sm:text-xs font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
                            >
                                Admin
                            </button>
                            <button
                                onClick={() => { setEmail('hr@ems.com'); setPassword('123456') }}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] sm:text-xs font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
                            >
                                HR Team
                            </button>
                            <button
                                onClick={() => { setEmail('employee@ems.com'); setPassword('123456') }}
                                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] sm:text-xs font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
                            >
                                Employee
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
