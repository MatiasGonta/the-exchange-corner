'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface LangSwitchInterface { }

const LangSwitch: React.FC<LangSwitchInterface> = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const path = usePathname();
    const pathname = path.substring(0, 1) + path.substring(4);

    const locale = path.substring(1, 3);
    const currentLocale = locale === 'en' ? 'English' : 'Español';

    return (
        <>
            {/* Select modal */}
            <div
                className={`fixed top-0 left-0 bg-transparent z-10 w-screen h-screen ${isOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsOpen(false)}
            ></div>
            <div className="relative">
                <button
                    className="peer w-[135px] z-50 flex justify-between items-center px-[5px] pb-[5px] text-center border-b"
                    type="button"
                    onFocus={() => setIsOpen(true)}
                    onClick={() => setIsOpen(true)}
                >
                    <span>{currentLocale}</span>
                    <div>
                        <svg
                            className="w-[15px] h-[15px]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 8"
                        >
                            <path
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.25"
                                d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                            />
                        </svg>
                    </div>
                </button>
                {
                    isOpen && (
                        <ul className="max-w-[135px] h-auto px-[10px] py-[5px] absolute z-10 text-[14px] text-exchange-corner bg-white border border-[#ddd] rounded-b-lg shadow w-44">
                            <li className="my-[5px] p-[5px] rounded-md hover:bg-exchange-corner-green-light">
                                <Link 
                                    href={'/en' + pathname} 
                                    scroll={false}
                                    className="w-full flex items-center"
                                >
                                    <Image
                                        src={`https://flagicons.lipis.dev/flags/4x3/gb.svg`}
                                        alt="es"
                                        width={32}
                                        height={32}
                                        className="min-w-[20px] w-[20px] max-w-[20px] min-h-[20px] h-[20px] max-h-[20px] rounded-full"
                                    />
                                    <span className="ml-[10px]">English</span>
                                </Link>
                            </li>
                            <li className="my-[5px] p-[5px] rounded-md hover:bg-exchange-corner-green-light">
                                <Link 
                                    href={'/es' + pathname} 
                                    scroll={false}
                                    className="w-full flex items-center"
                                >
                                    <Image
                                        src={`https://flagicons.lipis.dev/flags/4x3/es.svg`}
                                        alt="es"
                                        width={32}
                                        height={32}
                                        className="min-w-[20px] w-[20px] max-w-[20px] min-h-[20px] h-[20px] max-h-[20px] rounded-full"
                                    />
                                    <span className="ml-[10px]">Español</span>
                                </Link>
                            </li>
                        </ul>
                    )
                }
            </div>
        </>
    )
}

export default LangSwitch