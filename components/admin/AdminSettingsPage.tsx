import React from 'react';

const AdminAccountSettingsPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Admin Account Settings</h1>
            <p className="mt-2 text-base text-text-muted-light dark:text-text-muted-dark">
                This is where administrators can configure their personal account settings.
            </p>
        </div>
    );
};

export default AdminAccountSettingsPage;