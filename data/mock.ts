
import { User, Course, Certificate, UserRole, CalendarEvent, Testimonial, InstructorTestimonial, ChatMessage, Participant, PricingPlan, FeatureComparison, FAQItem, TeamMember, Submission, Lecture, Rubric, Transaction, Payout, PageContent, BlogPost } from '../types';

export const MOCK_RUBRICS: Rubric[] = [
  {
    id: 'r1',
    title: 'Design Project Rubric',
    criteria: [
      {
        id: 'crit1',
        description: 'Visual Design and Aesthetics',
        levels: [
          { id: 'l1-1', name: 'Exceptional', points: 25 },
          { id: 'l1-2', name: 'Proficient', points: 20 },
          { id: 'l1-3', name: 'Developing', points: 15 },
          { id: 'l1-4', name: 'Beginning', points: 10 },
        ],
      },
      {
        id: 'crit2',
        description: 'User Experience and Usability',
        levels: [
          { id: 'l2-1', name: 'Exceptional', points: 40 },
          { id: 'l2-2', name: 'Proficient', points: 30 },
          { id: 'l2-3', name: 'Developing', points: 20 },
          { id: 'l2-4', name: 'Beginning', points: 10 },
        ],
      },
      {
        id: 'crit3',
        description: 'Technical Implementation & Code Quality',
        levels: [
          { id: 'l3-1', name: 'Exceptional', points: 35 },
          { id: 'l3-2', name: 'Proficient', points: 28 },
          { id: 'l3-3', name: 'Developing', points: 20 },
          { id: 'l3-4', name: 'Beginning', points: 12 },
        ],
      },
    ],
  },
];

// Helper to get a generic video URL for testing
const SAMPLE_VIDEO_URL = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export let MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', password: 'password123', role: UserRole.STUDENT, status: 'active', enrolledCourseIds: ['c1', 'c2', 'c4'], completedLessonIds: [], progress: { 'c1': 75, 'c2': 60, 'c4': 100 }, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmV6SljOK0D1XZV06H2XaP8gVJwNhMsTCAR1Mk5mNZnDm6UzXoySSzs9WEzg71dPaCZ44E-pTPn6GDTZ5hlhsEH9O4FVY6IJwuB2iHl6eccoZOJv3iTWKl3QFs6aeeesSRifZez0FPlpX1Owwtw7xHDRC0hFllMGkw4oQ5r3hG2_o9muOBXS9KFOjiT_faT-lbj5nDdf42RwzkoB3t3DR2hRpgLjo1Ycibh3PytWbFgnALRTJLsYKN2B2hFcbYinwUQVE6ZZP5qK7O' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', password: 'password123', role: UserRole.STUDENT, status: 'active', enrolledCourseIds: ['c1', 'c3'], completedLessonIds: [], progress: { 'c1': 40, 'c3': 90 } },
  { id: '3', name: 'Super Admin', email: 'admin@example.com', password: 'adminpass', role: UserRole.ADMIN, status: 'active', enrolledCourseIds: [], completedLessonIds: [], progress: {} },
  { id: '4', name: 'Diana Prince', email: 'instructor@example.com', password: 'password123', role: UserRole.INSTRUCTOR, status: 'active', enrolledCourseIds: [], completedLessonIds: [], progress: {}, bio: 'Expert in user-centered design with over 10 years of experience in the tech industry. Passionate about creating intuitive and beautiful digital experiences.', imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg', schedule: { officeHours: 'Tuesdays & Thursdays, 2 PM - 4 PM EST' } },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', password: 'password123', role: UserRole.STUDENT, status: 'active', enrolledCourseIds: ['c2'], completedLessonIds: [], progress: { 'c2': 25 } },
];

export let MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Web Development Bootcamp',
    code: 'WD101',
    status: 'published',
    description: 'Learn the fundamentals of React, including components, state, props, and hooks. This comprehensive course covers everything from basic HTML and CSS to advanced JavaScript concepts and React development patterns. Perfect for beginners looking to become a web developer.',
    instructor: 'John Doe',
    price: 49.99,
    rating: 4.8,
    reviewCount: 1250,
    reviews: [
      { id: 'rev1', studentName: 'Emily R.', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg', rating: 5, comment: 'This course was amazing! So comprehensive and easy to follow. The instructor explains complex topics in a simple way.', date: '2023-10-20' },
      { id: 'rev2', studentName: 'John S.', avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 4, comment: 'Great content, but some parts felt a bit rushed. The project at the end was very helpful for solidifying the concepts.', date: '2023-10-18' },
      { id: 'rev3', studentName: 'Samantha B.', avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg', rating: 5, comment: 'I landed my first developer job after taking this course. Highly recommended!', date: '2023-10-15' },
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHIOs87C5H8YznjGsgkpiuDKJM5I9Z21JU8iZh9VZ_Pj_7d1uC4uCbU7VfKKhVrlHK0UKysL9JDn8f9pMxDumPKs0T4fTU-UndYA37Zco2wMsJej6BjoWIeKHaMOi9cVOLCI1ry6M8HDifMl7yGipqpVpYDWMpAnKiD3lUdMRQSSDrgCW4esHtTQcNqzbPNZHIMIBiLQkEfZZxutEIJGrGbkTw0zjc2T4RSfOTKBw22qabYP9LHeJsFwj8xMnnrC2ilC6dAf-UV6cA',
    modules: [
      { id: 'm1', title: 'Getting Started', lessons: [{ id: 'l1', title: 'What is React?', content: 'An introduction to the React library and its core principles.', videoUrl: SAMPLE_VIDEO_URL }, { id: 'l2', title: 'Setting up your environment', content: 'Learn how to set up Node.js, npm, and Create React App.', videoUrl: SAMPLE_VIDEO_URL }] },
      { id: 'm2', title: 'Core Concepts', lessons: [{ id: 'l3', title: 'Components and Props', content: 'Understand the building blocks of React applications.', videoUrl: SAMPLE_VIDEO_URL }, { id: 'l4', title: 'State and Lifecycle', content: 'Manage component state and understand its lifecycle.', assignment: { id: 'a1', title: 'Lifecycle Quiz', type: 'quiz' }, videoUrl: SAMPLE_VIDEO_URL }] },
    ],
    category: 'Web Development',
    level: 'Beginner',
    bestseller: true,
  },
  {
    id: 'c2',
    title: 'Advanced UX Design',
    code: 'UX202',
    status: 'published',
    description: 'Deep dive into user research, prototyping, and usability testing. This course is for designers who want to take their skills to the next level by mastering advanced research methodologies and complex prototyping tools.',
    instructor: 'Diana Prince', // Assigned to instructor
    price: 79.99,
    rating: 4.9,
    reviewCount: 2300,
    reviews: [],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlChC4aovohTKmyINxiCEYZs9An3_rQtO_Fp3Q-z8z3QZPLCHH9UkP0wM6o5eauxqhQIIa1695XHQCBWb5vJhnEZjNfBVLiZu8myBXpoXLtqzenotomCUo6WtpIq6Oa_B-41pphkHA7JnOu6TBAAouCu2aDIYnyOKyaKgiIRrPD2HmUGWVJlgNv7xMA3v2agzRVg5V9Eo8tZwmdx4a2qMqIbhkIq_92kGK5GBNcpo2wN_ZfXF8FZ_6p39AQiUW6zLmZ5tZnUkcL2EK',
    modules: [
      { id: 'm3', title: 'Advanced Configuration', lessons: [{ id: 'l5', title: 'Customizing your theme', content: '...', assignment: { id: 'a2', title: 'Theme Project', type: 'project', rubricId: 'r1' }, videoUrl: SAMPLE_VIDEO_URL }] },
      { id: 'm4', title: 'Plugins and Performance', lessons: [{ id: 'l6', title: 'Writing custom plugins', content: '...', videoUrl: SAMPLE_VIDEO_URL }] },
    ],
    category: 'Design',
    level: 'Intermediate',
  },
   {
    id: 'c3',
    title: 'The Complete MBA Course',
    code: 'MBA500',
    status: 'published',
    description: 'A professional business meeting with charts and graphs.',
    instructor: 'Emily White',
    price: 99.99,
    rating: 4.7,
    reviewCount: 890,
    reviews: [],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8vyCMPwZEJ2S1hL96pqjQOYtIrlCrkzcCOIe28Vvsr0kINcQ_ggircNg6vgij2iGhRAgsAv_zMBaiU0xrUm-UNLYrzRoev4Ic-UHF_kFD2ZxfyZJFCC4cUKqG4AlZNlbNWqpz-b6o5QRxHEPaWTJZLE6g3b_3L3q3hSNyFn0Sudh4H8TFN_EOWRZqN8Cqk3I0FPrSWsrvT4ESG24-whH88trWuY9BrrrDUKWPB3pRNf-teiDzIKXuIQmFn0F-BTkpy4WeJ-thkueh',
    modules: [],
    category: 'Business',
    level: 'All Levels',
  },
  {
    id: 'c4',
    title: 'Data Science with Python',
    code: 'DS301',
    status: 'published',
    description: 'Colorful charts and graphs for a data science course.',
    instructor: 'Chris Green',
    price: 69.99,
    rating: 4.8,
    reviewCount: 1520,
    reviews: [],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC99cRGrx1vj9ja1HqdIM7_hbZACjD3VYvfvp21N-2hsRgH0BTOQa9jEnGoIFElip-QLR9PGksBnS4-947MSxtYOl88ZoS8FeXumoYz-5K7IYks5_6b0-Ev5rtYMubakrePHG32v5qOix6tCABJLzmxuHBRMbwA7A_1fiXRwrRCLPRy3wrIkx_T1-vMtQ2IptWWXRnyIH3nd0CqvLHpJmafvw-ic7Th1FjIRtGr61ZOVPCjtquzWVXhq5GApfvWXP6SALejU410e699',
    modules: [],
    category: 'Data Science',
    level: 'Beginner',
    bestseller: true,
  },
  {
    id: 'c5',
    title: 'Modern Calligraphy',
    code: 'ART110',
    status: 'draft',
    description: 'Learn the beautiful art of modern calligraphy from scratch.',
    instructor: 'Diana Prince', 
    price: 39.99,
    rating: 0,
    reviewCount: 0,
    reviews: [],
    imageUrl: 'https://images.unsplash.com/photo-1588223512396-588145a388a4?q=80&w=2070&auto=format&fit=crop',
    modules: [
      { id: 'm5', title: 'Introduction to Tools', lessons: [{ id: 'l7', title: 'Final Project', content: '...', assignment: { id: 'a3', title: 'Calligraphy Showcase', type: 'project' }, videoUrl: SAMPLE_VIDEO_URL }] },
    ],
    category: 'Arts & Crafts',
    level: 'Beginner',
  }
];

export let MOCK_SUBMISSIONS: Submission[] = [
    { id: 's1', studentId: '1', courseId: 'c2', lessonId: 'l5', assignmentTitle: 'Theme Project', status: 'pending', grade: null },
    { 
        id: 's2', 
        studentId: '5', 
        courseId: 'c2', 
        lessonId: 'l5', 
        assignmentTitle: 'Theme Project', 
        status: 'graded', 
        grade: 88,
        feedback: 'Excellent work on the UX flow. The technical implementation was solid, but could be improved by refactoring some CSS components for better reusability.',
        rubricScores: { 
            'crit1': { levelId: 'l1-2', feedback: 'Good use of color and typography.' }, 
            'crit2': { levelId: 'l2-1', feedback: 'The user flow is intuitive and well-thought-out.' }, 
            'crit3': { levelId: 'l3-2', feedback: 'The code is functional but could be more modular.' } 
        } 
    },
];

export const MOCK_CERTIFICATES: Certificate[] = [
    { id: 'cert1', courseName: 'Modern Web Development', studentName: 'Alice Johnson', issueDate: '2023-10-25' },
    { id: 'cert2', courseName: 'Advanced UX Design', studentName: 'Alice Johnson', issueDate: '2023-09-15' },
    { id: 'cert3', courseName: 'Data Science with Python', studentName: 'Alice Johnson', issueDate: '2023-11-01' },
];

// Mock data for the student schedule
export const MOCK_EVENTS: CalendarEvent[] = [
    { id: 'e1', courseId: 'c2', courseName: 'Advanced UX Design', title: 'Live Lecture', date: new Date(2023, 9, 12), time: '11:00 AM - 12:30 PM', type: 'lecture' },
    { id: 'e2', courseId: 'c1', courseName: 'Web Development Bootcamp', title: 'Project Deadline', date: new Date(2023, 9, 5), type: 'deadline' },
    { id: 'e3', courseId: 'c4', courseName: 'Data Science with Python', title: 'Quiz 2', date: new Date(2023, 9, 12), time: 'Available all day', type: 'quiz' },
    { id: 'e4', courseId: 'c1', courseName: 'All Courses', title: 'Midterm Exam', date: new Date(2023, 9, 24), time: '9:00 AM - 5:00 PM', type: 'exam' },
    { id: 'e5', courseId: 'c2', courseName: 'Advanced UX Design', title: 'UX Design Lecture', date: new Date(2023, 9, 3), type: 'lecture' },
    { id: 'e6', courseId: 'c1', courseName: 'Web Development Bootcamp', title: 'Web Dev Lecture', date: new Date(2023, 9, 5), type: 'lecture' },
    { id: 'e7', courseId: 'c2', courseName: 'Advanced UX Design', title: 'UX Design Lecture', date: new Date(2023, 9, 10), type: 'lecture' },
    { id: 'e8', courseId: 'c1', courseName: 'Web Development Bootcamp', title: 'Web Dev Lecture', date: new Date(2023, 9, 12), type: 'lecture' },
];

const getFutureDate = (days: number, hour: number, minutes: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(hour, minutes, 0, 0);
    return date;
};

export const MOCK_LECTURES: Lecture[] = [
    {
        id: 'lec1',
        courseId: 'c2',
        courseName: 'Advanced UX Design',
        title: 'Live Q&A: Prototyping Tools',
        instructor: 'Diana Prince',
        date: getFutureDate(0, 14, 0), // Today at 2:00 PM
        time: '2:00 PM - 3:00 PM EST',
    },
    {
        id: 'lec2',
        courseId: 'c5',
        courseName: 'Modern Calligraphy',
        title: 'Workshop: Brush Pen Techniques',
        instructor: 'Diana Prince',
        date: getFutureDate(2, 11, 0), // In 2 days at 11:00 AM
        time: '11:00 AM - 12:30 PM EST',
    },
];


export let MOCK_CAROUSEL_SLIDES = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    quote: 'This platform provided me with the exact skills I needed to pivot my career. The hands-on projects were invaluable.',
    studentName: 'Jessica Miller, Class of 2023',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
    quote: 'The community and instructor support are second to none. I never felt alone in my learning journey.',
    studentName: 'David Chen, Class of 2022',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    quote: 'From a complete beginner to a confident professional, LearnSpace guided me every step of the way. Truly life-changing!',
    studentName: 'Sophia Rodriguez, Class of 2023',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1531030874896-fdef6826f2f7?q=80&w=1974&auto=format&fit=crop',
    quote: 'The flexibility of the courses allowed me to learn while working full-time. I could immediately apply what I learned.',
    studentName: 'Michael Brown, Class of 2022',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1607237138185-e894ee31b2af?q=80&w=1974&auto=format&fit=crop',
    quote: 'Earning my certificate opened doors I never thought possible. The investment in myself paid off instantly.',
    studentName: 'Emily White, Class of 2023',
  },
];

export let MOCK_TESTIMONIALS: Testimonial[] = [
    {
        id: 't1',
        quote: 'The Web Development Bootcamp was the perfect starting point for my new career. The content was practical and the instructor was amazing!',
        studentName: 'Sarah L.',
        courseTitle: 'Web Development Bootcamp',
        avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        id: 't2',
        quote: 'I loved the UX Design course. It gave me the confidence and the portfolio to land my dream job at a top tech company.',
        studentName: 'Michael P.',
        courseTitle: 'Advanced UX Design',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: 't3',
        quote: 'As someone with a non-technical background, the Data Science course was challenging but incredibly rewarding. Highly recommended!',
        studentName: 'Jessica T.',
        courseTitle: 'Data Science with Python',
        avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    }
];

export const MOCK_INSTRUCTOR_TESTIMONIALS: InstructorTestimonial[] = [
    {
        id: 'it1',
        quote: 'LearnSpace gave me the platform to reach a global audience. The tools are intuitive and the community support is phenomenal...',
        fullQuote: 'LearnSpace gave me the platform to reach a global audience. The tools are intuitive and the community support is phenomenal. It’s transformed my teaching career. I went from teaching in a small local community to having students in over 50 countries. The feedback and analytics tools have also helped me refine my content to be more effective.',
        name: 'Dr. Alistair Finch',
        course: 'Quantum Computing',
        avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
        id: 'it2',
        quote: 'The AI course creator is a game-changer. It helped me structure my ideas and build a comprehensive curriculum in a fraction of the time...',
        fullQuote: 'The AI course creator is a game-changer. It helped me structure my ideas and build a comprehensive curriculum in a fraction of the time. I can focus more on creating quality content and interacting with my students, rather than getting bogged down in administrative tasks. This tool alone is worth its weight in gold.',
        name: 'Priya Sharma',
        course: 'Digital Marketing Mastery',
        avatarUrl: 'https://randomuser.me/api/portraits/women/75.jpg',
    },
    {
        id: 'it3',
        quote: 'I was hesitant to teach online, but LearnSpace made it incredibly simple. The support team is always responsive...',
        fullQuote: 'I was hesitant to teach online, but LearnSpace made it incredibly simple. The support team is always responsive, and I’ve connected with so many passionate students from diverse backgrounds. The platform handles all the technical details, so I can just focus on what I love: teaching.',
        name: 'Markus Chen',
        course: 'Advanced Watercolour Techniques',
        avatarUrl: 'https://randomuser.me/api/portraits/men/76.jpg',
    }
];


export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
    { id: 'msg1', author: 'Jane Doe', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTs6NPbG-ToZ3THtPf-HkZ96HqSEZtTYIR_Y2XzN6e9O5kCkJ6aKn89E1rdhkG_47Bmj4cBO8lhsdWun_6Xu-aHxQiiZqBXdLtERUhYUvcQ3dLWVgFUaNcZjdGiz_LWxtsVOnTe7l_AklRxrV1nc1YD-jsGPSiEv-JU3W-fmMfWRqpNXCWQ0c9RhiuGoYlwgsadvWKXFbBJ2VtWHCnQttO9tEdmLplmlVr-P4kdj1TsxZsOf0_kjSysZ5ayNxVBRD2zJbBgkdP7YwB', timestamp: '10:05 AM', message: "That's a really interesting point about wave-particle duality!" },
    { id: 'msg2', author: 'Mark Chen', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVd-ljD8ek-fBTu6LGljPdqv7NHA51fAy2Deu7YOaxICaxm1u2O2Z2cb42vU5be6TvN3rUGTkjwEshwiBf0wzchO9mI_rRdc_-a123FK-zE5Qr454_khd3HVxtaUgvNiNFgklX6a7wVaiYlymwKvQjpadXnJxJkb7wqo9qcKhYT4KK7hHingh5ZijYm7PXyo8u3qGV0s1u7xQql5IYdq8pzg5HnypAmA9cd2Wuq9Zd3WuJWoQl0cWAq8s07LlJJ-ARd2o3CtJeHNDz', timestamp: '10:06 AM', message: 'Could you explain the Heisenberg Uncertainty Principle again?' },
    { id: 'msg3', author: 'Dr. Evelyn Reed', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASDIeqo8nDpefOM1iAaoDYEUq4wgROZiI1gujyDhk-nOogaY2UOSJuain75XRROHKefn4wFnuI19rzbq7tAN6za0KSIAAVKt_ab1yXYpHVCvqlax8xCSTemkGDCrLBoV55lvI2ykDYWDHDrDIP6Y2ou3v38P2aZANQ-XyamiYy43pO60uzeJJvgYuTA3OjHB7q0j-HTBKtsjKaCbq030BqAhQa38db00KTvbQQlZKe7ocq4ciEfOwYX85UZjHwW9kVncDVX6GJ_aX4', timestamp: '10:07 AM', message: "Of course, Mark. We'll revisit that after the next slide. It's a key concept.", role: 'Instructor' },
    { id: 'msg4', author: 'Samira Khan', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD5lznEEDoiby89p8VPOdzgFE2NzKBLIDtB8IORt6LHnl9mfS9yenx4-EUW-IxuLWi5meNHZkc4bAklCYr2Hg6xm5rYB-Be1sN4xXilN2bAWtGdwfN3RgBdWCYeHG1VGGwX-4T3lWiD0pknJp2ZLVmx_77qOS-GIvRYRAYU7UE-LTGAUuqTkpLtc4xFaTbaWksfpsbDW8aRXCUQSLNDoZmVxgHsK6x6EeSPFBIMFtBUJC10DBg3ylVjBIZTtu1_FkflEbrflc3OdjD', timestamp: '10:08 AM', message: 'This is fascinating! 🤯' },
];

export const MOCK_PARTICIPANTS: Participant[] = [
    { id: 'p1', name: 'Dr. Evelyn Reed', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASDIeqo8nDpefOM1iAaoDYEUq4wgROZiI1gujyDhk-nOogaY2UOSJuain75XRROHKefn4wFnuI19rzbq7tAN6za0KSIAAVKt_ab1yXYpHVCvqlax8xCSTemkGDCrLBoV55lvI2ykDYWDHDrDIP6Y2ou3v38P2aZANQ-XyamiYy43pO60uzeJJvgYuTA3OjHB7q0j-HTBKtsjKaCbq030BqAhQa38db00KTvbQQlZKe7ocq4ciEfOwYX85UZjHwW9kVncDVX6GJ_aX4', role: 'Instructor' },
    { id: 'p2', name: 'Jane Doe', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTs6NPbG-ToZ3THtPf-HkZ96HqSEZtTYIR_Y2XzN6e9O5kCkJ6aKn89E1rdhkG_47Bmj4cBO8lhsdWun_6Xu-aHxQiiZqBXdLtERUhYUvcQ3dLWVgFUaNcZjdGiz_LWxtsVOnTe7l_AklRxrV1nc1YD-jsGPSiEv-JU3W-fmMfWRqpNXCWQ0c9RhiuGoYlwgsadvWKXFbBJ2VtWHCnQttO9tEdmLplmlVr-P4kdj1TsxZsOf0_kjSysZ5ayNxVBRD2zJbBgkdP7YwB', role: 'Student' },
    { id: 'p3', name: 'Mark Chen', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVd-ljD8ek-fBTu6LGljPdqv7NHA51fAy2Deu7YOaxICaxm1u2O2Z2cb42vU5be6TvN3rUGTkjwEshwiBf0wzchO9mI_rRdc_-a123FK-zE5Qr454_khd3HVxtaUgvNiNFgklX6a7wVaiYlymwKvQjpadXnJxJkb7wqo9qcKhYT4KK7hHingh5ZijYm7PXyo8u3qGV0s1u7xQql5IYdq8pzg5HnypAmA9cd2Wuq9Zd3WuJWoQl0cWAq8s07LlJJ-ARd2o3CtJeHNDz', role: 'Student' },
    { id: 'p4', name: 'Samira Khan', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD5lznEEDoiby89p8VPOdzgFE2NzKBLIDtB8IORt6LHnl9mfS9yenx4-EUW-IxuLWi5meNHZkc4bAklCYr2Hg6xm5rYB-Be1sN4xXilN2bAWtGdwfN3RgBdWCYeHG1VGGwX-4T3lWiD0pknJp2ZLVmx_77qOS-GIvRYRAYU7UE-LTGAUuqTkpLtc4xFaTbaWksfpsbDW8aRXCUQSLNDoZmVxgHsK6x6EeSPFBIMFtBUJC10DBg3ylVjBIZTtu1_FkflEbrflc3OdjD', role: 'Student' },
    { id: 'p5', name: 'Alice Johnson', avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg', role: 'Student' },
    { id: 'p6', name: 'Bob Smith', avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg', role: 'Student' },
];

export const MOCK_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'p1',
    name: 'Basic',
    description: 'For individuals starting their learning journey.',
    priceMonthly: 0,
    priceAnnually: 0,
    keyFeatures: [
      { icon: 'library_books', text: 'Access to free courses' },
      { icon: 'timeline', text: 'Basic progress tracking' },
      { icon: 'forum', text: 'Community forum access' },
    ],
  },
  {
    id: 'p2',
    name: 'Pro',
    description: 'For dedicated learners who want to master new skills.',
    priceMonthly: 29,
    priceAnnually: 290,
    keyFeatures: [
      { icon: 'collections_bookmark', text: 'Access to all courses' },
      { icon: 'bar_chart', text: 'Advanced progress tracking' },
      { icon: 'download', text: 'Downloadable resources' },
      { icon: 'workspace_premium', text: 'Course certificates' },
      { icon: 'support_agent', text: 'Priority email support' },
    ],
    isPopular: true,
  },
  {
    id: 'p3',
    name: 'Teams',
    description: 'For organizations that want to upskill their employees.',
    priceMonthly: 79,
    priceAnnually: 790,
    keyFeatures: [
      { icon: 'done_all', text: 'All features of Pro' },
      { icon: 'groups', text: 'Team management dashboard' },
      { icon: 'monitoring', text: 'Usage analytics' },
      { icon: 'credit_card', text: 'Centralized billing' },
    ],
  },
];

export const MOCK_FEATURE_COMPARISON: FeatureComparison[] = [
    { feature: 'Access to free courses', category: 'Content', tiers: { p1: true, p2: true, p3: true } },
    { feature: 'Access to premium courses', category: 'Content', tiers: { p1: false, p2: true, p3: true } },
    { feature: 'Downloadable resources', category: 'Content', tiers: { p1: false, p2: true, p3: true } },
    { feature: 'Basic progress tracking', category: 'Learning Tools', tiers: { p1: true, p2: true, p3: true } },
    { feature: 'Advanced progress tracking', category: 'Learning Tools', tiers: { p1: false, p2: true, p3: true } },
    { feature: 'Course certificates', category: 'Learning Tools', tiers: { p1: false, p2: true, p3: true } },
    { feature: 'Community forum access', category: 'Support', tiers: { p1: true, p2: true, p3: true } },
    { feature: 'Priority email support', category: 'Support', tiers: { p1: false, p2: true, p3: true } },
    { feature: 'Team management dashboard', category: 'Team Features', tiers: { p1: false, p2: false, p3: true } },
    { feature: 'Usage analytics', category: 'Team Features', tiers: { p1: false, p2: false, p3: true } },
    { feature: 'Centralized billing', category: 'Team Features', tiers: { p1: false, p2: false, p3: true } },
];

export const MOCK_FAQS: FAQItem[] = [
    { id: 'faq1', question: 'Can I cancel my subscription anytime?', answer: 'Yes, you can cancel your subscription at any time from your account settings. Your access to Pro features will continue until the end of your current billing period.' },
    { id: 'faq2', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.' },
    { id: 'faq3', question: 'Do you offer refunds?', answer: 'We offer a 30-day money-back guarantee for all new Pro subscriptions. If you are not satisfied, you can request a full refund within 30 days of purchase.' },
    { id: 'faq4', question: 'Can I switch between monthly and annual billing?', answer: 'Yes, you can switch your billing cycle from your account settings. The change will take effect at the end of your current billing period.' },
];

export let MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Eleanor Vance',
    title: 'Founder & CEO',
    bio: 'Eleanor is the visionary behind LearnSpace, driven by a passion for making education accessible to all. With a background in educational technology, she leads the company with a focus on innovation and user-centric design.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'tm2',
    name: 'David Chen',
    title: 'Chief Technology Officer',
    bio: 'David is the architectural mastermind of the LearnSpace platform. He ensures our technology is robust, scalable, and secure, enabling a seamless learning experience for millions of users worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'tm3',
    name: 'Sophia Rodriguez',
    title: 'Head of Content',
    bio: 'Sophia curates our extensive course catalog, working with the best instructors to deliver high-quality, engaging, and relevant content that meets the evolving needs of our learners.',
    imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'tm4',
    name: 'Michael Brown',
    title: 'VP of Community',
    bio: 'Michael is dedicated to fostering a vibrant and supportive community. He manages student and instructor relations, ensuring everyone has the resources and support they need to succeed on their journey.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'txn1', studentId: '1', studentName: 'Alice Johnson', courseId: 'c1', courseTitle: 'Web Development Bootcamp', amount: 49.99, date: '2023-10-01', status: 'Completed' },
  { id: 'txn2', studentId: '2', studentName: 'Bob Smith', courseId: 'c3', courseTitle: 'The Complete MBA Course', amount: 99.99, date: '2023-10-03', status: 'Completed' },
  { id: 'txn3', studentId: '1', studentName: 'Alice Johnson', courseId: 'c2', courseTitle: 'Advanced UX Design', amount: 79.99, date: '2023-10-05', status: 'Completed' },
  { id: 'txn4', studentId: '5', studentName: 'Ethan Hunt', courseId: 'c2', courseTitle: 'Advanced UX Design', amount: 79.99, date: '2023-10-06', status: 'Refunded' },
  { id: 'txn5', studentId: '2', studentName: 'Bob Smith', courseId: 'c1', courseTitle: 'Web Development Bootcamp', amount: 49.99, date: '2023-10-10', status: 'Completed' },
  { id: 'txn6', studentId: '1', studentName: 'Alice Johnson', courseId: 'c4', courseTitle: 'Data Science with Python', amount: 69.99, date: '2023-10-12', status: 'Completed' },
];

export const MOCK_PAYOUTS: Payout[] = [
    { id: 'payout1', instructorId: '4', instructorName: 'Diana Prince', amount: 1250.75, period: 'September 2023', date: '2023-10-05', status: 'Paid' },
    { id: 'payout2', instructorId: 'inst2', instructorName: 'John Doe', amount: 980.50, period: 'September 2023', date: '2023-10-05', status: 'Paid' },
    { id: 'payout3', instructorId: '4', instructorName: 'Diana Prince', amount: 1420.00, period: 'October 2023', date: '2023-11-05', status: 'Pending' },
    { id: 'payout4', instructorId: 'inst3', instructorName: 'Chris Green', amount: 1150.20, period: 'October 2023', date: '2023-11-05', status: 'Pending' },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
    {
        id: 'post1',
        title: 'The Future of AI in Education: A Personalized Learning Revolution',
        excerpt: 'Artificial Intelligence is rapidly transforming how we teach and learn. From personalized curriculum to instant feedback, discover how AI is reshaping the educational landscape.',
        content: `
            <p>Artificial Intelligence is no longer just a buzzword; it's a transformative force that is reshaping industries across the globe, and education is no exception. In recent years, we've seen a shift from traditional, one-size-fits-all teaching methods to more personalized, adaptive learning experiences powered by AI.</p>
            
            <h2>Personalized Learning Paths</h2>
            <p>One of the most significant benefits of AI in education is the ability to create personalized learning paths for students. AI algorithms can analyze a student's learning style, pace, and performance to tailor content that meets their specific needs. This ensures that students are neither bored with material they already know nor overwhelmed by concepts they find difficult.</p>
            
            <blockquote>"AI doesn't replace the teacher; it empowers them to be more effective by providing insights that were previously impossible to obtain."</blockquote>

            <h2>Instant Feedback and Assessment</h2>
            <p>Gone are the days of waiting weeks for a graded assignment. AI-powered tools can provide instant feedback on quizzes, essays, and coding exercises. This immediate loop allows students to identify their mistakes and learn from them in real-time, accelerating the learning process.</p>

            <h2>The Role of the Instructor</h2>
            <p>While AI handles data analysis and content delivery, the role of the instructor evolves into that of a mentor and facilitator. Teachers can focus more on fostering critical thinking, creativity, and emotional intelligence—skills that AI cannot replicate.</p>
            
            <p>As we look to the future, the integration of AI in education promises to make learning more accessible, engaging, and effective for everyone.</p>
        `,
        author: {
            name: 'Dr. Sarah Connor',
            avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
            role: 'EdTech Researcher'
        },
        date: 'Oct 24, 2023',
        readTime: '5 min read',
        category: 'Technology',
        imageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop',
        tags: ['AI', 'EdTech', 'Future of Work']
    },
    {
        id: 'post2',
        title: '5 Soft Skills Every Developer Needs to Succeed',
        excerpt: 'Coding skills get you the interview, but soft skills get you the job. Learn about the essential communication and teamwork skills that will accelerate your tech career.',
        content: `
            <p>In the tech industry, there's often a heavy emphasis on technical prowess—mastering the latest frameworks, optimizing algorithms, and writing clean code. While these hard skills are undeniably important, they are only half the equation. To truly thrive as a developer, you need to cultivate strong soft skills.</p>

            <h2>1. Communication</h2>
            <p>Developers don't work in a vacuum. You need to be able to explain complex technical concepts to non-technical stakeholders, such as product managers and designers. Clear communication prevents misunderstandings and ensures that everyone is aligned on the project goals.</p>

            <h2>2. Empathy</h2>
            <p>Good software is built for people. Empathy allows you to understand the user's pain points and build solutions that genuinely improve their lives. It also helps you work better with your teammates by understanding their perspectives and challenges.</p>

            <h2>3. Adaptability</h2>
            <p>The tech landscape is constantly changing. New tools, languages, and methodologies emerge every year. A successful developer is one who is willing to unlearn old habits and embrace new ways of doing things.</p>

            <h2>4. Problem-Solving</h2>
            <p>At its core, programming is about solving problems. However, this extends beyond just fixing bugs. It involves critical thinking, creativity, and the ability to approach challenges from multiple angles.</p>

            <h2>5. Teamwork</h2>
            <p>Most software is built by teams. Being a good team player means being reliable, respectful, and willing to collaborate. It means celebrating shared successes and supporting each other through failures.</p>

            <p>By investing in these soft skills, you'll not only become a better developer but also a more valuable asset to any organization.</p>
        `,
        author: {
            name: 'Michael Chang',
            avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            role: 'Senior Engineer'
        },
        date: 'Nov 02, 2023',
        readTime: '4 min read',
        category: 'Career',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
        tags: ['Career Advice', 'Soft Skills', 'Development']
    },
    {
        id: 'post3',
        title: 'From Barista to Full Stack Engineer: A Journey',
        excerpt: 'Meet Sarah, a LearnSpace graduate who pivoted her career in just 6 months. Read her inspiring journey and get her top tips for new learners.',
        content: `
            <p>Change is scary. Leaving a stable job to pursue a new passion is even scarier. But for Sarah Jenkins, taking that leap of faith was the best decision she ever made. Just a year ago, Sarah was working long shifts as a barista, feeling unfulfilled and stuck. Today, she's a Full Stack Engineer at a leading tech startup.</p>

            <h2>The Spark</h2>
            <p>It started with a curiosity about how websites worked. "I remember looking at a website and thinking, 'I wonder how they made that button change color when I hover over it?'" Sarah recalls. That curiosity led her to LearnSpace's free "Intro to Web Development" course.</p>

            <h2>The Grind</h2>
            <p>Balancing a full-time job with learning wasn't easy. "There were nights when I was exhausted, but the thrill of solving a coding problem kept me going," she says. Sarah dedicated her mornings and weekends to studying, completing the Web Development Bootcamp in six months.</p>

            <h2>The Breakthrough</h2>
            <p>Sarah's capstone project caught the eye of a recruiter on LinkedIn. "I built an app for managing coffee shop inventory—something I knew a lot about!" she laughs. The project demonstrated not just her coding skills, but her ability to solve real-world problems.</p>

            <h2>Sarah's Tips for New Learners</h2>
            <ul>
                <li><strong>Be Consistent:</strong> "Code a little bit every day, even if it's just for 20 minutes."</li>
                <li><strong>Build Projects:</strong> "Don't just watch tutorials. Build things that interest you."</li>
                <li><strong>Network:</strong> "Connect with other learners. The community support is invaluable."</li>
            </ul>

            <p>Sarah's story is a testament to the power of perseverance and the opportunities that online learning can provide. Her journey is just beginning, and we can't wait to see what she builds next.</p>
        `,
        author: {
            name: 'Editorial Team',
            avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
            role: 'LearnSpace'
        },
        date: 'Nov 10, 2023',
        readTime: '6 min read',
        category: 'Student Success',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
        tags: ['Success Story', 'Inspiration', 'Career Change']
    },
    {
        id: 'post4',
        title: 'Mastering Time Management for Online Learning',
        excerpt: 'Struggling to balance work, life, and study? Here are 7 proven strategies to help you stay organized and motivated.',
        content: `
            <p>Online learning offers incredible flexibility, but it also requires a high degree of self-discipline. Without a set class schedule, it's easy to fall behind. Effective time management is the key to success.</p>
            
            <h2>1. Create a Schedule</h2>
            <p>Treat your study time like a real appointment. Block out specific times in your calendar and stick to them.</p>

            <h2>2. Set Specific Goals</h2>
            <p>Instead of saying "I'll study today," say "I will complete Module 3, Lesson 2." Specific goals give you a clear target to aim for.</p>

            <h2>3. Eliminate Distractions</h2>
            <p>Put your phone in another room, use a website blocker, or find a quiet space where you won't be disturbed.</p>

            <h2>4. Use the Pomodoro Technique</h2>
            <p>Study for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents burnout.</p>

            <h2>5. Stay Healthy</h2>
            <p>Your brain needs fuel. Ensure you're getting enough sleep, eating well, and exercising. A healthy body supports a healthy mind.</p>

            <p>By implementing these strategies, you can take control of your learning journey and achieve your educational goals.</p>
        `,
        author: {
            name: 'David Miller',
            avatarUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
            role: 'Productivity Coach'
        },
        date: 'Nov 15, 2023',
        readTime: '3 min read',
        category: 'Study Tips',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
        tags: ['Productivity', 'Study Tips', 'Self Improvement']
    }
];

export let MOCK_PAGES: PageContent[] = [
    {
        id: 'page1',
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        lastUpdated: '2023-10-27',
        content: `
<p class="text-lg">Last Updated: October 27, 2023</p>

<section>
    <h2 class="text-2xl font-bold mb-4">1. Introduction</h2>
    <p>Welcome to LearnSpace ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at support@learnspace.com.</p>
</section>

<section>
    <h2 class="text-2xl font-bold mb-4 mt-6">2. Information We Collect</h2>
    <p>We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.</p>
    <ul class="list-disc pl-6 mt-2 space-y-2">
        <li><strong>Personal Information Provided by You:</strong> We collect names; email addresses; usernames; passwords; contact preferences; contact or authentication data; and other similar information.</li>
        <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument.</li>
    </ul>
</section>

<section>
    <h2 class="text-2xl font-bold mb-4 mt-6">3. How We Use Your Information</h2>
    <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
    <ul class="list-disc pl-6 mt-2 space-y-2">
        <li>To facilitate account creation and logon process.</li>
        <li>To post testimonials.</li>
        <li>To request feedback.</li>
        <li>To enable user-to-user communications.</li>
        <li>To manage user accounts.</li>
    </ul>
</section>

<section>
    <h2 class="text-2xl font-bold mb-4 mt-6">4. Sharing Your Information</h2>
    <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
</section>

<section>
    <h2 class="text-2xl font-bold mb-4 mt-6">5. Contact Us</h2>
    <p>If you have questions or comments about this policy, you may email us at privacy@learnspace.com or by post to:</p>
    <address class="mt-4 not-italic bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
        LearnSpace, Inc.<br/>
        123 Education Lane<br/>
        San Francisco, CA 94105<br/>
        United States
    </address>
</section>
        `
    },
    {
        id: 'page2',
        slug: 'cookie-policy',
        title: 'Cookie Policy',
        lastUpdated: '2023-10-27',
        content: `
<p class="text-lg">Last Updated: October 27, 2023</p>

<section>
    <h2 class="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
    <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
</section>

<section>
    <h2 class="text-2xl font-bold mb-4 mt-6">2. Why We Use Cookies</h2>
    <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.</p>
</section>

<section>
    <h2 class="text-2xl font-bold mb-4 mt-6">3. Types of Cookies We Use</h2>
    <div class="space-y-4">
        <div class="bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
            <h3 class="font-bold">Essential Cookies</h3>
            <p class="text-sm mt-1">These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</p>
        </div>
        <div class="bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
            <h3 class="font-bold">Performance & Analytics Cookies</h3>
            <p class="text-sm mt-1">These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are.</p>
        </div>
        <div class="bg-secondary-light dark:bg-secondary-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
            <h3 class="font-bold">Functionality Cookies</h3>
            <p class="text-sm mt-1">These cookies are used to recognize you when you return to our Website. This enables us to personalize our content for you, greet you by name, and remember your preferences (for example, your choice of language or region).</p>
        </div>
    </div>
</section>

<section>
    <h2 class="text-2xl font-bold mb-4 mt-6">4. How can I control cookies?</h2>
    <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
    <p class="mt-4">You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
</section>
        `
    },
    {
        id: 'page3',
        slug: 'blog',
        title: 'Blog',
        lastUpdated: '2023-11-01',
        content: '' // DEPRECATED: Now using MOCK_BLOG_POSTS
    },
    {
        id: 'page4',
        slug: 'careers',
        title: 'Careers at LearnSpace',
        lastUpdated: '2023-11-10',
        content: `
<div class="text-center mb-16">
    <h2 class="text-3xl font-bold mb-4">Come Build the Future of Learning</h2>
    <p class="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">We are a team of educators, engineers, and designers passionate about making education accessible to everyone. If you want to make a real impact, we want to hear from you.</p>
</div>

<div class="space-y-6">
    <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary dark:hover:border-primary transition-colors bg-white dark:bg-card-dark">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Senior Frontend Engineer</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Remote (US/Canada) &bull; Engineering</p>
            </div>
            <button class="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover">Apply Now</button>
        </div>
    </div>

    <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary dark:hover:border-primary transition-colors bg-white dark:bg-card-dark">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Product Designer</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">San Francisco, CA &bull; Design</p>
            </div>
            <button class="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover">Apply Now</button>
        </div>
    </div>

    <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary dark:hover:border-primary transition-colors bg-white dark:bg-card-dark">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Customer Success Manager</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">New York, NY &bull; Operations</p>
            </div>
            <button class="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover">Apply Now</button>
        </div>
    </div>
    
     <div class="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary dark:hover:border-primary transition-colors bg-white dark:bg-card-dark">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Content Strategist</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Remote &bull; Content</p>
            </div>
            <button class="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover">Apply Now</button>
        </div>
    </div>
</div>
        `
    },
    {
        id: 'page5',
        slug: 'help-center',
        title: 'Help Center Content',
        lastUpdated: '2023-10-30',
        content: `
<div class="space-y-12">
    <div>
        <h2 class="text-3xl font-bold text-text-light dark:text-text-dark mb-6">Frequently Asked Questions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a class="flex items-start gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all" href="#">
                <span class="material-symbols-outlined text-primary text-3xl mt-1">payment</span>
                <div>
                    <h3 class="text-lg font-semibold text-text-light dark:text-text-dark">How do I update my payment method?</h3>
                    <p class="text-base text-text-muted-light dark:text-text-muted-dark mt-1">Learn how to change or remove your saved payment details.</p>
                </div>
            </a>
            <a class="flex items-start gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all" href="#">
                <span class="material-symbols-outlined text-primary text-3xl mt-1">school</span>
                <div>
                    <h3 class="text-lg font-semibold text-text-light dark:text-text-dark">Where can I find my course materials?</h3>
                    <p class="text-base text-text-muted-light dark:text-text-muted-dark mt-1">All lectures, notes, and assignments are available in the 'My Courses' tab.</p>
                </div>
            </a>
            <a class="flex items-start gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all" href="#">
                <span class="material-symbols-outlined text-primary text-3xl mt-1">download</span>
                <div>
                    <h3 class="text-lg font-semibold text-text-light dark:text-text-dark">Can I download lectures for offline viewing?</h3>
                    <p class="text-base text-text-muted-light dark:text-text-muted-dark mt-1">Find out which courses offer downloadable content for learning on the go.</p>
                </div>
            </a>
            <a class="flex items-start gap-4 p-6 rounded-lg bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all" href="#">
                <span class="material-symbols-outlined text-primary text-3xl mt-1">lock_reset</span>
                <div>
                    <h3 class="text-lg font-semibold text-text-light dark:text-text-dark">How do I reset my password?</h3>
                    <p class="text-base text-text-muted-light dark:text-text-muted-dark mt-1">Follow these simple steps to securely reset your account password.</p>
                </div>
            </a>
        </div>
    </div>

    <div>
        <h2 class="text-3xl font-bold text-text-light dark:text-text-dark mb-6">Tutorials &amp; Guides</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden group">
                <div class="h-40 bg-primary/20 flex items-center justify-center relative">
                    <span class="material-symbols-outlined text-primary text-6xl">play_circle</span>
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span class="material-symbols-outlined text-white text-6xl">play_circle</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-text-light dark:text-text-dark">Getting Started</h3>
                    <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">A quick tour of your student dashboard.</p>
                </div>
            </div>
            <div class="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden group">
                <div class="h-40 bg-primary/20 flex items-center justify-center relative">
                    <span class="material-symbols-outlined text-primary text-6xl">checklist</span>
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span class="material-symbols-outlined text-white text-6xl">play_circle</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-text-light dark:text-text-dark">Submitting Assignments</h3>
                    <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Learn how to upload and submit your work.</p>
                </div>
            </div>
            <div class="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg overflow-hidden group">
                <div class="h-40 bg-primary/20 flex items-center justify-center relative">
                    <span class="material-symbols-outlined text-primary text-6xl">forum</span>
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span class="material-symbols-outlined text-white text-6xl">play_circle</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-text-light dark:text-text-dark">Using Discussion Forums</h3>
                    <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Engage with peers and instructors effectively.</p>
                </div>
            </div>
        </div>
    </div>

    <div>
        <h2 class="text-3xl font-bold text-text-light dark:text-text-dark mb-6">Need more help?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-8 rounded-lg text-center flex flex-col items-center">
                <div class="w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                    <span class="material-symbols-outlined text-primary text-5xl">support_agent</span>
                </div>
                <h3 class="text-xl font-semibold text-text-light dark:text-text-dark">Technical Support</h3>
                <p class="text-text-muted-light dark:text-text-muted-dark my-2 flex-grow">For issues with your account, payments, or platform access.</p>
                <button class="mt-4 w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors">Contact Support</button>
            </div>
            <div class="bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-8 rounded-lg text-center flex flex-col items-center">
                <div class="w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                    <span class="material-symbols-outlined text-primary text-5xl">contact_mail</span>
                </div>
                <h3 class="text-xl font-semibold text-text-light dark:text-text-dark">Course Assistance</h3>
                <p class="text-text-muted-light dark:text-text-muted-dark my-2 flex-grow">For questions about course content, assignments, or grades.</p>
                <button class="mt-4 w-full sm:w-auto px-6 py-2.5 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">Message an Instructor</button>
            </div>
        </div>
    </div>
</div>
        `
    }
];
