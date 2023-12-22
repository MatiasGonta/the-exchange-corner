import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Exchange Corner',
  description: 'Descubre el mundo de las divisas con The Exchange Corner, tu aplicación líder para realizar conversiones de monedas de manera rápida y precisa. Obtén tasas de cambio en tiempo real, elige entre una amplia variedad de monedas y convierte fácilmente cualquier cantidad. Desde dólares a euros hasta yenes a libras, Mundo Divisas te proporciona las herramientas esenciales para estar siempre al tanto de las fluctuaciones del mercado financiero internacional. Con una interfaz intuitiva y datos actualizados, tu experiencia de conversión de monedas nunca ha sido tan fácil y eficiente. ¡Explora el mundo financiero con Mundo Divisas hoy mismo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/the-exchange-corner-logo.ico"></link>
      </head>
      <body className={`${inter.className} relative text-exchange-corner`}>
        <header className="w-full h-[300px] flex items-end bg-green-900 bg-[linear-gradient(135deg,rgba(20,83,45,1)_25%,rgba(21,84,46,1)_25%,rgba(21,84,46,1)_50%,rgba(20,83,45,1)_50%,rgba(21,84,46,1)_75%,rgba(21,84,46,1)_75%,rgba(21,84,46,1)_100%)] bg-[length:40px_40px] animate-move">
          <div className="flex justify-center w-full h-[250px]">
            <div className="flex items-center h-fit">
              <Image
                src="/the-exchange-corner-logo-white.png"
                width={75}
                height={75}
                alt="the-exchange-corner-logo"
                className="w-[100px] h-[55px]"
              />
              <h1 className="ml-[-5px] text-[25px] text-[#f8fafc] font-medium">The Exchange Corner</h1>
            </div>
          </div>
        </header>
        <main className="relative flex flex-col items-center justify-between p-24 px-[50px]">
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  )
}