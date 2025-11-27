
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { StudentView } from './StudentDashboard';
import { 
    DashboardIcon, CoursesIcon, CalendarIcon, CertificatesIcon, HelpIcon, SettingsIcon, SearchIcon, NotificationsIcon, PlayCircleIcon
} from '../icons';
import NavItem from '../common/NavItem';
import ThemeToggleButton from '../common/ThemeToggleButton';
import NotificationDropdown from '../common/NotificationDropdown';

interface StudentLayoutProps {
    children: React.ReactNode;
    activeView: StudentView;
    setActiveView: (view: StudentView) => void;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children, activeView, setActiveView }) => {
    const { user, logout, unreadCount } = useContext(AuthContext);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full">
            <aside className="flex h-screen w-64 flex-col bg-card-light dark:bg-card-dark border-r border-border-light dark:border-border-dark sticky top-0">
                <div className="flex items-center gap-3 px-6 h-20 border-b border-border-light dark:border-border-dark">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                       <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">LearnSpace</h2>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                    <div className="flex flex-col gap-2">
                        <NavItem icon={<DashboardIcon className="text-2xl" />} label="Dashboard" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
                        <NavItem icon={<CoursesIcon className="text-2xl" />} label="Courses" isActive={activeView === 'courses'} onClick={() => setActiveView('courses')} />
                        <NavItem icon={<CalendarIcon className="text-2xl" />} label="Schedule" isActive={activeView === 'schedule'} onClick={() => setActiveView('schedule')} />
                        <NavItem icon={<CertificatesIcon className="text-2xl" />} label="Certificates" isActive={activeView === 'certificates'} onClick={() => setActiveView('certificates')} />
                        <NavItem icon={<HelpIcon className="text-2xl" />} label="Help" isActive={activeView === 'help'} onClick={() => setActiveView('help')} />
                        <NavItem icon={<SettingsIcon className="text-2xl" />} label="Settings" isActive={activeView === 'settings'} onClick={() => setActiveView('settings')} />
                    </div>
                    <div className="flex flex-col gap-2">
                         <button onClick={logout} className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:bg-secondary-light dark:hover:bg-secondary-dark text-sm font-medium">
                            <span className="material-symbols-outlined text-2xl">logout</span>
                            Logout
                         </button>
                        <div className="flex items-center gap-3 border-t border-border-light dark:border-border-dark pt-4">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmV6SljOK0D1XZV06H2XaP8gVJwNhMsTCAR1Mk5mNZnDm6UzXoySSzs9WEzg71dPaCZ44E-pTPn6GDTZ5hlhsEH9O4FVY6IJwuB2iHl6eccoZOJv3iTWKl3QFs6aeeesSRifZez0FPlpX1Owwtw7xHDRC0hFllMGkw4oQ5r3hG2_o9muOBXS9KFOjiT_faT-lbj5nDdf42RwzkoB3t3DR2hRpgLjo1Ycibh3PytWbFgnALRTJLsYKN2B2hFcbYinwUQVE6ZZP5qK7O")' }}></div>
                            <div className="flex flex-col overflow-hidden">
                                <h1 className="text-base font-medium leading-normal text-text-light dark:text-text-dark truncate">{user?.name}</h1>
                                <p className="text-sm font-normal leading-normal text-text-muted-light dark:text-text-muted-dark truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-8 h-20">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark capitalize">{activeView.replace('_', ' ')}</h1>
                    </div>
                    <div className="flex flex-1 justify-end items-center gap-4">
                        <ThemeToggleButton />
                        <div className="relative">
                            <button 
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-secondary-light dark:bg-secondary-dark text-text-muted-light dark:text-text-muted-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                            >
                                <NotificationsIcon className="text-2xl" />
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
                <div className="p-6 sm:p-8 lg:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default StudentLayout;
