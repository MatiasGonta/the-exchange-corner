'use client';

import { ToastContext } from '@/context';
import { CountryISOCode, ToastStatus } from '@/models';
import { getLocalStorage, setLocalStorage } from '@/utilities';
import React, { useContext, useState } from 'react';

interface FavoriteExchangeCheckboxInterface {
    from: CountryISOCode;
    to: CountryISOCode;
    labels: { checked: string, noChecked: string };
    actionMessages: { add: string, delete: string };
}

const FavoriteExchangeCheckbox: React.FC<FavoriteExchangeCheckboxInterface> = ({ from, to, labels, actionMessages }) => {
    const { showToast } = useContext(ToastContext);

    const favoriteExchangesRaw = getLocalStorage('favoriteExchanges');
    const favoriteExchanges: [{ from: CountryISOCode, to: CountryISOCode }] = favoriteExchangesRaw
        ? JSON.parse(favoriteExchangesRaw)
        : [];

    const isFavorite = favoriteExchanges.some((exchange) => exchange.from === from && exchange.to === to);

    const [isChecked, setIsChecked] = useState<boolean>(isFavorite);

    const handleOnChange = () => {
        const favoriteExchangesRaw = getLocalStorage('favoriteExchanges');
        const favoriteExchanges: [{ from: CountryISOCode, to: CountryISOCode }] = favoriteExchangesRaw
            ? JSON.parse(favoriteExchangesRaw)
            : [];

        let newFavoriteExchanges;

        if (!isChecked) {
            newFavoriteExchanges = [{ from, to }, ...favoriteExchanges];

            if (newFavoriteExchanges.length > 6) {
                newFavoriteExchanges.pop();
            }

            setIsChecked(true);
        } else {
            newFavoriteExchanges = favoriteExchanges.filter((exchange) => exchange.from !== from && exchange.to !== to);
            setIsChecked(false);
        }

        setLocalStorage('favoriteExchanges', newFavoriteExchanges);
        
        showToast(ToastStatus.SUCCESS, !isChecked ? actionMessages.add : actionMessages.delete);
    }

    return (
        <div className="cursor-pointer">
            <div className="group block relative cursor-pointer font-[20px] select-none transition-all hover:scale-110">
                <input
                    type="checkbox"
                    name="favorite"
                    checked={isChecked}
                    onChange={handleOnChange}
                    className="peer absolute opacity-0 w-full h-full cursor-pointer"
                />
                <svg
                    viewBox="0 0 256 256"
                    className="top-0 left-0 w-[28px] h-[28px] transition-all animate-dislike stroke-[20px] fill-white peer-[:checked]:animate-like peer-[:checked]:stroke-0 peer-[:checked]:fill-green-900"
                >
                    <rect
                        fill="none"
                        height="256"
                        width="256"
                    ></rect>
                    <path
                        d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                        stroke="#202020"
                        className="fill-inherit"
                    ></path>
                </svg>
                <label
                    htmlFor="favorite"
                    className="absolute opacity-0 invisible z-10 w-auto h-0 bg-[#555] text-[10px] text-white text-center rounded-md top-[125%] left-[-145%] transition-opacity group-hover:opacity-100 group-hover:w-[110px] group-hover:h-auto group-hover:p-[5px] group-hover:visible before:content-[''] before:z-[-1] before:absolute before:top-[-2px] before:left-[47px] before:w-[15px] before:h-[15px] before:rotate-45 before:bg-[#555]"
                >
                    {!isChecked ? labels.checked : labels.noChecked}
                </label>
            </div>
        </div>
    )
}

export default FavoriteExchangeCheckbox