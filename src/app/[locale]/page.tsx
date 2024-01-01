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
import { Routes, TypeWithKey } from '@/models';
import { getTranslations } from 'next-intl/server';
import { paramsAuth } from '@/utilities';

interface HomeInterface {
  searchParams: TypeWithKey<string>;
}

export default async function Home({ searchParams }: HomeInterface) {
  // Handle translations
  const tCommon = await getTranslations('Common');
  const tConvert = await getTranslations('Convert');

 const CURRENCY_EXCHANGE_RATE_ERROR = tConvert('errors.CURRENCY_EXCHANGE_RATE');

 const errorComponentLink = tCommon('error-component.button');

  const currencySelectorTranslations = {
    labels: {
      amount: tCommon('currency-selector.amount'),
      base: tCommon('currency-selector.base'),
      target: tCommon('currency-selector.target')
    },
    buttonText: tConvert('currency-selector.button'),
    errors: {
      SAME_CURRENCIES: tCommon('errors.SAME_CURRENCIES'),
      NOT_VALID_CURRENCY: tCommon('errors.NOT_VALID_CURRENCY')
    }
  }

  const favoriteExchangeTranslations = {
    title: tConvert('favorite-exchanges.title'),
    card: {
      connector: tConvert('card.connector'),
      link: tConvert('card.link')
    },
    checkboxLabels: {
      checked: tConvert('favorite-exchange-checkbox.labels.checked'),
      noChecked: tConvert('favorite-exchange-checkbox.labels.noChecked'),
    },
    checkboxActionsMessages: {
      add: tConvert('favorite-exchange-checkbox.actions.add'),
      delete: tConvert('favorite-exchange-checkbox.actions.delete')
    },
    emptyMessage: tConvert('favorite-exchanges.empty')
  }

  // Handle params
  const { From, To, Amount } = searchParams;

  const paramsCheck = paramsAuth(From, To);

  return (
    <>
      <section className="relative top-[-250px] bg-slate-50 w-11/12 max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl md:w-full">
        <article className="w-full">
          <Navbar currentPath={Routes.CONVERT} />
        </article>
        <article className="flex flex-col w-full max-w-[600px] m-[75px] px-[25px] md:px-0">
          <CurrencySelector
            labels={currencySelectorTranslations.labels}
            buttonText={currencySelectorTranslations.buttonText}
            errors={currencySelectorTranslations.errors}
          />
          {
            paramsCheck &&
            <ErrorBoundary fallback={<ErrorComponent message={CURRENCY_EXCHANGE_RATE_ERROR} link={errorComponentLink} />}>
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
            <FavoriteExchanges
              title={favoriteExchangeTranslations.title}
              card={favoriteExchangeTranslations.card}
              checkboxLabels={favoriteExchangeTranslations.checkboxLabels}
              checkboxActionsMessages={favoriteExchangeTranslations.checkboxActionsMessages}
              emptyMessage={favoriteExchangeTranslations.emptyMessage}
            />
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