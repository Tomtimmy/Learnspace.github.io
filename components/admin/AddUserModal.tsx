
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface AddUserModalProps {
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const { addUser } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addUser(name, email, role)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center">
          <h2 className="text-xl font-bold text-text-light dark:text-text-dark">Add New User</h2>
          <button onClick={onClose} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <main className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark" htmlFor="fullName">Full Name</label>
              <input
                className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary shadow-sm"
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark" htmlFor="email">Email Address</label>
              <input
                className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary shadow-sm"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-muted-dark" htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-secondary-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary shadow-sm"
              >
                <option value={UserRole.STUDENT}>Student</option>
                <option value={UserRole.INSTRUCTOR}>Instructor</option>
              </select>
            </div>
             <p className="text-xs text-text-muted-light dark:text-text-muted-dark">A default password 'password123' will be assigned. The user can change it later.</p>
          </main>
          <footer className="px-6 py-4 bg-background-light dark:bg-background-dark/50 border-t border-border-light dark:border-border-dark flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark rounded-lg hover:bg-border-light dark:hover:bg-border-dark">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">Create User</button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;