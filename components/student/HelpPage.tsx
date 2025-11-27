import React, { useState } from 'react';
import { searchHelpCenter } from '../../services/geminiService';

const HelpPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<{ text: string; sources: any[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setIsLoading(true);
        setError(null);
        setSearchResult(null);

        try {
            const result = await searchHelpCenter(searchTerm);
            setSearchResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark">How can we help?</h1>
                <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">Find answers, tutorials, and ways to get in touch with our support team.</p>
                <div className="mt-6 max-w-lg mx-auto">
                    <form onSubmit={handleSearch} className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark text-2xl">search</span>
                        <input 
                            className="w-full rounded-full border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark py-3 pl-14 pr-4 text-base text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent" 
                            placeholder="Search for answers..." 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={isLoading}
                        />
                    </form>
                </div>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

            {searchResult && (
                <div className="max-w-3xl mx-auto bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark p-6 shadow-md">
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Search Results</h2>
                    <div className="prose dark:prose-invert max-w-none text-text-muted-light dark:text-text-muted-dark" dangerouslySetInnerHTML={{ __html: searchResult.text.replace(/\n/g, '<br />') }}></div>
                    {searchResult.sources.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">Sources:</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {searchResult.sources.map((source, index) => (
                                    <li key={index} className="text-sm">
                                        <a href={source.web?.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                            {source.web?.title || source.web?.uri}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}


            <div className="space-y-12">
                <div>
                    <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a className="flex items-start gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all" href="#">
                            <span className="material-symbols-outlined text-primary text-3xl mt-1">payment</span>
                            <div>
                                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">How do I update my payment method?</h3>
                                <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-1">Learn how to change or remove your saved payment details.</p>
                            </div>
                        </a>
                        <a className="flex items-start gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all" href="#">
                            <span className="material-symbols-outlined text-primary text-3xl mt-1">school</span>
                            <div>
                                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Where can I find my course materials?</h3>
                                <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-1">All lectures, notes, and assignments are available in the 'My Courses' tab.</p>
                            </div>
                        </a>
                        <a className="flex items-start gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all" href="#">
                            <span className="material-symbols-outlined text-primary text-3xl mt-1">download</span>
                            <div>
                                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Can I download lectures for offline viewing?</h3>
                                <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-1">Find out which courses offer downloadable content for learning on the go.</p>
                            </div>
                        </a>
                        <a className="flex items-start gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all" href="#">
                            <span className="material-symbols-outlined text-primary text-3xl mt-1">lock_reset</span>
                            <div>
                                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">How do I reset my password?</h3>
                                <p className="text-base text-text-muted-light dark:text-text-muted-dark mt-1">Follow these simple steps to securely reset your account password.</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">Tutorials &amp; Guides</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden group">
                            <div className="h-40 bg-primary/20 flex items-center justify-center relative">
                                <span className="material-symbols-outlined text-primary text-6xl">play_circle</span>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                     <span className="material-symbols-outlined text-white text-6xl">play_circle</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-text-light dark:text-text-dark">Getting Started</h3>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">A quick tour of your student dashboard.</p>
                            </div>
                        </div>
                        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden group">
                           <div className="h-40 bg-primary/20 flex items-center justify-center relative">
                                <span className="material-symbols-outlined text-primary text-6xl">checklist</span>
                                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                     <span className="material-symbols-outlined text-white text-6xl">play_circle</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-text-light dark:text-text-dark">Submitting Assignments</h3>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Learn how to upload and submit your work.</p>
                            </div>
                        </div>
                        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden group">
                            <div className="h-40 bg-primary/20 flex items-center justify-center relative">
                                <span className="material-symbols-outlined text-primary text-6xl">forum</span>
                                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                     <span className="material-symbols-outlined text-white text-6xl">play_circle</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-text-light dark:text-text-dark">Using Discussion Forums</h3>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Engage with peers and instructors effectively.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-6">Need more help?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-8 rounded-lg text-center flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-primary text-5xl">support_agent</span>
                            </div>
                            <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">Technical Support</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark my-2 flex-grow">For issues with your account, payments, or platform access.</p>
                            <button className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors">Contact Support</button>
                        </div>
                        <div className="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-8 rounded-lg text-center flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-primary text-5xl">contact_mail</span>
                            </div>
                            <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">Course Assistance</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark my-2 flex-grow">For questions about course content, assignments, or grades.</p>
                            <button className="mt-4 w-full sm:w-auto px-6 py-2.5 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">Message an Instructor</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;