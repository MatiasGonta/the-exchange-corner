import React, { Suspense } from 'react';
import { CurrencySelector, Navbar } from '@/components';
import { Routes, TypeWithKey, countryISOList } from '@/models';
import { DailyAreaChart, DailyAreaChartSkeleton, MonthlyAreaChart, MonthlyAreaChartSkeleton } from './components';

interface CurrencyChartsInterface {
  searchParams: TypeWithKey<string>;
}

const CurrencyCharts = ({ searchParams }: CurrencyChartsInterface) => {
  const { From, To } = searchParams;

  const fromCheck = From && From.length === 3 && From in countryISOList;
  const toCheck = To && To.length === 3 && To in countryISOList;

  return (
    <>
      <section className="absolute top-[-150px] bg-slate-50 w-11/12 max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl md:w-full">
        <article className="w-full">
          <Navbar currentPath={Routes.CURRENCY_CHARTS} />
        </article>
        <article className="flex flex-col w-full max-w-[600px] m-[75px]">
          <CurrencySelector />
        </article>
      </section>
      <section className="mt-[300px] w-full max-w-[768px] mx-auto md:mt-[150px]">
        {
          fromCheck && toCheck && (
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