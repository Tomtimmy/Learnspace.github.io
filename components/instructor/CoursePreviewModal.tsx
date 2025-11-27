import React, { useState, useEffect } from 'react';
import { Course } from '../../types';
import { StarRating } from '../common/StarRating';

interface CoursePreviewModalProps {
    course: Course;
    onClose: () => void;
}

// Basic markdown to HTML converter for preview
// FIX: Ensured the function always returns an object with `__html` property to match the type expected by `dangerouslySetInnerHTML`.
const renderMarkdown = (text: string): { __html: string } => {
    if (!text) return { __html: '' };
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/_(.*?)_/g, '<em>$1</em>') // Italic
        .replace(/^- (.*)/gm, '<li>$1</li>'); // List items
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>'); // Wrap lists
    return { __html: html.replace(/\n/g, '<br />') };
};


const CoursePreviewModal: React.FC<CoursePreviewModalProps> = ({ course, onClose }) => {
    const [openModuleId, setOpenModuleId] = useState<string | null>(course.modules?.[0]?.id ?? null);
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const handleModuleToggle = (moduleId: string) => {
        setOpenModuleId(prevId => (prevId === moduleId ? null : moduleId));
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-title"
        >
            <div 
                className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center flex-shrink-0">
                    <h2 id="course-title" className="text-xl font-bold text-text-light dark:text-text-dark truncate pr-4">Course Preview</h2>
                    <button onClick={onClose} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>

                <main className="overflow-y-auto p-6 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <img src={course.imageUrl} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">{course.title}</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">{course.description}</p>
                        </div>
                        <div className="md:col-span-1">
                             <div className="bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg space-y-4">
                                <p className="text-3xl font-bold text-text-light dark:text-text-dark">{course.price > 0 ? `$${course.price}` : 'Free'}</p>
                                <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">Enroll Now</button>
                                <div className="text-sm text-text-muted-light dark:text-text-muted-dark space-y-2">
                                    <p><span className="font-semibold text-text-light dark:text-text-dark">Instructor:</span> {course.instructor || 'Not Assigned'}</p>
                                    <p><span className="font-semibold text-text-light dark:text-text-dark">Skill Level:</span> {course.level}</p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold text-text-light dark:text-text-dark">Rating:</span>
                                        <StarRating rating={course.rating} className="!text-lg" />
                                        <span>{course.rating.toFixed(1)}</span>
                                    </p>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Course Content</h3>
                        <div className="space-y-2">
                            {course.modules.map(module => (
                                <div key={module.id} className="border border-border-light dark:border-border-dark rounded-lg">
                                    <button 
                                        onClick={() => handleModuleToggle(module.id)}
                                        className="w-full flex justify-between items-center p-4 text-left font-semibold text-text-light dark:text-text-dark bg-secondary-light/50 dark:bg-secondary-dark/50 hover:bg-secondary-light dark:hover:bg-secondary-dark"
                                        aria-expanded={openModuleId === module.id}
                                    >
                                        <span>{module.title}</span>
                                        <span className={`material-symbols-outlined transition-transform ${openModuleId === module.id ? 'rotate-180' : ''}`}>expand_more</span>
                                    </button>
                                    {openModuleId === module.id && (
                                        <div className="p-4 border-t border-border-light dark:border-border-dark space-y-4">
                                            {module.lessons.map(lesson => (
                                                <div key={lesson.id}>
                                                    <h4 className="font-semibold text-text-light dark:text-text-dark flex items-center gap-2"><span className="material-symbols-outlined !text-xl text-primary">play_circle</span>{lesson.title}</h4>
                                                    <div className="prose prose-sm dark:prose-invert max-w-none text-text-muted-light dark:text-text-muted-dark mt-1 ml-8" dangerouslySetInnerHTML={renderMarkdown(lesson.content)}></div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CoursePreviewModal;
