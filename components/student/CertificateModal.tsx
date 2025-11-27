
import React, { useEffect } from 'react';
import { Certificate } from '../../types';

interface CertificateModalProps {
    certificate: Certificate;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm" onClick={onClose}>
            <div className="max-w-4xl w-full animate-scale-up" onClick={e => e.stopPropagation()}>
                <div className="bg-white text-gray-900 p-3 rounded-lg shadow-2xl relative">
                    <button onClick={onClose} className="absolute -top-4 -right-4 w-10 h-10 bg-white text-gray-900 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20">
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    {/* Certificate Border */}
                    <div className="border-[12px] border-double border-[#C5A059] p-10 relative overflow-hidden bg-[#FDFAF5]">
                        {/* Corner Decorations */}
                        <div className="absolute top-0 left-0 w-32 h-32 border-t-[40px] border-l-[40px] border-[#C5A059]/20"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-[40px] border-r-[40px] border-[#C5A059]/20"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 border-t-[40px] border-r-[40px] border-[#C5A059]/20"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-[40px] border-l-[40px] border-[#C5A059]/20"></div>
                        
                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                            <span className="material-symbols-outlined text-[400px]">school</span>
                        </div>

                        <div className="text-center space-y-6 relative z-10">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-[#C5A059] rounded-full flex items-center justify-center text-white shadow-md">
                                     <span className="material-symbols-outlined text-5xl">verified</span>
                                </div>
                            </div>
                            <h1 className="text-6xl font-serif font-bold text-[#C5A059] uppercase tracking-[0.2em]">Certificate</h1>
                            <h2 className="text-2xl font-serif text-gray-600 uppercase tracking-[0.3em]">Of Completion</h2>
                            
                            <p className="text-lg text-gray-500 mt-10 font-medium italic">This certifies that</p>
                            
                            <div className="py-4">
                                <p className="text-5xl font-cursive text-gray-900 inline-block border-b-2 border-gray-300 min-w-[400px] pb-2 px-8">
                                    {certificate.studentName}
                                </p>
                            </div>
                            
                            <p className="text-lg text-gray-500 mt-4 font-medium italic">Has successfully completed the course</p>
                            
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">{certificate.courseName}</h3>
                            
                            <div className="grid grid-cols-2 gap-32 mt-20 pt-8 max-w-3xl mx-auto px-10">
                                <div className="text-center">
                                    <div className="border-t-2 border-gray-400 pt-2">
                                        <p className="text-xl font-bold text-gray-700">{certificate.issueDate}</p>
                                        <p className="text-xs text-[#C5A059] uppercase tracking-wider font-bold mt-1">Date Issued</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="border-t-2 border-gray-400 pt-2 relative">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Signature_sample.svg" alt="Signature" className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 opacity-80" />
                                        <p className="text-xl font-bold text-gray-700 mt-1">Eleanor Vance</p>
                                        <p className="text-xs text-[#C5A059] uppercase tracking-wider font-bold mt-1">CEO, LearnSpace</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8 gap-4">
                    <button onClick={() => window.print()} className="px-8 py-3 bg-[#C5A059] text-white rounded-lg hover:bg-[#b08d4d] flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-1 font-bold">
                        <span className="material-symbols-outlined">print</span> Print Certificate
                    </button>
                    <button className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-1 font-bold">
                        <span className="material-symbols-outlined">download</span> Download PDF
                    </button>
                    <button className="px-8 py-3 bg-[#0077b5] text-white rounded-lg hover:bg-[#006396] flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-1 font-bold">
                        <span className="material-symbols-outlined">share</span> Share on LinkedIn
                    </button>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-cursive { font-family: 'Great Vibes', cursive; }
                
                @keyframes scale-up {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-up {
                    animation: scale-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
            `}</style>
        </div>
    );
};

export default CertificateModal;
