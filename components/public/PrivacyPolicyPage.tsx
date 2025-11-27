
import React from 'react';
import { MOCK_PAGES } from '../../data/mock';

const PrivacyPolicyPage: React.FC = () => {
    const pageContent = MOCK_PAGES.find(p => p.slug === 'privacy-policy');

    if (!pageContent) return <div className="text-center py-20">Content not found.</div>;

    return (
        <main className="flex-grow bg-background-light dark:bg-background-dark py-16 animate-fade-in-up">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark mb-8 text-center">{pageContent.title}</h1>
                <div className="prose dark:prose-invert max-w-none text-text-muted-light dark:text-text-muted-dark leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: pageContent.content }}>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPolicyPage;
