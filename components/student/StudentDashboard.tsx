
import React, { useState, useEffect } from 'react';
import StudentLayout from './StudentLayout';
import DashboardHome from './DashboardHome';
import MyCoursesPage from './MyCoursesPage';
import MyCertificatesPage from './MyCertificatesPage';
import SchedulePage from './SchedulePage';
import SettingsPage from './SettingsPage';
import HelpPage from './HelpPage';
import LiveLecturePage from './LiveLecturePage';
import LessonPlayer from './LessonPlayer';
import OnboardingTour from './OnboardingTour';
import { Course } from '../../types';

export type StudentView = 'dashboard' | 'courses' | 'schedule' | 'certificates' | 'help' | 'settings' | 'lecture' | 'lesson_player';

const StudentDashboard: React.FC = () => {
    const [activeView, setActiveView] = useState<StudentView>('dashboard');
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding) {
            setShowOnboarding(true);
        }
    }, []);

    const handleCloseOnboarding = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        setShowOnboarding(false);
    };

    const handleStartCourse = (course: Course) => {
        setCurrentCourse(course);
        setActiveView('lesson_player');
    };

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <DashboardHome onJoinLecture={() => setActiveView('lecture')} onContinueCourse={handleStartCourse} />;
            case 'courses':
                return <MyCoursesPage onStartCourse={handleStartCourse} />;
            case 'schedule':
                return <SchedulePage />;
            case 'certificates':
                return <MyCertificatesPage />;
            case 'settings':
                return <SettingsPage />;
            case 'help':
                return <HelpPage />;
            case 'lecture':
                return <LiveLecturePage onLeave={() => setActiveView('dashboard')} />;
            case 'lesson_player':
                return currentCourse ? (
                    <LessonPlayer 
                        course={currentCourse} 
                        onExit={() => setActiveView('courses')} 
                    />
                ) : <MyCoursesPage onStartCourse={handleStartCourse} />;
            default:
                return <DashboardHome onJoinLecture={() => setActiveView('lecture')} onContinueCourse={handleStartCourse} />;
        }
    };
    
    if (activeView === 'lecture' || activeView === 'lesson_player') {
        return renderContent();
    }

    return (
        <StudentLayout activeView={activeView} setActiveView={setActiveView}>
            {showOnboarding && <OnboardingTour onClose={handleCloseOnboarding} />}
            {renderContent()}
        </StudentLayout>
    );
};

export default StudentDashboard;
