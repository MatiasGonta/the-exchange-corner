import { Suspense } from 'react';
import { CurrencySelector, Navbar, ExchangeRateDisplay, ExchangeRateDisplaySkeleton } from '@/components';
import { Routes, TypeWithKey, countryISOList } from '@/models';

interface Home {
  searchParams: TypeWithKey<string>;
}

export default async function Home({ searchParams }: Home) {
  const { From, To, Amount } = searchParams;

  const fromCheck = From && From.length === 3 && From in countryISOList;
  const toCheck = To && To.length === 3 && To in countryISOList;

  const popularCurrencies = ['USD', 'EUR', 'GBP','CAD','JPY','AUD','CHF','CNY'];

  return (
    <>
      <section className="absolute top-[-150px] bg-slate-50 w-11/12 max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl md:w-full">
        <article className="w-full">
          <Navbar currentPath={Routes.CONVERT} />
        </article>
        <article className="flex flex-col w-full max-w-[600px] m-[75px] px-[25px] md:px-0">
          <CurrencySelector
            path={Routes.CONVERT}
            from={From}
            to={To}
            currencyAmount={Amount}
          />
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
    </>
  )
}