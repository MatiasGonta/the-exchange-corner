import axios, { AxiosInstance } from "axios";

// const API_KEY: string = '61ef191f95f25529bf671b56';

// const api: AxiosInstance = axios.create({
//   baseURL: `https://v6.exchangerate-api.com/v6/${API_KEY}/`,
// });

// export async function currentExchange(baseCode: string, targetCode: string) {
//   const response = await api.get(`/pair/${baseCode}/${targetCode}`);
//   return response;
// };

const API_KEY: string = '25VQX1VBSB8O3VSM';

const api: AxiosInstance = axios.create({
  baseURL: 'https://www.alphavantage.co',
  params: {
    app_id: API_KEY
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getCurrentExchange(baseCode: string, targetCode: string) {
  const response = await api.get('/query', {
    params: {
      function: 'CURRENCY_EXCHANGE_RATE',
      from_currency: baseCode,
      to_currency: targetCode,
    },
  });

  return response;
};

export async function getDailyHistoryExchange(baseCode: string, targetCode: string) {
  const response = await api.get('/query', {
    params: {
      function: 'FX_DAILY',
      from_symbol: baseCode,
      to_symbol: targetCode,
      outputsize: 'compact',
      datatype: 'json'
    },
  });

  return response;
};

export async function getMonthlyHistoryExchange(baseCode: string, targetCode: string) {
  const response = await api.get('/query', {
    params: {
      function: 'FX_MONTHLY',
      from_symbol: baseCode,
      to_symbol: targetCode,
      datatype: 'json'
    },
  });

  return response;
};