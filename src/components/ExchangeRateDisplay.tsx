import React from 'react';
import { getCurrentExchange } from '@/services';
import { fetchExchangeRate, lastUpdatedDateFormatted } from '@/utilities';
import { TypeWithKey } from '@/models';

interface ExchangeRateDisplayInterface {
    from: string;
    to: string;
    amount: string;
}

const ExchangeRateDisplay = async ({ from, to, amount = '1' }: ExchangeRateDisplayInterface) => {
    // const response = await getCurrentExchange(from, to);
    const response: any = await fetchExchangeRate();
    const conversion = response['Realtime Currency Exchange Rate'];

    const currencyCodes: TypeWithKey<string> = {
        from: conversion['1. From_Currency Code'],
        to: conversion['3. To_Currency Code']
    }

    const currencyNames: TypeWithKey<string> = {
        from: conversion['2. From_Currency Name'],
        to: conversion['4. To_Currency Name']
    }

    const exchangeRate: number = parseFloat(conversion['5. Exchange Rate']);

    // Exchange data last updated info
    const lastUpdatedDate = lastUpdatedDateFormatted(conversion['6. Last Refreshed'], conversion['7. Time Zone']);

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col my-[20px] text-[16px]">
                <span className="font-semibold text-exchange-corner-light">
                    {amount} {currencyNames.from} =
                </span>
                <span className="my-[15px] text-[25px] font-extrabold">
                    {exchangeRate * parseFloat(amount)} {currencyNames.to}
                </span>
                <ul className="flex flex-col h-[50px]">
                    <li>1 {currencyCodes.from} = {exchangeRate} {currencyCodes.to}</li>
                    <li>1 {currencyCodes.to} = {1 / exchangeRate} {currencyCodes.from}</li>
                </ul>
            </div>
            <div className="max-w-[350px] self-end flex text-[12px] text-justify">
                <div className="w-[5px] h-[5px] mt-[10px] mr-[15px]">
                    <svg
                        className="w-6 h-6 text-gray-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 32 32"
                    >
                        <path
                            stroke="#202020"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>
                <p className="text-exchange-corner-light">Conversión de <span className="font-semibold underline decoration-solid">{currencyNames.from}</span> a <span className="font-semibold underline decoration-solid">{currencyNames.to}</span> — Última actualización {lastUpdatedDate}</p>
            </div>
        </div>
    )
}

export default ExchangeRateDisplay