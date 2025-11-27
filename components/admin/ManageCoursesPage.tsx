
import React, { useState } from 'react';
import CourseCreatorAI from './CourseCreatorAI';
import { MOCK_COURSES, MOCK_USERS } from '../../data/mock';

interface ManageCoursesPageProps {
    onCreateCourse: () => void;
    onEditCourse: (courseId: string) => void;
}

const ManageCoursesPage: React.FC<ManageCoursesPageProps> = ({ onCreateCourse, onEditCourse }) => {
    const [courses, setCourses] = useState(MOCK_COURSES);

    const deleteCourse = (courseId: string) => {
        if (window.confirm('Are you sure you want to permanently delete this course? This will unenroll all students and cannot be undone.')) {
            const index = MOCK_COURSES.findIndex(c => c.id === courseId);
            if (index > -1) {
                MOCK_COURSES.splice(index, 1);
            }
            setCourses(MOCK_COURSES.filter(c => c.id !== courseId));
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
                 <div>
                    <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Manage Courses</h1>
                    <p className="mt-2 text-base text-text-muted-light dark:text-text-muted-dark">
                        Use the AI-powered tool below to quickly generate course outlines, or manage existing courses in the list.
                    </p>
                </div>
                <button 
                    onClick={onCreateCourse}
                    className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-semibold transition-colors hover:bg-primary/90"
                >
                    <span className="material-symbols-outlined text-base">add</span>
                    Create New Course
                </button>
            </div>
            <CourseCreatorAI />
            
            <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm mt-8">
                <div className="p-4 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Existing Courses ({courses.length})</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
                            <tr>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Instructor</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Enrolled</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => {
                                const enrolledCount = MOCK_USERS.filter(u => u.enrolledCourseIds.includes(course.id)).length;
                                return (
                                    <tr key={course.id} className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
                                        <td className="px-6 py-4 font-medium text-text-light dark:text-text-dark whitespace-nowrap">{course.title}</td>
                                        <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{course.instructor}</td>
                                        <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">${course.price.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${course.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{enrolledCount}</td>
                                        <td className="px-6 py-4 space-x-4 whitespace-nowrap">
                                            <button onClick={() => onEditCourse(course.id)} className="text-primary hover:underline font-medium">Edit</button>
                                            <button onClick={() => deleteCourse(course.id)} className="text-red-600 hover:underline font-medium">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCoursesPage;
