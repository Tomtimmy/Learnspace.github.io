
import { ChangelogEntry } from '../types';

export const MOCK_CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.4.0',
    date: '2023-11-15',
    items: [
      { type: 'feature', description: 'Implemented a new, full-width carousel on the public homepage to showcase student success stories.' },
      { type: 'feature', description: 'Added a comprehensive visual overhaul for a bolder, more professional, and spacious UI across the entire application.' },
      { type: 'improvement', description: 'Increased font sizes and refined the color palette for better readability and visual hierarchy.' },
      { type: 'fix', description: 'Resolved an issue where the course detail modal would not close on Escape key press in some browsers.' },
    ],
  },
  {
    version: '1.3.0',
    date: '2023-11-08',
    items: [
      { type: 'feature', description: 'Added a global dark mode toggle with persistence in localStorage.' },
      { type: 'improvement', description: 'Refactored shared components like StarRating and NavItem into a common directory to improve modularity.' },
      { type: 'fix', description: 'Corrected layout shifts on the student dashboard when loading widgets.' },
    ],
  },
  {
    version: '1.2.1',
    date: '2023-11-02',
    items: [
      { type: 'improvement', description: 'Enhanced the AI Course Creator to provide more detailed lesson content summaries.' },
      { type: 'fix', description: 'Fixed a bug where the "Clear All" button on the courses page did not reset the price filter.' },
    ],
  },
  {
    version: '1.2.0',
    date: '2023-10-28',
    items: [
      { type: 'feature', description: 'Launched the new Student Schedule page with an interactive calendar and upcoming events list.' },
      { type: 'feature', description: 'Implemented the Student Settings page, allowing users to manage their profile and notification preferences.' },
      { type: 'improvement', description: 'Optimized image loading on the public course catalog.' },
    ],
  },
  {
    version: '1.1.0',
    date: '2023-10-20',
    items: [
      { type: 'feature', description: 'The AI-Powered Course Creator is now available for administrators.' },
      { type: 'improvement', description: 'Improved the responsiveness of the student dashboard on tablet devices.' },
      { type: 'fix', description: 'Addressed an issue where long course titles would break the layout of course cards.' },
    ],
  },
  {
    version: '1.0.0',
    date: '2023-10-15',
    items: [
      { type: 'feature', description: 'Initial launch of the LearnSpace platform.' },
      { type: 'feature', description: 'Public website with course catalog and user authentication.' },
      { type: 'feature', description: 'Student Dashboard with course management and progress tracking.' },
      { type: 'feature', description: 'Administrator Dashboard for basic platform oversight.' },
    ],
  },
];