'use client'

import React, { useState } from 'react';
import { countryISOList } from '@/models';
import { Routes, TypeWithKey } from '@/models';
import { getSessionStorage, setSessionStorage } from '@/utilities';
import Image from 'next/image';
import Link from 'next/link';

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
        setSessionStorage('currencyOptions', { ...inputValues, [key]: value });
    };

    const handleSwapValues = () => {
        setInputValues((prevState) => ({ ...prevState, baseCode: prevState.targetCode, targetCode: prevState.baseCode }));
        setSessionStorage('currencyOptions', inputValues);
    }

    const countryISOArr = Object.entries(countryISOList);

    console.log(inputValues)

    // Validate inputValues.baseCode and inputValues.targetCode values
    const isValidBaseCode = Object.keys(countryISOList).includes(inputValues.baseCode);
    const baseCodeQueryParam = isValidBaseCode ? inputValues.baseCode : 'USD';

    const isValidTargetCode = Object.keys(countryISOList).includes(inputValues.targetCode);
    const targetCodeQueryParam = isValidTargetCode ? inputValues.targetCode : 'USD';

    // Construct the link href with validated baseCode and targetCode parameters
    const linkHref = `${path}/?From=${baseCodeQueryParam}&To=${targetCodeQueryParam}${path === Routes.CONVERT && `&Amount=${inputValues.amount}`}`;

    return (
        <>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                {
                    path === Routes.CONVERT && (
                        <div className="relative w-[115px] mb-[50px] sm:mb-0">
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
                <div className="relative w-[115px] mb-[50px] sm:mb-0">
                    <label
                        htmlFor="baseCode"
                        className="absolute top-[-25px] left-0"
                    >
                        De:
                    </label>
                    <input
                        className="w-full h-[50px] outline-none border-[1px] border-[#dddddd] shadow-sm rounded-md pl-[15px] text-[#141e37]"
                        name="baseCode"
                        id="base-code-select"
                        value={inputValues.baseCode}
                        autoComplete="off"
                        onChange={(e) => handleInputValues('baseCode', e.target.value.toUpperCase())}
                        onFocus={() => setIsInputFocused((prevState) => ({ ...prevState, baseInput: true }))}
                        onBlur={() => setIsInputFocused((prevState) => ({ ...prevState, baseInput: false }))}
                    />
                    <ul className={`absolute top-[55px] left-0 w-full max-h-[300px] px-[5px] overflow-auto rounded-md bg-red-300 transition-all ${isInputFocused.baseInput ? "h-auto opacity-1" : "h-0 opacity-0"}`}>
                        {
                            countryISOArr.filter(([key, value]) => key.includes(inputValues.baseCode)).map(([key, value], index) => (
                                <li
                                    className="flex flex-row items-center bg-slate-300 p-[5px] my-[5px] rounded-md"
                                    value={key}
                                    key={index}
                                    onChange={() => handleInputValues('baseCode', key)}
                                >
                                    <Image
                                        src={`https://flagicons.lipis.dev/flags/4x3/${value.toLowerCase()}.svg`}
                                        alt={key}
                                        width={32}
                                        height={32}
                                    />
                                    <span className="ml-[10px]">{key}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <button
                    className="flex justify-center items-center w-[50px] h-[50px] rounded-full border-[1px] border-[#dddddd] shadow-sm rotate-90 sm:rotate-0"
                    onClick={handleSwapValues}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                        <path d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z" fill="#141e37" />
                    </svg>
                </button>
                <div className="relative w-[115px]">
                    <label
                        htmlFor="baseCode"
                        className="absolute top-[-25px] left-0"
                    >
                        a:
                    </label>
                    <input
                        className="w-full h-[50px] outline-none border-[1px] border-[#dddddd] shadow-sm rounded-md pl-[15px] text-[#141e37]"
                        name="targetCode"
                        id="target-code-select"
                        value={inputValues.targetCode}
                        autoComplete="off"
                        onChange={(e) => handleInputValues('targetCode', e.target.value.toUpperCase())}
                        onFocus={() => setIsInputFocused((prevState) => ({ ...prevState, targetInput: true }))}
                        onBlur={() => setIsInputFocused((prevState) => ({ ...prevState, targetInput: false }))}
                    />
                    <ul className={`absolute top-[55px] left-0 w-full max-h-[300px] px-[5px] overflow-auto rounded-md z-10 bg-red-300 transition-all ${isInputFocused.targetInput ? "h-auto opacity-1" : "h-0 opacity-0"}`}>
                        {
                            countryISOArr.filter(([key, value]) => key.includes(inputValues.targetCode)).map(([key, value], index) => (
                                <li
                                    className="flex flex-row items-center bg-slate-300 p-[5px] my-[5px] rounded-md"
                                    value={key}
                                    key={index}
                                    onClick={() => handleInputValues('targetCode', key)}
                                >
                                    <Image
                                        src={`https://flagicons.lipis.dev/flags/4x3/${value.toLowerCase()}.svg`}
                                        alt={key}
                                        width={32}
                                        height={32}
                                    />
                                    <span className="ml-[10px]">{key}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <Link href={linkHref}>
                <button
                    type="button"
                    className="text-white bg-green-900 font-bold rounded-[0.5rem] text-[1rem] leading-[2rem] px-[2rem] py-[0.7rem] align-center mr-[0.5rem] inline-flex items-center border-none hover:bg-green-800 hover:border-[2px] hover:border-[#222]"
                >
                    <svg
                        viewBox="0 0 16 16"
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
                        path === Routes.CONVERT ? 'Convert' : 'History Exchange'
                    }
                </button>
            </Link>
        </>
    )
}

export default CurrencySelector