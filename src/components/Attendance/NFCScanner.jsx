import React, { useState, useEffect } from 'react';

const NFCScanner = ({ onScan, status }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleStartScan = () => {
        if (status === 'checked_out') return;
        setIsScanning(true);
        setScanProgress(0);
    };

    useEffect(() => {
        let interval;
        if (isScanning && scanProgress < 100) {
            interval = setInterval(() => {
                setScanProgress((prev) => {
                    const next = prev + 5;
                    if (next >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setIsScanning(false);
                            setShowSuccess(true);
                            onScan();
                            setTimeout(() => setShowSuccess(false), 3000);
                        }, 500);
                        return 100;
                    }
                    return next;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isScanning, scanProgress, onScan]);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-cyan-500/20">
            <div className="relative w-48 h-48 mb-8">
                {/* Outer Ring */}
                <div className={`absolute inset-0 border-4 rounded-full transition-all duration-700 ${isScanning ? 'border-cyan-400 animate-pulse scale-110' : 'border-slate-700'}`}></div>

                {/* Scanner Core */}
                <div className={`absolute inset-4 rounded-full flex items-center justify-center bg-slate-800 transition-all duration-500 ${isScanning ? 'bg-slate-700' : ''}`}>
                    {showSuccess ? (
                        <svg className="w-20 h-20 text-green-400 animate-[bounce_0.5s_ease-in-out_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <div className="relative">
                            <svg className={`w-20 h-20 transition-colors duration-500 ${isScanning ? 'text-cyan-400' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-4.44-5.026c1.611-1.043 3.613-1.619 5.638-1.545m4.512 8.127a11.315 11.315 0 01-4.836 1.372m3.677-10.182C15.59 10.02 16 8.075 16 6c0-4.418-3.582-8-8-8S0 3.582 0 8c0 2.075.41 4.02 1.159 5.791m4.733 4.041A9.969 9.969 0 008 18c.83 0 1.639-.101 2.41-.29m4.512-8.127A7.965 7.965 0 0016 6c0-1.304-.312-2.536-.864-3.621m-1.42 12.001A7.965 7.965 0 0116 6c0-1.304-.312-2.536-.864-3.621m-8.272 13.621l-.472.472a3 3 0 01-4.242 0 3 3 0 010-4.242l.472-.472" />
                            </svg>
                            {isScanning && (
                                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-ping"></div>
                            )}
                        </div>
                    )}
                </div>

                {/* Scanning Beam */}
                {isScanning && (
                    <div
                        className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-[scan_2s_linear_infinite]"
                        style={{ top: `${scanProgress}%` }}
                    ></div>
                )}
            </div>

            <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                    {status === 'not_marked' ? 'Ready to Check-In' : status === 'checked_in' ? 'Ready to Check-Out' : 'Day Completed'}
                </h3>
                <p className="text-slate-400 mb-6 px-4">
                    {isScanning ? 'Scanning tag...' : showSuccess ? 'Recognition successful!' : 'Bring your NFC device or card near the scanner.'}
                </p>

                {status !== 'checked_out' && (
                    <button
                        onClick={handleStartScan}
                        disabled={isScanning || showSuccess}
                        className={`group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-semibold text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <span className="relative z-10">Simulate NFC Scan</span>
                        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                )}

                {status === 'checked_out' && (
                    <div className="px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 font-medium">
                        Attendance recorded for today
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default NFCScanner;
