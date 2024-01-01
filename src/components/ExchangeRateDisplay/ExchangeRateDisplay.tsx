import React from 'react';
import { getCurrentExchange } from '@/services';
import { lastUpdatedDateFormatted } from '@/utilities';
import { ExchangeRateComparisonTable } from './ExchangeRateComparisonTable';
import { FavoriteExchangeCheckbox } from '../FavoriteExchangeCheckbox';
import { CountryISOCode, TypeWithKey } from '@/models';
import { getTranslations } from 'next-intl/server';

interface ExchangeRateDisplayInterface {
    from: string;
    to: string;
    amount: string;
}

const ExchangeRateDisplay = async ({ from, to, amount = '1' }: ExchangeRateDisplayInterface) => {
    const tConvert = await getTranslations('Convert');
    
    const favoriteCheckboxTranslations = {
        labels: {
            checked: tConvert('favorite-exchange-checkbox.labels.checked'),
            noChecked: tConvert('favorite-exchange-checkbox.labels.noChecked')
        },
        actionMessages: {
            add: tConvert('favorite-exchange-checkbox.actions.add'),
            delete: tConvert('favorite-exchange-checkbox.actions.delete')
        }
    };

    const conversion = await getCurrentExchange(from, to);

    const currencyCodes: TypeWithKey<CountryISOCode> = {
        from: conversion['1. From_Currency Code'],
        to: conversion['3. To_Currency Code']
    }

    const currencyNames: TypeWithKey<string> = {
        from: conversion['2. From_Currency Name'],
        to: conversion['4. To_Currency Name']
    }

    const exchangeRate: number = parseFloat(conversion['5. Exchange Rate']);
    const reverseExchangeRate: number = 1 / exchangeRate;

    // Exchange data last updated info
    const lastUpdatedDate = lastUpdatedDateFormatted(conversion['6. Last Refreshed'], conversion['7. Time Zone']);

    return (
        <>
            <div className="relative flex flex-col w-full mb-[50px]">
                <div className="absolute top-[20px] right-0">
                    <FavoriteExchangeCheckbox
                        from={currencyCodes.from}
                        to={currencyCodes.to}
                        labels={favoriteCheckboxTranslations.labels}
                        actionMessages={favoriteCheckboxTranslations.actionMessages}
                    />
                </div>
                <div className="flex flex-col my-[20px] text-[16px]">
                    <span className="font-semibold text-exchange-corner-light">
                        {amount} {currencyNames.from} =
                    </span>
                    <span className="my-[15px] text-[25px] font-extrabold">
                        {exchangeRate * parseFloat(amount)} {currencyNames.to}
                    </span>
                    <ul className="flex flex-col h-[50px]">
                        <li>1 {currencyCodes.from} = {exchangeRate} {currencyCodes.to}</li>
                        <li>1 {currencyCodes.to} = {reverseExchangeRate} {currencyCodes.from}</li>
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
                    <p className="text-exchange-corner-light">
                        {tConvert('exchange-rate-display.last-update.0')}
                        {' '}<span className="font-semibold underline decoration-solid">{currencyNames.from}</span>
                        {' '}{tConvert('exchange-rate-display.last-update.1')}
                        {' '}<span className="font-semibold underline decoration-solid">{currencyNames.to}</span>
                        {' '}— {tConvert('exchange-rate-display.last-update.2')} {lastUpdatedDate}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:justify-between">
                <div className="w-full md:max-w-[275px] mb-[50px] md:mb-0">
                    <ExchangeRateComparisonTable
                        fromName={currencyNames.from}
                        toName={currencyNames.to}
                        fromCode={currencyCodes.from}
                        toCode={currencyCodes.to}
                        exchangeRate={exchangeRate}
                    />
                </div>
                <div className="w-full md:max-w-[275px]">
                    <ExchangeRateComparisonTable
                        fromName={currencyNames.to}
                        toName={currencyNames.from}
                        fromCode={currencyCodes.to}
                        toCode={currencyCodes.from}
                        exchangeRate={reverseExchangeRate}
                    />
                </div>
            </div>
        </>
    )
}

export default ExchangeRateDisplay