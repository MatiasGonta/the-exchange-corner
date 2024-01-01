'use client'

import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from '@/context';
import { countryISOList } from '@/models';
import { Routes, TypeWithKey, ToastStatus } from '@/models';
import { getSessionStorage, setSessionStorage } from '@/utilities';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FlagIconSkeleton } from '@/components';
import Image from 'next/image';

interface InputLabels {
    amount?: string;
    base: string;
    target: string;
}

interface Errors {
    SAME_CURRENCIES: string;
    NOT_VALID_CURRENCY: string;
}

interface CurrencySelectorInterface {
    labels: InputLabels;
    buttonText: string;
    errors: Errors;
}

type CurrencyState = {
    base: string;
    target: string;
    amount: string;
}

const CurrencySelector: React.FC<CurrencySelectorInterface> = ({ labels, buttonText, errors }) => {
    const { showToast } = useContext(ToastContext);
    const currencyParams = useSearchParams();
    const rawPathname = usePathname();
    const pathname = rawPathname.substring(0,1) + rawPathname.substring(4);

    // URL params
    const from = currencyParams.get('From');
    const to = currencyParams.get('To');
    const currencyAmount = currencyParams.get('Amount');

    // Session Storage values
    const sessionStorageData = JSON.parse(getSessionStorage('currencyOptions')!) || {};
    const savedBaseCode = sessionStorageData.base;
    const savedTargetCode = sessionStorageData.target;
    const savedAmount = sessionStorageData.amount;

    const initialState: CurrencyState = {
        base: from || (savedBaseCode && savedBaseCode !== '' ? savedBaseCode : 'USD'),
        target: to || (savedTargetCode && savedTargetCode !== '' ? savedTargetCode : 'EUR'),
        amount: currencyAmount || (savedAmount && savedAmount !== '' ? savedAmount : '1'),
    };

    // Input States
    const [isInputFocused, setIsInputFocused] = useState<TypeWithKey<boolean>>({
        base: false,
        target: false
    });

    const [inputValues, setInputValues] = useState<CurrencyState>(initialState);

    useEffect(() => {
        setInputValues(initialState);
    }, [from, to, currencyAmount]);

    const handleInputValues = (key: keyof CurrencyState, value: string) => {
        let newValue = value;

        if (key === 'amount') {
            newValue = value.replace(/,/g, '.'); // Replace commas with dots
        }

        setInputValues((prevState) => ({ ...prevState, [key]: newValue }));
        setSessionStorage('currencyOptions', { ...inputValues, [key]: newValue });
    };

    const handleSwapValues = () => {
        setInputValues((prevState) => ({ ...prevState, base: prevState.target, target: prevState.base }));
        setSessionStorage('currencyOptions', inputValues);
    };

    const countryISOArr = Object.entries(countryISOList);

    // Flags icons
    const renderFlagIcon = (currencyCode: string) => {
        const selectedCurrencyFlag = currencyCode in countryISOList ? countryISOArr.find(([key]) => key === currencyCode)![1] : undefined;

        return selectedCurrencyFlag ? (
            <Image
                src={`https://flagicons.lipis.dev/flags/4x3/${selectedCurrencyFlag.toLowerCase()}.svg`}
                alt={currencyCode}
                width={32}
                height={32}
                key={selectedCurrencyFlag}
                className="w-auto h-auto max-w-[32px] max-h-[24px] absolute left-[10px] top-[12.5px] border border-[#ccc] rounded"
            />
        ) : (
            <FlagIconSkeleton />
        );
    };

    const renderInputField = (label: string, inputName: keyof CurrencyState, inputValue: string) => {
        const isFocused = isInputFocused[inputName];

        const inputDropdownOptions = countryISOArr.filter(([key, value]) => key.includes(inputValue) && key !== inputValue);

        return (
            <div className={`relative w-[135px] ${isFocused && 'z-50'}`}>
                <label htmlFor={inputName} className="absolute top-[-25px] left-0">
                    {label}:
                </label>
                {
                    renderFlagIcon(inputValue)
                }
                <input
                    className="w-full h-[50px] outline-none border border-[#dddddd] shadow-sm rounded-md pl-[50px] text-[#141e37] focus:border-green-900"
                    name={inputName}
                    value={inputValue}
                    autoComplete="off"
                    onChange={(e) => handleInputValues(inputName, e.target.value.toUpperCase())}
                    onFocus={() => setIsInputFocused((prevState) => ({ ...prevState, [inputName]: true }))}
                    maxLength={3}
                />
                {
                    !isFocused ? (
                        <div
                            className="absolute top-[14.5px] right-[10px]"
                            onClick={() => setIsInputFocused((prevState) => ({ ...prevState, [inputName]: true }))}
                        >
                            <svg
                                className="w-[20px] h-[20px]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 8"
                            >
                                <path
                                    stroke="#bbb"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="0.5"
                                    d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                                />
                            </svg>
                        </div>
                    ) : (
                        <div
                            className="absolute top-[15.5px] right-[10px] cursor-pointer hover:border hover:border-[#ccc] hover:rounded-lg hover:top-[10.5px] hover:right-[5.25px] hover:p-[4px]"
                            onClick={() => {
                                setIsInputFocused({ base: false, target: false });
                                handleInputValues(inputName, '');
                            }}
                        >
                            <svg
                                className="w-[18px] h-[18px]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="#bbb"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="0.7"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </div>
                    )
                }
                <ul className={`absolute top-[55px] left-0 bg-white w-full max-h-[300px] px-[5px] overflow-auto border border-[#ddd] rounded-md transition-all ${isFocused && inputDropdownOptions.length !== 0 ? 'h-auto opacity-1' : 'h-0 opacity-0'}`}>
                    {
                        inputDropdownOptions.map(([key, value]) => (
                            <li
                                className="flex flex-row items-center p-[5px] my-[5px] rounded-md cursor-pointer hover:bg-[#ddd]"
                                key={`${inputName}-${key}`}
                                onClick={() => handleInputValues(inputName, key)}
                            >
                                <Image
                                    src={`https://flagicons.lipis.dev/flags/4x3/${value.toLowerCase()}.svg`}
                                    alt={`${inputName}-${key}`}
                                    width={32}
                                    height={32}
                                    className="w-auto h-auto max-w-[32px] max-h-[24px] border border-[#ccc] rounded"
                                />
                                <span className="ml-[10px]">{key}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    };

    // Handle URL params
    const { replace } = useRouter();

    const handleCurrencyParams = () => {
        if (inputValues.base === inputValues.target) {
            showToast(ToastStatus.ALERT, errors.SAME_CURRENCIES)
            return;
        }

        if (inputValues.base.length !== 3 || inputValues.base in countryISOArr || inputValues.target.length !== 3 || inputValues.target in countryISOArr) {
            showToast(ToastStatus.ALERT, errors.NOT_VALID_CURRENCY)
            return;
        }

        const params = new URLSearchParams(currencyParams)
        params.set('From', inputValues.base)
        params.set('To', inputValues.target)

        if (pathname === Routes.CONVERT) {
            params.set('Amount', inputValues.amount.toString())
        }

        replace(`${rawPathname}?${params.toString()}`);
    }

    return (
        <>
            {/* Input modal */}
            <div
                className={`fixed top-0 left-0 bg-transparent z-10 w-screen h-screen ${isInputFocused.base || isInputFocused.target ? 'block' : 'hidden'}`}
                onClick={() => setIsInputFocused({ base: false, target: false })}
            ></div>
            <div className="w-full mb-[35px] flex flex-col justify-between items-center md:flex-row">
                {
                    pathname === Routes.CONVERT && (
                        <div className="relative w-[135px] mb-[50px] md:mb-0">
                            <label
                                htmlFor="currency-amount"
                                className="absolute top-[-25px] left-0"
                            >
                                {/* Importe */}
                                {labels.amount}
                            </label>
                            <input
                                className="w-full h-[50px] outline-none border-[1px] border-[#dddddd] shadow-sm rounded-md pl-[15px] pr-[5px] text-[#141e37] focus:border-green-900"
                                name="amount"
                                autoComplete="off"
                                value={inputValues.amount}
                                onChange={(e) => handleInputValues('amount', e.target.value)}
                            />
                        </div>
                    )
                }
                {
                    renderInputField(labels.base, 'base', inputValues.base)
                }
                <button
                    className="flex justify-center items-center bg-white w-[50px] h-[50px] rounded-full border border-[#ddd] shadow-sm rotate-90 my-[25px] transition-all active:border-green-900 md:my-0 md:rotate-0"
                    onClick={handleSwapValues}
                >
                    <svg
                        className="w-[20px] h-[20px] text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#14532d"
                        viewBox="0 0 16 14"
                    >
                        <path
                            stroke="#14532d"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M11 10H1m0 0 3-3m-3 3 3 3m1-9h10m0 0-3 3m3-3-3-3"
                        />
                    </svg>
                </button>
                {
                    renderInputField(labels.target, 'target', inputValues.target)
                }
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="w-fit text-white bg-green-900 font-bold rounded-[0.5rem] text-[1rem] leading-[1.8rem] px-[2rem] py-[0.6rem] align-center inline-flex items-center transition-all hover:bg-green-700 border-2 border-transparent hover:border-green-900 active:scale-95"
                    onClick={handleCurrencyParams}
                >
                    <svg
                        viewBox="0 0 17 17"
                        className="inline w-[1.3rem] h-[1.3rem] mr-[0.75rem]"
                        fill="#fff"
                        height="16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"></path>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                    </svg>
                    {buttonText}
                </button>
            </div>
        </>
    )
}

export default CurrencySelector