
import React, { useState } from 'react';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import CoursesPage from './CoursesPage';
import PricingPage from './PricingPage';
import ForInstructorsPage from './ForInstructorsPage';
import AboutUsPage from './AboutUsPage';
import PublicHelpPage from './PublicHelpPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import CookiePolicyPage from './CookiePolicyPage';
import BlogPage from './BlogPage';
import CareersPage from './CareersPage';
import ThemeToggleButton from '../common/ThemeToggleButton';
import { TwitterIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from '../icons';

type AuthView = 'none' | 'login' | 'forgot_password' | 'reset_password';
type PublicView = 'home' | 'courses' | 'pricing' | 'instructors' | 'about' | 'help' | 'privacy' | 'cookies' | 'blog' | 'careers';

interface AuthState {
    view: AuthView;
    defaultToSignUp?: boolean;
}

const PublicWebsite: React.FC = () => {
    const [authState, setAuthState] = useState<AuthState>({ view: 'none', defaultToSignUp: false });
    const [publicView, setPublicView] = useState<PublicView>('home');
    const [emailForReset, setEmailForReset] = useState<string>('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleShowResetPassword = (email: string) => {
        setEmailForReset(email);
        setAuthState({ view: 'reset_password' });
    };

    const handleResetComplete = () => {
        setResetSuccess(true);
        setAuthState({ view: 'login' });
    };
    
    const showLogin = () => {
        setResetSuccess(false);
        setAuthState({ view: 'login', defaultToSignUp: false });
        setIsMobileMenuOpen(false);
    };

    const showSignUp = () => {
        setResetSuccess(false);
        setAuthState({ view: 'login', defaultToSignUp: true });
        setIsMobileMenuOpen(false);
    }

    const closeAuth = () => {
        setAuthState({ view: 'none' });
    }

    const renderAuthModal = () => {
        switch (authState.view) {
            case 'login':
                return <LoginPage onBack={closeAuth} onShowForgotPassword={() => setAuthState({ view: 'forgot_password' })} showSuccessMessage={resetSuccess} defaultToSignUp={authState.defaultToSignUp} />;
            case 'forgot_password':
                return <ForgotPasswordPage onShowLogin={showLogin} onEmailSubmitted={handleShowResetPassword} />;
            case 'reset_password':
                return <ResetPasswordPage email={emailForReset} onComplete={handleResetComplete} onBackToLogin={showLogin} />;
            default:
                return null;
        }
    };

    const renderPublicContent = () => {
        switch (publicView) {
            case 'courses':
                return <CoursesPage />;
            case 'pricing':
                return <PricingPage />;
            case 'instructors':
                return <ForInstructorsPage onBecomeInstructor={showSignUp} />;
            case 'about':
                return <AboutUsPage onSignUp={showSignUp} onExploreCourses={() => setPublicView('courses')} />;
            case 'help':
                return <PublicHelpPage />;
            case 'privacy':
                return <PrivacyPolicyPage />;
            case 'cookies':
                return <CookiePolicyPage />;
            case 'blog':
                return <BlogPage />;
            case 'careers':
                return <CareersPage />;
            case 'home':
            default:
                return <HomePage onSignUp={showSignUp} onExploreCourses={() => setPublicView('courses')} />;
        }
    }

    const NavButton = ({ view, label }: { view: PublicView, label: string }) => (
        <button 
            onClick={() => {
                setPublicView(view);
                setIsMobileMenuOpen(false);
                window.scrollTo(0, 0);
            }} 
            className={`text-base font-medium leading-normal transition-colors ${
                publicView === view 
                ? 'text-primary font-bold' 
                : 'text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            {renderAuthModal()}
            
            {/* Header */}
            <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark transition-all duration-300">
                <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
                         <button onClick={() => setPublicView('home')} className="flex items-center gap-3 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white transition-transform group-hover:scale-105">
                                <span className="material-symbols-outlined text-2xl">school</span>
                            </div>
                            <h2 className="text-2xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">LearnSpace</h2>
                         </button>
                    </div>
                    
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-9">
                        <NavButton view="courses" label="Courses" />
                        <NavButton view="pricing" label="Pricing" />
                        <NavButton view="about" label="About Us" />
                        <NavButton view="instructors" label="For Instructors" />
                    </nav>

                    {/* Header Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggleButton />
                        <div className="hidden md:flex gap-2">
                            <button onClick={showLogin} className="flex h-11 items-center justify-center overflow-hidden rounded-lg px-6 bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark text-base font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-border-light dark:hover:bg-border-dark">
                                <span className="truncate">Login</span>
                            </button>
                            <button onClick={showSignUp} className="flex h-11 items-center justify-center overflow-hidden rounded-lg px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-primary-hover shadow-lg hover:shadow-primary/30">
                                <span className="truncate">Sign Up</span>
                            </button>
                        </div>
                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className="md:hidden p-2 rounded-lg text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
                        >
                            <span className="material-symbols-outlined text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </header>
            
            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-30 bg-background-light dark:bg-background-dark pt-24 px-6 transition-transform duration-300 ease-in-out md:hidden flex flex-col gap-6 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col gap-6 text-lg border-b border-border-light dark:border-border-dark pb-6">
                    <NavButton view="home" label="Home" />
                    <NavButton view="courses" label="Courses" />
                    <NavButton view="pricing" label="Pricing" />
                    <NavButton view="about" label="About Us" />
                    <NavButton view="instructors" label="For Instructors" />
                </div>
                <div className="flex flex-col gap-6 text-lg">
                    <NavButton view="blog" label="Blog" />
                    <NavButton view="careers" label="Careers" />
                    <NavButton view="help" label="Help Center" />
                </div>
                <div className="mt-auto pb-10 flex flex-col gap-4">
                    <button onClick={showLogin} className="w-full h-12 rounded-xl bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark font-bold text-lg hover:bg-border-light dark:hover:bg-border-dark transition-colors">
                        Login
                    </button>
                    <button onClick={showSignUp} className="w-full h-12 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-hover transition-colors shadow-lg">
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div key={publicView} className="flex-grow animate-fade-in">
                {renderPublicContent()}
            </div>

            <footer className="bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark transition-colors duration-300">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        <div className="col-span-2 md:col-span-2">
                            <div className="flex items-center gap-3 text-text-light dark:text-text-dark">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                                    <span className="material-symbols-outlined text-2xl">school</span>
                                </div>
                                <h2 className="text-2xl font-bold">LearnSpace</h2>
                            </div>
                            <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-4 max-w-xs leading-relaxed">Unlock your potential with expert-led courses on our innovative learning platform. Education for everyone, everywhere.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-text-light dark:text-text-dark mb-4">Platform</h4>
                            <nav className="flex flex-col gap-3">
                                <button onClick={() => { setPublicView('courses'); window.scrollTo(0,0); }} className="text-base text-left text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">Courses</button>
                                <button onClick={() => { setPublicView('pricing'); window.scrollTo(0,0); }} className="text-base text-left text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">Pricing</button>
                                <button onClick={() => { setPublicView('instructors'); window.scrollTo(0,0); }} className="text-base text-left text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">For Instructors</button>
                            </nav>
                        </div>
                        <div>
                            <h4 className="font-bold text-text-light dark:text-text-dark mb-4">Company</h4>
                             <nav className="flex flex-col gap-3">
                                <button onClick={() => { setPublicView('about'); window.scrollTo(0,0); }} className="text-base text-left text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">About Us</button>
                                <button onClick={() => { setPublicView('blog'); window.scrollTo(0,0); }} className="text-base text-left text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">Blog</button>
                                <button onClick={() => { setPublicView('careers'); window.scrollTo(0,0); }} className="text-base text-left text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">Careers</button>
                            </nav>
                        </div>
                        <div>
                            <h4 className="font-bold text-text-light dark:text-text-dark mb-4">Support</h4>
                             <nav className="flex flex-col gap-3">
                                <button onClick={() => { setPublicView('help'); window.scrollTo(0,0); }} className="text-base text-left text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">Help Center</button>
                                <button onClick={() => { setPublicView('privacy'); window.scrollTo(0,0); }} className="text-base text-left text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">Privacy Policy</button>
                                <button onClick={() => { setPublicView('cookies'); window.scrollTo(0,0); }} className="text-base text-left text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">Cookie Policy</button>
                            </nav>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-border-light dark:border-border-dark pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">© {new Date().getFullYear()} LearnSpace, Inc. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:scale-110 transition-all"><TwitterIcon className="w-5 h-5" /></a>
                            <a href="#" className="text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:scale-110 transition-all"><FacebookIcon className="w-5 h-5" /></a>
                            <a href="#" className="text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:scale-110 transition-all"><InstagramIcon className="w-5 h-5" /></a>
                            <a href="#" className="text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:scale-110 transition-all"><LinkedinIcon className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicWebsite;
