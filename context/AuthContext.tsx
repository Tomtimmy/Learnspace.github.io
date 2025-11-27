
import { createContext } from 'react';
import { User, UserRole, UserStatus, Notification } from '../types';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  resetPassword: (email: string, newPassword: string) => boolean;
  addUser: (name: string, email: string, role: UserRole) => boolean;
  deleteUser: (userId: string) => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  adminResetPassword: (userId: string) => void;
  enroll: (courseId: string) => void;
  toggleLessonCompletion: (courseId: string, lessonId: string) => void;
  
  // Toast system
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
  removeToast: (id: string) => void;

  // Notification system
  notifications: Notification[];
  unreadCount: number;
  addNotification: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  users: [],
  login: () => false,
  register: () => false,
  logout: () => {},
  resetPassword: () => false,
  addUser: () => false,
  deleteUser: () => {},
  updateUserStatus: () => {},
  adminResetPassword: () => {},
  enroll: () => {},
  toggleLessonCompletion: () => {},
  
  toasts: [],
  addToast: () => {},
  removeToast: () => {},

  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {},
});
