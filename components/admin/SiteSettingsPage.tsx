import React, { useState } from 'react';
import { MOCK_TEAM_MEMBERS, MOCK_TESTIMONIALS, MOCK_CAROUSEL_SLIDES } from '../../data/mock';
import { TeamMember, Testimonial } from '../../types';

type CarouselSlide = {
    imageUrl: string;
    quote: string;
    studentName: string;
}

const SiteSettingsPage: React.FC = () => {
    const [team, setTeam] = useState<TeamMember[]>(JSON.parse(JSON.stringify(MOCK_TEAM_MEMBERS)));
    const [testimonials, setTestimonials] = useState<Testimonial[]>(JSON.parse(JSON.stringify(MOCK_TESTIMONIALS)));
    const [carousel, setCarousel] = useState<CarouselSlide[]>(JSON.parse(JSON.stringify(MOCK_CAROUSEL_SLIDES)));
    const [activeTab, setActiveTab] = useState('team');

    const handleTeamChange = (index: number, field: keyof TeamMember, value: string) => {
        const newTeam = [...team];
        (newTeam[index] as any)[field] = value;
        setTeam(newTeam);
    };

    const handleSocialChange = (index: number, social: 'linkedin' | 'twitter', value: string) => {
        const newTeam = [...team];
        if (!newTeam[index].socials) {
            newTeam[index].socials = {};
        }
        (newTeam[index].socials as any)[social] = value;
        setTeam(newTeam);
    };

    const handleTestimonialChange = (index: number, field: keyof Testimonial, value: string) => {
        const newTestimonials = [...testimonials];
        (newTestimonials[index] as any)[field] = value;
        setTestimonials(newTestimonials);
    };

    const handleCarouselChange = (index: number, field: keyof CarouselSlide, value: string) => {
        const newCarousel = [...carousel];
        (newCarousel[index] as any)[field] = value;
        setCarousel(newCarousel);
    };
    
    const handleSaveChanges = () => {
        // In a real app, this would be an API call. Here, we mutate the mock data.
        MOCK_TEAM_MEMBERS.length = 0;
        Array.prototype.push.apply(MOCK_TEAM_MEMBERS, JSON.parse(JSON.stringify(team)));

        MOCK_TESTIMONIALS.length = 0;
        Array.prototype.push.apply(MOCK_TESTIMONIALS, JSON.parse(JSON.stringify(testimonials)));

        MOCK_CAROUSEL_SLIDES.length = 0;
        Array.prototype.push.apply(MOCK_CAROUSEL_SLIDES, JSON.parse(JSON.stringify(carousel)));
        
        alert('Site settings have been updated!');
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Site Settings</h1>
                <p className="mt-2 text-base text-text-muted-light dark:text-text-muted-dark">
                    Manage content that appears on your public-facing website.
                </p>
            </div>

            <div className="border-b border-border-light dark:border-border-dark">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('team')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'team' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light hover:text-text-light'}`}>
                        Meet the Team
                    </button>
                    <button onClick={() => setActiveTab('testimonials')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'testimonials' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light hover:text-text-light'}`}>
                        Testimonials
                    </button>
                    <button onClick={() => setActiveTab('carousel')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'carousel' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light hover:text-text-light'}`}>
                        Homepage Carousel
                    </button>
                </nav>
            </div>
            
            <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                <div className="p-4 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
                        {activeTab === 'team' && 'Manage Team Members'}
                        {activeTab === 'testimonials' && 'Manage Testimonials'}
                        {activeTab === 'carousel' && 'Manage Homepage Carousel'}
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    {activeTab === 'team' && team.map((member, index) => (
                        <div key={member.id} className="p-4 border border-border-light dark:border-border-dark rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                     <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Photo URL</label>
                                     <input value={member.imageUrl} onChange={(e) => handleTeamChange(index, 'imageUrl', e.target.value)} className="form-input w-full rounded-lg" />
                                </div>
                                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Name</label>
                                        <input value={member.name} onChange={(e) => handleTeamChange(index, 'name', e.target.value)} className="form-input w-full rounded-lg" />
                                    </div>
                                     <div>
                                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Title</label>
                                        <input value={member.title} onChange={(e) => handleTeamChange(index, 'title', e.target.value)} className="form-input w-full rounded-lg" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Bio</label>
                                <textarea value={member.bio} onChange={(e) => handleTeamChange(index, 'bio', e.target.value)} className="form-textarea w-full rounded-lg" rows={3}></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">LinkedIn URL</label>
                                    <input value={member.socials?.linkedin || ''} onChange={(e) => handleSocialChange(index, 'linkedin', e.target.value)} className="form-input w-full rounded-lg" />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Twitter URL</label>
                                    <input value={member.socials?.twitter || ''} onChange={(e) => handleSocialChange(index, 'twitter', e.target.value)} className="form-input w-full rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))}
                    {activeTab === 'testimonials' && testimonials.map((item, index) => (
                        <div key={item.id} className="p-4 border border-border-light dark:border-border-dark rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Avatar URL</label>
                                    <input value={item.avatarUrl} onChange={(e) => handleTestimonialChange(index, 'avatarUrl', e.target.value)} className="form-input w-full rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Student Name</label>
                                    <input value={item.studentName} onChange={(e) => handleTestimonialChange(index, 'studentName', e.target.value)} className="form-input w-full rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Course Title</label>
                                    <input value={item.courseTitle} onChange={(e) => handleTestimonialChange(index, 'courseTitle', e.target.value)} className="form-input w-full rounded-lg" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Quote</label>
                                <textarea value={item.quote} onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)} className="form-textarea w-full rounded-lg" rows={3}></textarea>
                            </div>
                        </div>
                    ))}
                    {activeTab === 'carousel' && carousel.map((item, index) => (
                        <div key={index} className="p-4 border border-border-light dark:border-border-dark rounded-lg space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Image URL</label>
                                <input value={item.imageUrl} onChange={(e) => handleCarouselChange(index, 'imageUrl', e.target.value)} className="form-input w-full rounded-lg" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Student Name &amp; Class</label>
                                <input value={item.studentName} onChange={(e) => handleCarouselChange(index, 'studentName', e.target.value)} className="form-input w-full rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Quote</label>
                                <textarea value={item.quote} onChange={(e) => handleCarouselChange(index, 'quote', e.target.value)} className="form-textarea w-full rounded-lg" rows={3}></textarea>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="px-6 py-4 bg-background-light dark:bg-background-dark/50 border-t border-border-light dark:border-border-dark flex justify-end">
                    <button onClick={handleSaveChanges} className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">Save All Changes</button>
                </div>
            </div>
        </div>
    );
};

export default SiteSettingsPage;