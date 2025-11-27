import React, { useState, useMemo } from 'react';
import { MOCK_USERS, MOCK_COURSES, MOCK_CERTIFICATES } from '../../data/mock';
import { User, Course, Certificate, UserRole } from '../../types';

interface Completion {
    student: User;
    course: Course;
    isCertified: boolean;
}

const ManageCertificatesPage: React.FC = () => {
    const [certificates, setCertificates] = useState(MOCK_CERTIFICATES);

    const completableUsers = useMemo((): Completion[] => {
        const completions: Completion[] = [];
        MOCK_USERS.forEach(user => {
            if (user.role === UserRole.STUDENT) {
                user.enrolledCourseIds.forEach(courseId => {
                    if (user.progress[courseId] === 100) {
                        const course = MOCK_COURSES.find(c => c.id === courseId);
                        if (course) {
                            const isCertified = certificates.some(cert => cert.studentName === user.name && cert.courseName === course.title);
                            completions.push({ student: user, course, isCertified });
                        }
                    }
                });
            }
        });
        return completions;
    }, [certificates]);

    const issueCertificate = (studentName: string, courseName: string) => {
        const newCertificate: Certificate = {
            id: `cert-${Date.now()}`,
            studentName,
            courseName,
            issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        };
        MOCK_CERTIFICATES.push(newCertificate);
        setCertificates([...MOCK_CERTIFICATES]);
    };


    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Manage Certificates</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Issue and manage certificates for students who have completed courses.</p>
            </div>

            <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                <div className="p-4 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Course Completions</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
                            <tr>
                                <th scope="col" className="px-6 py-3">Student</th>
                                <th scope="col" className="px-6 py-3">Course Completed</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completableUsers.map(({ student, course, isCertified }) => (
                                <tr key={`${student.id}-${course.id}`} className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
                                    <td className="px-6 py-4 font-medium text-text-light dark:text-text-dark whitespace-nowrap">
                                        {student.name}
                                    </td>
                                    <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{course.title}</td>
                                    <td className="px-6 py-4">
                                        {isCertified ? (
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                                Issued
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
                                                Pending Issuance
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {isCertified ? (
                                            <button disabled className="text-text-muted-light dark:text-text-muted-dark font-medium cursor-not-allowed">Already Issued</button>
                                        ) : (
                                            <button onClick={() => issueCertificate(student.name, course.title)} className="text-primary hover:underline font-medium">Issue Certificate</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {completableUsers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-text-muted-light dark:text-text-muted-dark">No students have completed any courses yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageCertificatesPage;