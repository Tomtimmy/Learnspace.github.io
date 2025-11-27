
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_INSTRUCTOR_TESTIMONIALS } from '../../data/mock';
import { InstructorTestimonial } from '../../types';

interface ForInstructorsPageProps {
    onBecomeInstructor: () => void;
}

const TestimonialModal: React.FC<{ testimonial: InstructorTestimonial, onClose: () => void }> = ({ testimonial, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl max-w-2xl w-full animate-scale-up border border-border-light dark:border-border-dark"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-10 text-center">
                    <img className="h-28 w-28 rounded-full object-cover mx-auto shadow-xl ring-4 ring-primary/20" src={testimonial.avatarUrl} alt={testimonial.name} />
                    <div className="mt-8">
                        <span className="material-symbols-outlined text-4xl text-primary opacity-50 mb-4">format_quote</span>
                        <p className="text-xl md:text-2xl font-medium italic text-text-light dark:text-text-dark leading-relaxed">"{testimonial.fullQuote || testimonial.quote}"</p>
                        <div className="mt-8">
                            <p className="font-bold text-xl text-text-light dark:text-text-dark">{testimonial.name}</p>
                            <p className="text-primary font-semibold">Instructor, {testimonial.course}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="mt-8 px-8 py-3 bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark rounded-lg font-bold hover:bg-border-light dark:hover:bg-border-dark transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

const ForInstructorsPage: React.FC<ForInstructorsPageProps> = ({ onBecomeInstructor }) => {
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [modalTestimonial, setModalTestimonial] = useState<InstructorTestimonial | null>(null);
    const [scrollY, setScrollY] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTestimonialIndex(prevIndex => (prevIndex + 1) % MOCK_INSTRUCTOR_TESTIMONIALS.length);
        }, 7000); 
        
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        // Force play video on mount
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const currentTestimonial = MOCK_INSTRUCTOR_TESTIMONIALS[testimonialIndex];

    return (
        <main className="flex-grow bg-background-light dark:bg-background-dark min-h-screen overflow-x-hidden">
            {modalTestimonial && <TestimonialModal testimonial={modalTestimonial} onClose={() => setModalTestimonial(null)} />}
            <style>{`
                @keyframes fade-in-slide {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-slide {
                    animation: fade-in-slide 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                @keyframes scale-up {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-scale-up {
                    animation: scale-up 0.3s ease-out forwards;
                }
            `}</style>
            
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                {/* Background Video - HD Instructor Teaching */}
                <video 
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    preload="auto"
                    src="https://videos.pexels.com/video-files/3252011/3252011-hd_1920_1080_25fps.mp4"
                    poster="https://images.pexels.com/photos/7092340/pexels-photo-7092340.jpeg"
                    style={{ 
                        transform: `scale(${1 + scrollY * 0.0005})`, 
                        filter: 'brightness(0.6) contrast(1.1)'
                    }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent z-0"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse z-0"></div>

                <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 text-center z-10">
                    <div className="flex flex-col gap-6 max-w-5xl mx-auto animate-fade-in-up">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase mb-2 backdrop-blur-md self-center">
                            Join the Faculty
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight drop-shadow-2xl">
                            Share Your Passion. <br/>
                            <span className="text-shimmer">Shape the Future.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-100 drop-shadow-md max-w-3xl mx-auto">
                            Join our community of expert instructors and empower learners worldwide. Turn your knowledge into opportunity.
                        </p>
                        <div className="mt-10 flex justify-center">
                             <button onClick={onBecomeInstructor} className="group relative flex h-16 items-center justify-center rounded-xl bg-primary px-12 text-xl font-bold text-white transition-all hover:scale-105 shadow-glow hover:shadow-primary/50 hover:-translate-y-1 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer"></div>
                                <span className="relative flex items-center gap-2">Become an Instructor <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 text-white/50">
                    <span className="material-symbols-outlined text-4xl">keyboard_double_arrow_down</span>
                </div>
            </section>
            
            {/* Why Teach Section */}
            <section className="py-24 md:py-32 bg-background-light dark:bg-background-dark relative z-10">
                <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 text-center animate-fade-in-up">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Empower Yourself</span>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark">Why Teach on LearnSpace?</h2>
                        <p className="mx-auto max-w-3xl text-xl text-text-muted-light dark:text-text-muted-dark">We give you the tools and support you need to create amazing learning experiences.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: 'public', title: 'Global Audience', desc: 'Connect with millions of learners from around the world.', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/20' },
                            { icon: 'construction', title: 'Powerful Tools', desc: 'From an AI course creator to analytics, we\'ve got you covered.', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/20' },
                            { icon: 'schedule', title: 'Flexible Schedule', desc: 'Teach on your own terms. Create and update your course anytime.', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/20' },
                            { icon: 'paid', title: 'Competitive Pay', desc: 'Earn money with our attractive revenue share model.', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' }
                        ].map((item, idx) => (
                            <div 
                                key={idx} 
                                className="group flex flex-1 flex-col gap-6 rounded-3xl bg-card-light p-10 text-center transition-all duration-300 shadow-soft hover:shadow-2xl hover:-translate-y-2 dark:bg-card-dark border border-border-light dark:border-border-dark animate-fade-in-up" 
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className={`mx-auto p-5 rounded-full ${item.bg} ${item.color} transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-inner`}>
                                    <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-xl font-bold leading-tight text-text-light dark:text-text-dark group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-base font-medium leading-relaxed text-text-muted-light dark:text-text-muted-dark">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 md:py-32 overflow-hidden bg-card-light dark:bg-card-dark border-y border-border-light dark:border-border-dark relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"></div>

                <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 animate-fade-in-up">
                            <div className="flex flex-col gap-6 mb-12">
                                <h2 className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark sm:text-5xl">Start Teaching in <br/>4 Easy Steps</h2>
                                <p className="text-xl font-medium leading-relaxed text-text-muted-light dark:text-text-muted-dark">Our intuitive platform makes it easy to create, manage, and scale your online teaching business. No technical skills required.</p>
                            </div>
                            <div className="space-y-10">
                                {[
                                    { title: 'Plan Your Course', desc: 'Use our AI-powered tools and resources to structure your curriculum.', num: '1' },
                                    { title: 'Record & Upload', desc: 'Produce high-quality video lessons. Our platform makes uploading simple.', num: '2' },
                                    { title: 'Engage Students', desc: 'Interact with learners through Q&A sessions and assignments.', num: '3' },
                                    { title: 'Earn Revenue', desc: 'Get rewarded for sharing your expertise with our revenue model.', num: '4' }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-6 group animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-background-dark border border-border-light dark:border-border-dark text-primary font-black text-2xl flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            {step.num}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors">{step.title}</h3>
                                            <p className="mt-2 text-base text-text-muted-light dark:text-text-muted-dark font-medium leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 h-[500px] lg:h-[700px] relative animate-fade-in-up delay-200">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-3xl opacity-20 blur-2xl animate-pulse"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                                alt="Instructor planning a course" 
                                className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 transform transition-transform duration-700 hover:scale-[1.02]" 
                            />
                            {/* Floating Badge */}
                            <div className="absolute bottom-10 -left-10 bg-white dark:bg-card-dark p-6 rounded-2xl shadow-xl border border-border-light dark:border-border-dark max-w-xs hidden md:block animate-float z-20">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-text-light dark:text-text-dark">$5,000+</p>
                                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase font-bold">Avg. Monthly Earnings</p>
                                    </div>
                                </div>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Top instructors earn significantly more sharing their knowledge.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Testimonial Section */}
            <section className="bg-background-light dark:bg-background-dark py-24 md:py-32">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center min-h-[400px]">
                    <div key={currentTestimonial.id} className="animate-fade-in-slide">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-30"></div>
                            <img className="relative h-32 w-32 rounded-full object-cover mx-auto shadow-2xl ring-4 ring-background-light dark:ring-background-dark mb-10" src={currentTestimonial.avatarUrl} alt={currentTestimonial.name} />
                        </div>
                        <div>
                            <span className="material-symbols-outlined text-6xl text-primary opacity-20 mb-6">format_quote</span>
                            <p className="text-3xl md:text-4xl font-black italic text-text-light dark:text-text-dark leading-tight mb-10 tracking-tight">"{currentTestimonial.quote}"</p>
                            {currentTestimonial.fullQuote && (
                                <button onClick={() => setModalTestimonial(currentTestimonial)} className="mb-8 text-primary font-bold uppercase tracking-wider hover:underline flex items-center justify-center gap-2 mx-auto">
                                    Read Full Story <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
                            )}
                            <div>
                                <p className="font-black text-xl text-text-light dark:text-text-dark">{currentTestimonial.name}</p>
                                <p className="text-text-muted-light dark:text-text-muted-dark font-medium mt-1">Instructor, <span className="text-primary">{currentTestimonial.course}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Final CTA */}
            <section className="py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary transform -skew-y-2 origin-top-left scale-110"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                
                <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-8 drop-shadow-xl animate-fade-in-up">
                            Ready to Make Your Mark?
                        </h2>
                        <p className="text-xl leading-8 text-blue-50 mb-12 font-medium animate-fade-in-up delay-100 max-w-2xl mx-auto">
                            Join our community of instructors and start sharing your knowledge with the world today. Your classroom is waiting.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-200">
                            <button onClick={onBecomeInstructor} className="w-full sm:w-auto rounded-xl bg-white px-10 py-5 text-xl font-bold text-primary shadow-2xl hover:bg-gray-50 hover:scale-105 transition-all hover:shadow-white/20">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default ForInstructorsPage;
