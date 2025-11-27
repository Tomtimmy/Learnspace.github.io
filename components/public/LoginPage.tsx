
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface LoginPageProps {
    onBack: () => void;
    onShowForgotPassword: () => void;
    showSuccessMessage?: boolean;
    defaultToSignUp?: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack, onShowForgotPassword, showSuccessMessage, defaultToSignUp = false }) => {
    const [isSigningUp, setIsSigningUp] = useState(defaultToSignUp);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, register } = useContext(AuthContext);

    useEffect(() => {
        setIsSigningUp(defaultToSignUp);
    }, [defaultToSignUp]);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(email, password)) {
           // onBack is not called to allow App.tsx to handle re-render
        }
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (register(name, email, password)) {
            // onBack is not called to allow App.tsx to handle re-render
        }
    };

    const toggleForm = () => {
        setIsSigningUp(!isSigningUp);
        setName('');
        setEmail('');
        setPassword('');
        setShowPassword(false);
    }

    return (
        <div className="fixed inset-0 bg-background-light z-50">
            <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
                {/* Left Column: Image and Branding */}
                <div className="relative hidden lg:flex flex-col items-center justify-center bg-gray-100 p-8">
                    <div className="absolute inset-0 z-0">
                        <img alt="Students studying together" className="h-full w-full object-cover opacity-80" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/50 to-transparent"></div>
                    </div>
                    <div className="relative z-10 w-full max-w-md text-left">
                        <div className="flex items-center gap-3 pb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                                <span className="material-symbols-outlined text-white text-[32px]">school</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">LearnSpace</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Unlock your potential.</h2>
                        <p className="mt-2 text-lg text-gray-600">Start your journey with us and discover a new way of learning.</p>
                    </div>
                </div>
                {/* Right Column: Login/Sign Up Form */}
                <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                     <button onClick={onBack} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl z-10">&times;</button>
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                                {isSigningUp ? 'Create an Account' : 'Welcome Back!'}
                            </h1>
                            <p className="mt-2 text-center text-base text-gray-600">
                                {isSigningUp ? 'Join our community of learners.' : 'Log in to continue your learning journey.'}
                            </p>
                             {!isSigningUp && <p className="text-sm text-center text-gray-500 mt-1">Hint: Try 'alice@example.com' with password 'password123'.</p>}
                        </div>

                        {showSuccessMessage && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                                <p className="font-bold">Success!</p>
                                <p>Your password has been reset. Please log in with your new password.</p>
                            </div>
                        )}

                        <form onSubmit={isSigningUp ? handleRegisterSubmit : handleLoginSubmit} className="mt-8 space-y-6">
                            <div className="space-y-4 rounded-md">
                                {isSigningUp && (
                                    <div className="flex flex-col">
                                        <label className="text-base font-medium leading-normal pb-2 text-gray-800" htmlFor="name">Full Name</label>
                                        <input 
                                            id="name" 
                                            name="name" 
                                            type="text" 
                                            autoComplete="name" 
                                            required 
                                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] bg-white focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal" 
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <label className="text-base font-medium leading-normal pb-2 text-gray-800" htmlFor="email-address">Email Address</label>
                                    <input 
                                        id="email-address" 
                                        name="email" 
                                        type="email" 
                                        autoComplete="email" 
                                        required 
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] bg-white focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal" 
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-base font-medium leading-normal pb-2 text-gray-800" htmlFor="password">Password</label>
                                    <div className="relative flex w-full flex-1 items-stretch">
                                        <input 
                                            id="password" 
                                            name="password" 
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete={isSigningUp ? "new-password" : "current-password"}
                                            required 
                                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-[#111418] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] bg-white focus:border-primary h-14 placeholder:text-[#617589] p-[15px] pr-2 text-base font-normal leading-normal" 
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button type="button" aria-label="Show password" className="text-[#617589] flex border border-[#dbe0e6] bg-white items-center justify-center px-3 rounded-r-lg border-l-0 hover:bg-gray-50" onClick={() => setShowPassword(!showPassword)}>
                                            <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                           {!isSigningUp && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="h-5 w-5 rounded border-2 border-[#dbe0e6] bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-primary" />
                                        <label htmlFor="remember-me" className="ml-2 block text-base text-gray-900">Remember Me</label>
                                    </div>
                                    <div className="text-base">
                                        <button type="button" onClick={onShowForgotPassword} className="font-medium text-primary hover:text-primary/80">Forgot Password?</button>
                                    </div>
                                </div>
                           )}
                            <div>
                                <button type="submit" className="group relative flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3.5 text-base font-semibold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                    {isSigningUp ? 'Sign Up' : 'Log In'}
                                </button>
                            </div>
                        </form>

                        <div className="relative my-6">
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-background-light px-2 text-base text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div>
                            <button type="button" className="group relative flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2">
                                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 48 48"><path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"></path><path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"></path><path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.657-3.356-11.303-7.962l-6.571 4.819C9.656 39.663 16.318 44 24 44z" fill="#4CAF50"></path><path d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.082 5.574l6.19 5.238C42.012 36.49 44 30.638 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"></path></svg>
                                Continue with Google
                            </button>
                        </div>

                        <p className="mt-8 text-center text-base text-gray-600">
                            {isSigningUp ? 'Already have an account?' : "Don't have an account?"}
                            <button onClick={toggleForm} className="font-medium text-primary hover:text-primary/80 ml-1">
                                {isSigningUp ? 'Log In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;