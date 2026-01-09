// context/ModalContext.jsx
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDemo, setSelectedDemo] = useState(null);

    const openModal = (demoData) => {
        setSelectedDemo(demoData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDemo(null);
    };

    return (
        <ModalContext.Provider value={{ 
            isModalOpen, 
            selectedDemo, 
            openModal, 
            closeModal 
        }}>
            {children}
        </ModalContext.Provider>
    );
};