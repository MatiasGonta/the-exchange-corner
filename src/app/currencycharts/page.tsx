import React, { Suspense } from 'react';
import { CurrencySelector, Navbar } from '@/components';
import { Routes, TypeWithKey } from '@/models';
import { DailyAreaChart, DailyAreaChartSkeleton, MonthlyAreaChart, MonthlyAreaChartSkeleton } from './components';

interface CurrencyChartsInterface {
  searchParams: TypeWithKey<string>;
}

const CurrencyCharts = ({ searchParams }: CurrencyChartsInterface) => {
  const { From, To } = searchParams;

  return (
    <>
      <section className="absolute top-[-150px] bg-slate-50 w-11/12 max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl md:w-full">
        <article className="w-full">
          <Navbar currentPath={Routes.CURRENCY_CHARTS} />
        </article>
        <article className="flex flex-col w-full max-w-[600px] m-[75px]">
          <CurrencySelector path={Routes.CURRENCY_CHARTS} from={From} to={To} />
        </article>
      </section>
      <section className="mt-[150px] w-full max-w-[768px] mx-auto">
        {
          From && To && (
            <>
              <article className="w-full mb-[100px]">
                <Suspense key={From + To} fallback={<DailyAreaChartSkeleton />}>
                  <DailyAreaChart from={From} to={To} />
                </Suspense>
              </article>
              <article className="w-full">
                <Suspense key={From + To} fallback={<MonthlyAreaChartSkeleton />}>
                  <MonthlyAreaChart from={From} to={To} />
                </Suspense>
              </article>
            </>
          )
        }
      </section>
    </>
  )
}

export default CurrencyCharts