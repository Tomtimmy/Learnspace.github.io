
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_CERTIFICATES } from '../../data/mock';
import { DownloadIcon, ShareIcon, CertificatesIcon } from '../icons';

const MyCertificatesPage: React.FC = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <div>Loading user data...</div>;
    }

    const userCertificates = MOCK_CERTIFICATES.filter(
        cert => cert.studentName === user.name
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark">My Certificates</h1>
                <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">
                    Here you can view, download, and share all the certificates you have earned.
                </p>
            </div>

            <div>
                {userCertificates.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {userCertificates.map(cert => (
                            <div key={cert.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-sm">
                                <div className="flex-shrink-0 text-primary bg-primary/10 dark:bg-primary/20 p-4 rounded-full">
                                    <CertificatesIcon className="text-4xl" />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">{cert.courseName}</h3>
                                    <p className="text-base text-text-muted-light dark:text-text-muted-dark">Awarded on: {cert.issueDate}</p>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                                    <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-medium bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-border-light dark:hover:bg-border-dark w-full sm:w-auto">
                                        <DownloadIcon className="text-base" />
                                        <span>Certificate</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-medium bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark hover:bg-border-light dark:hover:bg-border-dark w-full sm:w-auto">
                                        <ShareIcon className="text-base" />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark">
                        <CertificatesIcon className="mx-auto text-6xl text-text-muted-light dark:text-text-muted-dark" />
                        <h3 className="mt-4 text-2xl font-bold text-text-light dark:text-text-dark">No Certificates Yet</h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark mt-2 text-lg">
                            Complete a course to earn your first certificate!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCertificatesPage;