
import React, { useState, useEffect } from 'react';
import { MOCK_BLOG_POSTS } from '../../data/mock';
import { BlogPost } from '../../types';

const ALL_CATEGORIES = ['All', ...new Set(MOCK_BLOG_POSTS.map(p => p.category))];

const BlogPage: React.FC = () => {
    const [activeView, setActiveView] = useState<'list' | 'detail'>('list');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeView, selectedPost]);

    const filteredPosts = MOCK_BLOG_POSTS.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handlePostClick = (post: BlogPost) => {
        setSelectedPost(post);
        setActiveView('detail');
    };

    const handleBackToList = () => {
        setSelectedPost(null);
        setActiveView('list');
    };

    const renderListView = () => (
        <div className="animate-fade-in">
            {/* Hero / Header */}
            <div className="bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark py-16 text-center">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">The LearnSpace Blog</span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-text-light dark:text-text-dark mb-6">
                        Insights, Stories &amp; Updates
                    </h1>
                    <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto mb-8">
                        Discover the latest trends in education, career advice, and success stories from our community.
                    </p>
                    
                    <div className="relative max-w-md mx-auto">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">search</span>
                        <input 
                            type="text" 
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-full border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-3 pl-12 pr-4 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-background-light dark:bg-background-dark sticky top-20 z-10 border-b border-border-light dark:border-border-dark py-4 overflow-x-auto no-scrollbar">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex gap-2">
                    {ALL_CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                selectedCategory === cat 
                                ? 'bg-primary text-white' 
                                : 'bg-card-light dark:bg-card-dark text-text-muted-light dark:text-text-muted-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Grid */}
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map(post => (
                            <div 
                                key={post.id} 
                                className="group flex flex-col bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                onClick={() => handlePostClick(post)}
                            >
                                <div className="h-48 w-full bg-cover bg-center relative" style={{ backgroundImage: `url('${post.imageUrl}')` }}>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                    <span className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full text-text-light dark:text-text-dark uppercase tracking-wide">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center text-xs text-text-muted-light dark:text-text-muted-dark mb-3 gap-2">
                                        <span>{post.date}</span>
                                        <span>&bull;</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                                    
                                    <div className="flex items-center gap-3 pt-4 border-t border-border-light dark:border-border-dark mt-auto">
                                        <img src={post.author.avatarUrl} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
                                        <div>
                                            <p className="text-sm font-semibold text-text-light dark:text-text-dark">{post.author.name}</p>
                                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">{post.author.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark opacity-50">newspaper</span>
                        <h3 className="text-xl font-bold text-text-light dark:text-text-dark mt-4">No articles found</h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark mt-2">Try adjusting your search or category filter.</p>
                        <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="mt-6 text-primary font-medium hover:underline">Clear all filters</button>
                    </div>
                )}
            </div>
        </div>
    );

    const renderDetailView = () => {
        if (!selectedPost) return null;
        
        // Find related posts (same category, excluding current)
        const relatedPosts = MOCK_BLOG_POSTS
            .filter(p => p.category === selectedPost.category && p.id !== selectedPost.id)
            .slice(0, 2);

        return (
            <div className="animate-fade-in">
                {/* Article Header Image */}
                <div className="w-full h-[400px] md:h-[500px] bg-cover bg-center relative" style={{ backgroundImage: `url('${selectedPost.imageUrl}')` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/30"></div>
                    <div className="absolute top-6 left-6 md:left-12">
                        <button 
                            onClick={handleBackToList}
                            className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-lg text-sm font-bold text-text-light dark:text-white hover:bg-white hover:text-primary transition-all shadow-lg"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span> Back to Blog
                        </button>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-20">
                    <article className="bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl p-8 md:p-12 border border-border-light dark:border-border-dark">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">{selectedPost.category}</span>
                            <span className="text-text-muted-light dark:text-text-muted-dark text-xs font-medium">&bull; {selectedPost.readTime}</span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-black text-center text-text-light dark:text-text-dark leading-tight mb-8">{selectedPost.title}</h1>
                        
                        <div className="flex items-center justify-center gap-4 mb-10 pb-8 border-b border-border-light dark:border-border-dark">
                            <img src={selectedPost.author.avatarUrl} alt={selectedPost.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md" />
                            <div className="text-left">
                                <p className="text-sm font-bold text-text-light dark:text-text-dark">{selectedPost.author.name}</p>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark">{selectedPost.author.role} &bull; {selectedPost.date}</p>
                            </div>
                        </div>

                        <div 
                            className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:text-text-light dark:prose-headings:text-text-dark prose-p:text-text-muted-light dark:prose-p:text-text-muted-dark prose-a:text-primary prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                        ></div>

                        <div className="mt-12 pt-8 border-t border-border-light dark:border-border-dark">
                            <h4 className="text-sm font-bold text-text-light dark:text-text-dark uppercase tracking-wide mb-4">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedPost.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-secondary-light dark:bg-secondary-dark text-text-muted-light dark:text-text-muted-dark text-sm rounded-md font-medium">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Related Articles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedPosts.map(post => (
                                    <div 
                                        key={post.id} 
                                        className="group flex flex-col bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                                        onClick={() => handlePostClick(post)}
                                    >
                                        <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('${post.imageUrl}')` }}></div>
                                        <div className="p-5">
                                            <h4 className="font-bold text-lg text-text-light dark:text-text-dark mb-2 group-hover:text-primary transition-colors">{post.title}</h4>
                                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-2">{post.excerpt}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <main className="flex-grow bg-background-light dark:bg-background-dark min-h-screen">
            {activeView === 'list' ? renderListView() : renderDetailView()}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
};

export default BlogPage;
