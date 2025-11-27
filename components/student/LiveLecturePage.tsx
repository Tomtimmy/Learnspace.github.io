import React, { useState } from 'react';
import { MOCK_CHAT_MESSAGES, MOCK_PARTICIPANTS } from '../../data/mock';

interface LiveLecturePageProps {
    onLeave: () => void;
}

type InteractionPanelTab = 'chat' | 'qa' | 'participants';

const LiveLecturePage: React.FC<LiveLecturePageProps> = ({ onLeave }) => {
    const [activeTab, setActiveTab] = useState<InteractionPanelTab>('chat');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'chat':
                return (
                     <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {MOCK_CHAT_MESSAGES.map(msg => (
                             <div key={msg.id} className="flex gap-3">
                                <img className="aspect-square bg-cover rounded-full size-10" alt={`Avatar for ${msg.author}`} src={msg.avatarUrl} />
                                <div className="flex flex-1 flex-col items-stretch gap-1">
                                    <div className="flex flex-wrap items-center gap-x-2">
                                        <p className={`text-sm font-bold leading-tight ${msg.role === 'Instructor' ? 'text-primary' : 'text-text-light dark:text-text-dark'}`}>{msg.author}</p>
                                        {msg.role === 'Instructor' && <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded-full">Instructor</span>}
                                        <p className="text-gray-400 dark:text-gray-500 text-xs font-normal leading-normal">{msg.timestamp}</p>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm font-normal leading-normal">{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'qa':
                return <div className="p-4 text-center text-text-muted-light dark:text-text-muted-dark">Q&A section is not yet implemented.</div>;
            case 'participants':
                return (
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {MOCK_PARTICIPANTS.map(p => (
                            <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark">
                                <img src={p.avatarUrl} alt={p.name} className="size-10 rounded-full"/>
                                <div>
                                    <p className="font-semibold text-text-light dark:text-text-dark">{p.name}</p>
                                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{p.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-border-light dark:border-border-dark px-6 py-3 shrink-0">
                <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
                    <div className="size-6 text-primary">
                        <span className="material-symbols-outlined !text-2xl">school</span>
                    </div>
                    <div>
                        <h2 className="text-text-light dark:text-text-dark text-lg font-bold">Introduction to Quantum Physics - Week 3</h2>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Dr. Evelyn Reed</p>
                    </div>
                </div>
                <button onClick={onLeave} className="flex cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#E74C3C] text-white text-sm font-bold">
                    <span>Leave Session</span>
                </button>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 flex flex-col p-4 lg:p-6 overflow-y-auto">
                    <div className="w-full bg-black rounded-xl overflow-hidden shadow-lg">
                        <div className="relative flex items-center justify-center bg-gray-800 bg-cover bg-center aspect-video" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRrN6hfcLsheJNofJI50F4_UHMITRPHnFY1DA2CUZj4rNPSH-miuGcvF44Ww5PSePyE6Yu9hV0TvvKxzbGpD5OBgTVInTqvI3OMlBYJzntaIDmX9VPPejubWq4HLAH86ip_hzk6eXZUFqiaM04xUMGtm-QHMOouGQaQusQJeO3IYmbpObl2uCmujRhh2j78UB_rLHlAdPsFMvbRI2YnAd0hVNj_y2IGKBA5bKeDaqc5w-zojwYai0qHEZH9C-V8niyBku8rNdZXQcQ")'}}>
                            <button className="flex shrink-0 items-center justify-center rounded-full size-16 bg-black/50 text-white hover:bg-black/70 transition-colors">
                                <span className="material-symbols-outlined !text-4xl">play_arrow</span>
                            </button>
                            <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
                                <div className="flex h-4 items-center justify-center">
                                    <div className="h-1.5 flex-[0.25] rounded-l-full bg-white"></div>
                                    <div className="relative"><div className="absolute -left-2 -top-2 size-4 rounded-full bg-white ring-4 ring-black/30"></div></div>
                                    <div className="h-1.5 flex-1 rounded-r-full bg-white/40"></div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-white text-xs font-medium">24:18</p>
                                    <div className="flex items-center gap-4">
                                        <button className="text-white"><span className="material-symbols-outlined !text-xl">volume_up</span></button>
                                        <button className="text-white"><span className="material-symbols-outlined !text-xl">settings</span></button>
                                        <button className="text-white"><span className="material-symbols-outlined !text-xl">fullscreen</span></button>
                                    </div>
                                    <p className="text-white text-xs font-medium">58:32</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary/20 text-primary-darker dark:text-primary-lighter border border-primary/30 rounded-lg p-3 my-4 flex items-center gap-3">
                        <span className="material-symbols-outlined">info</span>
                        <p className="text-sm font-medium">Instructor has started a 5-minute break. We will resume shortly.</p>
                    </div>
                    <div className="mt-auto pt-4">
                        <div className="flex flex-wrap gap-4 justify-start">
                             <div className="flex flex-col items-center gap-2 text-center w-24">
                                <button className="rounded-full bg-gray-200 dark:bg-gray-700 p-3 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-200 !text-2xl">pan_tool</span>
                                </button>
                                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">Raise Hand</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center w-24">
                                <button className="rounded-full bg-gray-200 dark:bg-gray-700 p-3 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-200 !text-2xl">add_reaction</span>
                                </button>
                                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">React</p>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center w-24">
                                <button className="rounded-full bg-gray-200 dark:bg-gray-700 p-3 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                    <span className="material-symbols-outlined text-gray-700 dark:text-gray-200 !text-2xl">closed_caption</span>
                                </button>
                                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">Captions</p>
                            </div>
                        </div>
                    </div>
                </main>
                <aside className="w-[380px] border-l border-border-light dark:border-border-dark flex flex-col bg-background-light dark:bg-card-dark shrink-0">
                    <div className="shrink-0 border-b border-border-light dark:border-border-dark px-4">
                        <div className="flex gap-6">
                            <button onClick={() => setActiveTab('chat')} className={`flex items-center justify-center border-b-[3px] pb-3 pt-4 gap-2 ${activeTab === 'chat' ? 'border-b-primary text-primary' : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark hover:text-primary'}`}>
                                <span className="material-symbols-outlined !text-xl">chat</span>
                                <p className="text-sm font-bold">Live Chat</p>
                            </button>
                            <button onClick={() => setActiveTab('qa')} className={`flex items-center justify-center border-b-[3px] pb-3 pt-4 gap-2 ${activeTab === 'qa' ? 'border-b-primary text-primary' : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark hover:text-primary'}`}>
                                <span className="material-symbols-outlined !text-xl">quiz</span>
                                <p className="text-sm font-bold">Q&A</p>
                            </button>
                             <button onClick={() => setActiveTab('participants')} className={`flex items-center justify-center border-b-[3px] pb-3 pt-4 gap-2 ${activeTab === 'participants' ? 'border-b-primary text-primary' : 'border-b-transparent text-text-muted-light dark:text-text-muted-dark hover:text-primary'}`}>
                                <span className="material-symbols-outlined !text-xl">group</span>
                                <p className="text-sm font-bold">Participants</p>
                            </button>
                        </div>
                    </div>
                    {renderTabContent()}
                    <div className="p-4 border-t border-border-light dark:border-border-dark mt-auto">
                        <div className="relative">
                            <input className="w-full bg-secondary-light dark:bg-secondary-dark border-border-light dark:border-border-dark rounded-lg py-2 pl-4 pr-12 text-sm focus:ring-primary focus:border-primary" placeholder="Send a message..." type="text"/>
                            <button className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-primary">
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default LiveLecturePage;