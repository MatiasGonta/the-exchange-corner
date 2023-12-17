import { Button, CurrencySelector, Navbar } from '@/components';

export default async function Home() {

  return (
    <section className="absolute top-[-100px] bg-slate-50 w-full max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl">
      <article className="w-full">
        <Navbar onPage="conversor" />
      </article>
      <article className="flex flex-col w-full max-w-[500px] my-[75px]">
        <CurrencySelector amount={true} />
        <div>
          <Button text="Convert" path={`/convert/?From=USD&To=ARS&Amount=110`} />
        </div>
      </article>
    </section>
  )
}