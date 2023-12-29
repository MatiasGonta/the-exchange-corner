'use client';

import { getLocalStorage, setLocalStorage } from '@/utilities';
import React from 'react';
import { CountryISOCode, Routes, countryISOList } from '@/models';
import { FavoriteExchangeCheckbox } from '../FavoriteExchangeCheckbox';
import Image from 'next/image';
import Link from 'next/link';

interface FavoriteExchangesInterface { }

const FavoriteExchanges: React.FC<FavoriteExchangesInterface> = () => {
  const favoriteExchangesRaw = getLocalStorage('favoriteExchanges');
  const favoriteExchanges: [{ from: CountryISOCode, to: CountryISOCode }] = favoriteExchangesRaw ? JSON.parse(favoriteExchangesRaw) : [];

  return (
    <div className="full flex flex-col items-center">
      <h3 className="text-green-900 text-[25px] font-bold">Tus tipos de cambio favoritos</h3>
      <div className="max-w-[200px] mt-[25px] grid gap-[20px] grid-cols-1 grid-rows-auto rounded-xl sm:grid-cols-2 sm:max-w-[415px] md:grid-cols-3 md:max-w-[640px]">
        {
          favoriteExchanges.map((exchange, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-center items-center text-[18px] text-exchange-corner-light font-bold bg-white w-[200px] h-fit p-[10px] border border-[#ddd] border-t-[5px] border-t-green-900 rounded-lg shadow-lg"
            >
              <div className="self-end">
                <FavoriteExchangeCheckbox from={exchange.from} to={exchange.to} />
              </div>
              <div className="flex justify-between items-center w-[125px] h-full">
                <div>
                  <Image
                    src={`https://flagicons.lipis.dev/flags/4x3/${countryISOList[exchange.from].toLowerCase()}.svg`}
                    alt={exchange.from}
                    width={32}
                    height={32}
                    className="w-auto h-auto max-w-[32px] max-h-[24px] border border-[#ccc] mx-auto rounded"
                  />
                  <span>{exchange.from}</span>
                </div>
                <span className="font-normal">a</span>
                <div>
                  <Image
                    src={`https://flagicons.lipis.dev/flags/4x3/${countryISOList[exchange.to].toLowerCase()}.svg`}
                    alt={exchange.to}
                    width={32}
                    height={32}
                    className="w-auto h-auto max-w-[32px] max-h-[24px] border border-[#ccc] mx-auto rounded"
                  />
                  <span>{exchange.to}</span>
                </div>
              </div>
              <div className="self-end text-green-900 relative before:transition-all before:absolute before:bottom-[2px] before:left-1/2 before:translate-x-1/2 before:content-[''] before:invisible before:w-0 before:h-[2px] before:bg-green-900 hover:before:visible hover:before:left-0 hover:before:translate-x-0 hover:before:w-full">
                <Link href={`${Routes.CONVERT}?From=${exchange.from}&To=${exchange.to}&Amount=1`}>Ver</Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default FavoriteExchanges