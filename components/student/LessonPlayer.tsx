
import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { Course, Module, Lesson } from '../../types';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_SUBMISSIONS } from '../../data/mock';
import ViewSubmissionsModal from './ViewSubmissionsModal';

interface LessonPlayerProps {
    course: Course;
    initialModuleId?: string;
    initialLessonId?: string;
    onExit: () => void;
}

const VideoPlayer: React.FC<{ src: string; onEnded: () => void }> = ({ src, onEnded }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const playerContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            setCurrentTime(video.currentTime);
            setProgress((video.currentTime / video.duration) * 100);
        };
        const handleLoadedMetadata = () => setDuration(video.duration);
        const handleEnded = () => {
            setIsPlaying(false);
            onEnded();
        };

        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, [onEnded, src]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(newVolume === 0);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            if (!isMuted) setVolume(0);
            else setVolume(1);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seekTime = (parseFloat(e.target.value) / 100) * duration;
        if (videoRef.current) {
            videoRef.current.currentTime = seekTime;
            setProgress(parseFloat(e.target.value));
        }
    };

    const handlePlaybackRate = (rate: number) => {
        setPlaybackRate(rate);
        if (videoRef.current) {
            videoRef.current.playbackRate = rate;
        }
        setShowSettings(false);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerContainerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div ref={playerContainerRef} className="relative bg-black rounded-xl overflow-hidden group aspect-video shadow-2xl mb-8">
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-contain"
                onClick={togglePlay}
            />
            
            {/* Big Play Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                    <button onClick={togglePlay} className="bg-white/20 backdrop-blur-md rounded-full p-6 pointer-events-auto hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-white text-6xl">play_arrow</span>
                    </button>
                </div>
            )}

            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Progress Bar */}
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={progress} 
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary mb-4 hover:h-2.5 transition-all"
                />
                
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-3xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
                        </button>
                        
                        <div className="flex items-center gap-2 group/vol">
                            <button onClick={toggleMute} className="hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">{isMuted || volume === 0 ? 'volume_off' : 'volume_up'}</span>
                            </button>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.1" 
                                value={isMuted ? 0 : volume} 
                                onChange={handleVolumeChange}
                                className="w-0 group-hover/vol:w-24 transition-all duration-300 h-1 bg-white rounded-lg appearance-none cursor-pointer accent-white"
                            />
                        </div>

                        <span className="text-xs font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button onClick={() => setShowSettings(!showSettings)} className={`hover:text-primary transition-colors ${showSettings ? 'text-primary' : ''}`}>
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                            {showSettings && (
                                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-[120px] shadow-xl border border-white/10 animate-scale-up origin-bottom-right">
                                    <p className="text-xs text-gray-400 px-2 py-1 font-bold uppercase">Playback Speed</p>
                                    {[0.5, 1, 1.5, 2].map(rate => (
                                        <button 
                                            key={rate} 
                                            onClick={() => handlePlaybackRate(rate)}
                                            className={`block w-full text-left px-2 py-1.5 text-sm rounded hover:bg-white/20 ${playbackRate === rate ? 'text-primary font-bold' : 'text-white'}`}
                                        >
                                            {rate}x
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={toggleFullscreen} className="hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LessonPlayer: React.FC<LessonPlayerProps> = ({ course, initialModuleId, initialLessonId, onExit }) => {
    const [activeModuleId, setActiveModuleId] = useState<string>(initialModuleId || course.modules[0]?.id);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
    const { user, addToast, toggleLessonCompletion } = useContext(AuthContext);
    const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

    useEffect(() => {
        if (course.modules.length > 0) {
            const module = course.modules.find(m => m.id === activeModuleId) || course.modules[0];
            const lesson = initialLessonId 
                ? module.lessons.find(l => l.id === initialLessonId) 
                : module.lessons[0];
            setActiveLesson(lesson || null);
            setActiveModuleId(module.id);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setCompletedLessonIds(user.completedLessonIds || []);
        }
    }, [user]);

    // Logic to get specific submission for active lesson assignment
    const submission = useMemo(() => {
        if (!activeLesson?.assignment || !user) return null;
        return MOCK_SUBMISSIONS.find(s => 
            s.studentId === user.id && 
            s.courseId === course.id && 
            s.assignmentTitle === activeLesson.assignment?.title
        );
    }, [activeLesson, user, course.id]);

    const handleLessonSelect = (moduleId: string, lesson: Lesson) => {
        setActiveModuleId(moduleId);
        setActiveLesson(lesson);
    };

    const handleVideoEnd = () => {
        if (activeLesson && !completedLessonIds.includes(activeLesson.id)) {
            toggleLessonCompletion(course.id, activeLesson.id);
            addToast('success', 'Lesson completed!');
        }
    };

    const handleMarkComplete = () => {
        if (activeLesson && !completedLessonIds.includes(activeLesson.id)) {
            toggleLessonCompletion(course.id, activeLesson.id);
            addToast('success', 'Lesson marked as complete!');
        }
        
        const nextLesson = findNextLesson();
        if (nextLesson) {
            setTimeout(() => {
                handleLessonSelect(nextLesson.moduleId, nextLesson.lesson);
            }, 500);
        } else {
             addToast('info', 'Course completed! Congratulations!');
             setTimeout(onExit, 1500);
        }
    };
    
    const findNextLesson = () => {
        if (!activeLesson) return null;
        const currentModuleIndex = course.modules.findIndex(m => m.id === activeModuleId);
        const currentModule = course.modules[currentModuleIndex];
        const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === activeLesson.id);
        
        if (currentLessonIndex < currentModule.lessons.length - 1) {
            return { moduleId: activeModuleId, lesson: currentModule.lessons[currentLessonIndex + 1] };
        } else if (currentModuleIndex < course.modules.length - 1) {
            const nextModule = course.modules[currentModuleIndex + 1];
            if (nextModule.lessons.length > 0) {
                return { moduleId: nextModule.id, lesson: nextModule.lessons[0] };
            }
        }
        return null;
    };

    const renderContent = () => {
        if (!activeLesson) return <div className="flex items-center justify-center h-full">Select a lesson to start</div>;
        
        const videoSrc = activeLesson.videoUrl || "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // Fallback URL

        return (
            <div className="max-w-4xl mx-auto w-full animate-fade-in-up">
                <VideoPlayer src={videoSrc} onEnded={handleVideoEnd} />

                <div className="prose dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{activeLesson.title}</h1>
                    <div className="p-6 bg-white dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">description</span>
                            Lesson Notes
                        </h3>
                        <div className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                            {activeLesson.content ? (
                                <p>{activeLesson.content}</p>
                            ) : (
                                <p>In this lesson, we will explore the core concepts of the topic. Watch the video above carefully and follow along with the examples provided.</p>
                            )}
                        </div>
                        {activeLesson.assignment && (
                            <div className="mt-6 p-5 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20 dark:border-primary/30">
                                <div className="flex justify-between items-center flex-wrap gap-4">
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary">assignment</span>
                                            Assignment: {activeLesson.assignment.title}
                                        </h4>
                                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Complete this assignment to test your understanding.</p>
                                        {submission && (
                                            <div className="mt-3 flex items-center gap-3">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                                                    submission.status === 'graded' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                                        : submission.status === 'retake_allowed'
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                    {submission.status.replace('_', ' ')}
                                                </span>
                                                {submission.grade !== null && (
                                                    <span className="text-sm font-bold text-primary">Grade: {submission.grade}%</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        {submission ? (
                                            <button 
                                                onClick={() => setShowSubmissionsModal(true)}
                                                className="px-4 py-2 text-sm font-bold text-primary bg-white dark:bg-card-dark border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm"
                                            >
                                                View Submissions
                                            </button>
                                        ) : (
                                            <button className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
                                                Start Assignment
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between mt-8 pb-12">
                     <button className="px-6 py-3 rounded-lg border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-medium hover:bg-secondary-light dark:hover:bg-secondary-dark flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span> Previous
                     </button>
                     <button onClick={handleMarkComplete} className="px-8 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary-hover flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                        {completedLessonIds.includes(activeLesson.id) ? 'Completed' : 'Complete & Continue'} <span className="material-symbols-outlined">arrow_forward</span>
                     </button>
                </div>
            </div>
        );
    };
    
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedInCourseCount = course.modules.flatMap(m => m.lessons).filter(l => completedLessonIds.includes(l.id)).length;
    const courseProgressPercentage = totalLessons > 0 ? Math.round((completedInCourseCount / totalLessons) * 100) : 0;


    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-background-light dark:bg-background-dark">
            {showSubmissionsModal && user && (
                <ViewSubmissionsModal 
                    course={course} 
                    student={user} 
                    onClose={() => setShowSubmissionsModal(false)} 
                />
            )}
            {/* Header */}
            <header className="h-16 bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark flex items-center justify-between px-4 shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={onExit} className="p-2 rounded-full hover:bg-secondary-light dark:hover:bg-secondary-dark text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <h2 className="font-bold text-text-light dark:text-text-dark truncate max-w-md hidden sm:block">{course.title}</h2>
                </div>
                <div className="flex items-center gap-4">
                     <div className="hidden sm:flex items-center gap-3 text-sm font-medium text-text-muted-light dark:text-text-muted-dark mr-4">
                        <span>Progress</span>
                        <div className="w-32 h-2.5 bg-secondary-light dark:bg-secondary-dark rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${courseProgressPercentage}%` }}></div>
                        </div>
                        <span className="text-text-light dark:text-text-dark">{courseProgressPercentage}%</span>
                     </div>
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors lg:hidden"
                    >
                        <span className="material-symbols-outlined">menu_open</span>
                        <span className="text-sm font-medium">Menu</span>
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth bg-background-light dark:bg-background-dark">
                    {renderContent()}
                </main>

                {/* Sidebar */}
                <aside className={`absolute lg:relative right-0 top-0 bottom-0 w-80 bg-card-light dark:bg-card-dark border-l border-border-light dark:border-border-dark transform transition-transform duration-300 z-10 flex flex-col shadow-xl lg:shadow-none ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:hidden'}`}>
                     <div className="p-4 border-b border-border-light dark:border-border-dark bg-secondary-light/30 dark:bg-secondary-dark/30">
                        <h3 className="font-bold text-text-light dark:text-text-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">format_list_bulleted</span>
                            Course Content
                        </h3>
                     </div>
                     <div className="flex-1 overflow-y-auto">
                        {course.modules.map((module, idx) => (
                            <div key={module.id} className="border-b border-border-light/50 dark:border-border-dark/50">
                                <div className="px-4 py-3 bg-secondary-light/50 dark:bg-secondary-dark/50 text-sm font-bold text-text-light dark:text-text-dark sticky top-0 backdrop-blur-sm">
                                    Module {idx + 1}: {module.title}
                                </div>
                                <div>
                                    {module.lessons.map((lesson) => {
                                        const isActive = activeLesson?.id === lesson.id;
                                        const isCompleted = completedLessonIds.includes(lesson.id);
                                        return (
                                            <div 
                                                key={lesson.id}
                                                className={`flex items-start gap-3 px-4 py-3 transition-all duration-200 border-l-4 group cursor-pointer ${
                                                    isActive 
                                                        ? 'bg-primary/10 border-primary' 
                                                        : 'hover:bg-secondary-light dark:hover:bg-secondary-dark border-transparent'
                                                }`}
                                            >
                                                {/* Custom Animated Checkbox */}
                                                <div 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleLessonCompletion(course.id, lesson.id);
                                                    }}
                                                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                                        isCompleted 
                                                        ? 'bg-green-500 border-green-500' 
                                                        : 'border-gray-300 hover:border-primary'
                                                    }`}
                                                >
                                                    {isCompleted && (
                                                        <span className="material-symbols-outlined text-white text-[14px] font-bold animate-scale-in">check</span>
                                                    )}
                                                </div>
                                                
                                                <div 
                                                    onClick={() => handleLessonSelect(module.id, lesson)}
                                                    className="flex-1 text-left"
                                                >
                                                    <p className={`text-sm font-medium transition-colors ${isActive ? 'text-primary font-bold' : isCompleted ? 'text-text-muted-light dark:text-text-muted-dark line-through' : 'text-text-light dark:text-text-dark'}`}>{lesson.title}</p>
                                                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1 flex items-center gap-1">
                                                        <span className="material-symbols-outlined !text-[10px]">play_circle</span> Video
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                     </div>
                </aside>
            </div>
            <style>{`
                @keyframes scale-in {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                 @keyframes scale-up {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-up {
                    animation: scale-up 0.2s ease-out forwards;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default LessonPlayer;
