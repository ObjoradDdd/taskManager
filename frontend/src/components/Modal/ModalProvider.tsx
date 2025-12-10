import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    modal: ReactNode | null;
    openModal: (m: ReactNode) => void;
    closeModal: () => void;
}


const ModalContext = createContext<ModalContextType>(null!);


export const useModal = () => useContext(ModalContext);


export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<ReactNode | null>(null);


    const openModal = (m: ReactNode) => setModal(m);
    const closeModal = () => setModal(null);


    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
            {modal && (
                <div className="modal-overlay">
                    <div className="modal-window">{modal}</div>
                </div>
            )}
        </ModalContext.Provider>
    );
};