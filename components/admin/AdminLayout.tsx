
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { AdminView } from './AdminDashboard';
import ThemeToggleButton from '../common/ThemeToggleButton';
import { ArticleIcon } from '../icons';
import NotificationDropdown from '../common/NotificationDropdown';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeView: AdminView;
    setActiveView: (view: AdminView) => void;
}

const NavLink: React.FC<{
    label: string;
    icon: string | React.ReactNode;
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
        {typeof icon === 'string' ? <span className="material-symbols-outlined">{icon}</span> : icon}
        <p className="text-sm leading-normal">{label}</p>
    </button>
);


const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeView, setActiveView }) => {
    const { logout, unreadCount } = useContext(AuthContext);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <div className="flex h-screen w-full">
            {/* SideNavBar */}
            <aside className="flex w-64 flex-col bg-white dark:bg-[#1C252E] border-r border-gray-200 dark:border-gray-700/50">
                <div className="flex h-full flex-col justify-between p-4">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3 px-3">
                            <span className="material-symbols-outlined text-primary text-3xl">school</span>
                            <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-normal">E-Learn Admin</h1>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <NavLink label="Dashboard" icon="dashboard" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
                            <NavLink label="Users" icon="group" isActive={activeView === 'users'} onClick={() => setActiveView('users')} />
                            <NavLink label="Courses" icon="book" isActive={activeView === 'courses'} onClick={() => setActiveView('courses')} />
                            <NavLink label="Content CMS" icon={<ArticleIcon className="w-6 h-6" />} isActive={activeView === 'manage_content'} onClick={() => setActiveView('manage_content')} />
                            <NavLink label="Certificates" icon="military_tech" isActive={activeView === 'certificates'} onClick={() => setActiveView('certificates')} />
                            <NavLink label="Schedule" icon="calendar_month" isActive={activeView === 'schedule'} onClick={() => setActiveView('schedule')} />
                            <NavLink label="Payments" icon="credit_card" isActive={activeView === 'payments'} onClick={() => setActiveView('payments')} />
                            <NavLink label="Site Settings" icon="tune" isActive={activeView === 'site_settings'} onClick={() => setActiveView('site_settings')} />
                            <NavLink label="Changelog" icon="history" isActive={activeView === 'changelog'} onClick={() => setActiveView('changelog')} />
                            <NavLink label="Account Settings" icon="settings" isActive={activeView === 'account_settings'} onClick={() => setActiveView('account_settings')} />
                        </nav>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700/50 pt-4">
                        <button onClick={logout} className="flex w-full items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-primary/10 hover:text-primary dark:hover:text-primary rounded-lg transition-colors">
                            <span className="material-symbols-outlined">logout</span>
                            <p className="text-sm font-medium leading-normal">Logout</p>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* TopNavBar */}
                <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-700/50 px-8 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                    <label className="relative flex min-w-40 !h-10 w-full max-w-sm">
                        <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2">search</span>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1C252E] h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10 pr-4 text-sm font-normal leading-normal" placeholder="Search users, courses..." />
                    </label>
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
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNPi5OSDXPesXB1aYVGF0GIU38RUkHCwLZhWopmzU6uRNgC84X8GJCP9VPTxZ1XTbirGCiFvJsakc1zHY0m4A46KkJsKERdrkzniL9kU2bS1hnU81gwzAOFeklg_wqCw1ttjbyGO9puGL0MCdN68j3FzmBndaD7wqGFpy9DlQtfqVDhQ0spX8QC0UU2EuPojBSaCF1t_8qLJXkhnyrIHkjM1PaN-SyZP3snH9CMrkk4-9j30nhqszx5krAJUab2BfPf0gpRaaHGWVH")' }}></div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
