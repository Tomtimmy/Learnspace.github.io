import React, { useContext, useState, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_COURSES, MOCK_SUBMISSIONS, MOCK_USERS } from '../../data/mock';
import { Submission, Course, User } from '../../types';
import GradeSubmissionModal from './GradeSubmissionModal';

export type SubmissionWithDetails = Submission & {
    studentName: string;
    courseTitle: string;
};

const GradeSubmissionsPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState<SubmissionWithDetails[]>([]);
    const [gradingSubmission, setGradingSubmission] = useState<SubmissionWithDetails | null>(null);

    const instructorCourses = useMemo(() => {
        if (!user) return [];
        return MOCK_COURSES.filter(c => c.instructor === user.name);
    }, [user]);

    const instructorCourseIds = useMemo(() => instructorCourses.map(c => c.id), [instructorCourses]);

    useMemo(() => {
        const subs = MOCK_SUBMISSIONS
            .filter(s => instructorCourseIds.includes(s.courseId))
            .map(s => {
                const student = MOCK_USERS.find(u => u.id === s.studentId);
                const course = MOCK_COURSES.find(c => c.id === s.courseId);
                return {
                    ...s,
                    studentName: student?.name || 'Unknown Student',
                    courseTitle: course?.title || 'Unknown Course',
                };
            })
            .sort((a, b) => (a.status === 'pending' ? -1 : 1)); // Prioritize pending
        setSubmissions(subs);
    }, [instructorCourseIds]);

    const handleSaveGrade = (updatedSubmission: Submission) => {
        // Update local state for immediate UI feedback
        setSubmissions(prev => prev.map(s => s.id === updatedSubmission.id ? { ...s, ...updatedSubmission } : s));
        
        // In a real app, you'd also update the master MOCK_SUBMISSIONS or call an API
        const subIndex = MOCK_SUBMISSIONS.findIndex(s => s.id === updatedSubmission.id);
        if (subIndex !== -1) {
            MOCK_SUBMISSIONS[subIndex] = { ...MOCK_SUBMISSIONS[subIndex], ...updatedSubmission };
        }
        setGradingSubmission(null);
    };
    
    const allowRetake = (submissionId: string) => {
        if (window.confirm("Are you sure you want to allow this student to retake the assignment?")) {
            // FIX: Use 'as const' to prevent TypeScript from widening the 'status' property to a generic string, ensuring type compatibility with Submission['status'].
            const updatedSubmission = { grade: null, status: 'retake_allowed' as const };
            setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, ...updatedSubmission } : s));
            
            // In a real app, you'd also update the master MOCK_SUBMISSIONS or call an API
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
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status.replace('_', ' ')}</span>;
    };
    

    return (
        <>
        {gradingSubmission && (
            <GradeSubmissionModal 
                submission={gradingSubmission}
                onClose={() => setGradingSubmission(null)}
                onSave={handleSaveGrade}
            />
        )}
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Grade Submissions</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Review and grade assignments submitted by your students.</p>
            </div>

            <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                <div className="p-4 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">All Submissions ({submissions.length})</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
                            <tr>
                                <th scope="col" className="px-6 py-3">Student</th>
                                <th scope="col" className="px-6 py-3">Course / Assignment</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Grade</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map(sub => (
                                <tr key={sub.id} className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
                                    <td className="px-6 py-4 font-medium text-text-light dark:text-text-dark">{sub.studentName}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-text-light dark:text-text-dark">{sub.courseTitle}</div>
                                        <div className="text-text-muted-light dark:text-text-muted-dark">{sub.assignmentTitle}</div>
                                    </td>
                                    <td className="px-6 py-4">{statusBadge(sub.status)}</td>
                                    <td className="px-6 py-4 font-semibold text-text-light dark:text-text-dark">{sub.grade !== null ? `${sub.grade}%` : 'Not Graded'}</td>
                                    <td className="px-6 py-4 space-x-3 whitespace-nowrap">
                                        <button onClick={() => setGradingSubmission(sub)} className="font-medium text-primary hover:underline">
                                            {sub.status === 'graded' ? 'Regrade' : 'Grade'}
                                        </button>
                                        {sub.status === 'graded' && (
                                            <button onClick={() => allowRetake(sub.id)} className="font-medium text-amber-600 hover:underline">Allow Retake</button>
                                        )}
                                         {sub.status === 'retake_allowed' && (
                                            <span className="font-medium text-text-muted-light dark:text-text-muted-dark">Awaiting Resubmission</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {submissions.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-text-muted-light dark:text-text-muted-dark">No submissions found for your courses.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default GradeSubmissionsPage;