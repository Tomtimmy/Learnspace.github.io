
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-secondary-light text-text-muted-light transition-colors hover:bg-border-light dark:bg-secondary-dark dark:text-text-muted-dark dark:hover:bg-border-dark"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <span className={`material-symbols-outlined transition-transform duration-300 ${theme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`}>
                light_mode
            </span>
            <span className={`material-symbols-outlined absolute transition-transform duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}>
                dark_mode
            </span>
        </button>
    );
};

export default ThemeToggleButton;