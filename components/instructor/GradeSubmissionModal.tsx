
import React, { useState, useEffect, useMemo } from 'react';
import { Submission, Rubric, RubricCriterion, RubricLevel } from '../../types';
import { MOCK_COURSES, MOCK_RUBRICS } from '../../data/mock';
import { SubmissionWithDetails } from './GradeSubmissionsPage';

interface GradeSubmissionModalProps {
    submission: SubmissionWithDetails;
    onClose: () => void;
    onSave: (submission: Submission) => void;
}

const GradeSubmissionModal: React.FC<GradeSubmissionModalProps> = ({ submission, onClose, onSave }) => {
    const [grade, setGrade] = useState<number | null>(submission.grade);
    const [feedback, setFeedback] = useState(submission.feedback || '');
    const [rubricScores, setRubricScores] = useState(submission.rubricScores || {});

    const { assignment, rubric } = useMemo(() => {
        const foundAssignment = MOCK_COURSES
            .flatMap(c => c.modules.flatMap(m => m.lessons.map(l => l.assignment)))
            .find(a => a?.title === submission.assignmentTitle && submission.courseId === MOCK_COURSES.find(c => c.title === submission.courseTitle)?.id);
        
        const foundRubric = foundAssignment?.rubricId 
            ? MOCK_RUBRICS.find(r => r.id === foundAssignment.rubricId) 
            : null;

        return { assignment: foundAssignment, rubric: foundRubric };
    }, [submission]);

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

    const handleRubricSelect = (criterionId: string, levelId: string) => {
        setRubricScores(prev => ({
            ...prev,
            [criterionId]: { ...prev[criterionId], levelId }
        }));
    };
    
    const handleCriterionFeedbackChange = (criterionId: string, text: string) => {
        setRubricScores(prev => ({
            ...prev,
            [criterionId]: { ...prev[criterionId], feedback: text }
        }));
    };

    const calculatedGrade = useMemo(() => {
        if (!rubric) return null;
        let totalPoints = 0;
        let maxPoints = 0;

        rubric.criteria.forEach(criterion => {
            const maxLevelPoints = Math.max(...criterion.levels.map(l => l.points));
            maxPoints += maxLevelPoints;

            const selectedLevelId = rubricScores[criterion.id]?.levelId;
            if (selectedLevelId) {
                const selectedLevel = criterion.levels.find(l => l.id === selectedLevelId);
                if (selectedLevel) {
                    totalPoints += selectedLevel.points;
                }
            }
        });

        return maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
    }, [rubric, rubricScores]);

    useEffect(() => {
        if (rubric) {
            setGrade(calculatedGrade);
        }
    }, [rubric, calculatedGrade]);

    const handleSave = () => {
        onSave({
            ...submission,
            grade,
            status: 'graded',
            feedback,
            rubricScores: rubric ? rubricScores : undefined,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Grade Submission</h2>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{submission.assignmentTitle} - {submission.studentName}</p>
                    </div>
                    <button onClick={onClose} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark"><span className="material-symbols-outlined">close</span></button>
                </header>
                
                <main className="overflow-y-auto p-6 flex-grow space-y-6">
                    {rubric ? (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{rubric.title}</h3>
                            {rubric.criteria.map(criterion => (
                                <div key={criterion.id} className="p-4 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                                    <p className="font-semibold text-text-light dark:text-text-dark">{criterion.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {criterion.levels.map(level => (
                                            <button 
                                                key={level.id}
                                                onClick={() => handleRubricSelect(criterion.id, level.id)}
                                                className={`px-3 py-1 text-sm rounded-full border transition-colors ${rubricScores[criterion.id]?.levelId === level.id ? 'bg-primary border-primary text-white' : 'bg-transparent border-border-light dark:border-border-dark hover:bg-secondary-light dark:hover:bg-secondary-dark'}`}
                                            >
                                                {level.name} ({level.points} pts)
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        value={rubricScores[criterion.id]?.feedback || ''}
                                        onChange={(e) => handleCriterionFeedbackChange(criterion.id, e.target.value)}
                                        placeholder="Add specific feedback for this criterion... (optional)"
                                        className="form-textarea w-full text-sm rounded-md mt-3"
                                        rows={2}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="grade">Grade (0-100)</label>
                            <input 
                                id="grade" 
                                type="number" 
                                value={grade ?? ''}
                                onChange={(e) => setGrade(e.target.value === '' ? null : parseInt(e.target.value, 10))}
                                className="form-input w-full"
                                max="100"
                                min="0"
                            />
                        </div>
                    )}
                     <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="feedback">Overall Feedback</label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="form-textarea w-full"
                            rows={4}
                            placeholder="Provide overall feedback for the submission..."
                        />
                    </div>
                </main>

                <footer className="px-6 py-4 bg-background-light dark:bg-background-dark/50 border-t border-border-light dark:border-border-dark flex justify-between items-center flex-shrink-0">
                    <div className="text-lg font-bold text-text-light dark:text-text-dark">
                        Final Grade: <span className="text-primary">{grade !== null ? `${grade}%` : 'N/A'}</span>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark rounded-lg hover:bg-border-light dark:hover:bg-border-dark">Cancel</button>
                        <button onClick={handleSave} disabled={grade === null} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed">Save Grade</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default GradeSubmissionModal;
