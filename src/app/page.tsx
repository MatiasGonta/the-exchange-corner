import { Suspense } from 'react';
import { CurrencySelector, Navbar, ExchangeRateDisplay, ExchangeRateDisplaySkeleton } from '@/components';
import { Routes, TypeWithKey } from '@/models';

interface Home {
  searchParams: TypeWithKey<string>;
}

export default async function Home({ searchParams }: Home) {
  const { From, To, Amount } = searchParams;

  return (
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
          From && To &&
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
  )
}