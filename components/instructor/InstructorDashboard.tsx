
import React, { useState, useContext } from 'react';
import InstructorLayout from './InstructorLayout';
import InstructorHome from './InstructorHome';
import CourseManagementPage from './CourseManagementPage';
import MyStudentsPage from './MyStudentsPage';
import CreateCoursePage from './CreateCoursePage';
import GradeSubmissionsPage from './GradeSubmissionsPage';
import InstructorSettingsPage from './InstructorSettingsPage';
import LiveLecturePage from '../student/LiveLecturePage'; // Re-using student's component
import { MOCK_COURSES } from '../../data/mock';
import { Course } from '../../types';
import { AuthContext } from '../../context/AuthContext';


export type InstructorView = 'dashboard' | 'courses' | 'students' | 'settings' | 'edit_course' | 'submissions' | 'lecture';

const InstructorDashboard: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [activeView, setActiveView] = useState<InstructorView>('dashboard');
    const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

    const handleCreateCourse = () => {
        setEditingCourseId(null);
        setActiveView('edit_course');
    };

    const handleEditCourse = (courseId: string) => {
        setEditingCourseId(courseId);
        setActiveView('edit_course');
    };
    
    const handleSaveCourse = (courseData: Course) => {
        const isNewCourse = !courseData.id;
        if (isNewCourse) {
            const newCourse = {
                ...courseData,
                id: `c${Date.now()}`,
                instructor: user?.name ?? 'Unknown Instructor',
                rating: 0,
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
            case 'courses':
                return <CourseManagementPage onCreateCourse={handleCreateCourse} onEditCourse={handleEditCourse} />;
            case 'students':
                return <MyStudentsPage />;
             case 'edit_course':
                return <CreateCoursePage courseId={editingCourseId} onSave={handleSaveCourse} onCancel={handleCancelEdit} />;
            case 'submissions':
                return <GradeSubmissionsPage />;
            case 'settings':
                return <InstructorSettingsPage />;
            case 'lecture':
                return <LiveLecturePage onLeave={() => setActiveView('dashboard')} />;
            case 'dashboard':
            default:
                return <InstructorHome setActiveView={setActiveView} />;
        }
    };

    if (activeView === 'lecture') {
        return renderContent();
    }

    return (
        <InstructorLayout activeView={activeView} setActiveView={setActiveView}>
            {renderContent()}
        </InstructorLayout>
    );
};

export default InstructorDashboard;