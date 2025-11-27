
import React, { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface NotificationDropdownProps {
    onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
    const { notifications, markAsRead, markAllAsRead, clearNotifications } = useContext(AuthContext);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <span className="material-symbols-outlined text-green-500">check_circle</span>;
            case 'warning': return <span className="material-symbols-outlined text-yellow-500">warning</span>;
            case 'error': return <span className="material-symbols-outlined text-red-500">error</span>;
            default: return <span className="material-symbols-outlined text-blue-500">info</span>;
        }
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-card-light dark:bg-card-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark z-50 overflow-hidden animate-fade-in-up origin-top-right">
            <div className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                <h3 className="font-bold text-lg text-text-light dark:text-text-dark">Notifications</h3>
                <div className="flex gap-2">
                    {notifications.length > 0 && (
                        <>
                            <button onClick={markAllAsRead} className="text-xs font-medium text-primary hover:underline">Mark all read</button>
                            <button onClick={clearNotifications} className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark hover:text-red-500">Clear</button>
                        </>
                    )}
                </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-text-muted-light dark:text-text-muted-dark flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-4xl opacity-50">notifications_off</span>
                        <p>No notifications yet.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border-light dark:divide-border-dark">
                        {notifications.map((notification) => (
                            <div 
                                key={notification.id} 
                                onClick={() => markAsRead(notification.id)}
                                className={`p-4 flex gap-3 hover:bg-secondary-light dark:hover:bg-secondary-dark cursor-pointer transition-colors ${!notification.read ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                            >
                                <div className="flex-shrink-0 mt-1">
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <p className={`text-sm font-semibold ${!notification.read ? 'text-text-light dark:text-text-dark' : 'text-text-muted-light dark:text-text-muted-dark'}`}>
                                            {notification.title}
                                        </p>
                                        <span className="text-xs text-text-muted-light dark:text-text-muted-dark whitespace-nowrap flex-shrink-0">
                                            {formatDate(notification.date)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1 line-clamp-2">
                                        {notification.message}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="flex-shrink-0 self-center">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {notifications.length > 0 && (
                <div className="p-2 bg-background-light dark:bg-background-dark text-center border-t border-border-light dark:border-border-dark">
                    <button className="text-xs font-medium text-primary hover:underline">View All History</button>
                </div>
            )}
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default NotificationDropdown;
