import { createContext, useContext, useState, ReactNode } from 'react';
import { useModal } from './ModalProvider';

export const BaseModal = ({ title, children }: { title: string; children: ReactNode }) => {
    const { closeModal } = useModal();
    return (
        <div>
            <h2>{title}</h2>
            <div>{children}</div>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};