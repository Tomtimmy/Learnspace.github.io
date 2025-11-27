
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { User, UserRole, Notification } from './types';
import { MOCK_USERS, MOCK_COURSES } from './data/mock';
import PublicWebsite from './components/public/PublicWebsite';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import InstructorDashboard from './components/instructor/InstructorDashboard';
import { AuthContext, ToastMessage } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ToastContainer from './components/common/ToastContainer';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, type, message }]);
      setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
      }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
      setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Notification Logic
  const addNotification = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
      const newNotification: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          title,
          message,
          type,
          date: new Date(),
          read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
      setNotifications([]);
  }, []);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);


  const enroll = useCallback((courseId: string) => {
      setCurrentUser(prevUser => {
          if (!prevUser) return null;
          if (prevUser.enrolledCourseIds.includes(courseId)) {
              addToast('info', 'You are already enrolled in this course.');
              return prevUser;
          }
          
          const course = MOCK_COURSES.find(c => c.id === courseId);
          const courseTitle = course ? course.title : 'Course';

          const updatedUser = {
              ...prevUser,
              enrolledCourseIds: [...prevUser.enrolledCourseIds, courseId],
              progress: { ...prevUser.progress, [courseId]: 0 }
          };
          
          // Update mock data as well to persist in memory during session
          const userIndex = users.findIndex(u => u.id === prevUser.id);
          if (userIndex !== -1) {
              users[userIndex] = updatedUser;
          }
          
          addToast('success', `Successfully enrolled in ${courseTitle}!`);
          addNotification('Course Enrollment', `You have successfully enrolled in ${courseTitle}. Good luck!`, 'success');
          return updatedUser;
      });
  }, [users, addToast, addNotification]);

  const toggleLessonCompletion = useCallback((courseId: string, lessonId: string) => {
        setCurrentUser(prevUser => {
            if (!prevUser) return null;

            const isCompleted = prevUser.completedLessonIds.includes(lessonId);
            let newCompletedLessonIds;

            if (isCompleted) {
                newCompletedLessonIds = prevUser.completedLessonIds.filter(id => id !== lessonId);
            } else {
                newCompletedLessonIds = [...prevUser.completedLessonIds, lessonId];
            }

            // Recalculate progress percentage for the specific course
            const course = MOCK_COURSES.find(c => c.id === courseId);
            let newProgressPercentage = 0;

            if (course) {
                const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
                const completedCountForCourse = course.modules
                    .flatMap(m => m.lessons)
                    .filter(l => newCompletedLessonIds.includes(l.id))
                    .length;
                
                if (totalLessons > 0) {
                    newProgressPercentage = Math.round((completedCountForCourse / totalLessons) * 100);
                }
            }

            // Check if course was just completed
            if (newProgressPercentage === 100 && (prevUser.progress[courseId] || 0) < 100) {
                const courseTitle = course ? course.title : 'Course';
                addNotification('Course Completed!', `Congratulations! You have completed ${courseTitle}. Your certificate is now available.`, 'success');
            }

            const updatedUser = {
                ...prevUser,
                completedLessonIds: newCompletedLessonIds,
                progress: {
                    ...prevUser.progress,
                    [courseId]: newProgressPercentage
                }
            };

            // Update mock data to sync with "server"
            const userIndex = users.findIndex(u => u.id === prevUser.id);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
            }
            
            // Re-sync user in state if it's the one from the list to ensure reference consistency for other components
            if (prevUser.id === updatedUser.id) {
                 const userInList = users.find(u => u.id === prevUser.id);
                 if (userInList) {
                     Object.assign(userInList, updatedUser);
                 }
            }

            return updatedUser;
        });
  }, [users, addNotification]);

  const checkPendingEnrollment = useCallback(() => {
      const pendingCourseId = localStorage.getItem('pendingEnrollment');
      if (pendingCourseId) {
          enroll(pendingCourseId);
          localStorage.removeItem('pendingEnrollment');
      }
  }, [enroll]);

  const login = useCallback((email: string, password: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
      if (user.status !== 'active') {
        addToast('error', `Your account is currently ${user.status}.`);
        return false;
      }
      setCurrentUser(user);
      addToast('success', `Welcome back, ${user.name}!`);
      addNotification('Welcome Back', `Great to see you again, ${user.name.split(' ')[0]}!`, 'info');
      
      // Defer enrollment check to allow state update
      setTimeout(checkPendingEnrollment, 100);
      return true;
    }
    addToast('error', 'Invalid email or password.');
    return false;
  }, [users, addToast, checkPendingEnrollment, addNotification]);

  const register = useCallback((name: string, email: string, password: string) => {
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        addToast('error', 'An account with this email already exists.');
        return false;
    }

    const newUser: User = {
        id: (users.length + 1).toString(),
        name,
        email,
        password,
        role: UserRole.STUDENT,
        status: 'active',
        enrolledCourseIds: [],
        completedLessonIds: [],
        progress: {},
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast('success', 'Account created successfully!');
    addNotification('Welcome to LearnSpace', 'Your account has been created. Start by exploring our courses!', 'success');
    
    setTimeout(checkPendingEnrollment, 100);
    return true;
  }, [users, addToast, checkPendingEnrollment, addNotification]);

  const addUser = useCallback((name: string, email: string, role: UserRole) => {
    if (currentUser?.role !== UserRole.ADMIN) {
        addToast('error', 'Permission denied.');
        return false;
    }
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        addToast('error', 'Email already exists.');
        return false;
    }

    const newUser: User = {
        id: (users.length + 1).toString(),
        name,
        email,
        password: 'password123', // Default password
        role,
        status: 'active',
        enrolledCourseIds: [],
        completedLessonIds: [],
        progress: {},
    };

    setUsers(prev => [...prev, newUser]);
    addToast('success', `${role} user created.`);
    return true;
  }, [currentUser, users, addToast]);

  const deleteUser = useCallback((userId: string) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
      addToast('info', 'User deleted.');
  }, [addToast]);

  const updateUserStatus = useCallback((userId: string, status: 'active' | 'inactive' | 'suspended') => {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
      addToast('success', `User status updated to ${status}.`);
  }, [addToast]);
  
  const adminResetPassword = useCallback((userId: string) => {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, password: 'password123' } : u));
      addToast('success', 'Password reset to default.');
  }, [addToast]);

  const resetPassword = useCallback((email: string, newPassword: string) => {
      let success = false;
      setUsers(prev => prev.map(u => {
          if (u.email.toLowerCase() === email.toLowerCase()) {
              success = true;
              return { ...u, password: newPassword };
          }
          return u;
      }));
      if (success) {
          addToast('success', 'Password updated successfully.');
          addNotification('Security Update', 'Your password was successfully updated.', 'info');
      }
      return success;
  }, [addToast, addNotification]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setNotifications([]); // Clear notifications on logout
    addToast('info', 'Logged out successfully.');
  }, [addToast]);

  const authContextValue = useMemo(() => ({
    user: currentUser,
    users,
    login,
    register,
    logout,
    resetPassword,
    addUser,
    deleteUser,
    updateUserStatus,
    adminResetPassword,
    enroll,
    toggleLessonCompletion,
    toasts,
    addToast,
    removeToast,
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications
  }), [currentUser, users, login, register, logout, resetPassword, addUser, deleteUser, updateUserStatus, adminResetPassword, enroll, toggleLessonCompletion, toasts, addToast, removeToast, notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearNotifications]);

  const renderContent = () => {
    if (!currentUser) {
      return <PublicWebsite />;
    }
    switch (currentUser.role) {
      case UserRole.STUDENT:
        return <StudentDashboard />;
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.INSTRUCTOR:
          return <InstructorDashboard />;
      default:
        logout();
        return <PublicWebsite />;
    }
  };

  return (
    <ThemeProvider>
      <AuthContext.Provider value={authContextValue}>
        <div className="min-h-screen relative bg-background-light dark:bg-background-dark transition-colors duration-300">
          {renderContent()}
          <ToastContainer />
        </div>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
