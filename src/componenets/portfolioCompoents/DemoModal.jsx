// components/DemoModal.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import image1 from '../../assets/images/profilepic.png';

const DemoModal = ({ isModalOpen, selectedDemo, closeModal }) => {
    
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        // Cleanup function
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    // Add escape key listener
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            return () => {
                document.removeEventListener('keydown', handleEscapeKey);
            };
        }
    }, [isModalOpen, closeModal]);

    if (!isModalOpen || !selectedDemo) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            {/* Transparent blur backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />

            {/* Modal Content */}
            <div className="relative w-[500px] h-[500px] rounded-3xl shadow-2xl overflow-hidden">
                {/* Glass effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-xl" />
                
                {/* Close button */}
                <button
                    onClick={closeModal}
                    className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-red-500/90 flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 shadow-lg hover:scale-110 backdrop-blur-sm"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>
                
                {/* Modal content */}
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                    {/* Title */}
                    <div className="absolute top-8 left-0 right-0 text-center">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                            {selectedDemo.title}
                        </h2>
                        <p className="text-gray-300 text-sm mt-2">
                            {selectedDemo.category} Preview
                        </p>
                    </div>

                    {/* Image container */}
                    <div className="flex items-center justify-center mt-8">
                        <div className="relative">
                            {/* Image with rounded corners and shadow */}
                            <img
                                src={image1}
                                alt={`${selectedDemo.title} preview`}
                                className="w-[350px] h-[350px] object-cover rounded-2xl shadow-2xl border-2 border-white/30"
                            />
                            
                            {/* Overlay gradient effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Demo link */}
                    <div className="absolute bottom-8 left-0 right-0 text-center px-8">
                        <a
                            href={selectedDemo.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                        >
                            View Live Demo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoModal;