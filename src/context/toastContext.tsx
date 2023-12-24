'use client'

import { ToastConfig, ToastStatus } from '@/models';
import React, { createContext, useState } from 'react';

interface ToastContextInterface {
    toastConfig: ToastConfig;
    showToast: (status: ToastStatus, text: string) => void;
    closeToast: () => void;
}

interface ToastProviderInterface {
    children: JSX.Element | JSX.Element[];
}

export const ToastContext = createContext<ToastContextInterface>({
    toastConfig: {
        show: false,
        status: ToastStatus.SUCCESS,
        text: ''
    },
    showToast: () => { },
    closeToast: () => { }
});

export const ToastProvider: React.FC<ToastProviderInterface> = ({ children }) => {
    const [toastConfig, setToastConfig] = useState<ToastConfig>({
        show: false,
        status: ToastStatus.SUCCESS,
        text: ''
    });

    const showToast = (status: ToastStatus = ToastStatus.SUCCESS, text: string) => {
        setToastConfig({
            show: true,
            status,
            text
        })

        setTimeout(() => {
            setToastConfig((prevState) => ({
                ...prevState,
                show: false,
            }));
        }, 3000);
    };

    const closeToast = () => {
        setToastConfig((prevState) => ({
            ...prevState,
            show: false,
        }))
    };

    const toastContextValue: ToastContextInterface = {
        toastConfig,
        showToast,
        closeToast
    };

    return (
        <ToastContext.Provider value={toastContextValue}>
            {children}
        </ToastContext.Provider>
    );
};