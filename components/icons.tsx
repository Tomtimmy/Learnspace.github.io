
import React from 'react';

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const UserCircleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const ArrowRightOnRectangleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.653-2.653L11.25 18l1.938-.648a3.375 3.375 0 002.653-2.653L16.25 13.5l.648 1.938a3.375 3.375 0 002.653 2.653L21.75 18l-1.938.648a3.375 3.375 0 00-2.653 2.653z" />
    </svg>
);

export const ArticleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const MaterialIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="dashboard" className={className} />;
export const CoursesIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="school" className={className} />;
export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="calendar_month" className={className} />;
export const CertificatesIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="workspace_premium" className={className} />;
export const HelpIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="help_outline" className={className} />;
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="settings" className={className} />;
export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="search" className={className} />;
export const NotificationsIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="notifications" className={className} />;
export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="download" className={className} />;
export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="share" className={className} />;
export const CampaignIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="campaign" className={className} />;
export const TaskAltIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="task_alt" className={className} />;
export const ChatIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="chat" className={className} />;
export const UsersIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="group" className={className} />;
export const ChangelogIcon: React.FC<{ className?: string }> = ({ className }) => <MaterialIcon name="history" className={className} />;

export const PlayCircleIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-9l6 4.5-6 4.5z"></path>
    </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.62 1.62 0 0013 14.19a.46.46 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.1 1.16 3.1 3.99z"></path>
    </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.94.07 4.28 4.28 0 004 2.98 8.52 8.52 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06 1.8 1.16 3.94 1.84 6.22 1.84 7.46 0 11.54-6.18 11.54-11.54 0-.17 0-.35-.01-.52.78-.57 1.45-1.28 1.99-2.08z"></path>
    </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1 0-1 .5-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
    </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C8.74 2 8.33 2.02 7.05 2.09c-1.28.06-2.16.28-2.93.58a4.9 4.9 0 00-1.74 1.15 4.9 4.9 0 00-1.15 1.74c-.3.77-.52 1.65-.58 2.93C2.02 8.33 2 8.74 2 12s.02 3.67.09 4.95c.06 1.28.28 2.16.58 2.93a4.9 4.9 0 001.15 1.74 4.9 4.9 0 001.74 1.15c.77.3 1.65.52 2.93.58C8.33 21.98 8.74 22 12 22s3.67-.02 4.95-.09c1.28-.06 2.16-.28 2.93-.58a4.9 4.9 0 001.74-1.15 4.9 4.9 0 00-1.15-1.74c.3-.77.52-1.65.58-2.93.07-1.28.09-1.69.09-4.95s-.02-3.67-.09-4.95c-.06-1.28-.28-2.16-.58-2.93a4.9 4.9 0 00-1.15-1.74 4.9 4.9 0 00-1.74-1.15c-.77-.3-1.65-.52-2.93-.58C15.67 2.02 15.26 2 12 2zm0 1.8c3.2 0 3.58.01 4.85.07 1.17.06 1.8.29 2.17.44a3.1 3.1 0 011.15 1.15c.15.37.38.99.44 2.17.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.29 1.8-.44 2.17a3.1 3.1 0 01-1.15 1.15c-.37.15-.99.38-2.17.44-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.8-.29-2.17-.44a3.1 3.1 0 01-1.15 1.15c-.15-.37-.38-.99-.44-2.17-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.06-1.17.29-1.8.44-2.17a3.1 3.1 0 011.15-1.15c.37-.15.99-.38 2.17-.44C8.42 3.81 8.8 3.8 12 3.8zm0 3.6a4.6 4.6 0 100 9.2 4.6 4.6 0 000-9.2zm0 7.4a2.8 2.8 0 110-5.6 2.8 2.8 0 010 5.6zm6.3-8.8a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z"></path>
    </svg>
);
