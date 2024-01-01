import React, { Suspense } from 'react';
import { CurrencySelector, ErrorBoundary, ErrorComponent, Navbar } from '@/components';
import { Routes, TypeWithKey } from '@/models';
import { DailyAreaChart, DailyAreaChartSkeleton, MonthlyAreaChart, MonthlyAreaChartSkeleton } from './components';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { paramsAuth } from '@/utilities';
import type { Metadata } from 'next';;

export async function generateMetadata(): Promise<Metadata> {
  const tCurrencyCharts = await getTranslations('CurrencyCharts');
 
  return {
    title: tCurrencyCharts('metadata.title'),
  }
}

interface CurrencyChartsInterface {
  searchParams: TypeWithKey<string>;
}

const CurrencyCharts = ({ searchParams }: CurrencyChartsInterface) => {
  // Handle translations
  const tCommon = useTranslations('Common');
  const tCurrencyCharts = useTranslations('CurrencyCharts');

  const FX_DAILY_ERROR = tCurrencyCharts('errors.FX_DAILY');
  const FX_MONTHLY_ERROR = tCurrencyCharts('errors.FX_MONTHLY');

  const errorComponentLink = tCommon('error-component.button');

  const currencySelectorTranslations = {
    labels: {
      amount: tCommon('currency-selector.amount'),
      base: tCommon('currency-selector.base'),
      target: tCommon('currency-selector.target')
    },
    buttonText: tCurrencyCharts('currency-selector.button'),
    errors: {
      SAME_CURRENCIES: tCommon('errors.SAME_CURRENCIES'),
      NOT_VALID_CURRENCY: tCommon('errors.NOT_VALID_CURRENCY')
    }
  }

  // Handle params
  const { From, To } = searchParams;

  const paramsCheck = paramsAuth(From, To);

  return (
    <>
      <section className="relative top-[-250px] bg-slate-50 w-11/12 max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl md:w-full">
        <article className="w-full">
          <Navbar currentPath={Routes.CURRENCY_CHARTS} />
        </article>
        <article className="flex flex-col w-full max-w-[600px] m-[75px]">
          <CurrencySelector
            labels={currencySelectorTranslations.labels}
            buttonText={currencySelectorTranslations.buttonText}
            errors={currencySelectorTranslations.errors}
          />
        </article>
      </section>
      <section className="mt-[-200px] w-full max-w-[768px] mx-auto">
        {
          paramsCheck && (
            <>
              <article className="w-full mb-[100px]">
                <ErrorBoundary fallback={<ErrorComponent message={FX_DAILY_ERROR} link={errorComponentLink} />}>
                  <Suspense key={From + To} fallback={<DailyAreaChartSkeleton />}>
                    <DailyAreaChart from={From} to={To} />
                  </Suspense>
                </ErrorBoundary>
              </article>
              <article className="w-full">
                <ErrorBoundary fallback={<ErrorComponent message={FX_MONTHLY_ERROR} link={errorComponentLink} />}>
                  <Suspense key={From + To} fallback={<MonthlyAreaChartSkeleton />}>
                    <MonthlyAreaChart from={From} to={To} />
                  </Suspense>
                </ErrorBoundary>
              </article>
            </>
          )
        }
      </section>
    </>
  )
}

export default CurrencyCharts