
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_COURSES } from '../../data/mock';
import { Course } from '../../types';
import CourseDetailModal from './CourseDetailModal';
import { StarRating } from '../common/StarRating';

const ALL_CATEGORIES = [...new Set(MOCK_COURSES.map(c => c.category))];
const SKILL_LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Expert'];
const PRICE_OPTIONS = ['All', 'Paid', 'Free'];

const CoursesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [scrollY, setScrollY] = useState(0);
    const [filters, setFilters] = useState({
        categories: ALL_CATEGORIES,
        skillLevel: 'All Levels',
        price: 'All'
    });

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCategoryChange = (category: string) => {
        setFilters(prev => {
            const allCategoriesSelected = prev.categories.length === ALL_CATEGORIES.length;
            const newCategories = allCategoriesSelected
                ? [category] // If all are selected, start a new selection
                : prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category];

            // If unchecking the last category, select all again
            if (newCategories.length === 0) {
                return { ...prev, categories: ALL_CATEGORIES };
            }
            
            return { ...prev, categories: newCategories };
        });
    };

    const clearFilters = () => {
        setFilters({
            categories: ALL_CATEGORIES,
            skillLevel: 'All Levels',
            price: 'All'
        });
        setSearchTerm('');
    };

    const filteredCourses = useMemo(() => {
        return MOCK_COURSES.filter(course => {
            const matchesSearch = searchTerm === '' ||
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = filters.categories.length === ALL_CATEGORIES.length || filters.categories.includes(course.category);
            
            const matchesLevel = filters.skillLevel === 'All Levels' || course.level === filters.skillLevel;

            let matchesPrice = true;
            if (filters.price === 'Paid') {
                matchesPrice = course.price > 0;
            } else if (filters.price === 'Free') {
                matchesPrice = course.price === 0;
            }

            return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
        });
    }, [searchTerm, filters]);


    return (
        <>
            <main className="flex-grow bg-background-light dark:bg-background-dark min-h-screen">
                {/* Hero Section with Video Background */}
                <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
                    <video 
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        poster="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg"
                        style={{ 
                            transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.2}px)`, 
                            transition: 'transform 0.1s linear',
                            filter: 'brightness(0.6)'
                        }}
                    >
                        {/* Video of students in a library/study environment */}
                        <source src="https://videos.pexels.com/video-files/3209298/3209298-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background-light dark:to-background-dark"></div>

                    <div className="relative z-10 w-full max-w-screen-xl px-4 text-center">
                        <div className="animate-fade-in-up">
                            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                                Discover Knowledge
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-2xl">
                                Explore Our <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">World-Class Courses</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
                                From coding to design, business to arts. Find the perfect course to elevate your skills and advance your career.
                            </p>
                        </div>

                        {/* Search Bar - Glassmorphism */}
                        <div className="max-w-2xl mx-auto animate-fade-in-up delay-200">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative flex items-center bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
                                    <span className="material-symbols-outlined text-white text-3xl ml-4">search</span>
                                    <input 
                                        className="w-full bg-transparent border-none text-white placeholder-gray-300 text-lg px-4 py-3 focus:ring-0"
                                        placeholder="What do you want to learn today?" 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm('')} className="text-white hover:text-accent mr-4">
                                            <span className="material-symbols-outlined">close</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-20">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <aside className="w-full lg:w-1/4 xl:w-1/5 animate-fade-in-up delay-300">
                            <div className="bg-card-light dark:bg-card-dark p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-xl sticky top-24 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-text-light dark:text-text-dark text-xl font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">filter_list</span> Filters
                                    </h2>
                                    <button onClick={clearFilters} className="text-xs font-bold text-primary hover:underline uppercase tracking-wide">Reset</button>
                                </div>
                                
                                <div className="space-y-8">
                                    {/* Category Filter */}
                                    <div>
                                        <h3 className="text-text-light dark:text-text-dark text-sm font-bold uppercase tracking-wider mb-4 border-b border-border-light dark:border-border-dark pb-2">Category</h3>
                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {ALL_CATEGORIES.map(category => (
                                                <label key={category} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors">
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${filters.categories.includes(category) ? 'bg-primary border-primary' : 'border-gray-400 group-hover:border-primary'}`}>
                                                        {filters.categories.includes(category) && <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>}
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={filters.categories.includes(category)}
                                                        onChange={() => handleCategoryChange(category)}
                                                    />
                                                    <span className={`text-sm font-medium transition-colors ${filters.categories.includes(category) ? 'text-primary font-bold' : 'text-text-muted-light dark:text-text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark'}`}>{category}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Skill Level Filter */}
                                    <div>
                                        <h3 className="text-text-light dark:text-text-dark text-sm font-bold uppercase tracking-wider mb-4 border-b border-border-light dark:border-border-dark pb-2">Level</h3>
                                        <div className="space-y-2">
                                            {SKILL_LEVELS.map(level => (
                                                <label key={level} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark transition-colors">
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${filters.skillLevel === level ? 'border-primary' : 'border-gray-400 group-hover:border-primary'}`}>
                                                        {filters.skillLevel === level && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="skill-level"
                                                        className="hidden"
                                                        checked={filters.skillLevel === level}
                                                        onChange={() => setFilters(prev => ({ ...prev, skillLevel: level }))}
                                                    />
                                                    <span className={`text-sm font-medium transition-colors ${filters.skillLevel === level ? 'text-primary font-bold' : 'text-text-muted-light dark:text-text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark'}`}>{level}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Price Filter */}
                                    <div>
                                        <h3 className="text-text-light dark:text-text-dark text-sm font-bold uppercase tracking-wider mb-4 border-b border-border-light dark:border-border-dark pb-2">Price</h3>
                                        <div className="flex bg-secondary-light dark:bg-secondary-dark p-1 rounded-lg">
                                            {PRICE_OPTIONS.map(price => (
                                                 <label key={price} className={`flex-1 text-center py-2 text-sm font-bold rounded-md cursor-pointer transition-all ${filters.price === price ? 'bg-white dark:bg-card-dark text-primary shadow-sm' : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}>
                                                    <input
                                                        type="radio"
                                                        name="price"
                                                        className="hidden"
                                                        checked={filters.price === price}
                                                        onChange={() => setFilters(prev => ({ ...prev, price: price }))}
                                                    />
                                                    {price}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Courses Grid */}
                        <section className="w-full lg:w-3/4 xl:w-4/5">
                             <div className="mb-6 flex justify-between items-center animate-fade-in-up delay-400 bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                                <p className="text-text-light dark:text-text-dark font-bold flex items-center gap-2">
                                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-md">{filteredCourses.length}</span>
                                    Courses Found
                                </p>
                                <div className="flex items-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span>Sort by:</span>
                                    <select className="bg-transparent font-bold text-text-light dark:text-text-dark border-none focus:ring-0 cursor-pointer">
                                        <option>Most Popular</option>
                                        <option>Newest</option>
                                        <option>Price: Low to High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredCourses.map((course, i) => (
                                    <div 
                                        key={course.id} 
                                        className="group flex flex-col rounded-2xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark shadow-soft hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                                        style={{ animationDelay: `${(i * 100) + 400}ms` }}
                                        onClick={() => setSelectedCourse(course)}
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <div 
                                                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                                                style={{ backgroundImage: `url('${course.imageUrl}')` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                            
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-text-light dark:text-text-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                                    {course.category}
                                                </span>
                                                {course.bestseller && (
                                                    <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Hot
                                                    </span>
                                                )}
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                <button className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                                                    View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between gap-4 p-6 relative">
                                            <div className="absolute -top-5 right-5 bg-primary text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-300 border-2 border-white dark:border-card-dark">
                                                {course.price > 0 ? `$${course.price}` : 'Free'}
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-bold text-text-light dark:text-text-dark leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">{course.title}</h3>
                                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">person</span> {course.instructor}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-border-light dark:border-border-dark flex justify-between items-center">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-bold text-sm text-accent">{course.rating.toFixed(1)}</span>
                                                    <StarRating rating={course.rating} className="!text-sm" />
                                                    <span className="text-xs text-text-muted-light dark:text-text-muted-dark">({course.reviewCount})</span>
                                                </div>
                                                <span className="text-xs font-semibold bg-secondary-light dark:bg-secondary-dark text-text-muted-light dark:text-text-muted-dark px-2 py-1 rounded-md border border-border-light dark:border-border-dark">
                                                    {course.level}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                             {filteredCourses.length === 0 && (
                                <div className="text-center py-20 col-span-full bg-card-light dark:bg-card-dark rounded-2xl border-2 border-dashed border-border-light dark:border-border-dark animate-fade-in-up">
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary-light dark:bg-secondary-dark mb-4">
                                        <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark opacity-50">search_off</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">No courses found</h3>
                                    <p className="text-text-muted-light dark:text-text-muted-dark mt-2 text-lg max-w-md mx-auto">We couldn't find any courses matching your current filters. Try adjusting your search or clearing filters.</p>
                                    <button onClick={clearFilters} className="mt-8 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg transition-transform hover:-translate-y-1">Clear All Filters</button>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
            {selectedCourse && <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
        </>
    );
};

export default CoursesPage;
