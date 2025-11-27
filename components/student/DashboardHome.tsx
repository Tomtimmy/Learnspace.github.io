
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_COURSES, MOCK_CERTIFICATES, MOCK_LECTURES } from '../../data/mock';
import { CampaignIcon, ChatIcon, CertificatesIcon, CalendarIcon } from '../icons';
import { StarRating } from '../common/StarRating';
import { Course } from '../../types';
import CourseDetailModal from '../public/CourseDetailModal';

interface DashboardHomeProps {
    onJoinLecture?: () => void;
    onContinueCourse?: (course: Course) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onJoinLecture, onContinueCourse }) => {
    const { user, enroll } = useContext(AuthContext);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [greeting, setGreeting] = useState('Welcome back');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, []);

    const recommendedCourses = useMemo(() => {
        if (!user) return [];
        const enrolledCategories = MOCK_COURSES
            .filter(c => user.enrolledCourseIds.includes(c.id))
            .map(c => c.category);
        
        const uniqueCategories = [...new Set(enrolledCategories)];

        if (uniqueCategories.length === 0) {
            return MOCK_COURSES.filter(c => c.bestseller).slice(0, 4);
        }

        return MOCK_COURSES
            .filter(c => !user.enrolledCourseIds.includes(c.id) && uniqueCategories.includes(c.category))
            .slice(0, 4);
    }, [user]);

    if (!user) return null;

    const enrolledCourses = MOCK_COURSES.filter(c => user.enrolledCourseIds.includes(c.id));
    const userCertificates = MOCK_CERTIFICATES.filter(c => c.studentName === user.name);

    const lastStudiedCourse = enrolledCourses.find(c => (user.progress[c.id] || 0) > 0 && (user.progress[c.id] || 0) < 100);
    const activeCourses = enrolledCourses.filter(c => (user.progress[c.id] || 0) < 100);
    
    const upcomingLecture = MOCK_LECTURES.find(lecture => {
        const now = new Date();
        const lectureTime = new Date(lecture.date);
        const timeDiff = lectureTime.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        return user.enrolledCourseIds.includes(lecture.courseId) && hoursDiff > 0 && hoursDiff <= 48; // Show up to 48h in advance
    });

    return (
        <div className="space-y-8 animate-fade-in">
            {selectedCourse && <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
            
            <div className="flex flex-wrap justify-between gap-3 items-end border-b border-border-light dark:border-border-dark pb-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark">
                        {greeting}, <span className="text-primary">{user.name.split(' ')[0]}</span>!
                    </h1>
                    <p className="text-lg font-medium text-text-muted-light dark:text-text-muted-dark">You're making great progress. Keep it up!</p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Current Status</p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center justify-end gap-1">
                        <span className="material-symbols-outlined text-base">fiber_manual_record</span> Active Student
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* Hero Progress Card */}
                    {lastStudiedCourse ? (
                         <div className="p-1 bg-gradient-to-r from-primary to-blue-400 rounded-2xl shadow-glow animate-fade-in-up delay-100">
                             <div className="bg-card-light dark:bg-card-dark rounded-xl p-6 h-full">
                                <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">resume</span> Pick Up Where You Left Off
                                </h2>
                                <div className="flex flex-col sm:flex-row items-stretch gap-6">
                                    <div className="w-full sm:w-48 aspect-video bg-cover bg-center rounded-lg shadow-md flex-shrink-0" style={{ backgroundImage: `url("${lastStudiedCourse.imageUrl}")` }}></div>
                                    <div className="flex flex-col justify-center flex-1">
                                        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-1">{lastStudiedCourse.title}</h3>
                                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">Chapter 3: Prototyping and User Testing</p>
                                        
                                        <div className="w-full bg-secondary-light dark:bg-secondary-dark rounded-full h-2.5 mb-2">
                                            <div className="bg-primary h-2.5 rounded-full transition-all duration-1000" style={{ width: `${user.progress[lastStudiedCourse.id]}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs font-semibold text-text-muted-light dark:text-text-muted-dark mb-4">
                                            <span>{user.progress[lastStudiedCourse.id]}% Complete</span>
                                            <span>12m remaining</span>
                                        </div>

                                        <button 
                                            onClick={() => onContinueCourse && onContinueCourse(lastStudiedCourse)}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5 w-fit"
                                        >
                                            <span className="material-symbols-outlined text-xl">play_arrow</span> Continue Learning
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark text-center animate-fade-in-up delay-100">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl">school</span>
                            </div>
                            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">No Active Courses</h2>
                            <p className="text-text-muted-light dark:text-text-muted-dark mt-2 mb-6">Browse our catalog to start your learning journey today.</p>
                            <button onClick={() => {}} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover">Browse Courses</button>
                        </div>
                    )}
                   
                    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-soft border border-border-light dark:border-border-dark animate-fade-in-up delay-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Active Courses</h2>
                            <a className="text-sm font-bold text-primary hover:underline" href="#">View All</a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {activeCourses.slice(0, 2).map(course => (
                               <div key={course.id} className="flex flex-col bg-background-light dark:bg-background-dark p-4 rounded-xl border border-border-light dark:border-border-dark hover:border-primary/30 transition-all hover:shadow-md cursor-pointer group">
                                    <div className="w-full h-32 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0 mb-4 group-hover:scale-[1.02] transition-transform duration-300" style={{ backgroundImage: `url("${course.imageUrl}")`}}></div>
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-base font-bold text-text-light dark:text-text-dark line-clamp-1 group-hover:text-primary transition-colors">{course.title}</h3>
                                        <div className="mt-auto pt-4">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-xs font-bold text-text-muted-light dark:text-text-muted-dark">Progress</span>
                                                <span className="text-xs font-bold text-primary">{user.progress[course.id]}%</span>
                                            </div>
                                            <div className="w-full bg-secondary-light dark:bg-secondary-dark rounded-full h-1.5">
                                                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${user.progress[course.id]}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                     {/* Notifications Panel */}
                    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-soft border border-border-light dark:border-border-dark animate-fade-in-up delay-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark">Quick Updates</h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            {upcomingLecture && (
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-200 dark:border-amber-800/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/20 rounded-full blur-xl -mr-4 -mt-4"></div>
                                    <div className="text-amber-600 dark:text-amber-400 mt-1 bg-white dark:bg-black/20 p-2 rounded-lg"><CalendarIcon className="text-xl" /></div>
                                    <div className="flex-1 relative z-10">
                                      <p className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide mb-1">Upcoming Lecture</p>
                                      <p className="font-bold text-text-light dark:text-text-dark text-sm mb-1">{upcomingLecture.title}</p>
                                      <p className="text-xs text-text-muted-light dark:text-text-muted-dark mb-3">{upcomingLecture.time}</p>
                                      <button onClick={onJoinLecture} className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-md font-bold hover:bg-amber-700 transition-colors shadow-sm">Join Now</button>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors cursor-pointer group">
                                <div className="text-primary bg-primary/10 p-2.5 rounded-full group-hover:bg-primary group-hover:text-white transition-colors"><CampaignIcon className="text-xl" /></div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-text-light dark:text-text-dark">Platform Update</p>
                                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-0.5">New features added to the course player.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors cursor-pointer group">
                                <div className="text-blue-500 bg-blue-500/10 p-2.5 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors"><ChatIcon className="text-xl" /></div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-text-light dark:text-text-dark">Instructor Message</p>
                                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-0.5">John Doe posted in Web Dev Bootcamp.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Achievements/Certificates */}
                     <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-soft border border-border-light dark:border-border-dark animate-fade-in-up delay-400">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Certificates</h2>
                            <a className="text-sm font-bold text-primary hover:underline" href="#">View All</a>
                        </div>
                        <div className="space-y-4">
                            {userCertificates.slice(0, 2).map(cert => (
                                <div key={cert.id} className="flex items-center gap-4 p-4 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark hover:shadow-md transition-shadow">
                                    <div className="flex-shrink-0 text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                                        <CertificatesIcon className="text-2xl" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-text-light dark:text-text-dark line-clamp-1">{cert.courseName}</h3>
                                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-0.5">Issued: {cert.issueDate}</p>
                                    </div>
                                </div>
                            ))}
                             {userCertificates.length === 0 && <p className="text-sm text-text-muted-light dark:text-text-muted-dark text-center italic">Complete a course to earn your first certificate!</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            {recommendedCourses.length > 0 && (
                <div className="mt-12 animate-fade-in-up delay-500">
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Recommended For You</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recommendedCourses.map(course => (
                            <div 
                                key={course.id} 
                                className="group flex flex-col rounded-xl border border-border-light bg-card-light dark:border-border-dark dark:bg-card-dark shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-2"
                                onClick={() => setSelectedCourse(course)}
                            >
                                <div className="aspect-video w-full bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url('${course.imageUrl}')`}}>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                </div>
                                <div className="flex flex-1 flex-col justify-between gap-2 p-4">
                                    <div>
                                        <p className="text-xs font-bold text-primary uppercase tracking-wide">{course.category}</p>
                                        <h3 className="font-bold text-sm text-text-light dark:text-text-dark mt-1 group-hover:text-primary transition-colors line-clamp-2">{course.title}</h3>
                                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">by {course.instructor}</p>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="font-bold text-xs text-accent">{course.rating.toFixed(1)}</span>
                                        <StarRating rating={course.rating} className="!text-xs" />
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <p className="text-base font-bold text-text-light dark:text-text-dark">{course.price > 0 ? `$${course.price}` : 'Free'}</p>
                                        <button onClick={(e) => { e.stopPropagation(); enroll(course.id); }} className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-lg">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
