import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_COURSES, MOCK_USERS } from '../../data/mock';
import { User, UserRole } from '../../types';
import StudentProgressModal from './StudentProgressModal';

const MyStudentsPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

    if (!user) return null;

    const instructorCourses = MOCK_COURSES.filter(c => c.instructor === user.name);
    const instructorCourseIds = instructorCourses.map(c => c.id);
    
    const students = MOCK_USERS.filter(u => 
        u.role === UserRole.STUDENT && 
        u.enrolledCourseIds.some(courseId => instructorCourseIds.includes(courseId))
    );

    return (
        <>
            {selectedStudent && <StudentProgressModal student={selectedStudent} instructorId={user.id} onClose={() => setSelectedStudent(null)} />}
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">My Students</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">View and manage students enrolled in your courses.</p>
                </div>

                <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                    <div className="p-4 border-b border-border-light dark:border-border-dark">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Enrolled Students ({students.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Enrolled Courses</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id} className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
                                        <td className="px-6 py-4 font-medium text-text-light dark:text-text-dark whitespace-nowrap">
                                            <div className="font-semibold">{student.name}</div>
                                            <div className="text-text-muted-light dark:text-text-muted-dark">{student.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">
                                            {student.enrolledCourseIds
                                                .filter(id => instructorCourseIds.includes(id))
                                                .map(id => MOCK_COURSES.find(c => c.id === id)?.title)
                                                .join(', ')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => setSelectedStudent(student)} className="text-primary hover:underline font-medium">View Progress</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyStudentsPage;
