
import React from 'react';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium leading-normal w-full ${
            isActive
                ? 'bg-primary/10 text-primary dark:bg-primary/20'
                : 'text-gray-600 dark:text-[#9dabb9] hover:bg-gray-100 dark:hover:bg-white/10'
        }`}
    >
        {icon}
        {label}
    </button>
);

export default NavItem;