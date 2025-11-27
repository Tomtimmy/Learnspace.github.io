
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
}

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  enrolledCourseIds: string[];
  completedLessonIds: string[]; // Track specific completed lessons
  progress: { [courseId: string]: number }; // e.g. { 'c1': 75, 'c2': 60 }
  bio?: string;
  imageUrl?: string;
  schedule?: { officeHours: string };
}

export interface RubricLevel {
  id: string;
  name: string;
  points: number;
}

export interface RubricCriterion {
  id: string;
  description: string;
  levels: RubricLevel[];
}

export interface Rubric {
  id: string;
  title: string;
  criteria: RubricCriterion[];
}

export interface Assignment {
  id: string;
  title: string;
  type: 'quiz' | 'exam' | 'project';
  rubricId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Could be markdown, video URL, etc.
  videoUrl?: string; // URL for the lesson video
  assignment?: Assignment;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Submission {
  id: string;
  studentId: string;
  courseId: string;
  lessonId: string;
  assignmentTitle: string;
  status: 'pending' | 'graded' | 'retake_allowed';
  grade: number | null;
  feedback?: string;
  rubricScores?: { [criterionId: string]: { levelId: string; feedback?: string } };
}

export interface Review {
  id: string;
  studentName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  status: 'draft' | 'published';
  description: string;
  instructor: string;
  price: number;
  imageUrl: string;
  modules: Module[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Expert' | 'All Levels';
  bestseller?: boolean;
}

export interface Certificate {
  id: string;
  courseName: string;
  studentName: string;
  issueDate: string;
}

export interface CalendarEvent {
  id: string;
  courseId: string;
  title: string;
  date: Date;
  type: 'lecture' | 'deadline' | 'quiz' | 'exam';
  courseName: string;
  time?: string;
}

export interface Lecture {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  instructor: string;
  date: Date;
  time: string;
}

export type ChangelogItemType = 'feature' | 'improvement' | 'fix';

export interface ChangelogItem {
  type: ChangelogItemType;
  description: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  items: ChangelogItem[];
}

export interface Testimonial {
  id: string;
  quote: string;
  studentName: string;
  courseTitle: string;
  avatarUrl: string;
}

export interface InstructorTestimonial {
  id: string;
  quote: string;
  fullQuote?: string;
  name: string;
  course: string;
  avatarUrl: string;
}

export interface ChatMessage {
    id: string;
    author: string;
    avatarUrl: string;
    timestamp: string;
    message: string;
    role?: 'Instructor';
}

export interface Participant {
    id: string;
    name: string;
    avatarUrl: string;
    role: 'Instructor' | 'Student';
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnually: number;
  keyFeatures: {
    icon: string;
    text: string;
  }[];
  isPopular?: boolean;
}

export interface FeatureComparison {
  feature: string;
  category: string;
  tiers: {
    [planId: string]: boolean | string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Transaction {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Refunded' | 'Pending';
}

export interface Payout {
  id: string;
  instructorId: string;
  instructorName: string;
  amount: number;
  period: string; // e.g. "October 2023"
  date: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

export interface PageContent {
    id: string;
    slug: string;
    title: string;
    content: string; // Markdown/HTML
    lastUpdated: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    date: Date;
    read: boolean;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // HTML/Markdown
    author: {
        name: string;
        avatarUrl: string;
        role: string;
    };
    date: string;
    readTime: string;
    category: string;
    imageUrl: string;
    tags: string[];
}
