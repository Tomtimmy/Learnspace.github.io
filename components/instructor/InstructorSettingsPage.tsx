import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../types';

const InstructorSettingsPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profile, setProfile] = useState<Partial<User>>({
        name: user?.name || '',
        email: user?.email || '',
        imageUrl: user?.imageUrl || 'https://randomuser.me/api/portraits/women/68.jpg',
        bio: user?.bio || '',
        schedule: user?.schedule || { officeHours: '' }
    });

    const [notifications, setNotifications] = useState({
        newStudent: true,
        submission: true,
        payout: true,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'officeHours') {
            setProfile(prev => ({ ...prev, schedule: { officeHours: value } }));
        } else {
            setProfile(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleImageUpload = () => {
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveChanges = (section: string) => {
        // In a real app, you would dispatch an action to update user data
        alert(`${section} settings saved successfully! (This is a mock action)`);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-10 max-w-4xl mx-auto">
             <div>
                <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Settings</h1>
                <p className="mt-2 text-base text-text-muted-light dark:text-text-muted-dark">
                    Manage your public profile, account security, and notification preferences.
                </p>
            </div>

            {/* Public Profile Section */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Public Profile</h2>
                    <p className="mt-1 text-base text-text-muted-light dark:text-text-muted-dark">This information will be displayed on your course and instructor pages.</p>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-6">
                        <img className="size-24 rounded-full object-cover shadow-md" src={profile.imageUrl} alt={profile.name} />
                        <div>
                            <button onClick={handleImageUpload} className="px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark rounded-lg hover:bg-border-light dark:hover:bg-border-dark">Change Picture</button>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-2">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="name">Full Name</label>
                        <input id="name" name="name" value={profile.name} onChange={handleInputChange} className="form-input w-full rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="email">Email Address</label>
                        <input id="email" name="email" value={profile.email} onChange={handleInputChange} className="form-input w-full rounded-lg" placeholder="your.email@example.com"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="bio">Biography</label>
                        <textarea id="bio" name="bio" value={profile.bio} onChange={handleInputChange} className="form-textarea w-full rounded-lg" rows={5} placeholder="Tell students a little about yourself..."></textarea>
                    </div>
                </div>
                <div className="px-6 py-4 bg-background-light dark:bg-background-dark/50 border-t border-border-light dark:border-border-dark flex justify-end">
                    <button onClick={() => handleSaveChanges('Profile')} className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">Save Profile</button>
                </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Schedule</h2>
                    <p className="mt-1 text-base text-text-muted-light dark:text-text-muted-dark">Set your availability for student support.</p>
                </div>
                <div className="p-6">
                    <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="officeHours">Office Hours</label>
                    <input id="officeHours" name="officeHours" value={profile.schedule?.officeHours} onChange={handleInputChange} className="form-input w-full rounded-lg" placeholder="e.g., Tuesdays & Thursdays, 2 PM - 4 PM EST"/>
                </div>
                 <div className="px-6 py-4 bg-background-light dark:bg-background-dark/50 border-t border-border-light dark:border-border-dark flex justify-end">
                    <button onClick={() => handleSaveChanges('Schedule')} className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">Save Schedule</button>
                </div>
            </div>
            
            {/* Security Section */}
             <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Security</h2>
                    <p className="mt-1 text-base text-text-muted-light dark:text-text-muted-dark">Change your password.</p>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark" htmlFor="currentPasswordS">Current Password</label>
                        <input className="mt-1 block w-full rounded-lg" id="currentPasswordS" type="password"/>
                    </div>
                    <div></div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark" htmlFor="newPasswordS">New Password</label>
                        <input className="mt-1 block w-full rounded-lg" id="newPasswordS" type="password"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark" htmlFor="confirmPasswordS">Confirm New Password</label>
                        <input className="mt-1 block w-full rounded-lg" id="confirmPasswordS" type="password"/>
                    </div>
                </div>
                <div className="px-6 py-4 bg-background-light dark:bg-background-dark/50 border-t border-border-light dark:border-border-dark flex justify-end">
                    <button onClick={() => handleSaveChanges('Password')} className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">Update Password</button>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Email Notifications</h2>
                    <p className="mt-1 text-base text-text-muted-light dark:text-text-muted-dark">Manage your email notification preferences.</p>
                </div>
                <div className="p-6 divide-y divide-border-light dark:divide-border-dark">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <h4 className="font-medium text-text-light dark:text-text-dark">New Student Enrollment</h4>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">When a new student enrolls in one of your courses.</p>
                        </div>
                        <label className="flex items-center cursor-pointer"><div className="relative"><input checked={notifications.newStudent} onChange={() => handleNotificationChange('newStudent')} type="checkbox" className="sr-only peer"/><div className="w-11 h-6 bg-secondary-light dark:bg-secondary-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div></div></label>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <h4 className="font-medium text-text-light dark:text-text-dark">New Assignment Submission</h4>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">When a student submits an assignment for grading.</p>
                        </div>
                         <label className="flex items-center cursor-pointer"><div className="relative"><input checked={notifications.submission} onChange={() => handleNotificationChange('submission')} type="checkbox" className="sr-only peer"/><div className="w-11 h-6 bg-secondary-light dark:bg-secondary-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div></div></label>
                    </div>
                     <div className="flex items-center justify-between py-4">
                        <div>
                            <h4 className="font-medium text-text-light dark:text-text-dark">Payout Notifications</h4>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">When a monthly payout has been processed.</p>
                        </div>
                         <label className="flex items-center cursor-pointer"><div className="relative"><input checked={notifications.payout} onChange={() => handleNotificationChange('payout')} type="checkbox" className="sr-only peer"/><div className="w-11 h-6 bg-secondary-light dark:bg-secondary-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div></div></label>
                    </div>
                </div>
            </div>
            
             {/* Payout Settings */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">Payout Settings</h2>
                    <p className="mt-1 text-base text-text-muted-light dark:text-text-muted-dark">Manage your bank account for receiving payouts.</p>
                </div>
                <div className="p-6">
                    <div className="p-6 bg-secondary-light dark:bg-secondary-dark rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-text-light dark:text-text-dark">Bank of America</p>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Account ending in **** 5678</p>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10">Manage</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorSettingsPage;
