
import React, { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_COURSES, MOCK_SUBMISSIONS, MOCK_CERTIFICATES } from '../../data/mock';
import { Course } from '../../types';
import ViewSubmissionsModal from './ViewSubmissionsModal';
import CertificateModal from './CertificateModal';
import CourseDetailModal from '../public/CourseDetailModal';
import { StarRating } from '../common/StarRating';

interface MyCoursesPageProps {
    onStartCourse?: (course: Course) => void;
}

type StatusFilter = 'All Statuses' | 'In Progress' | 'Completed' | 'Not Started';
type Tab = 'my_learning' | 'explore';

const EnrolledCourseCard: React.FC<{ 
    course: Course; 
    progress: number; 
    onViewSubmissions: () => void; 
    hasSubmissions: boolean;
    onStart: () => void;
    onViewCertificate: () => void;
    hasCertificate: boolean;
}> = ({ course, progress, onViewSubmissions, hasSubmissions, onStart, onViewCertificate, hasCertificate }) => {
    const isCompleted = progress === 100;
    const isStarted = progress > 0;
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessonsEstimate = Math.round((progress / 100) * totalLessons);

    return (
        <div className="flex flex-col bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group h-full hover:-translate-y-1">
            <div className="w-full h-44 bg-center bg-no-repeat bg-cover flex-shrink-0 relative" style={{ backgroundImage: `url("${course.imageUrl}")` }}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <button onClick={onStart} className="bg-white/20 backdrop-blur-sm text-white rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-lg hover:bg-white/30 hover:scale-110 duration-300">
                        <span className="material-symbols-outlined text-4xl">play_arrow</span>
                    </button>
                </div>
                {isCompleted && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span> Completed
                    </div>
                )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold leading-tight text-text-light dark:text-text-dark line-clamp-2">{course.title}</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1 mb-4">by {course.instructor}</p>
                
                <div className="mt-auto space-y-4">
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                            <span className={`${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>{progress}% Complete</span>
                            <span className="text-text-muted-light dark:text-text-muted-dark">{completedLessonsEstimate}/{totalLessons} Lessons</span>
                        </div>
                        <div className="w-full h-2 bg-secondary-light dark:bg-secondary-dark rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-500' : 'bg-primary'}`} 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button 
                            onClick={onStart}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold text-white transition-colors shadow-sm flex items-center justify-center gap-2 ${
                                isCompleted 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-primary hover:bg-primary-hover'
                            }`}
                        >
                            {isCompleted ? 'Review Course' : isStarted ? 'Continue' : 'Start Learning'}
                        </button>
                        
                        {hasCertificate && isCompleted && (
                            <button 
                                onClick={onViewCertificate} 
                                className="py-2 px-3 rounded-lg border border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-sm font-semibold transition-colors flex items-center justify-center gap-1"
                                title="View Certificate"
                            >
                                <span className="material-symbols-outlined text-lg">workspace_premium</span>
                            </button>
                        )}
                        
                        {hasSubmissions && (
                            <button 
                                onClick={onViewSubmissions} 
                                className="py-2 px-3 rounded-lg border border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary hover:bg-secondary-light dark:hover:bg-secondary-dark text-sm font-semibold transition-colors flex items-center justify-center gap-1"
                                title="View Submissions"
                            >
                                <span className="material-symbols-outlined text-lg">assignment</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BrowseCourseCard: React.FC<{
    course: Course;
    onEnroll: () => void;
    onViewDetails: () => void;
}> = ({ course, onEnroll, onViewDetails }) => {
    return (
        <div 
            className="flex flex-col bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group h-full hover:-translate-y-1 cursor-pointer"
            onClick={onViewDetails}
        >
            <div className="w-full h-44 bg-center bg-no-repeat bg-cover flex-shrink-0 relative" style={{ backgroundImage: `url("${course.imageUrl}")` }}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-text-light dark:text-text-dark shadow-sm">
                    {course.category}
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold leading-tight text-text-light dark:text-text-dark line-clamp-2 mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-2">by {course.instructor}</p>
                
                <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-sm text-accent">{course.rating.toFixed(1)}</span>
                    <StarRating rating={course.rating} className="!text-sm" />
                    <span className="text-xs text-text-muted-light dark:text-text-muted-dark">({course.reviewCount})</span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3">
                    <p className="text-xl font-bold text-text-light dark:text-text-dark">
                        {course.price > 0 ? `$${course.price}` : 'Free'}
                    </p>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onEnroll(); }}
                        className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors shadow-md z-10"
                    >
                        Enroll
                    </button>
                </div>
            </div>
        </div>
    );
};

const MyCoursesPage: React.FC<MyCoursesPageProps> = ({ onStartCourse }) => {
    const { user, enroll } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState<Tab>('my_learning');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('All Statuses');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modals
    const [viewSubmissionsCourse, setViewSubmissionsCourse] = useState<Course | null>(null);
    const [viewCertificate, setViewCertificate] = useState<any | null>(null);
    const [selectedCourseDetails, setSelectedCourseDetails] = useState<Course | null>(null);

    if (!user) return <div>Loading...</div>;

    const enrolledCourses = useMemo(() => {
        return MOCK_COURSES.filter(c => user.enrolledCourseIds.includes(c.id));
    }, [user]);

    const availableCourses = useMemo(() => {
        return MOCK_COURSES.filter(c => !user.enrolledCourseIds.includes(c.id));
    }, [user]);

    const filteredCourses = useMemo(() => {
        const sourceList = activeTab === 'my_learning' ? enrolledCourses : availableCourses;
        
        return sourceList.filter(course => {
            const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

            if (activeTab === 'my_learning') {
                const progress = user.progress[course.id] || 0;
                let statusMatch = true;
                if (statusFilter === 'In Progress') statusMatch = progress > 0 && progress < 100;
                else if (statusFilter === 'Completed') statusMatch = progress === 100;
                else if (statusFilter === 'Not Started') statusMatch = progress === 0;
                return statusMatch && searchMatch;
            }

            return searchMatch;
        });
    }, [enrolledCourses, availableCourses, activeTab, user, statusFilter, searchTerm]);

    const handleViewSubmissions = (course: Course) => {
        setViewSubmissionsCourse(course);
    };

    const handleViewCertificate = (course: Course) => {
        const cert = MOCK_CERTIFICATES.find(c => c.courseName === course.title && c.studentName === user.name);
        if (cert) {
            setViewCertificate(cert);
        }
    };

    return (
        <div className="space-y-8">
            {viewSubmissionsCourse && (
                <ViewSubmissionsModal 
                    course={viewSubmissionsCourse} 
                    student={user} 
                    onClose={() => setViewSubmissionsCourse(null)} 
                />
            )}
            {viewCertificate && (
                <CertificateModal 
                    certificate={viewCertificate} 
                    onClose={() => setViewCertificate(null)} 
                />
            )}
            {selectedCourseDetails && (
                <CourseDetailModal 
                    course={selectedCourseDetails} 
                    onClose={() => setSelectedCourseDetails(null)} 
                />
            )}

            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark">Courses</h1>
                    <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">Continue learning or explore new skills.</p>
                </div>

                <div className="flex border-b border-border-light dark:border-border-dark">
                    <button 
                        onClick={() => setActiveTab('my_learning')}
                        className={`pb-3 px-4 text-sm font-bold transition-colors relative ${activeTab === 'my_learning' ? 'text-primary' : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
                    >
                        My Learning
                        {activeTab === 'my_learning' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>}
                    </button>
                    <button 
                        onClick={() => setActiveTab('explore')}
                        className={`pb-3 px-4 text-sm font-bold transition-colors relative ${activeTab === 'explore' ? 'text-primary' : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
                    >
                        Explore Courses
                        {activeTab === 'explore' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>}
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow sm:max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">search</span>
                        <input 
                            type="text" 
                            placeholder={activeTab === 'my_learning' ? "Search my courses..." : "Search available courses..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input pl-10 rounded-lg w-full h-10 text-sm"
                        />
                    </div>
                    {activeTab === 'my_learning' && (
                        <select 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                            className="form-select rounded-lg h-10 text-sm bg-card-light dark:bg-card-dark border-border-light dark:border-border-dark text-text-light dark:text-text-dark w-full sm:w-auto"
                        >
                            <option>All Statuses</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Not Started</option>
                        </select>
                    )}
                </div>
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map(course => {
                        if (activeTab === 'my_learning') {
                            const progress = user.progress[course.id] || 0;
                            const hasSubmissions = MOCK_SUBMISSIONS.some(s => s.courseId === course.id && s.studentId === user.id);
                            const hasCertificate = MOCK_CERTIFICATES.some(c => c.courseName === course.title && c.studentName === user.name);

                            return (
                                <EnrolledCourseCard 
                                    key={course.id} 
                                    course={course} 
                                    progress={progress}
                                    onViewSubmissions={() => handleViewSubmissions(course)}
                                    hasSubmissions={hasSubmissions}
                                    onStart={() => onStartCourse && onStartCourse(course)}
                                    onViewCertificate={() => handleViewCertificate(course)}
                                    hasCertificate={hasCertificate}
                                />
                            );
                        } else {
                            return (
                                <BrowseCourseCard
                                    key={course.id}
                                    course={course}
                                    onEnroll={() => enroll(course.id)}
                                    onViewDetails={() => setSelectedCourseDetails(course)}
                                />
                            );
                        }
                    })}
                </div>
            ) : (
                <div className="text-center py-20 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark dashed border-2">
                    <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">school</span>
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark">No courses found</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark mt-2">
                        {activeTab === 'my_learning' 
                            ? "You haven't enrolled in any courses matching these filters." 
                            : "No new courses found matching your search."}
                    </p>
                    {activeTab === 'my_learning' && (
                        <button onClick={() => { setActiveTab('explore'); setSearchTerm(''); }} className="mt-4 text-primary font-bold hover:underline">
                            Browse Available Courses
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyCoursesPage;
