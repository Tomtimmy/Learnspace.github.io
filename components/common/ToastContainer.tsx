
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useContext(AuthContext);

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl text-white transition-all duration-300 animate-slide-in transform hover:scale-105 ${
                        toast.type === 'success' ? 'bg-green-600' :
                        toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                    }`}
                >
                    <span className="material-symbols-outlined text-2xl">
                        {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
                    </span>
                    <p className="text-sm font-semibold leading-snug max-w-xs">{toast.message}</p>
                    <button onClick={() => removeToast(toast.id)} className="opacity-70 hover:opacity-100 ml-2 p-1 rounded-full hover:bg-white/20 transition-colors">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>
            ))}
             <style>{`
                @keyframes slide-in {
                    from { transform: translateX(100%) translateY(20px); opacity: 0; }
                    to { transform: translateX(0) translateY(0); opacity: 1; }
                }
                .animate-slide-in {
                    animation: slide-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
            `}</style>
        </div>
    );
};

export default ToastContainer;
