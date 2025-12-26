import { createContext, useContext, useState, ReactNode } from 'react';
import { useModal } from './ModalProvider';

export const BaseModal = ({ title, children }: { title: string; children: ReactNode }) => {
    const { closeModal } = useModal();
    return (
        <div>
            <h2>{title}</h2>
            <div>{children}</div>
            <button
                onClick={closeModal}
                style={{
                    marginTop: '16px',
                    background: 'grey',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: '0.2s'
                }}
            >
                Close
            </button>
        </div>
    );
};