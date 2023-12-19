import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mundo Divisas',
  description: 'Descubre el mundo de las divisas con Mundo Divisas, tu aplicación líder para realizar conversiones de monedas de manera rápida y precisa. Obtén tasas de cambio en tiempo real, elige entre una amplia variedad de monedas y convierte fácilmente cualquier cantidad. Desde dólares a euros hasta yenes a libras, Mundo Divisas te proporciona las herramientas esenciales para estar siempre al tanto de las fluctuaciones del mercado financiero internacional. Con una interfaz intuitiva y datos actualizados, tu experiencia de conversión de monedas nunca ha sido tan fácil y eficiente. ¡Explora el mundo financiero con Mundo Divisas hoy mismo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <header className="w-full h-[300px] bg-green-900"></header> */}
        {/* <header className="w-full h-[300px] bg-green-900 bg-[linear-gradient(135deg,rgba(20,83,45,1)_25%,rgba(22,101,52,1)_25%,rgba(22,101,52,1)_50%,rgba(20,83,45,1)_50%,rgba(20,83,45,1)_75%,rgba(22,101,52,1)_75%,rgba(22,101,52,1)_100%)] bg-[length:40px_40px] animate-move"></header> */}
        <header className="w-full h-[300px] bg-green-900 bg-[linear-gradient(135deg,rgba(20,83,45,1)_25%,rgba(21,84,46,1)_25%,rgba(21,84,46,1)_50%,rgba(20,83,45,1)_50%,rgba(21,84,46,1)_75%,rgba(21,84,46,1)_75%,rgba(21,84,46,1)_100%)] bg-[length:40px_40px] animate-move"></header>
        <main className="relative flex flex-col items-center justify-between p-24 px-[50px] overflow-hidden sm:overflow-visible">
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  )
}