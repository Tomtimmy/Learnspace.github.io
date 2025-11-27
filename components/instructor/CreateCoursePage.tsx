
import React, { useState, useEffect, useRef } from 'react';
import { Course, Module, Lesson } from '../../types';
import { MOCK_COURSES } from '../../data/mock';
import CoursePreviewModal from './CoursePreviewModal';
import { RichTextToolbar } from '../common/RichTextToolbar';

interface CreateCoursePageProps {
    courseId: string | null;
    onSave: (courseData: Course) => void;
    onCancel: () => void;
}

const DEFAULT_COURSE: Partial<Course> = {
    title: '',
    code: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2070&auto=format&fit=crop',
    status: 'draft',
    price: 0,
    category: 'Web Development',
    level: 'Beginner',
    modules: [],
};

const CreateCoursePage: React.FC<CreateCoursePageProps> = ({ courseId, onSave, onCancel }) => {
    const [courseData, setCourseData] = useState<Partial<Course>>(DEFAULT_COURSE);
    const [showPreview, setShowPreview] = useState(false);
    const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);
    const [activeLessonIndex, setActiveLessonIndex] = useState<number | null>(null);
    const lessonContentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (courseId) {
            const existingCourse = MOCK_COURSES.find(c => c.id === courseId);
            if (existingCourse) {
                setCourseData(JSON.parse(JSON.stringify(existingCourse)));
            }
        }
    }, [courseId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCourseData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };

    const addModule = () => {
        const newModule: Module = {
            id: `m-${Date.now()}`,
            title: 'New Module',
            lessons: []
        };
        setCourseData(prev => ({ ...prev, modules: [...(prev.modules || []), newModule] }));
        setActiveModuleIndex((courseData.modules?.length || 0));
    };

    const addLesson = (moduleIndex: number) => {
        const newLesson: Lesson = {
            id: `l-${Date.now()}`,
            title: 'New Lesson',
            content: '',
            videoUrl: ''
        };
        const newModules = [...(courseData.modules || [])];
        newModules[moduleIndex].lessons.push(newLesson);
        setCourseData(prev => ({ ...prev, modules: newModules }));
        setActiveLessonIndex(newModules[moduleIndex].lessons.length - 1);
    };

    const updateLesson = (moduleIndex: number, lessonIndex: number, field: keyof Lesson, value: string) => {
        const newModules = [...(courseData.modules || [])];
        (newModules[moduleIndex].lessons[lessonIndex] as any)[field] = value;
        setCourseData(prev => ({ ...prev, modules: newModules }));
    };
    
    const updateModuleTitle = (index: number, title: string) => {
        const newModules = [...(courseData.modules || [])];
        newModules[index].title = title;
        setCourseData(prev => ({ ...prev, modules: newModules }));
    };

    const removeModule = (index: number) => {
        const newModules = [...(courseData.modules || [])];
        newModules.splice(index, 1);
        setCourseData(prev => ({ ...prev, modules: newModules }));
        setActiveModuleIndex(null);
        setActiveLessonIndex(null);
    };
    
    const removeLesson = (moduleIndex: number, lessonIndex: number) => {
        const newModules = [...(courseData.modules || [])];
        newModules[moduleIndex].lessons.splice(lessonIndex, 1);
        setCourseData(prev => ({ ...prev, modules: newModules }));
        setActiveLessonIndex(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseData.title || !courseData.instructor) {
            alert('Please fill in all required fields.');
            return;
        }
        onSave(courseData as Course);
    };

    return (
        <>
            {showPreview && courseData.title && (
                <CoursePreviewModal course={courseData as Course} onClose={() => setShowPreview(false)} />
            )}
            <div className="max-w-5xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">{courseId ? 'Edit Course' : 'Create New Course'}</h1>
                        <div className="space-x-3">
                            <button type="button" onClick={onCancel} className="px-4 py-2 text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark rounded-lg hover:bg-border-light dark:hover:bg-border-dark">Cancel</button>
                            <button type="button" onClick={() => setShowPreview(true)} className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/10">Preview</button>
                            <button type="submit" className="px-6 py-2 text-white bg-primary rounded-lg hover:bg-primary-hover">Save Course</button>
                        </div>
                    </div>

                    <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm space-y-6">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark border-b border-border-light dark:border-border-dark pb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Course Title</label>
                                    <input name="title" value={courseData.title} onChange={handleChange} className="form-input w-full rounded-lg" required placeholder="e.g. Advanced React Patterns" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Course Code</label>
                                    <input name="code" value={courseData.code} onChange={handleChange} className="form-input w-full rounded-lg" placeholder="e.g. CS303" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Category</label>
                                    <select name="category" value={courseData.category} onChange={handleChange} className="form-select w-full rounded-lg bg-white dark:bg-secondary-dark">
                                        <option>Web Development</option>
                                        <option>Data Science</option>
                                        <option>Design</option>
                                        <option>Business</option>
                                        <option>Marketing</option>
                                        <option>Arts & Crafts</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Cover Image URL</label>
                                    <input name="imageUrl" value={courseData.imageUrl} onChange={handleChange} className="form-input w-full rounded-lg" placeholder="https://..." />
                                    {courseData.imageUrl && <img src={courseData.imageUrl} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg border border-border-light dark:border-border-dark" />}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Price ($)</label>
                                        <input type="number" name="price" value={courseData.price} onChange={handleChange} className="form-input w-full rounded-lg" min="0" step="0.01" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Level</label>
                                        <select name="level" value={courseData.level} onChange={handleChange} className="form-select w-full rounded-lg bg-white dark:bg-secondary-dark">
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Expert</option>
                                            <option>All Levels</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Description</label>
                                <textarea name="description" value={courseData.description} onChange={handleChange} className="form-textarea w-full rounded-lg" rows={4} placeholder="What will students learn in this course?" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm space-y-6">
                        <div className="flex justify-between items-center border-b border-border-light dark:border-border-dark pb-4">
                            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Curriculum</h2>
                            <button type="button" onClick={addModule} className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg">add</span> Add Module
                            </button>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-6 h-[600px]">
                            {/* Sidebar: Module List */}
                            <div className="w-full md:w-1/3 border-r border-border-light dark:border-border-dark pr-4 overflow-y-auto">
                                {courseData.modules?.map((module, mIndex) => (
                                    <div key={module.id} className={`mb-4 rounded-lg border ${activeModuleIndex === mIndex ? 'border-primary bg-primary/5' : 'border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark'} overflow-hidden`}>
                                        <div 
                                            className="p-3 flex justify-between items-center cursor-pointer hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
                                            onClick={() => setActiveModuleIndex(mIndex)}
                                        >
                                            <input 
                                                value={module.title} 
                                                onChange={(e) => updateModuleTitle(mIndex, e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="bg-transparent font-bold text-text-light dark:text-text-dark focus:outline-none w-full"
                                            />
                                            <button type="button" onClick={(e) => { e.stopPropagation(); removeModule(mIndex); }} className="text-text-muted-light dark:text-text-muted-dark hover:text-red-500"><span className="material-symbols-outlined text-lg">delete</span></button>
                                        </div>
                                        {activeModuleIndex === mIndex && (
                                            <div className="bg-white dark:bg-card-dark p-2 space-y-1">
                                                {module.lessons.map((lesson, lIndex) => (
                                                    <div 
                                                        key={lesson.id} 
                                                        onClick={() => setActiveLessonIndex(lIndex)}
                                                        className={`p-2 rounded text-sm cursor-pointer flex justify-between items-center ${activeLessonIndex === lIndex ? 'bg-primary text-white' : 'text-text-muted-light dark:text-text-muted-dark hover:bg-secondary-light dark:hover:bg-secondary-dark'}`}
                                                    >
                                                        <span className="truncate">{lesson.title}</span>
                                                        <button type="button" onClick={(e) => { e.stopPropagation(); removeLesson(mIndex, lIndex); }} className={`hover:text-red-300 ${activeLessonIndex === lIndex ? 'text-white' : ''}`}><span className="material-symbols-outlined text-base">close</span></button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => addLesson(mIndex)} className="w-full text-left p-2 text-sm text-primary hover:bg-primary/10 rounded font-medium flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-base">add</span> Add Lesson
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {courseData.modules?.length === 0 && <p className="text-text-muted-light dark:text-text-muted-dark text-center italic mt-4">Click "Add Module" to start building your curriculum.</p>}
                            </div>

                            {/* Main: Lesson Editor */}
                            <div className="w-full md:w-2/3 pl-2">
                                {activeModuleIndex !== null && activeLessonIndex !== null && courseData.modules?.[activeModuleIndex]?.lessons?.[activeLessonIndex] ? (
                                    <div className="h-full flex flex-col space-y-4 animate-fade-in">
                                        <div>
                                            <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Lesson Title</label>
                                            <input 
                                                value={courseData.modules[activeModuleIndex].lessons[activeLessonIndex].title} 
                                                onChange={(e) => updateLesson(activeModuleIndex, activeLessonIndex, 'title', e.target.value)} 
                                                className="form-input w-full rounded-lg" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Video URL (optional)</label>
                                            <input 
                                                value={courseData.modules[activeModuleIndex].lessons[activeLessonIndex].videoUrl || ''} 
                                                onChange={(e) => updateLesson(activeModuleIndex, activeLessonIndex, 'videoUrl', e.target.value)} 
                                                className="form-input w-full rounded-lg" 
                                                placeholder="e.g. https://example.com/video.mp4"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark mb-1">Lesson Content (Markdown Supported)</label>
                                            <RichTextToolbar 
                                                textareaRef={lessonContentRef}
                                                onContentChange={(newContent) => updateLesson(activeModuleIndex, activeLessonIndex, 'content', newContent)}
                                            />
                                            <textarea 
                                                ref={lessonContentRef}
                                                value={courseData.modules[activeModuleIndex].lessons[activeLessonIndex].content} 
                                                onChange={(e) => updateLesson(activeModuleIndex, activeLessonIndex, 'content', e.target.value)} 
                                                className="form-textarea w-full rounded-lg flex-1 resize-none p-4 font-mono text-sm leading-relaxed" 
                                                placeholder="# Lesson content goes here..."
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-text-muted-light dark:text-text-muted-dark border-2 border-dashed border-border-light dark:border-border-dark rounded-xl">
                                        <p>Select a lesson to edit its content.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateCoursePage;
