
import React from 'react';
import { MOCK_PAGES } from '../../data/mock';

const CookiePolicyPage: React.FC = () => {
    const pageContent = MOCK_PAGES.find(p => p.slug === 'cookie-policy');

    if (!pageContent) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-background-light dark:bg-background-dark animate-fade-in-up">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">cookie</span>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Policy Not Found</h2>
            <p className="text-gray-500 mt-2">We couldn't find the cookie policy content.</p>
        </div>
    );

    return (
        <main className="flex-grow bg-background-light dark:bg-background-dark animate-fade-in-up">
            {/* Hero Header */}
            <section className="relative bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark py-16 md:py-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                     <span className="material-symbols-outlined absolute -top-10 -right-10 text-[300px] text-primary transform rotate-12 animate-float">cookie</span>
                </div>
                
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-2xl mb-6 shadow-sm animate-scale-in">
                        <span className="material-symbols-outlined text-3xl">cookie</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-light dark:text-text-dark mb-6">
                        {pageContent.title}
                    </h1>
                    <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto leading-relaxed">
                        Transparency is key. Learn how we use cookies to improve your experience, analyze site traffic, and personalize content.
                    </p>
                    {pageContent.lastUpdated && (
                        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-light dark:bg-secondary-dark text-sm font-medium text-text-muted-light dark:text-text-muted-dark border border-border-light dark:border-border-dark">
                            <span className="material-symbols-outlined text-base">update</span>
                            Last Updated: {new Date(pageContent.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    )}
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark p-8 md:p-12 animate-fade-in-up delay-100">
                        <div 
                            className="prose prose-lg dark:prose-invert max-w-none 
                            prose-headings:font-bold prose-headings:text-text-light dark:prose-headings:text-text-dark 
                            prose-p:text-text-muted-light dark:prose-p:text-text-muted-dark 
                            prose-a:text-primary prose-a:font-medium hover:prose-a:text-primary-hover
                            prose-strong:text-text-light dark:prose-strong:text-text-dark
                            prose-li:text-text-muted-light dark:prose-li:text-text-muted-dark
                            prose-img:rounded-xl prose-hr:border-border-light dark:prose-hr:border-border-dark"
                            dangerouslySetInnerHTML={{ __html: pageContent.content }}
                        >
                        </div>
                    </div>

                    {/* Preferences CTA */}
                    <div className="mt-12 bg-primary rounded-2xl p-8 md:p-10 text-center text-white shadow-lg relative overflow-hidden animate-fade-in-up delay-200">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">Manage Your Preferences</h3>
                            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
                                You have control over your data. You can adjust your cookie preferences at any time to ensure your privacy is respected.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-md">
                                    Cookie Settings
                                </button>
                                <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                                    Privacy Policy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CookiePolicyPage;
