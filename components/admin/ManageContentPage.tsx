
import React, { useState, useRef } from 'react';
import { MOCK_PAGES } from '../../data/mock';
import { PageContent } from '../../types';
import { RichTextToolbar } from '../common/RichTextToolbar';

const ManageContentPage: React.FC = () => {
    const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState<string>('');
    const [editTitle, setEditTitle] = useState<string>('');
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const selectedPage = MOCK_PAGES.find(p => p.id === selectedPageId);

    const handlePageSelect = (page: PageContent) => {
        setSelectedPageId(page.id);
        setEditTitle(page.title);
        setEditContent(page.content);
    };

    const handleSave = () => {
        if (selectedPage) {
            // In a real app, API call here
            selectedPage.content = editContent;
            selectedPage.title = editTitle;
            selectedPage.lastUpdated = new Date().toISOString().split('T')[0];
            alert('Page content updated successfully!');
        }
    };

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex flex-col gap-1 shrink-0">
                <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Content Management</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Edit public pages like Privacy Policy, Help Center, and Blog.</p>
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden">
                {/* Sidebar List */}
                <div className="w-64 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark overflow-y-auto shrink-0">
                    <div className="p-4 border-b border-border-light dark:border-border-dark bg-secondary-light/50 dark:bg-secondary-dark/50 font-semibold text-text-light dark:text-text-dark">
                        Pages
                    </div>
                    <div className="divide-y divide-border-light dark:divide-border-dark">
                        {MOCK_PAGES.map(page => (
                            <button 
                                key={page.id}
                                onClick={() => handlePageSelect(page)}
                                className={`w-full text-left p-4 hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors ${selectedPageId === page.id ? 'bg-primary/10 border-l-4 border-primary text-primary font-medium' : 'text-text-muted-light dark:text-text-muted-dark border-l-4 border-transparent'}`}
                            >
                                {page.title}
                                <p className="text-xs opacity-70 mt-1">/{page.slug}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark flex flex-col overflow-hidden shadow-sm">
                    {selectedPage ? (
                        <>
                            <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-background-light dark:bg-background-dark">
                                <div className="flex-1 mr-4">
                                    <label className="block text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase mb-1">Page Title</label>
                                    <input 
                                        type="text" 
                                        value={editTitle} 
                                        onChange={(e) => setEditTitle(e.target.value)} 
                                        className="form-input w-full text-lg font-bold bg-transparent border-none p-0 focus:ring-0 text-text-light dark:text-text-dark placeholder-text-muted-light"
                                    />
                                </div>
                                <button onClick={handleSave} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg transition-transform hover:-translate-y-0.5">
                                    Save Changes
                                </button>
                            </div>
                            <div className="flex-1 flex flex-col p-6">
                                <label className="block text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase mb-2">Page Content (HTML/Markdown)</label>
                                <RichTextToolbar textareaRef={textareaRef} onContentChange={setEditContent} />
                                <textarea 
                                    ref={textareaRef}
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="flex-1 w-full p-4 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark font-mono text-sm leading-relaxed focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-text-muted-light dark:text-text-muted-dark flex-col gap-4">
                            <span className="material-symbols-outlined text-6xl opacity-20">edit_document</span>
                            <p>Select a page from the list to start editing.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageContentPage;
