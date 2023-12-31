import React from 'react';
import { countryISOList, CountryISOCode, Routes } from '@/models';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface PopularCurrenciesInterface {
    fromCurrency: string;
    toCurrency: string;
    amount: string;
}

const PopularCurrencies: React.FC<PopularCurrenciesInterface> = ({ fromCurrency, toCurrency, amount }) => {
    const tConvert = useTranslations('Convert');

    const popularCurrencies: CountryISOCode[] = ['USD', 'EUR', 'GBP', 'CAD', 'JPY', 'AUD', 'CHF', 'CNY'];

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-green-900 text-[25px] font-bold">{tConvert('popular-currencies.title', { fromCurrency })}</h3>
            <div className="grid grid-rows-4 grid-flow-col gap-7 w-full p-[25px] sm:grid-rows-3 md:grid-rows-2 md:p-0 md:py-[25px]">
                {
                    popularCurrencies.filter(currency => currency !== fromCurrency && currency !== toCurrency).map((currency) => (
                        <div
                            key={currency}
                            className="flex items-center w-[165px] h-[50px] bg-slate-50 border border-[#ddd] rounded-md shadow-lg p-[10px] cursor-pointer"
                        >
                            <Image
                                src={`https://flagicons.lipis.dev/flags/4x3/${countryISOList[currency].toLowerCase()}.svg`}
                                alt={currency}
                                width={32}
                                height={32}
                                key={currency}
                                className="w-auto h-auto max-w-[32px] max-h-[24px] mr-[10px] border border-[#ccc] rounded"
                            />
                            <Link
                                href={`${Routes.CONVERT}?From=${fromCurrency}&To=${currency}&Amount=${amount}`}
                                className="font-medium text-left text-exchange-corner-light w-full"
                            >
                                <span className="font-semibold">{fromCurrency}</span> {tConvert('card.connector')} <span className="font-semibold">{currency}</span>
                            </Link>
                            <svg
                                className="w-[20px] h-[20px] justify-self-end"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 8 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="0.6"
                                    d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                                />
                            </svg>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PopularCurrencies