
import React, { useState } from 'react';
import AddUserModal from './AddUserModal';

interface AdminWelcomeProps {
    onCreateCourse: () => void;
}

const AdminWelcome: React.FC<AdminWelcomeProps> = ({ onCreateCourse }) => {
    const [activeTab, setActiveTab] = useState('activity');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    
    return (
        <>
            {/* PageHeading */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Welcome back, Admin! Here's a summary of platform activity.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsAddUserModalOpen(true)} className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-semibold transition-colors hover:bg-primary/90">
                        <span className="material-symbols-outlined text-base">person_add</span>
                        Add New User
                    </button>
                    <button onClick={onCreateCourse} className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-[#1C252E] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                        <span className="material-symbols-outlined text-base">post_add</span>
                        Create Course
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50">
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">Total Active Users</p>
                    <div className="flex items-end gap-2">
                        <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">1,245</p>
                        <p className="text-green-500 dark:text-green-400 text-sm font-medium leading-normal flex items-center"><span className="material-symbols-outlined text-base">arrow_upward</span>5.2%</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50">
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">Total Enrolled Courses</p>
                    <div className="flex items-end gap-2">
                        <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">89</p>
                        <p className="text-green-500 dark:text-green-400 text-sm font-medium leading-normal flex items-center"><span className="material-symbols-outlined text-base">arrow_upward</span>2.1%</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50">
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">Monthly Revenue</p>
                    <div className="flex items-end gap-2">
                        <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">$12,580</p>
                        <p className="text-green-500 dark:text-green-400 text-sm font-medium leading-normal flex items-center"><span className="material-symbols-outlined text-base">arrow_upward</span>10.3%</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50">
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">Pending Registrations</p>
                    <div className="flex items-end gap-2">
                        <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">15</p>
                        <p className="text-orange-500 dark:text-orange-400 text-sm font-medium leading-normal flex items-center"><span className="material-symbols-outlined text-base">arrow_upward</span>3</p>
                    </div>
                </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50 rounded-xl">
                    <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Growth</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Sign-ups over the last 30 days</p>
                    </div>
                    <div className="w-full h-64 flex items-center justify-center">
                        <img className="w-full h-full object-contain" alt="A line chart showing user growth over the last 30 days with a positive upward trend." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLT5LSbyW-R5HIwkDhVfN-tVqUxpjI3ykTEnLuprjBkX_VS_RTbtkv1x-ofnWfNA2kFQUD0Zux8McaVVFTaqMDiVzLObHuq2UlSY0AAqltVT96aEK5kPNjO3WCvDQTwf_QBHmm27_Dg4Z7FuhHRi8AB6GcU2qSOz0E_VR6vzb_ZBTchKxzVOus03rcPagQ0tfuoSAgPHSnAs5ZAWSZ3gLGNflMvGr96hKJlXpgA586vmUOcCW3z9dXxAT0HUxDrVvQne4V9PVqK-d1"/>
                    </div>
                </div>
                <div className="lg:col-span-2 p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50 rounded-xl">
                    <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Income per month for this year</p>
                    </div>
                    <div className="w-full h-64 flex items-center justify-center">
                        <img className="w-full h-full object-contain" alt="A bar chart showing monthly revenue, with March and June being the highest earning months." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB23Sub2msycVNfUCnZJ0GE1rr0b2OnGOcq5lXdbBkkNHWihtPOlGPs4M5kNLSmA4Z0dS5SmxBgOFVkxMJysyb6fRYhO8SSM-J_7qquvXys6uQS2qDW3W0CaPzKvFVJg8pZ6u63SkXs9-0j_zUXvQaCxi_WMos-O5nRgHExgtKXrBFa214KIfIL8VpVS2QXA-SdTnGvBXPmDPJDRGat5IxwjKYPuu-6LoDwpZypB7dOBdG9ZrUH8T7gGrw-77g-_UOiQ0B-lnEb3sNP"/>
                    </div>
                </div>
            </div>

            {/* Tabbed Content & Upcoming Lectures */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50 rounded-xl">
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                        <nav aria-label="Tabs" className="-mb-px flex gap-6">
                            <button onClick={() => setActiveTab('activity')} className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm ${activeTab === 'activity' ? 'font-semibold text-primary border-primary' : 'font-medium text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'}`}>Recent Activity</button>
                            <button onClick={() => setActiveTab('approvals')} className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm ${activeTab === 'approvals' ? 'font-semibold text-primary border-primary' : 'font-medium text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'}`}>Pending Approvals</button>
                            <button onClick={() => setActiveTab('alerts')} className={`whitespace-nowrap py-3 px-1 border-b-2 text-sm ${activeTab === 'alerts' ? 'font-semibold text-primary border-primary' : 'font-medium text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'}`}>System Alerts</button>
                        </nav>
                    </div>
                    {activeTab === 'activity' && (
                        <div className="space-y-4">
                            <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-center bg-no-repeat bg-cover flex-shrink-0" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByBNQx9fn1Iu0cyYy0zMn5UOzMRpwDJZFTeNmLO4-NPJ4Oro3uEC4War4IK39IYNJN-dKqc3xI6hXS8nXw9kWReYCtKZqG8X42PN-m9OIT0jCNjfbr6XbhIr5MeB6dTsOtASTXwju3cP9q3tlvU4wG4ZcMx0OL3dWpITXT6b3tbXYkYEINmWqQLjoGVDltq_79yGZuu1NZb0IUTm_vpdVHKbAD5fOoLzVuT3mCf5zUR6BhPG0UdqlObIDgu_Bcp-o-oa7eXAQjUpLA')"}}></div><div className="flex-1"><p className="text-sm text-gray-800 dark:text-gray-200"><span className="font-semibold">John Doe</span> enrolled in 'Advanced JavaScript'.</p><p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p></div></div>
                            <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-center bg-no-repeat bg-cover flex-shrink-0" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxByZUnBXOIAbdC8GoPtCoYiL6glalvu6HM1Nw86c9784OhG2l7o9GbaDjq9o4ujT6OWNcZGSaNt93WurrNx15rfZH8Szy1yRkyLakwA7uG59qe3HUj1iP1ha33aqawmuM_kT-ZbbOG2Ms0QazZeTS-_nPWjer5uO6L-WJ1w_nyL5-KwAkI6XtYJndz3PjmXf47O3Z9QjmMC_f0IPmetD1kFRTv-Mi1a8_jHqNGQvjfUiekDfo2OYt6N3A6_MpFoGjq0OtRHzg0_Do')"}}></div><div className="flex-1"><p className="text-sm text-gray-800 dark:text-gray-200">New payment of <span className="font-semibold">$99.00</span> received from <span className="font-semibold">Jane Smith</span>.</p><p className="text-xs text-gray-500 dark:text-gray-400">15 minutes ago</p></div></div>
                            <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white"><span className="material-symbols-outlined">description</span></div><div className="flex-1"><p className="text-sm text-gray-800 dark:text-gray-200">New course 'Introduction to Python' has been published.</p><p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p></div></div>
                        </div>
                    )}
                     {activeTab === 'approvals' && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No pending approvals.</p>
                        </div>
                    )}
                     {activeTab === 'alerts' && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No system alerts.</p>
                        </div>
                    )}
                </div>
                <div className="p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Lectures</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-primary/10"><div className="bg-primary/20 text-primary p-2 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined">smart_display</span></div><div className="flex-1"><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">React for Beginners</p><p className="text-xs text-gray-500 dark:text-gray-400">Dr. Emily Carter - 10:00 AM</p></div><button className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button></div>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-primary/10"><div className="bg-primary/20 text-primary p-2 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined">smart_display</span></div><div className="flex-1"><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Data Structures in C++</p><p className="text-xs text-gray-500 dark:text-gray-400">Prof. Alan Grant - 1:00 PM</p></div><button className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button></div>
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-primary/10"><div className="bg-primary/20 text-primary p-2 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined">smart_display</span></div><div className="flex-1"><p className="text-sm font-semibold text-gray-800 dark:text-gray-200">UI/UX Design Principles</p><p className="text-xs text-gray-500 dark:text-gray-400">Laura Croft - 3:30 PM</p></div><button className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button></div>
                    </div>
                </div>
            </div>
            {isAddUserModalOpen && <AddUserModal onClose={() => setIsAddUserModalOpen(false)} />}
        </>
    );
};

export default AdminWelcome;
