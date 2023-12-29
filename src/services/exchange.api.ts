import { RootDailyResponse, ExchangeRateResponse, RootMonthlyResponse, ErrorMessages } from "@/models";
import axios, { AxiosInstance } from "axios";

const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

const api: AxiosInstance = axios.create({
  baseURL: 'https://www.alphavantage.co',
  params: {
    apikey: API_KEY
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getCurrentExchange(baseCode: string, targetCode: string): Promise<ExchangeRateResponse> {
  try {
    const response = await api.get('/query', {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: baseCode,
        to_currency: targetCode,
      },
    });

    return response.data['Realtime Currency Exchange Rate'];
  } catch (err) {
    console.error(`${ErrorMessages.CURRENCY_EXCHANGE_RATE}: ${err}`);
    throw new Error(ErrorMessages.CURRENCY_EXCHANGE_RATE);
  }
};

  export async function getDailyHistoryExchange(baseCode: string, targetCode: string): Promise<RootDailyResponse> {
    try {
      const response = await api.get('/query', {
        params: {
          function: 'FX_DAILY',
          from_symbol: baseCode,
          to_symbol: targetCode,
          outputsize: 'compact',
          datatype: 'json'
        },
      });

      return response.data;
    } catch (err) {
      console.error(`${ErrorMessages.FX_DAILY}: ${err}`);
      throw new Error(ErrorMessages.FX_DAILY);
    }
  };

  export async function getMonthlyHistoryExchange(baseCode: string, targetCode: string): Promise<RootMonthlyResponse> {
    try {
      const response = await api.get('/query', {
        params: {
          function: 'FX_MONTHLY',
          from_symbol: baseCode,
          to_symbol: targetCode,
          datatype: 'json'
        },
      });

      return response.data;
    } catch (err) {
      console.error(`${ErrorMessages.FX_MONTHLY}: ${err}`);
      throw new Error(ErrorMessages.FX_MONTHLY);
    }
  };