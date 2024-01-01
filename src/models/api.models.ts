import { CountryISOCode } from ".";

// CURRENCY_EXCHANGE_RATE
export interface ExchangeRateResponse {
  '1. From_Currency Code': CountryISOCode;
  '2. From_Currency Name': string;
  '3. To_Currency Code': CountryISOCode;
  '4. To_Currency Name': string;
  '5. Exchange Rate': string;
  '6. Last Refreshed': string;
  '7. Time Zone': string;
  '8. Bid Price': string;
  '9. Ask Price': string;
}

// FX_DAILY
export interface RootDailyResponse {
  'Meta Data': DailyMetaData;
  'Time Series FX (Daily)': TimeSeriesFX;
}

interface DailyMetaData {
  '1. Information': string;
  '2. From Symbol': CountryISOCode;
  '3. To Symbol': CountryISOCode;
  '4. Output Size': string;
  '5. Last Refreshed': string;
  '6. Time Zone': string;
}

// FX_MONTHLY
export interface RootMonthlyResponse {
  'Meta Data': MonthlyMetaData;
  'Time Series FX (Monthly)': TimeSeriesFX;
}

interface MonthlyMetaData {
  '1. Information': string;
  '2. From Symbol': CountryISOCode;
  '3. To Symbol': CountryISOCode;
  '4. Last Refreshed': string;
  '5. Time Zone': string;
}

interface TimeSeriesFX {
  [key: string]: FX;
}

interface FX {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
}