import React from 'react';
import { Button, CurrencySelector, Navbar } from '@/components';

interface CurrencyChartsInterface {}

const CurrencyCharts: React.FC<CurrencyChartsInterface> = () => {
  return (
    <section className="absolute top-[-125px] bg-slate-50 w-full max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl">
      <article className="w-full">
        <Navbar onPage="currencyCharts" />
      </article>
      <article className="flex flex-col w-full max-w-[500px] my-[75px]">
        <CurrencySelector amount={false} />
        <div>
          <Button text="History Exchange" path={`/currencycharts/?From=USD&To=ARS`} />
        </div>
      </article>
    </section>
  )
}

export default CurrencyCharts