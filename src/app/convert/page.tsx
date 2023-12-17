import { getCurrentExchange } from '../services';
import { Button, CurrencySelector, Navbar } from '@/components';

interface CurrencyChartsInterface { }

const CurrencyCharts: React.FC<CurrencyChartsInterface> = () => {
    // const conversion = await getCurrentExchange('USD','ARS');
    // console.log(conversion);

    return (
        <section className="absolute top-[-100px] bg-slate-50 w-full max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl">
            <article className="w-full">
                <Navbar onPage="conversor" />
            </article>
            <article className="flex flex-col w-full max-w-[500px] my-[75px]">
                <CurrencySelector amount={true} />
                {/* {
                    conversion && (
                        <div>
                            <span></span>
                            <span></span>
                            <ul>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    )
                } */}
                <div>
                    <Button text="Convert" path={`/convert/?From=USD&To=ARS&Amount=110`} />
                </div>
            </article>
        </section>
    )
}

export default CurrencyCharts;