
import React, { useState, useEffect, useMemo } from 'react';
import { User, Submission, Course, Rubric } from '../../types';
import { MOCK_COURSES, MOCK_SUBMISSIONS, MOCK_RUBRICS } from '../../data/mock';

interface ViewSubmissionsModalProps {
    course: Course;
    student: User;
    onClose: () => void;
}

const statusBadge = (status: Submission['status']) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        graded: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        retake_allowed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status.replace(/_/g, ' ')}</span>;
};

const GradedRubricDisplay: React.FC<{ submission: Submission, rubric: Rubric }> = ({ submission, rubric }) => {
    return (
        <div className="space-y-3 mt-4">
            {rubric.criteria.map(criterion => {
                const score = submission.rubricScores?.[criterion.id];
                const selectedLevel = score ? criterion.levels.find(l => l.id === score.levelId) : null;
                const maxPoints = Math.max(...criterion.levels.map(l => l.points));

                return (
                    <div key={criterion.id} className="p-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                        <div className="flex justify-between items-start">
                            <p className="font-semibold text-text-light dark:text-text-dark">{criterion.description}</p>
                            {selectedLevel && (
                                <p className="text-sm font-bold text-primary whitespace-nowrap ml-4">{selectedLevel.points} / {maxPoints} pts</p>
                            )}
                        </div>
                        {selectedLevel && (
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
                                Level: <span className="font-medium text-text-light dark:text-text-dark">{selectedLevel.name}</span>
                            </p>
                        )}
                        {score?.feedback && (
                             <div className="mt-2 text-sm text-text-muted-light dark:text-text-muted-dark bg-secondary-light/50 dark:bg-secondary-dark/50 p-2 rounded-md italic">
                                <span className="font-semibold not-italic">Feedback:</span> {score.feedback}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
}

const ViewSubmissionsModal: React.FC<ViewSubmissionsModalProps> = ({ course, student, onClose }) => {
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

    const courseSubmissions = useMemo(() => {
        return MOCK_SUBMISSIONS.filter(s => s.studentId === student.id && s.courseId === course.id);
    }, [student, course]);

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
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">My Submissions</h2>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{course.title}</p>
                    </div>
                    <button onClick={onClose} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>

                <main className="overflow-y-auto p-6 flex-grow space-y-6">
                    {courseSubmissions.length > 0 ? courseSubmissions.map(submission => {
                        const assignment = course.modules.flatMap(m => m.lessons).find(l => l.assignment?.title === submission.assignmentTitle)?.assignment;
                        const rubric = assignment?.rubricId ? MOCK_RUBRICS.find(r => r.id === assignment.rubricId) : null;

                        return (
                            <div key={submission.id} className="bg-background-light dark:bg-background-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
                                <div className="flex justify-between items-center flex-wrap gap-2">
                                    <h3 className="font-bold text-lg text-text-light dark:text-text-dark">{submission.assignmentTitle}</h3>
                                    {statusBadge(submission.status)}
                                </div>
                                {submission.status === 'graded' && (
                                    <div className="mt-3 space-y-4">
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-lg font-semibold text-text-muted-light dark:text-text-muted-dark">Grade:</p>
                                            <p className="text-3xl font-bold text-primary">{submission.grade}%</p>
                                        </div>
                                        {submission.feedback && (
                                            <div>
                                                <h4 className="font-semibold text-text-light dark:text-text-dark">Instructor Feedback:</h4>
                                                <p className="text-text-muted-light dark:text-text-muted-dark italic mt-1">"{submission.feedback}"</p>
                                            </div>
                                        )}
                                        {rubric && <GradedRubricDisplay submission={submission} rubric={rubric} />}
                                    </div>
                                )}
                                {submission.status === 'retake_allowed' && (
                                    <p className="mt-3 text-sm text-blue-700 dark:text-blue-300">Your instructor has allowed you to retake this assignment. Please resubmit your work.</p>
                                )}
                                 {submission.status === 'pending' && (
                                    <p className="mt-3 text-sm text-text-muted-light dark:text-text-muted-dark">Awaiting grading from your instructor.</p>
                                )}
                            </div>
                        )
                    }) : (
                        <p className="text-center text-text-muted-light dark:text-text-muted-dark py-8">You have no submissions for this course.</p>
                    )}
                </main>
                 <footer className="px-6 py-4 bg-background-light dark:bg-background-dark/50 border-t border-border-light dark:border-border-dark flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark rounded-lg hover:bg-border-light dark:hover:bg-border-dark">Close</button>
                </footer>
            </div>
        </div>
    );
};

export default ViewSubmissionsModal;
