import { RootDailyResponse, ExchangeRateResponse, RootMonthlyResponse } from "@/models";
import axios, { AxiosInstance } from "axios";
// const API_KEY: string = '61ef191f95f25529bf671b56';

// const api: AxiosInstance = axios.create({
//   baseURL: `https://v6.exchangerate-api.com/v6/${API_KEY}/`,
// });

// export async function currentExchange(baseCode: string, targetCode: string) {
//   const response = await api.get(`/pair/${baseCode}/${targetCode}`);
//   return response;
// };

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
  const response = await api.get('/query', {
    params: {
      function: 'CURRENCY_EXCHANGE_RATE',
      from_currency: baseCode,
      to_currency: targetCode,
    },
  });

  return response.data['Realtime Currency Exchange Rate'];
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
    console.error(err);
    throw new Error('Failed to fetch exchange data.');
  }
};

export async function getMonthlyHistoryExchange(baseCode: string, targetCode: string): Promise<RootMonthlyResponse> {
  const response = await api.get('/query', {
    params: {
      function: 'FX_MONTHLY',
      from_symbol: baseCode,
      to_symbol: targetCode,
      datatype: 'json'
    },
  });

  return response.data;
};