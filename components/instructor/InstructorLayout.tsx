
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { InstructorView } from './InstructorDashboard';
import ThemeToggleButton from '../common/ThemeToggleButton';
import NotificationDropdown from '../common/NotificationDropdown';

const NavLink: React.FC<{
    label: string;
    icon: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive
                ? 'bg-primary/20 text-primary font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-primary/10 hover:text-primary dark:hover:text-primary font-medium'
        }`}
    >
        <span className="material-symbols-outlined">{icon}</span>
        <p className="text-sm leading-normal">{label}</p>
    </button>
);

interface InstructorLayoutProps {
    children: React.ReactNode;
    activeView: InstructorView;
    setActiveView: (view: InstructorView) => void;
}

const InstructorLayout: React.FC<InstructorLayoutProps> = ({ children, activeView, setActiveView }) => {
    const { user, logout, unreadCount } = useContext(AuthContext);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <div className="flex h-screen w-full">
            <aside className="flex w-64 flex-col bg-white dark:bg-[#1C252E] border-r border-gray-200 dark:border-gray-700/50">
                <div className="flex h-full flex-col justify-between p-4">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3 px-3">
                            <span className="material-symbols-outlined text-primary text-3xl">school</span>
                            <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-normal">E-Learn Instructor</h1>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <NavLink label="Dashboard" icon="dashboard" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
                            <NavLink label="My Courses" icon="book" isActive={activeView === 'courses'} onClick={() => setActiveView('courses')} />
                            <NavLink label="My Students" icon="group" isActive={activeView === 'students'} onClick={() => setActiveView('students')} />
                            <NavLink label="Settings" icon="settings" isActive={activeView === 'settings'} onClick={() => setActiveView('settings')} />
                        </nav>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700/50 pt-4 space-y-2">
                        <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-primary/10 hover:text-primary dark:hover:text-primary rounded-lg transition-colors">
                            <span className="material-symbols-outlined">logout</span>
                            <p className="text-sm font-medium leading-normal">Logout</p>
                        </button>
                         <div className="flex items-center gap-3 pt-2">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url('https://randomuser.me/api/portraits/women/68.jpg')` }}></div>
                            <div className="flex flex-col overflow-hidden">
                                <h1 className="text-base font-medium leading-normal text-text-light dark:text-text-dark truncate">{user?.name}</h1>
                                <p className="text-sm font-normal leading-normal text-text-muted-light dark:text-text-muted-dark truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-700/50 px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                    <h1 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-tight capitalize">{activeView.replace('_', ' ')}</h1>
                    <div className="flex items-center gap-3">
                        <ThemeToggleButton />
                        <div className="relative">
                            <button 
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white dark:bg-[#1C252E] text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors relative"
                            >
                                <span className="material-symbols-outlined">notifications</span>
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2.5 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                    </span>
                                )}
                            </button>
                            {isNotificationOpen && <NotificationDropdown onClose={() => setIsNotificationOpen(false)} />}
                        </div>
                    </div>
                </header>
                <div className="p-8 space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default InstructorLayout;
