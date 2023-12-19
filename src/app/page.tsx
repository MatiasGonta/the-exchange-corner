import { CurrencySelector, Navbar } from '@/components';
import { Routes } from '@/models';

export default async function Home() {

  return (
    <section className="absolute top-[-100px] bg-slate-50 w-full max-w-[768px] mx-auto bg-blue shadow-lg flex flex-col items-center rounded-xl">
      <article className="w-full">
        <Navbar currentPath={Routes.CONVERT} />
      </article>
      <article className="flex flex-col w-full max-w-[500px] my-[75px]">
        <CurrencySelector path={Routes.CONVERT} />
      </article>
    </section>
  )
}