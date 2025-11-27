
import React, { useState } from 'react';
import { searchHelpCenter } from '../../services/geminiService';
import { MOCK_PAGES } from '../../data/mock';

const PublicHelpPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<{ text: string; sources: any[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const helpContent = MOCK_PAGES.find(p => p.slug === 'help-center');

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
        <main className="flex-grow bg-background-light dark:bg-background-dark py-16 animate-fade-in-up">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 text-primary animate-scale-in">
                         <span className="material-symbols-outlined text-4xl">support_agent</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark">Help Center</h1>
                    <p className="mt-4 text-xl text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">Search our knowledge base or browse topics below to find answers to your questions.</p>
                    
                    <div className="mt-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
                        <form onSubmit={handleSearch} className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark text-2xl">search</span>
                            <input 
                                className="w-full rounded-xl border-2 border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark py-4 pl-14 pr-4 text-lg text-text-light dark:text-text-dark focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all" 
                                placeholder="How can we help you today?" 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={isLoading}
                            />
                            <button 
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Searching...' : 'Search'}
                            </button>
                        </form>
                    </div>
                </div>

                {error && <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

                {searchResult && (
                    <div className="max-w-3xl mx-auto bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-8 shadow-lg animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Here's what we found:</h2>
                        <div className="prose dark:prose-invert max-w-none text-text-muted-light dark:text-text-muted-dark leading-relaxed" dangerouslySetInnerHTML={{ __html: searchResult.text.replace(/\n/g, '<br />') }}></div>
                        {searchResult.sources.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
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
                
                {/* Dynamic Content from MOCK_PAGES */}
                <div className="animate-fade-in-up delay-200">
                    {helpContent && (
                         <div className="prose dark:prose-invert max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: helpContent.content }}></div>
                    )}

                    {!helpContent && <div className="text-center text-text-muted-light">Loading content...</div>}
                </div>
            </div>
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.4s ease-out forwards;
                }
            `}</style>
        </main>
    );
};

export default PublicHelpPage;
