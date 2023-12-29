import { Suspense } from 'react';
import {
  CurrencySelector,
  Navbar,
  ExchangeRateDisplay,
  ExchangeRateDisplaySkeleton,
  ErrorBoundary,
  ErrorComponent,
  PopularCurrencies,
  FavoriteExchanges
} from '@/components';
import { Routes, TypeWithKey, ErrorMessages } from '@/models';
import { paramsAuth } from '@/utilities';

interface Home {
  searchParams: TypeWithKey<string>;
}

export default async function Home({ searchParams }: Home) {
  const { From, To, Amount } = searchParams;

  const paramsCheck = paramsAuth(From, To);

  return (
    <>
      <section className={`relative top-[-250px] bg-slate-50 w-11/12 max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl md:w-full`}>
        <article className="w-full">
          <Navbar currentPath={Routes.CONVERT} />
        </article>
        <article className="flex flex-col w-full max-w-[600px] m-[75px] px-[25px] md:px-0">
          <CurrencySelector />
          {
            paramsCheck &&
            <ErrorBoundary fallback={<ErrorComponent message={ErrorMessages.CURRENCY_EXCHANGE_RATE} />}>
              <Suspense key={From + To} fallback={<ExchangeRateDisplaySkeleton />}>
                <ExchangeRateDisplay
                  from={From}
                  to={To}
                  amount={Amount}
                />
              </Suspense>
            </ErrorBoundary>
          }
        </article>
      </section>
      {
        !paramsCheck &&
        <section className="w-full max-w-[768px] mt-[-200px]">
          <article className="w-full">
            <FavoriteExchanges />
          </article>
        </section>
      }
      {
        paramsCheck &&
        <section className="max-w-[768px] mt-[-200px]">
          <article className="w-full flex flex-col items-center">
            <PopularCurrencies
              fromCurrency={From}
              toCurrency={To}
              amount={Amount}
            />
          </article>
        </section>
      }
    </>
  )
}