import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_COURSES, MOCK_USERS, MOCK_SUBMISSIONS, MOCK_LECTURES } from '../../data/mock';
import { InstructorView } from './InstructorDashboard';
import { Course } from '../../types';

interface InstructorHomeProps {
    setActiveView: (view: InstructorView) => void;
}

const StatCard: React.FC<{ icon: string; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
    <div className="flex items-start gap-4 rounded-xl p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50">
        <div className={`flex-shrink-0 flex items-center justify-center size-12 rounded-lg ${color}`}>
            <span className="material-symbols-outlined text-white text-3xl">{icon}</span>
        </div>
        <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-normal">{label}</p>
            <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">{value}</p>
        </div>
    </div>
);

const InstructorHome: React.FC<InstructorHomeProps> = ({ setActiveView }) => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    const instructorCourses = MOCK_COURSES.filter(c => c.instructor === user.name);
    const instructorCourseIds = instructorCourses.map(c => c.id);

    const students = MOCK_USERS.filter(u => 
        u.role === 'student' && u.enrolledCourseIds.some(id => instructorCourseIds.includes(id))
    );
    const totalStudents = students.length;

    const totalRevenue = instructorCourses.reduce((acc, course) => {
        const enrollments = MOCK_USERS.filter(u => u.enrolledCourseIds.includes(course.id)).length;
        return acc + (enrollments * course.price);
    }, 0);

    const totalEnrollments = MOCK_USERS.reduce((acc, u) => {
        if (u.role === 'student') {
            const enrolledCount = u.enrolledCourseIds.filter(id => instructorCourseIds.includes(id)).length;
            return acc + enrolledCount;
        }
        return acc;
    }, 0);

    const completedEnrollments = MOCK_USERS.reduce((acc, u) => {
        if (u.role === 'student') {
            const completedCount = u.enrolledCourseIds
                .filter(id => instructorCourseIds.includes(id))
                .filter(id => u.progress[id] === 100)
                .length;
            return acc + completedCount;
        }
        return acc;
    }, 0);
    
    const completionRate = totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0;

    const gradedSubmissions = MOCK_SUBMISSIONS.filter(sub => 
        instructorCourseIds.includes(sub.courseId) && sub.status === 'graded' && sub.grade !== null
    );

    const totalGrade = gradedSubmissions.reduce((acc, sub) => acc + sub.grade!, 0);
    const averageGrade = gradedSubmissions.length > 0 ? Math.round(totalGrade / gradedSubmissions.length) : 0;

    const upcomingLectures = MOCK_LECTURES.filter(lec => lec.instructor === user.name && lec.date > new Date());

    return (
        <div className="space-y-8">
             <div className="flex flex-col gap-1">
                <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Welcome, {user.name.split(' ')[0]}!</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Here's what's happening with your courses today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <button onClick={() => setActiveView('edit_course')} className="h-28 flex flex-col items-center justify-center gap-2 rounded-xl p-4 bg-primary text-white transition-colors hover:bg-primary/90">
                    <span className="material-symbols-outlined text-3xl">post_add</span>
                    <p className="text-sm font-semibold">Create New Course</p>
                </button>
                 <button onClick={() => setActiveView('submissions')} className="h-28 flex flex-col items-center justify-center gap-2 rounded-xl p-4 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="material-symbols-outlined text-3xl">reviews</span>
                    <p className="text-sm font-semibold">Grade Submissions</p>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard icon="school" label="Total Courses" value={instructorCourses.length} color="bg-primary" />
                <StatCard icon="group" label="Total Students" value={totalStudents} color="bg-orange-500" />
                <StatCard icon="payments" label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} color="bg-green-500" />
                <StatCard icon="grading" label="Average Grade" value={`${averageGrade}%`} color="bg-blue-500" />
                <StatCard icon="task_alt" label="Completion Rate" value={`${completionRate}%`} color="bg-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50 rounded-xl">
                    <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Student Enrollment</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">New enrollments over the last 6 months</p>
                    </div>
                    <div className="w-full h-64 flex items-center justify-center">
                        <img className="w-full h-full object-contain" alt="A line chart showing student enrollment over the last 6 months with a positive upward trend." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLT5LSbyW-R5HIwkDhVfN-tVqUxpjI3ykTEnLuprjBkX_VS_RTbtkv1x-ofnWfNA2kFQUD0Zux8McaVVFTaqMDiVzLObHuq2UlSY0AAqltVT96aEK5kPNjO3WCvDQTwf_QBHmm27_Dg4Z7FuhHRi8AB6GcU2qSOz0E_VR6vzb_ZBTchKxzVOus03rcPagQ0tfuoSAgPHSnAs5ZAWSZ3gLGNflMvGr96hKJlXpgA586vmUOcCW3z9dXxAT0HUxDrVvQne4V9PVqK-d1"/>
                    </div>
                </div>
                 <div className="p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50 rounded-xl">
                    <div className="flex flex-col gap-1 mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Completions</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Completions over the last 6 months</p>
                    </div>
                    <div className="w-full h-64 flex items-center justify-center">
                        <img className="w-full h-full object-contain" alt="A bar chart showing course completions over time." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB23Sub2msycVNfUCnZJ0GE1rr0b2OnGOcq5lXdbBkkNHWihtPOlGPs4M5kNLSmA4Z0dS5SmxBgOFVkxMJysyb6fRYhO8SSM-J_7qquvXys6uQS2qDW3W0CaPzKvFVJg8pZ6u63SkXs9-0j_zUXvQaCxi_WMos-O5nRgHExgtKXrBFa214KIfIL8VpVS2QXA-SdTnGvBXPmDPJDRGat5IxwjKYPuu-6LoDwpZypB7dOBdG9ZrUH8T7gGrw-77g-_UOiQ0B-lnEb3sNP"/>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                     <div className="p-4 border-b border-border-light dark:border-border-dark">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Course Performance</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Course</th>
                                    <th scope="col" className="px-6 py-3">Students</th>
                                    <th scope="col" className="px-6 py-3">Avg. Progress</th>
                                    <th scope="col" className="px-6 py-3">Total Lessons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {instructorCourses.slice(0, 5).map(course => {
                                    const courseStudents = MOCK_USERS.filter(u => u.enrolledCourseIds.includes(course.id)).length;
                                    const courseProgress = MOCK_USERS.reduce((acc, u) => {
                                        if (u.enrolledCourseIds.includes(course.id)) {
                                            return acc + (u.progress[course.id] || 0);
                                        }
                                        return acc;
                                    }, 0) / (courseStudents || 1);
                                    
                                    const totalLessons = course.modules?.reduce((acc, mod) => acc + (mod?.lessons?.length || 0), 0) ?? 0;

                                    return (
                                        <tr key={course.id} className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
                                            <td className="px-6 py-4 font-medium text-text-light dark:text-text-dark whitespace-nowrap">{course.title}</td>
                                            <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{courseStudents}</td>
                                            <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{Math.round(courseProgress)}%</td>
                                            <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{totalLessons}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                 <div className="lg:col-span-2 p-6 bg-white dark:bg-[#1C252E] border border-gray-200 dark:border-gray-700/50 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Lectures</h3>
                    {upcomingLectures.length > 0 ? (
                        <div className="space-y-4">
                            {upcomingLectures.map(lec => (
                                <div key={lec.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-primary/10">
                                    <div className="bg-primary/20 text-primary p-2 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined">smart_display</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{lec.courseName}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{lec.date.toLocaleDateString()} - {lec.time}</p>
                                    </div>
                                    <button onClick={() => setActiveView('lecture')} className="text-primary text-sm font-semibold hover:underline">Start</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">No upcoming lectures scheduled.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorHome;