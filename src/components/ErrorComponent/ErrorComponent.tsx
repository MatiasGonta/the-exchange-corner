'use client'

import React, { useContext, useEffect } from 'react';
import { ToastContext } from '@/context';
import { ToastStatus } from '@/models';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface ErrorComponentInterface {
    message: string;
    link: string;
}

const ErrorComponent: React.FC<ErrorComponentInterface> = ({ message, link }) => {
    const pathname = usePathname();
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
            <div className="flex flex-col items-end text-red-400">
                <p className="text-justify text-red-400">{message}</p>
                <Link
                    href={pathname}
                    className="mt-[10px] px-[10px] py-[5px] text-red-100 bg-red-400 cursor-pointer border-2 border-red-400 rounded-lg transition-all hover:bg-red-100 hover:text-red-400"
                >
                    <span>{link}</span>
                </Link>
            </div>
        </div>
    )
}

export default ErrorComponent