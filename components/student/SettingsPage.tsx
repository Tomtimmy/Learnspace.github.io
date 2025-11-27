
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SettingsPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    
    // State for notification toggles
    const [notifications, setNotifications] = useState({
        announcements: true,
        messages: true,
        promos: false,
    });

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-10">
            {/* Profile Information */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Profile Information</h2>
                        <p className="mt-1 text-base text-text-muted-light dark:text-text-muted-dark">Update your personal details here.</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">edit</span>
                        <span>Edit Profile</span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmV6SljOK0D1XZV06H2XaP8gVJwNhMsTCAR1Mk5mNZnDm6UzXoySSzs9WEzg71dPaCZ44E-pTPn6GDTZ5hlhsEH9O4FVY6IJwuB2iHl6eccoZOJv3iTWKl3QFs6aeeesSRifZez0FPlpX1Owwtw7xHDRC0hFllMGkw4oQ5r3hG2_o9muOBXS9KFOjiT_faT-lbj5nDdf42RwzkoB3t3DR2hRpgLjo1Ycibh3PytWbFgnALRTJLsYKN2B2hFcbYinwUQVE6ZZP5qK7O")'}}></div>
                            <button className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white hover:bg-primary-hover">
                                <span className="material-symbols-outlined text-base">edit</span>
                            </button>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark" htmlFor="fullName">Full Name</label>
                                    <input className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary shadow-sm" disabled id="fullName" type="text" value={user.name}/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark" htmlFor="email">Email Address</label>
                                    <input className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary shadow-sm" disabled id="email" type="email" value={user.email}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Change Password</h2>
                    <p className="mt-1 text-base text-text-muted-light dark:text-text-muted-dark">For your security, we recommend choosing a strong password.</p>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark" htmlFor="currentPassword">Current Password</label>
                        <input className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary shadow-sm" id="currentPassword" type="password"/>
                    </div>
                    <div></div>
                    <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark" htmlFor="newPassword">New Password</label>
                        <input className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary shadow-sm" id="newPassword" type="password"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark" htmlFor="confirmPassword">Confirm New Password</label>
                        <input className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary shadow-sm" id="confirmPassword" type="password"/>
                    </div>
                </div>
                <div className="px-6 py-4 bg-background-light dark:bg-background-dark/50 border-t border-border-light dark:border-border-dark flex justify-end gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">Update Password</button>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Notifications</h2>
                    <p className="mt-1 text-base text-text-muted-light dark:text-text-muted-dark">Manage how you receive notifications.</p>
                </div>
                <div className="p-6 divide-y divide-border-light dark:divide-border-dark">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <h4 className="font-medium text-text-light dark:text-text-dark">New Course Announcements</h4>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Get notified when instructors post new announcements.</p>
                        </div>
                        <label className="flex items-center cursor-pointer" htmlFor="course-announcements">
                            <div className="relative">
                                <input checked={notifications.announcements} onChange={() => handleNotificationChange('announcements')} className="sr-only peer" id="course-announcements" type="checkbox"/>
                                <div className="w-11 h-6 bg-secondary-light dark:bg-secondary-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <h4 className="font-medium text-text-light dark:text-text-dark">Direct Messages</h4>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Receive an email when you get a new message.</p>
                        </div>
                        <label className="flex items-center cursor-pointer" htmlFor="direct-messages">
                            <div className="relative">
                                <input checked={notifications.messages} onChange={() => handleNotificationChange('messages')} className="sr-only peer" id="direct-messages" type="checkbox"/>
                                <div className="w-11 h-6 bg-secondary-light dark:bg-secondary-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <h4 className="font-medium text-text-light dark:text-text-dark">Promotional Emails</h4>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Stay up-to-date with our new courses and special offers.</p>
                        </div>
                        <label className="flex items-center cursor-pointer" htmlFor="promotional-emails">
                            <div className="relative">
                                <input checked={notifications.promos} onChange={() => handleNotificationChange('promos')} className="sr-only peer" id="promotional-emails" type="checkbox"/>
                                <div className="w-11 h-6 bg-secondary-light dark:bg-secondary-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

             {/* Payment Methods */}
             <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Payment Methods</h2>
                        <p className="mt-1 text-base text-text-muted-light dark:text-text-muted-dark">Add and manage your payment methods.</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">add</span>
                        <span>Add New Method</span>
                    </button>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-primary dark:border-primary bg-primary/5 dark:bg-primary/10">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img alt="Visa card icon" className="h-8 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChUi4OpP0hvzIqGvpIUgNhpY27YOx6gL0k5Yzpgb4NAo68UoIDrThr43UoM7Ngs75MsTq57H6DmOHjoXcglIpRpG_J8-8-7IhJaZOVVs89UgZjdZiyiOa0z9dFQFy6wc5VON5gLW-uGpcRrqG57mZfK_xZY1V2JFInFRvgplRLjRxT2IPssN1UT_JzIL2FS95YLJHdixWZ4REY5WwXpfSCR8QD3f7uwq0LiNgM5nyRrjU0cJ7GS4lh8GEgKhFrIIado8X7QNRNQLBg" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-text-light dark:text-text-dark">Visa ending in 1234</p>
                                        <span className="text-xs font-semibold bg-primary text-white px-2 py-0.5 rounded-full">Default</span>
                                    </div>
                                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Expires 08/2026</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 sm:mt-0 ml-auto sm:ml-0">
                                <button className="p-2 text-text-muted-light dark:text-text-muted-dark hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-md">
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button className="p-2 text-text-muted-light dark:text-text-muted-dark hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-md">
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-border-light dark:border-border-dark">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img alt="PayPal icon" className="h-8 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDYvE1iJ3574zrrwvbXWvxYaxkyqDgAnbEP8LZCrvP9eTbkPGgpKDi6xuAiBLbFum1Mlwnv9U_tzwSyso0zkPbAJW1ea6knmU6tAB8GY3NEelNMqc61SEpOEZynFh_c9lfwrUWFP4oH2XVRXFwDHOmHFYdekhhme5fCTRWlgjgoBBMa_aQGX-cr2bjaXy_3YKILtx7e6Zn4Cqw_zvyvlvZ1C_Y1Wz84UUOC1yhPZR9NJeLkUTsz6DodZqO9EG_lfOfFUh-CrGAQh5a" />
                                <div>
                                    <p className="font-medium text-text-light dark:text-text-dark">PayPal Account</p>
                                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 sm:mt-0 ml-auto sm:ml-0">
                                <button className="px-3 py-1.5 text-sm font-medium text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark hover:bg-border-light dark:hover:bg-border-dark rounded-md">Set as Default</button>
                                <button className="p-2 text-text-muted-light dark:text-text-muted-dark hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-md">
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button className="p-2 text-text-muted-light dark:text-text-muted-dark hover:bg-secondary-light dark:hover:bg-secondary-dark rounded-md">
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;