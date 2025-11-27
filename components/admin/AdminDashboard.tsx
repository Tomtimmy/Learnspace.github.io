
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminWelcome from './AdminWelcome';
import ManageUsers from './ManageUsers';
import ManageCoursesPage from './ManageCoursesPage';
import AdminSchedulePage from './AdminSchedulePage';
import AdminPaymentsPage from './AdminPaymentsPage';
import AdminAccountSettingsPage from './AdminSettingsPage';
import SiteSettingsPage from './SiteSettingsPage';
import CreateCoursePage from '../instructor/CreateCoursePage';
import { MOCK_COURSES } from '../../data/mock';
import { Course, UserRole } from '../../types';
import ManageCertificatesPage from './ManageCertificatesPage';
import ChangelogPage from './ChangelogPage';
import ManageContentPage from './ManageContentPage';

export type AdminView = 'dashboard' | 'users' | 'courses' | 'schedule' | 'payments' | 'site_settings' | 'account_settings' | 'create_course' | 'certificates' | 'changelog' | 'manage_content';

const AdminDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState<AdminView>('dashboard');
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

    const handleCreateCourse = () => {
        setEditingCourseId(null);
        setActiveView('create_course');
    };

    const handleEditCourse = (courseId: string) => {
        setEditingCourseId(courseId);
        setActiveView('create_course');
    };

    const handleSaveCourse = (courseData: Course) => {
        const isNewCourse = !courseData.id;
        if (isNewCourse) {
            const newCourse: Course = {
                ...courseData,
                id: `c${Date.now()}`,
                instructor: 'Admin', // Or a selector for instructor
                rating: 0,
                reviewCount: 0,
                reviews: [],
            };
            MOCK_COURSES.push(newCourse);
        } else {
            const index = MOCK_COURSES.findIndex(c => c.id === courseData.id);
            if (index !== -1) {
                MOCK_COURSES[index] = courseData;
            }
        }
        setActiveView('courses');
    };

    const handleCancelEdit = () => {
        setEditingCourseId(null);
        setActiveView('courses');
    };


    const renderContent = () => {
        switch (activeView) {
            case 'users':
                return <ManageUsers />;
            case 'courses':
                return <ManageCoursesPage onCreateCourse={handleCreateCourse} onEditCourse={handleEditCourse} />;
            case 'schedule':
                return <AdminSchedulePage />;
            case 'payments':
                return <AdminPaymentsPage />;
            case 'site_settings':
                return <SiteSettingsPage />;
            case 'account_settings':
                return <AdminAccountSettingsPage />;
            case 'create_course':
                return <CreateCoursePage courseId={editingCourseId} onSave={handleSaveCourse} onCancel={handleCancelEdit} />;
            case 'certificates':
                return <ManageCertificatesPage />;
            case 'changelog':
                return <ChangelogPage />;
            case 'manage_content':
                return <ManageContentPage />;
            case 'dashboard':
            default:
                return <AdminWelcome onCreateCourse={handleCreateCourse} />;
        }
    };

    return (
        <AdminLayout activeView={activeView} setActiveView={setActiveView}>
            {renderContent()}
        </AdminLayout>
    );
};

export default AdminDashboard;
