import { CountryISOCode, countryISOList } from "@/models";
import { useTranslations } from "next-intl";
import Image from 'next/image';

interface ExchangeRateComparisonTableInterface {
    fromName: string;
    toName: string;
    fromCode: CountryISOCode;
    toCode: CountryISOCode;
    exchangeRate: number;
}

const ExchangeRateComparisonTable: React.FC<ExchangeRateComparisonTableInterface> = ({ fromName, toName, fromCode, toCode, exchangeRate }) => {
    const tConvert = useTranslations('Convert');

    const exchangeAmounts = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000];

    return (
        <div className="w-full text-center shadow-lg rounded-xl pb-[15px] overflow-hidden">
            <table className="w-full">
                <thead className="bg-exchange-corner-green-light text-exchange-corner-light">
                    <tr className="h-[75px]">
                        <th colSpan={2}>{tConvert('exchange-rate-display.table.title', { fromName, toName })}</th>
                    </tr>
                    <tr className="w-full h-[34px] border-b border-t border-[#ddd]">
                        <th>
                            <div className="flex justify-center items-center w-full">
                                <Image
                                    src={`https://flagicons.lipis.dev/flags/4x3/${countryISOList[fromCode].toLowerCase()}.svg`}
                                    alt={fromName}
                                    width={32}
                                    height={32}
                                    className="w-auto h-auto max-w-[32px] max-h-[24px] mr-[10px] border border-[#ccc] rounded"
                                />
                                <span className="h-[20px]">{fromCode}</span>
                            </div>
                        </th>
                        <th>
                            <div className="flex justify-center items-center w-full">
                                <Image
                                    src={`https://flagicons.lipis.dev/flags/4x3/${countryISOList[toCode].toLowerCase()}.svg`}
                                    alt={toName}
                                    width={32}
                                    height={32}
                                    className="w-auto h-auto max-w-[32px] max-h-[24px] mr-[10px] border border-[#ccc] rounded"
                                />
                                <span className="h-[20px]">{toCode}</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-[14px]">
                    {
                        exchangeAmounts.map((amount, index) => (
                            <tr key={index} className="h-[35px]">
                                <td className="w-1/2 text-green-900 font-semibold">{amount} {fromCode}</td>
                                <td className="w-1/2">{(exchangeRate * amount).toFixed(2)} {toCode}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExchangeRateComparisonTable