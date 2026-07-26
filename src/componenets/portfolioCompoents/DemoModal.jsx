import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const DemoModal = ({ isModalOpen, selectedDemo, closeModal }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { data } = useData();

    const getImageSet = () => {
        if (!selectedDemo) return [];
        const title = selectedDemo.title?.toLowerCase() || '';
        const demoSetKey = selectedDemo.demoSetKey || '';

        if (demoSetKey && data.demoImageSets[demoSetKey]) {
            return data.demoImageSets[demoSetKey].images;
        }

        if (title.includes('notary') || title.includes('nma')) {
            return data.demoImageSets.notary?.images || [];
        } else if (title.includes('grocery') || title.includes('topten') || title.includes('bazar')) {
            return data.demoImageSets.grocery?.images || [];
        } else if (title.includes('learnlyst') || title.includes('education') || title.includes('learning')) {
            return data.demoImageSets.learnlyst?.images || [];
        } else if (title.includes('todo')) {
            return data.demoImageSets.todo?.images || [];
        }
        return data.demoImageSets.notary?.images || [];
    };

    const currentImageSet = getImageSet();

    useEffect(() => {
        if (isModalOpen && selectedDemo) {
            setCurrentImageIndex(0);
        }
    }, [isModalOpen, selectedDemo]);

    useEffect(() => {
        if (isModalOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        if (isModalOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            return () => document.removeEventListener('keydown', handleEscapeKey);
        }
    }, [isModalOpen, closeModal]);

    useEffect(() => {
        const handleArrowKeys = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            else if (e.key === 'ArrowLeft') handlePrevious();
        };
        if (isModalOpen) {
            document.addEventListener('keydown', handleArrowKeys);
            return () => document.removeEventListener('keydown', handleArrowKeys);
        }
    }, [isModalOpen, currentImageIndex, currentImageSet.length]);

    const handleNext = () => {
        setCurrentImageIndex((prev) => prev === currentImageSet.length - 1 ? 0 : prev + 1);
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prev) => prev === 0 ? currentImageSet.length - 1 : prev - 1);
    };

    if (!isModalOpen || !selectedDemo || currentImageSet.length === 0) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleBackdropClick} role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />
            <div className="relative w-[500px] rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-xl" />
                <button onClick={closeModal} className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-red-500/90 flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 shadow-lg hover:scale-110 backdrop-blur-sm" aria-label="Close modal">
                    <X size={20} />
                </button>
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                    <div className="absolute top-8 left-0 right-0 text-center">
                        <h2 className="text-2xl font-bold text-white drop-shadow-lg">{selectedDemo.title}</h2>
                        <p className="text-white/80 mt-1 text-sm">Image {currentImageIndex + 1} of {currentImageSet.length}</p>
                    </div>
                    <div className="flex items-center justify-center mt-8 relative">
                        {currentImageSet.length > 1 && (
                            <button onClick={handlePrevious} className="absolute -left-8 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 shadow-lg hover:scale-110" aria-label="Previous image">
                                <ChevronLeft size={24} />
                            </button>
                        )}
                        <div className="relative">
                            <img src={currentImageSet[currentImageIndex]} alt={`${selectedDemo.title} preview ${currentImageIndex + 1}`} className="w-[260px] h-[540px] object-fill overflow-hidden rounded-[20px] shadow-2xl border-2 border-white/30 transition-opacity duration-300" key={currentImageIndex} />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                        {currentImageSet.length > 1 && (
                            <button onClick={handleNext} className="absolute -right-8 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 shadow-lg hover:scale-110" aria-label="Next image">
                                <ChevronRight size={24} />
                            </button>
                        )}
                    </div>
                    {currentImageSet.length > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-6">
                            {currentImageSet.map((_, index) => (
                                <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}`} aria-label={`Go to image ${index + 1}`} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DemoModal;
