'use client'

import { ToastContext } from '@/context';
import { ToastStatus } from '@/models';
import { useContext } from 'react';

function SuccessToastIcon() {
    return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
        </div>
    )
}

function AlertToastIcon() {
    return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg">
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
        </div>
    )
}

function ErrorToastIcon() {
    return (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
        </div>
    )
}

export default function Toast() {
    const { toastConfig, closeToast } = useContext(ToastContext);

    const statusIcons = {
        [ToastStatus.SUCCESS]: <SuccessToastIcon />,
        [ToastStatus.ALERT]: <AlertToastIcon />,
        [ToastStatus.ERROR]: <ErrorToastIcon />,
    };

    const loadingBarColors = {
        [ToastStatus.SUCCESS]: 'bg-green-500',
        [ToastStatus.ALERT]: 'bg-orange-500',
        [ToastStatus.ERROR]: 'bg-red-500',
    }

    const selectedStatusIcon = statusIcons[toastConfig.status];
    const selectedLoadingBarColor = loadingBarColors[toastConfig.status];

    return (
        <div className={`fixed top-[25px] right-[25px] flex flex-col transition-all z-toast ${toastConfig.show ? 'w-full h-auto opacity-1' : 'w-0 h-0 opacity-0'} max-w-[400px] text-gray-500 bg-white rounded-lg shadow`}>
            <div className="flex items-center w-auto h-auto p-4">
                {selectedStatusIcon}
                <p className="w-full ms-3 text-sm font-normal">{toastConfig.text}</p>
                <button
                    type="button"
                    className="bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
                    onClick={closeToast}
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
            <div className={`w-full h-[5px] rounded-b-lg ${selectedLoadingBarColor} ${toastConfig.show && 'animate-barload'}`}></div>
        </div>
    )
}