import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_COURSES } from '../../data/mock';

interface CourseManagementPageProps {
    onCreateCourse: () => void;
    onEditCourse: (courseId: string) => void;
}

const CourseManagementPage: React.FC<CourseManagementPageProps> = ({ onCreateCourse, onEditCourse }) => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    const instructorCourses = MOCK_COURSES.filter(c => c.instructor === user.name);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Course Management</h1>
                    <p className="mt-2 text-base text-text-muted-light dark:text-text-muted-dark">
                        Manage your existing courses and create new ones.
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

            <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                <div className="p-4 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">My Courses ({instructorCourses.length})</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
                            <tr>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Code</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instructorCourses.map(course => (
                                <tr key={course.id} className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
                                    <td className="px-6 py-4 font-medium text-text-light dark:text-text-dark whitespace-nowrap">{course.title}</td>
                                    <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{course.code}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            course.status === 'published' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                        }`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => onEditCourse(course.id)} className="text-primary hover:underline font-medium">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {instructorCourses.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-text-muted-light dark:text-text-muted-dark">You haven't created any courses yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseManagementPage;
