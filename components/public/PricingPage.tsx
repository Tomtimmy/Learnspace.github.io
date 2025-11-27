
import React, { useState, useContext, useEffect } from 'react';
import { MOCK_PRICING_PLANS, MOCK_FEATURE_COMPARISON, MOCK_FAQS } from '../../data/mock';
import { AuthContext } from '../../context/AuthContext';
import LoginPage from './LoginPage';

const FAQAccordionItem: React.FC<{
    faq: { id: string; question: string; answer: string; };
    isOpen: boolean;
    onClick: () => void;
}> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-border-light dark:border-border-dark last:border-0">
            <button
                onClick={onClick}
                className="flex w-full items-center justify-between py-6 text-left text-lg font-bold text-text-light dark:text-text-dark hover:text-primary transition-colors group"
                aria-expanded={isOpen}
            >
                <span className="group-hover:translate-x-2 transition-transform duration-300">{faq.question}</span>
                <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-text-muted-light group-hover:text-primary'}`}>
                    expand_more
                </span>
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <p className="text-base text-text-muted-light dark:text-text-muted-dark leading-relaxed pl-4 border-l-2 border-primary/30">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};


const PricingPage: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');
    const [openFaqId, setOpenFaqId] = useState<string | null>(MOCK_FAQS[0]?.id ?? null);
    const [showSignUp, setShowSignUp] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const { addToast } = useContext(AuthContext);

    const featureCategories = [...new Set(MOCK_FEATURE_COMPARISON.map(f => f.category))];

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlePlanSelect = (planName: string) => {
        setShowSignUp(true);
        addToast('info', `Great choice! Create an account to start your ${planName} plan.`);
    };

    return (
        <main className="flex-grow bg-background-light dark:bg-background-dark min-h-screen">
             {showSignUp && <LoginPage onBack={() => setShowSignUp(false)} onShowForgotPassword={() => {}} defaultToSignUp={true} />}
            
            {/* Hero Section with Video */}
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
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
                        filter: 'brightness(0.5)'
                    }}
                >
                    {/* Video showing growth/business/success vibe */}
                    <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background-light dark:to-background-dark"></div>

                <div className="relative z-10 w-full max-w-screen-xl px-4 text-center">
                    <div className="animate-fade-in-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                            Flexible Plans
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 drop-shadow-2xl">
                            Invest in Your <br/><span className="text-shimmer">Future Success.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
                            Choose the plan that fits your learning journey. Unlock unlimited access to world-class education.
                        </p>
                    </div>

                    {/* Toggle Switch */}
                    <div className="mt-8 flex justify-center items-center gap-6 animate-fade-in-up delay-200 bg-white/10 backdrop-blur-md p-2 rounded-2xl w-fit mx-auto border border-white/10">
                        <span 
                            className={`text-lg font-bold cursor-pointer transition-colors px-4 py-2 rounded-xl ${billingCycle === 'monthly' ? 'text-white bg-white/20' : 'text-gray-300 hover:text-white'}`}
                            onClick={() => setBillingCycle('monthly')}
                        >
                            Monthly
                        </span>
                        <label className="flex items-center cursor-pointer relative">
                            <input type="checkbox" className="sr-only" checked={billingCycle === 'annually'} onChange={() => setBillingCycle(prev => prev === 'monthly' ? 'annually' : 'monthly')} />
                            <div className="w-16 h-8 bg-black/40 rounded-full shadow-inner border border-white/20"></div>
                            <div className={`absolute left-1 top-1 w-6 h-6 bg-accent rounded-full shadow-md transition-transform duration-300 ${billingCycle === 'annually' ? 'translate-x-8' : ''}`}></div>
                        </label>
                        <div className="relative">
                             <span 
                                className={`text-lg font-bold cursor-pointer transition-colors px-4 py-2 rounded-xl ${billingCycle === 'annually' ? 'text-white bg-white/20' : 'text-gray-300 hover:text-white'}`}
                                onClick={() => setBillingCycle('annually')}
                             >
                                 Annually
                             </span>
                             <span className="absolute -top-6 -right-10 rotate-12 text-xs font-black bg-accent text-white px-2 py-1 rounded-md shadow-lg animate-bounce">
                                 SAVE 20%
                             </span>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Pricing Cards */}
            <section className="relative z-20 px-4 sm:px-6 lg:px-8 -mt-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {MOCK_PRICING_PLANS.map((plan, idx) => (
                            <div 
                                key={plan.id} 
                                className={`relative flex flex-col rounded-3xl bg-card-light dark:bg-card-dark transition-all duration-500 animate-fade-in-up group ${
                                    plan.isPopular 
                                    ? 'border-2 border-accent shadow-glow-accent scale-105 z-10' 
                                    : 'border border-border-light dark:border-border-dark shadow-xl hover:shadow-2xl hover:-translate-y-2'
                                }`}
                                style={{ animationDelay: `${idx * 150 + 300}ms` }}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-6 py-1.5 rounded-full text-sm font-black uppercase tracking-wider shadow-lg flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">local_fire_department</span> Most Popular
                                    </div>
                                )}
                                <div className="p-8 pt-10 text-center border-b border-border-light dark:border-border-dark">
                                    <h3 className="text-2xl font-black text-text-light dark:text-text-dark">{plan.name}</h3>
                                    <p className="mt-2 text-text-muted-light dark:text-text-muted-dark text-sm h-10">{plan.description}</p>
                                    <div className="mt-6 flex items-baseline justify-center gap-1 text-primary">
                                        <span className="text-5xl font-black tracking-tight">
                                            ${billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnually}
                                        </span>
                                        <span className="text-lg font-bold text-text-muted-light dark:text-text-muted-dark">
                                            {plan.priceMonthly > 0 ? (billingCycle === 'monthly' ? '/mo' : '/yr') : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {plan.keyFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className={`p-1 rounded-full ${plan.isPopular ? 'bg-accent/10 text-accent' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'} mt-0.5`}>
                                                    <span className="material-symbols-outlined text-base font-bold">check</span>
                                                </div>
                                                <span className="text-text-light dark:text-text-dark font-medium">{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button 
                                        onClick={() => handlePlanSelect(plan.name)} 
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                                            plan.isPopular 
                                            ? 'bg-gradient-to-r from-accent to-orange-500 text-white shadow-lg hover:shadow-accent/40' 
                                            : 'bg-secondary-light text-text-light dark:bg-secondary-dark dark:text-text-dark hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white'
                                        }`}
                                    >
                                        {plan.priceMonthly === 0 ? 'Get Started Free' : `Select ${plan.name}`} <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Feature Comparison */}
            <section className="py-24 bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Detailed Breakdown</span>
                        <h2 className="text-3xl md:text-4xl font-black text-text-light dark:text-text-dark">Compare All Features</h2>
                    </div>
                    
                    <div className="overflow-hidden rounded-2xl border border-border-light dark:border-border-dark shadow-xl animate-fade-in-up delay-100">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] border-collapse bg-background-light dark:bg-background-dark">
                                <thead>
                                    <tr className="bg-secondary-light dark:bg-secondary-dark">
                                        <th className="w-1/3 text-left p-6 font-bold text-lg text-text-light dark:text-text-dark">Feature</th>
                                        {MOCK_PRICING_PLANS.map(plan => (
                                            <th key={plan.id} className="w-1/5 text-center p-6 font-bold text-lg text-text-light dark:text-text-dark">
                                                <span className={`${plan.isPopular ? 'text-accent' : ''}`}>{plan.name}</span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {featureCategories.map(category => (
                                        <React.Fragment key={category}>
                                            <tr><td colSpan={4} className="p-4 px-6 text-xs font-black uppercase tracking-widest text-text-muted-light dark:text-text-muted-dark bg-card-light dark:bg-card-dark/50 border-y border-border-light dark:border-border-dark">{category}</td></tr>
                                            {MOCK_FEATURE_COMPARISON.filter(f => f.category === category).map((feature, idx) => (
                                                <tr key={feature.feature} className={`group hover:bg-white dark:hover:bg-white/5 transition-colors ${idx !== MOCK_FEATURE_COMPARISON.filter(f => f.category === category).length - 1 ? 'border-b border-border-light dark:border-border-dark' : ''}`}>
                                                    <td className="p-4 px-6 text-text-light dark:text-text-dark font-medium">{feature.feature}</td>
                                                    {MOCK_PRICING_PLANS.map(plan => (
                                                        <td key={plan.id} className="p-4 px-6 text-center">
                                                            {typeof feature.tiers[plan.id] === 'boolean' ? (
                                                                feature.tiers[plan.id] ? 
                                                                <span className="material-symbols-outlined text-green-500 font-bold scale-110">check_circle</span> : 
                                                                <span className="material-symbols-outlined text-gray-300 dark:text-gray-700 scale-90">remove</span>
                                                            ) : (
                                                                <span className="text-sm font-bold text-text-light dark:text-text-dark">{feature.tiers[plan.id]}</span>
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 md:py-32 bg-background-light dark:bg-background-dark">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-black text-text-light dark:text-text-dark mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-text-muted-light dark:text-text-muted-dark">Everything you need to know about our pricing and plans.</p>
                     </div>
                     <div className="bg-card-light dark:bg-card-dark rounded-3xl p-8 md:p-10 shadow-soft border border-border-light dark:border-border-dark animate-fade-in-up delay-200">
                        {MOCK_FAQS.map(faq => (
                            <FAQAccordionItem 
                                key={faq.id}
                                faq={faq}
                                isOpen={openFaqId === faq.id}
                                onClick={() => setOpenFaqId(prevId => prevId === faq.id ? null : faq.id)}
                            />
                        ))}
                     </div>
                </div>
            </section>
        </main>
    );
};

export default PricingPage;
