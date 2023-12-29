'use client'

import React, { useContext, useEffect } from 'react';
import { ToastContext } from '@/context';
import { ErrorMessages, ToastStatus } from '@/models';

interface ErrorComponentInterface {
    message: ErrorMessages;
}

const ErrorComponent: React.FC<ErrorComponentInterface> = ({ message }) => {
    const { showToast } = useContext(ToastContext);

    useEffect(() => {
        showToast(ToastStatus.ERROR, message);
    }, [])

    return (
        <div className="w-full p-[15px] flex justify-between items-center bg-red-100 border-2 border-red-400 rounded-lg mt-[25px]">
            <div className="w-[25px] h-[25px] mr-[15px]">
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="#f87171"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.25"
                        d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </div>
            <p className="text-justify text-red-400">{message}</p>
        </div>
    )
}

export default ErrorComponent