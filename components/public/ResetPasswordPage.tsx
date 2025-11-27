
import React, { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface ResetPasswordPageProps {
    email: string;
    onComplete: () => void;
    onBackToLogin: () => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ email, onComplete, onBackToLogin }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { resetPassword } = useContext(AuthContext);

    const passwordStrength = useMemo(() => {
        let score = 0;
        let label = 'Weak';
        let color = 'bg-red-500';

        if (newPassword.length >= 8) score++;
        if (/[A-Z]/.test(newPassword)) score++;
        if (/[a-z]/.test(newPassword)) score++;
        if (/[0-9]/.test(newPassword)) score++;
        if (/[^A-Za-z0-9]/.test(newPassword)) score++;

        if (score > 4) {
            label = 'Very Strong';
            color = 'bg-green-500';
        } else if (score === 4) {
            label = 'Strong';
            color = 'bg-yellow-500';
        } else if (score === 3) {
            label = 'Moderate';
            color = 'bg-orange-500';
        }

        return { score, label, color, width: (score / 5) * 100 };
    }, [newPassword]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (resetPassword(email, newPassword)) {
            onComplete();
        } else {
            setError('An unexpected error occurred. Please try again.');
        }
    };
    
    return (
        <div className="fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center justify-center bg-background-light p-4 dark:bg-background-dark">
            <header className="absolute top-0 left-0 w-full p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-4 text-slate-800 dark:text-slate-200">
                    <div className="h-8 w-8 text-primary">
                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h2 className="text-slate-800 dark:text-slate-200 text-lg font-bold leading-tight tracking-[-0.015em]">LearnSpace</h2>
                </div>
            </header>
            <main className="w-full max-w-md">
                 <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark p-8 shadow-sm">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                            <span className="material-symbols-outlined !text-4xl">lock_reset</span>
                        </div>
                        <h1 className="text-[#111418] dark:text-white tracking-tight text-3xl font-bold leading-tight pt-6 pb-2">Set Your New Password</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">Create a new, secure password for {email}. It must be at least 8 characters long.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="flex flex-col">
                            <label className="text-[#111418] dark:text-slate-200 text-sm font-medium leading-normal pb-2" htmlFor="new-password">New Password</label>
                            <div className="relative flex w-full items-stretch">
                                <input value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white focus:border-primary dark:bg-gray-900/50 dark:border-gray-700 dark:text-slate-200 dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal" id="new-password" placeholder="Enter new password" type={showPassword ? 'text' : 'password'} required/>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between"><p className="text-sm font-medium text-gray-600 dark:text-gray-400">Password Strength: <span className="font-bold">{passwordStrength.label}</span></p></div>
                            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className={`h-2 rounded-full transition-all ${passwordStrength.color}`} style={{ width: `${passwordStrength.width}%` }}></div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#111418] dark:text-slate-200 text-sm font-medium leading-normal pb-2" htmlFor="confirm-password">Confirm New Password</label>
                            <div className="relative flex w-full items-stretch">
                                <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 bg-white focus:border-primary dark:bg-gray-900/50 dark:border-gray-700 dark:text-slate-200 dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal" id="confirm-password" placeholder="Confirm new password" type="password" required/>
                            </div>
                            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
                        </div>
                        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary/90">
                            Update Password
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-center">
                        <button onClick={onBackToLogin} className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Return to Sign In
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default ResetPasswordPage;