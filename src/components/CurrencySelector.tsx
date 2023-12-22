'use client'

import React, { useState } from 'react';
import { countryISOList } from '@/models';
import { Routes, TypeWithKey } from '@/models';
import { getSessionStorage, setSessionStorage } from '@/utilities';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FlagIconSkeleton } from '@/components';
import Image from 'next/image';

interface CurrencySelectorInterface {
    path: Routes;
    from?: string;
    to?: string;
    currencyAmount?: string;
}

type CurrencyState = {
    baseCode: string,
    targetCode: string,
    amount: number,
}

function CurrencySelector({ path, from, to, currencyAmount }: CurrencySelectorInterface) {
    const [isInputFocused, setIsInputFocused] = useState<TypeWithKey<boolean>>({
        baseInput: false,
        targetInput: false
    });

    // Session Storage values
    const sessionStorageData = JSON.parse(getSessionStorage('currencyOptions')!) || {};
    const savedBaseCode = sessionStorageData.baseCode;
    const savedTargetCode = sessionStorageData.targetCode;
    const savedAmount = sessionStorageData.amount;

    const initialState: CurrencyState = {
        baseCode: from || (savedBaseCode && savedBaseCode !== '' ? savedBaseCode : 'USD'),
        targetCode: to || (savedTargetCode && savedTargetCode !== '' ? savedTargetCode : 'EUR'),
        amount: currencyAmount ? parseFloat(currencyAmount) : (savedAmount && savedAmount !== '' ? savedAmount : 1),
    };

    const [inputValues, setInputValues] = useState<CurrencyState>(initialState);

    const handleInputValues = (key: keyof CurrencyState, value: string | number) => {
        setInputValues((prevState) => ({ ...prevState, [key]: value }));
        console.log('CHANGE ---> ', inputValues)
        setSessionStorage('currencyOptions', { ...inputValues, [key]: value });
    };

    const handleSwapValues = () => {
        setInputValues((prevState) => ({ ...prevState, baseCode: prevState.targetCode, targetCode: prevState.baseCode }));
        setSessionStorage('currencyOptions', inputValues);
    };

    const countryISOArr = Object.entries(countryISOList);

    // Flags icons
    const selectedBaseCurrencyFlag = inputValues.baseCode in countryISOList ? countryISOArr.find(([key]) => key === inputValues.baseCode)![1] : undefined;
    const selectedTargetCurrencyFlag = inputValues.targetCode in countryISOList ? countryISOArr.find(([key]) => key === inputValues.targetCode)![1] : undefined;

    // Inputs options
    const baseInputOptions = countryISOArr.filter(([key, value]) => key.includes(inputValues.baseCode) && key !== inputValues.baseCode);
    const targetInputOptions = countryISOArr.filter(([key, value]) => key.includes(inputValues.targetCode) && key !== inputValues.targetCode);

    // Handle URL params
    const currencyParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleCurrencyParams = () => {
        const params = new URLSearchParams(currencyParams)
        params.set('From', inputValues.baseCode)
        params.set('To', inputValues.targetCode)

        if (path === Routes.CONVERT) {
            params.set('Amount', inputValues.amount.toString())
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            {/* Input modal */}
            <div
                className={`fixed top-0 left-0 bg-transparent z-10 w-screen h-screen ${isInputFocused.baseInput || isInputFocused.targetInput ? 'block' : 'hidden'}`}
                onClick={() => setIsInputFocused({ baseInput: false, targetInput: false })}
            ></div>
            <div className="w-full mb-[35px] flex flex-col justify-between items-center md:flex-row">
                {
                    path === Routes.CONVERT && (
                        <div className="relative w-[135px] mb-[50px] md:mb-0">
                            <label
                                htmlFor="currency-amount"
                                className="absolute top-[-25px] left-0"
                            >
                                Importe
                            </label>
                            <input
                                className="w-full h-[50px] outline-none border-[1px] border-[#dddddd] shadow-sm rounded-md pl-[15px] pr-[5px] text-[#141e37]"
                                name="currency-amount"
                                type="number"
                                value={inputValues.amount}
                                min={1}
                                onChange={(e) => handleInputValues('amount', e.target.value)}
                            />
                        </div>
                    )
                }
                <div className={`relative w-[135px] ${isInputFocused.baseInput && "z-50"}`}>
                    <label
                        htmlFor="baseCode"
                        className="absolute top-[-25px] left-0"
                    >
                        De:
                    </label>
                    {
                        selectedBaseCurrencyFlag
                            ? (
                                <Image
                                    src={`https://flagicons.lipis.dev/flags/4x3/${selectedBaseCurrencyFlag.toLowerCase()}.svg`}
                                    alt={inputValues.baseCode}
                                    width={32}
                                    height={32}
                                    key={selectedBaseCurrencyFlag}
                                    className="w-auto h-auto max-w-[32px] max-h-[24px] absolute left-[10px] top-[12.5px]"
                                />
                            ) : (
                                <FlagIconSkeleton />
                            )
                    }
                    <input
                        className="w-full h-[50px] outline-none border-[1px] border-[#dddddd] shadow-sm rounded-md pl-[50px] text-[#141e37]"
                        name="baseCode"
                        value={inputValues.baseCode}
                        autoComplete="off"
                        onChange={(e) => handleInputValues('baseCode', e.target.value.toUpperCase())}
                        onFocus={() => setIsInputFocused((prevState) => ({ ...prevState, baseInput: true }))}
                    />
                    <ul className={`absolute top-[55px] left-0 w-full max-h-[300px] px-[5px] overflow-auto rounded-md transition-all ${isInputFocused.baseInput ? "h-auto opacity-1" : "h-0 opacity-0"}`}>
                        {
                            baseInputOptions.map(([key, value], index) => (
                                <li
                                    className="flex flex-row items-center p-[5px] my-[5px] rounded-md cursor-pointer"
                                    key={`from-${key}`}
                                    onClick={() => handleInputValues('baseCode', key)}
                                    onFocus={() => setIsInputFocused((prevState) => ({ ...prevState, baseInput: true }))}
                                >
                                    <Image
                                        src={`https://flagicons.lipis.dev/flags/4x3/${value.toLowerCase()}.svg`}
                                        alt={`from-${key}`}
                                        width={32}
                                        height={32}
                                        className="w-auto h-auto max-w-[32px] max-h-[24px]"
                                    />
                                    <span className="ml-[10px]">{key}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <button
                    className="flex justify-center items-center w-[50px] h-[50px] rounded-full border-[1px] border-[#dddddd] shadow-sm rotate-90 my-[25px] md:my-0 md:rotate-0"
                    onClick={handleSwapValues}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                        <path
                            d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z"
                            fill="#141e37"
                        />
                    </svg>
                </button>
                <div className={`relative w-[135px] ${isInputFocused.targetInput && "z-50"}`}>
                    <label
                        htmlFor="baseCode"
                        className="absolute top-[-25px] left-0"
                    >
                        a:
                    </label>
                    {
                        selectedTargetCurrencyFlag
                            ? (
                                <Image
                                    src={`https://flagicons.lipis.dev/flags/4x3/${selectedTargetCurrencyFlag.toLowerCase()}.svg`}
                                    alt={inputValues.targetCode}
                                    width={32}
                                    height={32}
                                    key={selectedTargetCurrencyFlag}
                                    className="w-auto h-auto max-w-[32px] max-h-[24px] absolute left-[10px] top-[12.5px]"
                                />
                            ) : (
                                <FlagIconSkeleton />
                            )
                    }
                    <input
                        className="w-full h-[50px] outline-none border-[1px] border-[#dddddd] shadow-sm rounded-md pl-[50px] text-[#141e37]"
                        name="targetCode"
                        value={inputValues.targetCode}
                        autoComplete="off"
                        onChange={(e) => handleInputValues('targetCode', e.target.value.toUpperCase())}
                        onFocus={() => setIsInputFocused((prevState) => ({ ...prevState, targetInput: true }))}
                    />
                    <ul className={`absolute top-[55px] left-0 w-full max-h-[300px] px-[5px] overflow-auto rounded-md z-10 bg-red-300 transition-all ${isInputFocused.targetInput ? "h-auto opacity-1" : "h-0 opacity-0"}`}>
                        {
                            targetInputOptions.map(([key, value], index) => (
                                <li
                                    className="flex flex-row items-center bg-slate-300 p-[5px] my-[5px] rounded-md"
                                    key={`to-${key}`}
                                    onClick={() => handleInputValues('targetCode', key)}
                                >
                                    <Image
                                        src={`https://flagicons.lipis.dev/flags/4x3/${value.toLowerCase()}.svg`}
                                        alt={`to-${key}`}
                                        width={32}
                                        height={32}
                                        className="w-auto h-auto max-w-[32px] max-h-[24px]"
                                    />
                                    <span className="ml-[10px]">{key}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="w-fit text-white bg-green-900 font-bold rounded-[0.5rem] text-[1rem] leading-[1.8rem] px-[2rem] py-[0.6rem] align-center inline-flex items-center transition-all hover:bg-green-700 border-2 border-transparent hover:border-green-900"
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
                    {
                        path === Routes.CONVERT ? 'Convertir' : 'Ver Gráficos'
                    }
                </button>
            </div>
        </>
    )
}

export default CurrencySelector