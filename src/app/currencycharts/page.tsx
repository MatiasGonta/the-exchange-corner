import React from 'react';
import { getDailyHistoryExchange, getMonthlyHistoryExchange } from '@/services';
import { CurrencySelector, Navbar } from '@/components';
import { Routes, TypeWithKey } from '@/models';

interface CurrencyChartsInterface {
  searchParams: TypeWithKey<string>;
}

const CurrencyCharts = async ({ searchParams }: CurrencyChartsInterface) => {
  const { From, To } = searchParams;

  const daily = await getDailyHistoryExchange(From, To);
  const monthly = await getMonthlyHistoryExchange(From, To);
  console.log('-----> Daily: ', daily);
  console.log('-----> Monthly: ', monthly);

  return (
    <section className="absolute top-[-125px] bg-slate-50 w-full max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl">
      <article className="w-full">
        <Navbar currentPath={Routes.CURRENCY_CHARTS} />
      </article>
      <article className="flex flex-col w-full max-w-[500px] my-[75px]">
        <CurrencySelector path={Routes.CURRENCY_CHARTS} from={From} to={To} />
      </article>
    </section>
  )
}

export default CurrencyCharts