
import React, { useState } from 'react';
import { MOCK_USERS } from '../../data/mock';

interface ForgotPasswordPageProps {
    onShowLogin: () => void;
    onEmailSubmitted: (email: string) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onShowLogin, onEmailSubmitted }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userExists = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (email && userExists) {
            onEmailSubmitted(email);
        } else {
            alert('If an account with this email exists, password reset instructions will be sent. (For this demo, please use a valid email like alice@example.com)');
        }
    };

    return (
        <div className="fixed inset-0 bg-background-light dark:bg-background-dark z-50 flex min-h-screen w-full flex-col items-center justify-center antialiased">
             <header className="absolute top-0 left-0 flex w-full items-center justify-between p-6 sm:p-8">
                <a className="flex items-center gap-3 text-gray-800 dark:text-white" href="#">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                    <h2 className="text-lg font-bold">LearnSpace</h2>
                </a>
            </header>
            <main className="w-full max-w-md p-6">
                <div className="flex w-full flex-col rounded-xl border border-gray-200/80 bg-white dark:border-gray-800 dark:bg-gray-900/50 shadow-sm">
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col gap-2 text-center">
                            <p className="text-2xl font-black tracking-tight text-gray-900 dark:text-white sm:text-3xl">Forgot Your Password?</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Enter your email address below, and we'll send you a link to reset your password.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-800 dark:text-gray-200" htmlFor="email">Email Address</label>
                                <input 
                                    className="form-input w-full rounded-lg border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500" 
                                    id="email" 
                                    placeholder="you@example.com" 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary py-2.5 px-5 text-base font-bold text-white transition-colors hover:bg-primary/90">
                                <span>Send Password Reset Instructions</span>
                            </button>
                        </form>
                        <div className="mt-6 flex items-center justify-center">
                            <button onClick={onShowLogin} className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                                <span className="material-symbols-outlined text-base">arrow_back</span>
                                Return to Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </main>
             <footer className="absolute bottom-0 w-full p-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Need help? <a className="font-medium text-primary hover:underline" href="#">Contact Support</a></p>
            </footer>
        </div>
    );
};

export default ForgotPasswordPage;