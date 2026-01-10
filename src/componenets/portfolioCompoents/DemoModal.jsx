// components/DemoModal.jsx
import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// NMA Images
import nma1 from '../../assets/images/nma1.jpg';
import nma2 from '../../assets/images/nma2.jpg';
import nma3 from '../../assets/images/nma3.jpg';
import nma4 from '../../assets/images/nma4.jpg';
import nma5 from '../../assets/images/nma5.jpg';
import nma6 from '../../assets/images/nma6.jpg';
import nma7 from '../../assets/images/nma7.jpg';
import nma8 from '../../assets/images/nma8.jpg';
import nma9 from '../../assets/images/nma9.jpg';
import nma10 from '../../assets/images/nma10.jpg';
import nma12 from '../../assets/images/nma12.jpg';
import nma13 from '../../assets/images/nma13.jpg';
import nma14 from '../../assets/images/nma14.jpg';
import nma15 from '../../assets/images/nma15.jpg';
import nma16 from '../../assets/images/nma16.jpg';
import nma17 from '../../assets/images/nma17.jpg';

// TopTen Bazar Images
import toptenbazar1 from '../../assets/images/toptenapp/tt1.jpg';
import toptenbazar2 from '../../assets/images/toptenapp/tt2.jpg';
import toptenbazar3 from '../../assets/images/toptenapp/tt3.jpg';
import toptenbazar4 from '../../assets/images/toptenapp/tt4.jpg';
import toptenbazar5 from '../../assets/images/toptenapp/tt5.jpg';
import toptenbazar6 from '../../assets/images/toptenapp/tt6.jpg';
import toptenbazar7 from '../../assets/images/toptenapp/tt7.jpg';
import toptenbazar8 from '../../assets/images/toptenapp/tt8.jpg';
import toptenbazar9 from '../../assets/images/toptenapp/tt9.jpg';
import toptenbazar10 from '../../assets/images/toptenapp/tt10.jpg';
import toptenbazar11 from '../../assets/images/toptenapp/tt11.jpg';
import toptenbazar12 from '../../assets/images/toptenapp/tt12.jpg';
import toptenbazar13 from '../../assets/images/toptenapp/tt13.jpg';
import toptenbazar14 from '../../assets/images/toptenapp/tt14.jpg';
import toptenbazar15 from '../../assets/images/toptenapp/tt15.jpg';
import toptenbazar16 from '../../assets/images/toptenapp/tt16.jpg';
import toptenbazar17 from '../../assets/images/toptenapp/tt17.jpg';
import toptenbazar18 from '../../assets/images/toptenapp/tt18.jpg';

// Learnlyst Images
import learnlystimag1 from '../../assets/images/Learnlyst/le1.jpg';
import learnlystimag2 from '../../assets/images/Learnlyst/le2.jpg';
import learnlystimag3 from '../../assets/images/Learnlyst/le3.jpg';
import learnlystimag4 from '../../assets/images/Learnlyst/le4.jpg';
import learnlystimag5 from '../../assets/images/Learnlyst/le5.jpg';
import learnlystimag6 from '../../assets/images/Learnlyst/le6.jpg';
import learnlystimag7 from '../../assets/images/Learnlyst/le7.jpg';
import learnlystimag8 from '../../assets/images/Learnlyst/le8.jpg';
import learnlystimag9 from '../../assets/images/Learnlyst/le9.jpg';
import learnlystimag10 from '../../assets/images/Learnlyst/le10.jpg';
import learnlystimag11 from '../../assets/images/Learnlyst/le11.jpg';
import learnlystimag12 from '../../assets/images/Learnlyst/le12.jpg';
import learnlystimag13 from '../../assets/images/Learnlyst/le13.jpg';
import learnlystimag14 from '../../assets/images/Learnlyst/le14.jpg';
import learnlystimag15 from '../../assets/images/Learnlyst/le15.jpg';
import learnlystimag16 from '../../assets/images/Learnlyst/le16.jpg';
import learnlystimag17 from '../../assets/images/Learnlyst/le17.jpg';
import learnlystimag18 from '../../assets/images/Learnlyst/le18.jpg';
import learnlystimag19 from '../../assets/images/Learnlyst/le19.jpg';
import learnlystimag20 from '../../assets/images/Learnlyst/le20.jpg';
import learnlystimag21 from '../../assets/images/Learnlyst/le21.jpg';

import todo from '../../assets/images/todo.png'


// Define image sets for different demos
const imageSets = {
    'notary': [
        nma1, nma2, nma3, nma4, nma5, nma6, nma7, nma8, nma9,
        nma10, nma12, nma13, nma14, nma15, nma16, nma17
    ],
    'grocery': [
        toptenbazar1, toptenbazar2, toptenbazar3, toptenbazar4, toptenbazar5,
        toptenbazar6, toptenbazar7, toptenbazar8, toptenbazar9, toptenbazar10,
        toptenbazar11, toptenbazar12, toptenbazar13, toptenbazar14, toptenbazar15,
        toptenbazar16, toptenbazar17, toptenbazar18
    ],
    'learnlyst': [
        learnlystimag1, learnlystimag2, learnlystimag3, learnlystimag4, learnlystimag5,
        learnlystimag6, learnlystimag7, learnlystimag8, learnlystimag9, learnlystimag10,
        learnlystimag11, learnlystimag12, learnlystimag13, learnlystimag14, learnlystimag15,
        learnlystimag16, learnlystimag17, learnlystimag18, learnlystimag19, learnlystimag20,
        learnlystimag21,
    ],
    'todo':[
        todo
    ]
};

const DemoModal = ({ isModalOpen, selectedDemo, closeModal }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Determine which image set to use based on selected demo
    const getImageSet = () => {
        console.log("selected demo :",selectedDemo)
        if (!selectedDemo) return [];
        
        // Check by title (case-insensitive)
        const title = selectedDemo.title?.toLowerCase() || '';
        console.log("selected demo :",title)


        
        if (title.includes('notary') || title.includes('nma')) {
            return imageSets.notary;
        } else if (title.includes('grocery') || title.includes('topten') || title.includes('bazar')) {
            return imageSets.grocery;
        } else if (title.includes('learnlyst') || title.includes('education') || title.includes('learning')) {
            return imageSets.learnlyst;
        }
        else if (title.includes('todo') ) {
            return imageSets.todo;
        }
        
        // Default to notary if no match
        return imageSets.notary;
    };
    
    const currentImageSet = getImageSet();

    // Reset to first image when modal opens with new demo
    useEffect(() => {
        if (isModalOpen && selectedDemo) {
            setCurrentImageIndex(0);
        }
    }, [isModalOpen, selectedDemo]);

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

    // Add arrow key navigation
    useEffect(() => {
        const handleArrowKeys = (e) => {
            if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrevious();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleArrowKeys);
            return () => {
                document.removeEventListener('keydown', handleArrowKeys);
            };
        }
    }, [isModalOpen, currentImageIndex, currentImageSet.length]);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === currentImageSet.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? currentImageSet.length - 1 : prevIndex - 1
        );
    };

    if (!isModalOpen || !selectedDemo || currentImageSet.length === 0) return null;

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
            <div className="relative w-[500px] rounded-3xl shadow-2xl overflow-hidden">
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
                        <p className="text-white/80 mt-1 text-sm">
                            Image {currentImageIndex + 1} of {currentImageSet.length}
                        </p>
                    </div>

                    {/* Image container */}
                    <div className="flex items-center justify-center mt-8 relative">
                        {/* Previous button - Only show if there are multiple images */}
                        {currentImageSet.length > 1 && (
                            <button
                                onClick={handlePrevious}
                                className="absolute -left-8 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 shadow-lg hover:scale-110"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        <div className="relative">
                            {/* Image with rounded corners and shadow */}
                            <img
                                src={currentImageSet[currentImageIndex]}
                                alt={`${selectedDemo.title} preview ${currentImageIndex + 1}`}
                                className="w-[260px] h-[540px] object-fill overflow-hidden rounded-[20px] shadow-2xl border-2 border-white/30 transition-opacity duration-300"
                                key={currentImageIndex} // Force re-render for smooth transition
                            />

                            {/* Overlay gradient effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>

                        {/* Next button - Only show if there are multiple images */}
                        {currentImageSet.length > 1 && (
                            <button
                                onClick={handleNext}
                                className="absolute -right-8 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 shadow-lg hover:scale-110"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}
                    </div>

                    {/* Image indicators (dots) - Only show if there are multiple images */}
                    {currentImageSet.length > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-6">
                            {currentImageSet.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                            ? 'bg-white scale-125'
                                            : 'bg-white/50 hover:bg-white/70'
                                        }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DemoModal;