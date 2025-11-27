
import React, { useState, useEffect, useContext } from 'react';
import { Course, Review } from '../../types';
import { StarRating } from '../common/StarRating';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_COURSES } from '../../data/mock';
import LoginPage from './LoginPage';

interface CourseDetailModalProps {
    course: Course;
    onClose: () => void;
}

const RatingInput: React.FC<{ rating: number, setRating: (r: number) => void }> = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return (
        <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map(star => (
                <span 
                    key={star}
                    className="material-symbols-outlined !text-3xl cursor-pointer text-accent"
                    style={{ fontVariationSettings: `'FILL' ${star <= (hoverRating || rating) ? 1 : 0}`}}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                >
                    star
                </span>
            ))}
        </div>
    );
};

const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ course: initialCourse, onClose }) => {
    const [course, setCourse] = useState(initialCourse);
    const [openModuleId, setOpenModuleId] = useState<string | null>(course.modules?.[0]?.id ?? null);
    const { user, enroll } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false);

    // Review form state
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape' && !showLogin) {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose, showLogin]);

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRating === 0 || !newComment.trim() || !user) return;
        
        const newReview: Review = {
            id: `rev-${Date.now()}`,
            studentName: user.name,
            avatarUrl: user.imageUrl || `https://i.pravatar.cc/150?u=${user.id}`,
            rating: newRating,
            comment: newComment,
            date: new Date().toISOString().split('T')[0]
        };
        
        const updatedCourse = {
            ...course,
            reviews: [newReview, ...course.reviews],
            reviewCount: course.reviewCount + 1,
            // Recalculate average rating
            rating: (course.rating * course.reviewCount + newReview.rating) / (course.reviewCount + 1)
        };
        
        // Update mock data in memory
        const courseIndex = MOCK_COURSES.findIndex(c => c.id === course.id);
        if (courseIndex > -1) {
            MOCK_COURSES[courseIndex] = updatedCourse;
        }

        setCourse(updatedCourse);
        setNewRating(0);
        setNewComment('');
    };
    
    const handleEnroll = () => {
        if (user) {
            enroll(course.id);
            onClose(); // Close modal after enrolling
        } else {
            // Save pending enrollment intention
            localStorage.setItem('pendingEnrollment', course.id);
            setShowLogin(true);
        }
    };

    const handleModuleToggle = (moduleId: string) => {
        setOpenModuleId(prevId => (prevId === moduleId ? null : moduleId));
    };

    if (showLogin) {
        return <LoginPage onBack={() => setShowLogin(false)} onShowForgotPassword={() => {}} defaultToSignUp={true} />;
    }

    const isEnrolled = user?.enrolledCourseIds.includes(course.id);

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-title"
        >
            <div 
                className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-scale-up"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center flex-shrink-0">
                    <h2 id="course-title" className="text-xl font-bold text-text-light dark:text-text-dark truncate pr-4">{course.title}</h2>
                    <button onClick={onClose} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark p-1 rounded-full hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>

                <main className="overflow-y-auto p-6 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                             <img src={course.imageUrl} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4 shadow-md" />
                            <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-2">About this course</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">{course.description}</p>
                        </div>
                        <div className="md:col-span-1">
                             <div className="bg-secondary-light dark:bg-secondary-dark p-5 rounded-xl space-y-4 sticky top-0 shadow-inner">
                                <p className="text-4xl font-bold text-text-light dark:text-text-dark">${course.price}</p>
                                <button 
                                    onClick={handleEnroll} 
                                    disabled={isEnrolled}
                                    className={`w-full font-bold py-3.5 rounded-lg transition-all shadow-lg transform active:scale-95 ${
                                        isEnrolled 
                                        ? 'bg-green-600 text-white cursor-default shadow-none' 
                                        : 'bg-primary text-white hover:bg-primary-hover hover:-translate-y-1'
                                    }`}
                                >
                                    {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                                </button>
                                <div className="text-sm text-text-muted-light dark:text-text-muted-dark space-y-3 pt-2 border-t border-border-light dark:border-border-dark">
                                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-base">person</span> <span className="font-semibold text-text-light dark:text-text-dark">Instructor:</span> {course.instructor}</p>
                                    <p className="flex items-center gap-2"><span className="material-symbols-outlined text-base">bar_chart</span> <span className="font-semibold text-text-light dark:text-text-dark">Skill Level:</span> {course.level}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">star</span>
                                        <span className="font-semibold text-text-light dark:text-text-dark">Rating:</span>
                                        <div className="flex items-center">
                                            <StarRating rating={course.rating} className="!text-sm" />
                                            <span className="ml-1 text-xs">({course.reviewCount})</span>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Course Content</h3>
                        <div className="space-y-2">
                            {course.modules.map(module => (
                                <div key={module.id} className="border border-border-light dark:border-border-dark rounded-lg overflow-hidden">
                                    <button 
                                        onClick={() => handleModuleToggle(module.id)}
                                        className="w-full flex justify-between items-center p-4 text-left font-semibold text-text-light dark:text-text-dark bg-secondary-light/50 dark:bg-secondary-dark/50 hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors"
                                        aria-expanded={openModuleId === module.id}
                                    >
                                        <span>{module.title}</span>
                                        <span className={`material-symbols-outlined transition-transform duration-300 ${openModuleId === module.id ? 'rotate-180' : ''}`}>expand_more</span>
                                    </button>
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openModuleId === module.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-4 border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
                                            <ul className="space-y-3 text-text-muted-light dark:text-text-muted-dark">
                                                {module.lessons.map(lesson => (
                                                    <li key={lesson.id} className="flex items-start gap-3">
                                                        <span className="material-symbols-outlined text-sm mt-1 text-primary">play_circle</span>
                                                        <div>
                                                            <strong className="text-text-light dark:text-text-dark block">{lesson.title}</strong>
                                                            <span className="text-sm">{lesson.content.substring(0, 100)}...</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Reviews ({course.reviewCount})</h3>
                        
                        {user && (
                             <form onSubmit={handleReviewSubmit} className="my-6 p-6 bg-secondary-light dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark">
                                <h4 className="font-bold text-lg text-text-light dark:text-text-dark mb-2">Leave a Review</h4>
                                <div className="mb-4">
                                    <RatingInput rating={newRating} setRating={setNewRating} />
                                </div>
                                <textarea 
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="form-textarea w-full rounded-lg border-border-light dark:border-border-dark bg-white dark:bg-background-dark focus:ring-primary focus:border-primary"
                                    placeholder="Share your thoughts about the course..."
                                    rows={4}
                                    required
                                ></textarea>
                                <div className="mt-3 flex justify-end">
                                    <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors" disabled={!newComment || newRating === 0}>
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="space-y-6">
                            {course.reviews.map(review => (
                                <div key={review.id} className="flex items-start gap-4 pb-6 border-b border-border-light dark:border-border-dark last:border-0">
                                    <img src={review.avatarUrl} alt={review.studentName} className="size-12 rounded-full object-cover shadow-sm" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <p className="font-bold text-text-light dark:text-text-dark">{review.studentName}</p>
                                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{review.date}</p>
                                        </div>
                                        <div className="my-1"><StarRating rating={review.rating} /></div>
                                        <p className="text-text-muted-light dark:text-text-muted-dark mt-2">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-up {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
                .animate-scale-up {
                    animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </div>
    );
};

export default CourseDetailModal;
