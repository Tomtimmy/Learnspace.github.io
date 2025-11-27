
import React from 'react';

const AdminSchedulePage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Platform Schedule</h1>
            <p className="mt-2 text-base text-text-muted-light dark:text-text-muted-dark">
                This is where administrators will be able to view and manage the global course schedule.
            </p>
        </div>
    );
};

export default AdminSchedulePage;