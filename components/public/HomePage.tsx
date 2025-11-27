
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_COURSES, MOCK_TESTIMONIALS } from '../../data/mock';
import { StarRating } from '../common/StarRating';

interface HomePageProps {
    onSignUp: () => void;
    onExploreCourses: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSignUp, onExploreCourses }) => {
    const [scrollY, setScrollY] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        
        // Force play video on mount
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="flex flex-col w-full overflow-x-hidden">
            {/* Cinematic Video Hero Section */}
            <div className="relative w-full h-screen overflow-hidden bg-black">
                {/* Video Background */}
                <video 
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    preload="auto"
                    src="https://videos.pexels.com/video-files/3196067/3196067-hd_1920_1080_25fps.mp4"
                    poster="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                    style={{ 
                        transform: `scale(${1 + scrollY * 0.0005})`, 
                        filter: 'brightness(0.6)'
                    }}
                />

                {/* Overlay Gradients for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background-light dark:to-background-dark z-1"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-1"></div>

                {/* Hero Content */}
                <div className="relative z-20 flex flex-col justify-center h-full px-4 sm:px-6 lg:px-16 max-w-screen-2xl mx-auto">
                    <div className="max-w-4xl">
                        {/* Animated Badge */}
                        <div className="animate-fade-in-up flex items-center gap-2 mb-6">
                            <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center gap-2 animate-float">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                                </span>
                                <span className="text-white text-xs md:text-sm font-bold tracking-wider uppercase">The Future of Learning is Here</span>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 animate-fade-in-up delay-100 drop-shadow-2xl">
                            Master Your <br/>
                            <span className="text-shimmer">Digital Future.</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg md:text-2xl text-gray-100 font-light leading-relaxed max-w-2xl mb-10 animate-fade-in-up delay-200 drop-shadow-md">
                            Gain the technical skills you need to succeed. Join a global community of learners mastering the systems of tomorrow.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                            <button 
                                onClick={onSignUp} 
                                className="group relative px-8 py-4 bg-primary text-white text-lg font-bold rounded-xl overflow-hidden shadow-glow transition-all hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer"></div>
                                <span className="relative flex items-center gap-2">
                                    Get Started Free <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </span>
                            </button>
                            <button 
                                onClick={onExploreCourses} 
                                className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg font-bold rounded-xl hover:bg-white/20 hover:scale-105 transition-all"
                            >
                                Browse Catalog
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 text-white/50">
                    <span className="material-symbols-outlined text-4xl">keyboard_double_arrow_down</span>
                </div>
            </div>

            <div className="flex flex-col gap-20 py-20 md:gap-32 md:py-28 bg-background-light dark:bg-background-dark transition-colors duration-300 relative z-10">
                
                {/* Floating Stats Section */}
                <section className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 -mt-32 relative z-30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: 'school', title: 'Expert Instructors', desc: 'Learn from industry leaders.', color: 'text-primary' },
                            { icon: 'devices', title: 'System Training', desc: 'Hands-on labs and simulations.', color: 'text-accent' },
                            { icon: 'rocket_launch', title: 'Career Acceleration', desc: 'Launch your tech career.', color: 'text-green-500' }
                        ].map((stat, idx) => (
                            <div 
                                key={idx} 
                                className="glass-panel p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group animate-fade-in-up"
                                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-4 rounded-full bg-white/50 dark:bg-black/20 ${stat.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-light dark:text-white">{stat.title}</h3>
                                </div>
                                <p className="text-text-muted-light dark:text-gray-300 font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Featured Courses */}
                <section className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div className="max-w-2xl animate-fade-in-up">
                            <h2 className="text-3xl md:text-5xl font-black text-text-light dark:text-text-dark mb-4 leading-tight">
                                Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Courses</span>
                            </h2>
                            <p className="text-lg text-text-muted-light dark:text-text-muted-dark">Hand-picked by our experts, these courses are shaping the future.</p>
                        </div>
                        <button onClick={onExploreCourses} className="flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors group text-lg animate-fade-in-up delay-100">
                            View All <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
                        </button>
                    </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {MOCK_COURSES.slice(0, 4).map((course, i) => (
                            <div key={course.id} className={`group relative flex flex-col rounded-3xl bg-card-light dark:bg-card-dark shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-3 overflow-hidden animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    <div 
                                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                                        style={{ backgroundImage: `url('${course.imageUrl}')`}}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                    
                                    {course.bestseller && (
                                        <span className="absolute top-4 left-4 bg-accent text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-lg">
                                            Bestseller
                                        </span>
                                    )}
                                    
                                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <button onClick={onSignUp} className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow-lg hover:bg-gray-50">View Course</button>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col justify-between gap-3 p-6 relative">
                                    <div className="absolute -top-6 right-6 bg-primary text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                                        {course.price > 0 ? `$${course.price}` : 'Free'}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-primary tracking-wide uppercase mb-1">{course.category}</p>
                                        <h3 className="font-bold text-lg text-text-light dark:text-text-dark group-hover:text-primary transition-colors line-clamp-2">{course.title}</h3>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-border-light dark:border-border-dark mt-2">
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-sm text-accent">{course.rating.toFixed(1)}</span>
                                            <StarRating rating={course.rating} className="!text-sm" />
                                        </div>
                                        <span className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">{course.level}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Immersive CTA Section */}
                <section className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-purple-900 px-6 py-24 text-center shadow-2xl sm:px-16 animate-fade-in-up">
                        {/* Animated Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float"></div>
                            <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                        </div>
                        
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-8 drop-shadow-lg">Ready to start your journey?</h2>
                            <p className="text-xl leading-8 text-blue-100 mb-12 max-w-2xl mx-auto">Join thousands of learners and unlock your potential with our expert-led courses. Access high-quality content and a supportive community.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <button onClick={onSignUp} className="w-full sm:w-auto rounded-xl bg-white px-10 py-5 text-xl font-bold text-primary shadow-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20">
                                    Join for Free
                                </button>
                                <button onClick={onExploreCourses} className="w-full sm:w-auto rounded-xl border-2 border-white/30 bg-white/5 backdrop-blur-sm px-10 py-5 text-xl font-bold text-white hover:bg-white/10 transition-all hover:-translate-y-1">
                                    Browse Catalog
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Testimonials */}
                <section className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 pb-20">
                    <h2 className="text-center text-3xl md:text-5xl font-black text-text-light dark:text-text-dark mb-16 animate-fade-in-up">
                        Trusted by <span className="text-primary">Students</span>
                    </h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {MOCK_TESTIMONIALS.map((testimonial, i) => (
                             <div key={testimonial.id} className={`relative flex flex-col justify-between rounded-2xl bg-card-light p-8 shadow-lg dark:bg-card-dark transition-all duration-300 hover:shadow-glow hover:-translate-y-2 animate-fade-in-up border border-border-light dark:border-border-dark`} style={{ animationDelay: `${i * 150}ms` }}>
                                <div className="absolute -top-4 -left-4 text-6xl text-primary/10 font-serif">"</div>
                                <div className="mb-6 relative z-10">
                                    <div className="flex gap-1 text-accent mb-4">
                                        {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined !text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                                    </div>
                                    <p className="text-lg italic text-text-light dark:text-text-dark font-medium leading-relaxed">"{testimonial.quote}"</p>
                                </div>
                                <div className="flex items-center gap-4 pt-6 border-t border-border-light dark:border-border-dark">
                                    <img className="h-14 w-14 rounded-full object-cover ring-4 ring-primary/10" src={testimonial.avatarUrl} alt={testimonial.studentName} />
                                    <div>
                                        <p className="font-bold text-text-light dark:text-text-dark text-lg">{testimonial.studentName}</p>
                                        <p className="text-sm font-semibold text-primary uppercase tracking-wide">{testimonial.courseTitle}</p>
                                    </div>
                                </div>
                            </div>
                         ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default HomePage;
