import React, { useState, useEffect, useMemo } from 'react';
import { User, Submission, Course } from '../../types';
import { MOCK_COURSES, MOCK_SUBMISSIONS, MOCK_USERS } from '../../data/mock';

interface StudentProgressModalProps {
    student: User;
    instructorId: string;
    onClose: () => void;
}

const StudentProgressModal: React.FC<StudentProgressModalProps> = ({ student, onClose }) => {
    const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);
    
    const instructorCourses = useMemo(() => {
        const instructor = MOCK_USERS.find(u => u.id === '4'); // Hardcoded for demo
        if (!instructor) return [];
        return MOCK_COURSES.filter(c => c.instructor === instructor.name);
    }, []);

    const enrolledInstructorCourses = instructorCourses.filter(c => student.enrolledCourseIds.includes(c.id));

    const getSubmissionsForCourse = (courseId: string) => {
        return submissions.filter(s => s.studentId === student.id && s.courseId === courseId);
    };

    const allowRetake = (submissionId: string) => {
        if (window.confirm("Are you sure you want to allow this student to retake the assignment?")) {
            // Use explicit typing for the status literal
            setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, grade: null, status: 'retake_allowed' as const } : s));
            
            const subIndex = MOCK_SUBMISSIONS.findIndex(s => s.id === submissionId);
            if (subIndex !== -1) {
                MOCK_SUBMISSIONS[subIndex].grade = null;
                MOCK_SUBMISSIONS[subIndex].status = 'retake_allowed';
            }
        }
    };
    
    const statusBadge = (status: Submission['status']) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
            graded: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
            retake_allowed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        };
        return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}>{status.replace('_', ' ')}</span>;
    };


    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Student Progress</h2>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{student.name} ({student.email})</p>
                    </div>
                    <button onClick={onClose} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>
                
                <main className="overflow-y-auto p-6 flex-grow space-y-6">
                    {enrolledInstructorCourses.length > 0 ? enrolledInstructorCourses.map(course => {
                        const courseProgress = student.progress[course.id] || 0;
                        const courseSubmissions = getSubmissionsForCourse(course.id);
                        
                        return (
                            <div key={course.id} className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
                                <h3 className="font-bold text-lg text-text-light dark:text-text-dark mb-3">{course.title}</h3>
                                <div className="w-full mb-4">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">Overall Progress</span>
                                        <span className="text-sm font-bold text-primary">{courseProgress}%</span>
                                    </div>
                                    <div className="w-full bg-secondary-light dark:bg-secondary-dark rounded-full h-2.5">
                                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${courseProgress}%` }}></div>
                                    </div>
                                </div>

                                <h4 className="font-semibold text-text-light dark:text-text-dark mb-2">Submissions</h4>
                                {courseSubmissions.length > 0 ? (
                                    <table className="w-full text-sm">
                                        <thead className="text-left">
                                            <tr className="border-b border-border-light dark:border-border-dark">
                                                <th className="py-2 pr-2 font-medium text-text-muted-light dark:text-text-muted-dark">Assignment</th>
                                                <th className="py-2 px-2 font-medium text-text-muted-light dark:text-text-muted-dark">Status</th>
                                                <th className="py-2 px-2 font-medium text-text-muted-light dark:text-text-muted-dark">Grade</th>
                                                <th className="py-2 pl-2 font-medium text-text-muted-light dark:text-text-muted-dark text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {courseSubmissions.map(sub => (
                                            <tr key={sub.id}>
                                                <td className="py-2 pr-2 text-text-light dark:text-text-dark">{sub.assignmentTitle}</td>
                                                <td className="py-2 px-2">{statusBadge(sub.status)}</td>
                                                <td className="py-2 px-2 font-semibold text-text-light dark:text-text-dark">{sub.grade !== null ? `${sub.grade}%` : 'N/A'}</td>
                                                <td className="py-2 pl-2 text-right">
                                                    {sub.status === 'graded' && (
                                                        <button onClick={() => allowRetake(sub.id)} className="font-medium text-primary text-xs hover:underline">Allow Retake</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">No assignments submitted for this course.</p>
                                )}
                            </div>
                        )
                    }) : (
                        <p className="text-center text-text-muted-light dark:text-text-muted-dark py-8">This student is not enrolled in any of your courses with trackable progress.</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default StudentProgressModal;