'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { countryISOList } from '@/data/countryISOList';
import { TypeWithKey } from '@/types';

interface CurrencySelectorInterface {
    amount: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorInterface> = ({ amount }) => {
    const [isInputFocused, setIsInputFocused] = useState<TypeWithKey<boolean>>({
        baseInput: false,
        targetInput: false
    });

    const [inputValues, setInputValues] = useState<TypeWithKey<string>>({
        baseCode: 'USD',
        targetCode: 'EUR'
    });

    const handleSwapValues = () => setInputValues(({ baseCode, targetCode }) => ({ baseCode: targetCode, targetCode: baseCode }));
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center">
        {
            amount && (
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
                    min={1}
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
                onChange={(e) => setInputValues((prevState) => ({ ...prevState, baseCode: e.target.value.toUpperCase() }))}
                onFocus={() => setIsInputFocused((prevState) => ({ ...prevState, baseInput: true }))}
                onBlur={() => setIsInputFocused((prevState) => ({ ...prevState, baseInput: false }))}
            />
            <ul className={`absolute top-[55px] left-0 w-full max-h-[300px] px-[5px] overflow-auto rounded-md z-10 bg-red-300 transition-all ${isInputFocused.baseInput ? "h-auto opacity-1" : "h-0 opacity-0"}`}>
                {
                    Object.entries(countryISOList).filter(([key, value]) => key.includes(inputValues.baseCode)).map(([key, value], index) => (
                        <li
                            className="flex flex-row items-center bg-slate-300 p-[5px] my-[5px] rounded-md"
                            value={key} 
                            key={index}
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
                onChange={(e) => setInputValues((prevState) => ({ ...prevState, targetCode: e.target.value.toUpperCase() }))}
                onFocus={() => setIsInputFocused((prevState) => ({ ...prevState, targetInput: true }))}
                onBlur={() => setIsInputFocused((prevState) => ({ ...prevState, targetInput: false }))}
            />
            <ul className={`absolute top-[55px] left-0 w-full max-h-[300px] px-[5px] overflow-auto rounded-md z-10 bg-red-300 transition-all ${isInputFocused.baseInput ? "h-auto opacity-1" : "h-0 opacity-0"}`}>
                {
                    Object.entries(countryISOList).filter(([key, value]) => key.includes(inputValues.targetCode)).map(([key, value], index) => (
                        <li
                            className="flex flex-row items-center bg-slate-300 p-[5px] my-[5px] rounded-md"
                            value={key} 
                            key={index}
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
  )
}

export default CurrencySelector