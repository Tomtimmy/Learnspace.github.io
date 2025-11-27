
import React, { useState } from 'react';

interface OnboardingTourProps {
  onClose: () => void;
}

const TOUR_STEPS = [
    { 
        title: 'Welcome to LearnSpace!', 
        content: "Let's take a quick tour of your new student dashboard to help you get started on your learning journey.",
        icon: 'waving_hand'
    },
    { 
        title: 'Your Dashboard', 
        content: 'This is your main hub. Here you can quickly pick up where you left off, see your active courses, and get important notifications.',
        icon: 'dashboard'
    },
    { 
        title: 'My Courses', 
        content: 'Click on "Courses" in the sidebar to view all your enrolled courses, check your progress, and access course materials.',
        icon: 'school'
    },
    { 
        title: 'Schedule & Certificates', 
        content: 'Use the "Schedule" to keep track of deadlines and lectures. After completing a course, find your official certificates under "Certificates".',
        icon: 'calendar_month'
    },
    {
        title: "You're All Set!",
        content: "That's a quick overview of the basics. We're excited to have you here. Happy learning!",
        icon: 'rocket_launch'
    }
];

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const currentStep = TOUR_STEPS[step];
    const isLastStep = step === TOUR_STEPS.length - 1;

    const handleNext = () => {
        if (!isLastStep) {
            setStep(step + 1);
        } else {
            onClose();
        }
    };
    
    const handlePrev = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    }

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl max-w-md w-full"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-8 text-center">
                    <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mx-auto">
                        <span className="material-symbols-outlined !text-5xl">{currentStep.icon}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mt-6">{currentStep.title}</h2>
                    <p className="text-text-muted-light dark:text-text-muted-dark mt-2 min-h-[72px]">{currentStep.content}</p>
                </div>

                <div className="flex justify-center items-center gap-3 mb-6">
                    {TOUR_STEPS.map((_, index) => (
                        <div key={index} className={`h-2 rounded-full transition-all ${index === step ? 'w-6 bg-primary' : 'w-2 bg-secondary-light dark:bg-secondary-dark'}`}></div>
                    ))}
                </div>
                
                <footer className="px-6 py-4 bg-background-light dark:bg-background-dark/50 border-t border-border-light dark:border-border-dark flex justify-between items-center">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark">Skip Tour</button>
                    <div className="flex gap-3">
                         {step > 0 && <button onClick={handlePrev} className="px-4 py-2 text-sm font-medium text-text-light dark:text-text-dark bg-secondary-light dark:bg-secondary-dark rounded-lg hover:bg-border-light dark:hover:bg-border-dark">Previous</button>}
                        <button onClick={handleNext} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover">
                            {isLastStep ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </footer>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default OnboardingTour;
