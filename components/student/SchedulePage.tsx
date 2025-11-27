
import React, { useState, useMemo, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MOCK_EVENTS } from '../../data/mock';
import { CalendarEvent } from '../../types';

const EVENT_COLORS: { [key in CalendarEvent['type']]: string } = {
    lecture: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    deadline: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
    quiz: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
    exam: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300',
};

const EVENT_BORDERS: { [key in CalendarEvent['type']]: string } = {
    lecture: 'border-blue-500',
    deadline: 'border-red-500',
    quiz: 'border-green-500',
    exam: 'border-orange-500',
};

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const SchedulePage: React.FC = () => {
    const { user } = useContext(AuthContext);
    // Set initial date to October 2023 to match mock data
    const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 1)); 

    const userEvents = useMemo(() => {
        if (!user) return [];
        return MOCK_EVENTS.filter(event => user.enrolledCourseIds.includes(event.courseId) || event.courseName === 'All Courses');
    }, [user]);

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        
        const days: Date[] = [];
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        for (let i = 0; i < 42; i++) {
            days.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }
        return days;
    }, [currentDate]);

    const upcomingEvents = useMemo(() => {
        return userEvents
            .filter(event => 
                event.date.getMonth() === currentDate.getMonth() &&
                event.date.getFullYear() === currentDate.getFullYear()
            )
            .sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [userEvents, currentDate]);

    const today = new Date();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark">Schedule</h1>
                <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">
                    View your upcoming lectures, deadlines, and exams.
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <div className="flex items-center gap-2">
                            <button onClick={handlePrevMonth} className="flex items-center justify-center size-10 rounded-lg bg-secondary-light dark:bg-secondary-dark text-text-muted-light dark:text-text-muted-dark hover:bg-border-light dark:hover:bg-border-dark">
                                <span className="material-symbols-outlined text-xl">chevron_left</span>
                            </button>
                            <h2 className="text-xl font-semibold text-text-light dark:text-text-dark text-center w-48">
                                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </h2>
                            <button onClick={handleNextMonth} className="flex items-center justify-center size-10 rounded-lg bg-secondary-light dark:bg-secondary-dark text-text-muted-light dark:text-text-muted-dark hover:bg-border-light dark:hover:bg-border-dark">
                                <span className="material-symbols-outlined text-xl">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-7 text-center text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
                        {WEEK_DAYS.map(day => <div key={day} className="py-2">{day}</div>)}
                    </div>

                    <div className="grid grid-cols-7 grid-rows-6 gap-px border-t border-l border-border-light dark:border-border-dark bg-border-light dark:bg-border-dark">
                        {calendarGrid.map((day, index) => {
                            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                            const isToday = day.toDateString() === today.toDateString();
                            const eventsOnDay = userEvents.filter(e => e.date.toDateString() === day.toDateString());

                            return (
                                <div key={index} className={`relative p-2 h-28 overflow-y-auto ${isCurrentMonth ? 'bg-card-light dark:bg-card-dark' : 'bg-background-light dark:bg-background-dark'}`}>
                                    <span className={`absolute top-2 right-2 text-sm ${isToday ? 'bg-primary text-white rounded-full flex items-center justify-center size-6 font-bold' : isCurrentMonth ? 'text-text-light dark:text-text-dark font-semibold' : 'text-text-muted-light dark:text-text-muted-dark'}`}>{day.getDate()}</span>
                                    <div className="mt-8 text-left text-xs space-y-1">
                                        {eventsOnDay.map(event => (
                                            <div key={event.id} className={`px-2 py-1 rounded truncate ${EVENT_COLORS[event.type]}`}>
                                                {event.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <aside className="w-full lg:w-96 lg:flex-shrink-0">
                    <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm p-6">
                        <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Upcoming Events</h3>
                        {upcomingEvents.length > 0 ? (
                             <div className="space-y-4">
                                {upcomingEvents.map(event => (
                                    <div key={event.id} className={`flex gap-4 p-4 rounded-lg bg-opacity-40 border-l-4 ${EVENT_COLORS[event.type]} ${EVENT_BORDERS[event.type]}`}>
                                        <div className="flex flex-col items-center">
                                            <p className="text-sm font-medium">{event.date.toLocaleString('default', { month: 'short' })}</p>
                                            <p className="text-2xl font-bold">{String(event.date.getDate()).padStart(2, '0')}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-text-light dark:text-text-dark">{event.title}</p>
                                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{event.courseName}</p>
                                            {event.time && <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">{event.time}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <p className="text-base text-text-muted-light dark:text-text-muted-dark">No upcoming events this month.</p>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default SchedulePage;