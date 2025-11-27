
import React, { useEffect, useState } from 'react';
import { MOCK_TEAM_MEMBERS } from '../../data/mock';
import { LinkedinIcon, TwitterIcon } from '../icons';

interface AboutUsPageProps {
    onSignUp: () => void;
    onExploreCourses: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onSignUp, onExploreCourses }) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="flex-grow bg-background-light dark:bg-background-dark min-h-screen overflow-x-hidden">
            {/* Cinematic Hero Section */}
            <section className="relative h-[70vh] min-h-[600px] overflow-hidden flex items-center justify-center bg-gray-900">
                <video 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    poster="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                    style={{ 
                        transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.2}px)`, 
                        transition: 'transform 0.1s linear',
                        filter: 'brightness(0.6) contrast(1.1)'
                    }}
                >
                    {/* Video of team collaboration/innovation */}
                    <source src="https://videos.pexels.com/video-files/3196344/3196344-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-background-light dark:to-background-dark"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>

                <div className="relative z-10 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex flex-col gap-6 max-w-5xl mx-auto animate-fade-in-up">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase mb-2 backdrop-blur-md self-center">
                            Our Mission
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-white drop-shadow-2xl">
                            Democratizing <br/>
                            <span className="text-shimmer">Education.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-100 drop-shadow-md max-w-3xl mx-auto">
                            We believe knowledge should be boundless. LearnSpace is building a world where anyone, anywhere, has the power to transform their life through learning.
                        </p>
                    </div>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 text-white/50">
                    <span className="material-symbols-outlined text-4xl">keyboard_double_arrow_down</span>
                </div>
            </section>

            {/* Global Impact Stats */}
            <div className="relative z-20 -mt-20 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-200">
                    {[
                        { label: 'Learners Worldwide', value: '2M+', icon: 'public' },
                        { label: 'Countries Reached', value: '150+', icon: 'flag' },
                        { label: 'Expert Instructors', value: '500+', icon: 'school' }
                    ].map((stat, idx) => (
                        <div key={idx} className="glass-panel p-8 rounded-2xl shadow-xl flex items-center justify-between group hover:-translate-y-2 transition-transform duration-300">
                            <div>
                                <p className="text-4xl font-black text-text-light dark:text-white mb-1 group-hover:text-primary transition-colors">{stat.value}</p>
                                <p className="text-sm font-bold text-text-muted-light dark:text-gray-300 uppercase tracking-wide">{stat.label}</p>
                            </div>
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-24 md:py-32 bg-background-light dark:bg-background-dark overflow-hidden">
                <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 animate-fade-in-up delay-300">
                            <div className="flex flex-col gap-8">
                                <div>
                                    <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
                                        <span className="w-8 h-0.5 bg-primary"></span> Our Story
                                    </div>
                                    <h2 className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark sm:text-5xl">From a Simple Idea to a <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Global Movement.</span></h2>
                                </div>
                                <p className="text-lg font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                                    LearnSpace began in a small coffee shop with a simple question: <span className="italic text-text-light dark:text-text-dark">"Why is high-quality education so hard to access?"</span>
                                </p>
                                <p className="text-lg font-normal text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                                    Our founders, a group of passionate educators and tech innovators, saw a gap between traditional schooling and the skills needed for the modern world. They set out to build a platform that bridges that gap—making education accessible, affordable, and engaging for everyone.
                                </p>
                                <div className="pt-4">
                                    <button onClick={onExploreCourses} className="group flex items-center gap-2 text-lg font-bold text-primary hover:text-primary-hover transition-colors">
                                        Join Our Journey <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative group animate-fade-in-up">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-[2rem] transform rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500 blur-lg"></div>
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Team collaborating on a project" 
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-white/20">
                                    <p className="text-3xl font-black text-primary">2023</p>
                                    <p className="text-xs font-bold text-text-light dark:text-text-dark uppercase tracking-wider">Year Founded</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Our Values Section */}
            <section className="py-24 md:py-32 bg-card-light dark:bg-card-dark border-y border-border-light dark:border-border-dark relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-16 px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col gap-4 text-center animate-fade-in-up">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">What Drives Us</span>
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark sm:text-5xl">Our Core Values</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {[
                            { icon: 'accessibility_new', title: 'Accessibility', desc: 'Education is a right. We strive to remove barriers of cost, location, and background.', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
                            { icon: 'workspace_premium', title: 'Quality First', desc: 'We obsess over content quality, partnering only with the best experts in the field.', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
                            { icon: 'groups', title: 'Community', desc: 'Learning is social. We foster a supportive environment where everyone grows together.', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' }
                        ].map((val, idx) => (
                            <div 
                                key={idx} 
                                className="group flex flex-1 flex-col gap-6 rounded-3xl border border-border-light bg-background-light p-10 text-center transition-all duration-300 hover:shadow-glow hover:-translate-y-2 dark:border-border-dark dark:bg-background-dark animate-fade-in-up" 
                                style={{ animationDelay: `${idx * 150}ms` }}
                            >
                                <div className={`mx-auto p-6 ${val.bg} ${val.color} rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-inner`}>
                                    <span className="material-symbols-outlined text-5xl">{val.icon}</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-2xl font-bold leading-tight text-text-light dark:text-text-dark group-hover:text-primary transition-colors">{val.title}</h3>
                                    <p className="text-base font-medium leading-relaxed text-text-muted-light dark:text-text-muted-dark">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Meet the Team Section */}
            <section className="py-24 md:py-32 bg-background-light dark:bg-background-dark">
                <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark sm:text-5xl">Meet the Minds</h2>
                        <p className="mx-auto max-w-3xl text-xl text-text-muted-light dark:text-text-muted-dark">The passionate visionaries behind LearnSpace.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {MOCK_TEAM_MEMBERS.map((member, idx) => (
                            <div 
                                key={member.id} 
                                className="group relative text-center bg-card-light dark:bg-card-dark rounded-3xl p-8 shadow-soft hover:shadow-2xl transition-all duration-500 flex flex-col items-center animate-fade-in-up border border-border-light dark:border-border-dark overflow-hidden"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                
                                <div className="relative mb-6 w-40 h-40">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <img src={member.imageUrl} alt={member.name} className="w-full h-full rounded-full object-cover shadow-xl ring-4 ring-transparent group-hover:ring-primary/30 transition-all duration-500 transform group-hover:scale-105" />
                                </div>
                                
                                <div className="flex-grow w-full">
                                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                                    <p className="text-accent font-bold text-xs uppercase tracking-widest mb-4">{member.title}</p>
                                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">{member.bio}</p>
                                </div>
                                {member.socials && (
                                    <div className="mt-6 flex justify-center gap-4 pt-6 border-t border-border-light dark:border-border-dark w-full">
                                        {member.socials.linkedin && (
                                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary-light dark:bg-secondary-dark text-text-muted-light dark:text-text-muted-dark hover:bg-[#0077b5] hover:text-white transition-all transform hover:-translate-y-1">
                                                <LinkedinIcon className="w-5 h-5" />
                                            </a>
                                        )}
                                        {member.socials.twitter && (
                                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary-light dark:bg-secondary-dark text-text-muted-light dark:text-text-muted-dark hover:bg-[#1DA1F2] hover:text-white transition-all transform hover:-translate-y-1">
                                                <TwitterIcon className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Final CTA - "Join the Movement" */}
            <section className="py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary transform skew-y-2 origin-bottom-left scale-110"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                
                <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-8 drop-shadow-xl animate-fade-in-up">
                            Ready to Join Our Community?
                        </h2>
                        <p className="text-xl leading-8 text-blue-50 mb-12 font-medium animate-fade-in-up delay-100">
                            Whether you're here to learn a new skill or share your expertise, there's a place for you at LearnSpace.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-200">
                            <button onClick={onExploreCourses} className="w-full sm:w-auto rounded-xl bg-white px-10 py-5 text-xl font-bold text-primary shadow-2xl hover:bg-gray-50 hover:scale-105 transition-all hover:shadow-white/20">
                                Explore Courses
                            </button>
                             <button onClick={onSignUp} className="w-full sm:w-auto rounded-xl px-10 py-5 text-xl font-bold text-white shadow-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all">
                                Become an Instructor
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUsPage;
