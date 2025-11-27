
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User, UserRole, UserStatus } from '../../types';
import AddUserModal from './AddUserModal';
import { MOCK_COURSES } from '../../data/mock';

const statusColors: Record<UserStatus, string> = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    suspended: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const UserActions: React.FC<{
    user: User;
    onClose: () => void;
    onUpdateStatus: (userId: string, status: UserStatus) => void;
    onResetPassword: (userId: string) => void;
    onDelete: (userId: string) => void;
}> = ({ user, onClose, onUpdateStatus, onResetPassword, onDelete }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div ref={menuRef} className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-card-light dark:bg-card-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
                <div className="px-4 py-2 text-xs text-text-muted-light dark:text-text-muted-dark">Change Status</div>
                {(['active', 'inactive', 'suspended'] as UserStatus[]).map(status => (
                    <button key={status} onClick={() => onUpdateStatus(user.id, status)} className="block w-full text-left px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-secondary-dark capitalize">{status}</button>
                ))}
                <div className="border-t border-border-light dark:border-border-dark my-1" />
                <button onClick={() => onResetPassword(user.id)} className="block w-full text-left px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-secondary-dark">Reset Password</button>
                <div className="border-t border-border-light dark:border-border-dark my-1" />
                <button onClick={() => onDelete(user.id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">Delete User</button>
            </div>
        </div>
    );
};

const ManageUsers: React.FC = () => {
    const { users, updateUserStatus, adminResetPassword, deleteUser } = useContext(AuthContext);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const handleUpdateStatus = (userId: string, status: UserStatus) => {
        updateUserStatus(userId, status);
        setOpenMenuId(null);
    };

    const handleResetPassword = (userId: string) => {
        if (window.confirm("Are you sure you want to reset this user's password to 'password123'?")) {
            adminResetPassword(userId);
             alert("Password has been reset to 'password123'.");
        }
        setOpenMenuId(null);
    };

    const handleDelete = (userId: string) => {
        if (window.confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
            deleteUser(userId);
        }
        setOpenMenuId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">User Management</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">View, create, and manage all users on the platform.</p>
                </div>
                <button onClick={() => setIsAddUserModalOpen(true)} className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-semibold transition-colors hover:bg-primary/90">
                    <span className="material-symbols-outlined text-base">person_add</span>
                    Add New User
                </button>
            </div>
            
            <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                <div className="p-4 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">All Users ({users.length})</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Details</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                const instructorCourseCount = user.role === UserRole.INSTRUCTOR ? MOCK_COURSES.filter(c => c.instructor === user.name).length : 0;
                                return (
                                <tr key={user.id} className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
                                    <td className="px-6 py-4 font-medium text-text-light dark:text-text-dark whitespace-nowrap">
                                        <div className="font-semibold">{user.name}</div>
                                        <div className="text-text-muted-light dark:text-text-muted-dark">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 capitalize text-text-muted-light dark:text-text-muted-dark">{user.role}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[user.status]}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">
                                        {user.role === UserRole.STUDENT && `Enrolled: ${user.enrolledCourseIds.length}`}
                                        {user.role === UserRole.INSTRUCTOR && `Courses: ${instructorCourseCount}`}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="relative inline-block text-left">
                                            <button onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)} className="p-2 rounded-full hover:bg-secondary-light dark:hover:bg-secondary-dark">
                                                <span className="material-symbols-outlined">more_horiz</span>
                                            </button>
                                            {openMenuId === user.id && (
                                                <UserActions
                                                    user={user}
                                                    onClose={() => setOpenMenuId(null)}
                                                    onUpdateStatus={handleUpdateStatus}
                                                    onResetPassword={handleResetPassword}
                                                    onDelete={handleDelete}
                                                />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
            {isAddUserModalOpen && <AddUserModal onClose={() => setIsAddUserModalOpen(false)} />}
        </div>
    );
};

export default ManageUsers;
