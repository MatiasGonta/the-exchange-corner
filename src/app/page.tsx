import { Suspense } from 'react';
import { CurrencySelector, Navbar, ExchangeRateDisplay, ExchangeRateDisplaySkeleton } from '@/components';
import { CountryISOCode, Routes, TypeWithKey, countryISOList } from '@/models';
import Image from 'next/image';
import Link from 'next/link';

interface Home {
  searchParams: TypeWithKey<string>;
}

export default async function Home({ searchParams }: Home) {
  const { From, To, Amount } = searchParams;

  const fromCheck = From && From.length === 3 && From in countryISOList;
  const toCheck = To && To.length === 3 && To in countryISOList;

  const popularCurrencies: CountryISOCode[] = ['USD', 'EUR', 'GBP', 'CAD', 'JPY', 'AUD', 'CHF', 'CNY'];

  return (
    <>
      <section className="absolute top-[-150px] bg-slate-50 w-11/12 max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl md:w-full">
        <article className="w-full">
          <Navbar currentPath={Routes.CONVERT} />
        </article>
        <article className="flex flex-col w-full max-w-[600px] m-[75px] px-[25px] md:px-0">
          <CurrencySelector />
          {
            fromCheck && toCheck &&
            <Suspense key={From + To} fallback={<ExchangeRateDisplaySkeleton />}>
              <ExchangeRateDisplay
                from={From}
                to={To}
                amount={Amount}
              />
            </Suspense>
          }
        </article>
      </section>
      {
        fromCheck && toCheck &&
        <section className={`max-w-[768px] ${fromCheck && toCheck ? 'mt-[625px] md:mt-[375px]' : 'mt-[400px] md:mt-[150px]'}`}>
          <article className="w-full flex flex-col items-center">
            <h3 className="text-green-900 text-[25px] font-bold">Pares de divisas más comunes para ({From})</h3>
            <div className="grid grid-rows-4 grid-flow-col gap-7 w-full p-[25px] sm:grid-rows-3 md:grid-rows-2 md:p-0 md:py-[25px]">
              {
                popularCurrencies.filter(currency => currency !== From).map((currency) => (
                  <div key={currency} className="flex items-center w-[165px] h-[50px] bg-slate-50 border border-[#ddd] rounded-md shadow-lg p-[10px] cursor-pointer">
                    <Image
                      src={`https://flagicons.lipis.dev/flags/4x3/${countryISOList[currency].toLowerCase()}.svg`}
                      alt={currency}
                      width={32}
                      height={32}
                      key={currency}
                      className="w-auto h-auto max-w-[32px] max-h-[24px] mr-[10px]"
                    />
                    <Link
                      href={`/?From=${From}&To=${currency}&Amount=${Amount}`}
                      className="font-medium text-left text-exchange-corner-light w-full"
                    >
                      {From} a {currency}
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
          </article>
        </section>
      }
    </>
  )
}