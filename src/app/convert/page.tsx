import { getCurrentExchange } from '@/services';
import { CurrencySelector, Navbar } from '@/components';
import { Routes, TypeWithKey } from '@/models';

interface CurrencyChartsInterface {
    searchParams: TypeWithKey<string>;
}

const CurrencyCharts = async ({ searchParams }: CurrencyChartsInterface) => {
    const { From, To, Amount } = searchParams;
    const conversion = await getCurrentExchange(From, To);
    console.log(conversion);

    return (
        <section className="absolute top-[-100px] bg-slate-50 w-full max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl">
            <article className="w-full">
                <Navbar currentPath={Routes.CONVERT} />
            </article>
            <article className="flex flex-col w-full max-w-[500px] my-[75px]">
                <CurrencySelector path={Routes.CONVERT} from={From} to={To} currencyAmount={Amount} />
                {
                    conversion && (
                        <div>
                            <span>{Amount} {conversion['1. From_Currency Code']} {conversion['2. From_Currency Name']} =</span>
                            <span>{parseInt(conversion['5. Exchange Rate']) * parseInt(Amount)} {conversion['4. To_Currency Name']}</span>
                            <ul>
                                <li>1 {conversion['1. From_Currency Code']} = {parseInt(conversion['5. Exchange Rate'])} {conversion['3. To_Currency Code']}</li>
                            </ul>
                        </div>
                    )
                }
                <div>
                    <span>{conversion['2. From_Currency Name']} to {conversion['4. To_Currency Name']} conversion — Last updated {conversion['6. Last Refreshed']} {conversion['7. Time Zone']}</span>
                </div>
            </article>
        </section>
    )
}

export default CurrencyCharts;