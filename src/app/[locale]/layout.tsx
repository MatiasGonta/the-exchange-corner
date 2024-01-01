import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LangSwitch, Toast } from '@/components';
import { Routes, TypeWithKey } from '@/models';
import { ToastProvider } from '@/context';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const tCommon = await getTranslations('Common');

  return {
    title: 'The Exchange Corner',
    description: tCommon('metadata.description')
  }
}

interface RootLayoutInterface {
  children: React.ReactNode,
  params: TypeWithKey<string>
}

export default function RootLayout({ children, params }: RootLayoutInterface) {
  const { locale } = params;

  const tCommon = useTranslations('Common');

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/the-exchange-corner-logo.ico"></link>
      </head>
      <body className={`${inter.className} relative text-exchange-corner`}>
        <ToastProvider>
          <Toast />

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

          <main className="relative min-h-[600px] flex flex-col items-center justify-between p-24 px-[50px]">
            {children}
          </main>

          <footer className="w-full bg-green-900">
            <div className="w-full max-w-[1200px] flex flex-col mx-auto py-[50px] px-[25px] text-[18px] text-white sm:flex-row sm:justify-between">
              <div className="w-fit mx-auto mb-[35px] sm:m-0">
                <Image
                  src="/the-exchange-corner-logo-white.png"
                  width={100}
                  height={100}
                  alt="the-exchange-corner-logo"
                  className="w-[140px] h-[80px]"
                />
              </div>
              <div className="w-fit mx-auto mb-[35px] sm:m-0">
                <h2 className="font-bold mb-[5px]">{tCommon('footer.nav')}</h2>
                <ul className="text-[16px]">
                  <li className="w-fit relative before:transition-all before:absolute before:bottom-[2px] before:left-1/2 before:translate-x-1/2 before:content-[''] before:w-0 before:h-[1px] before:bg-white hover:before:left-0 hover:before:translate-x-0 hover:before:w-full">
                    <Link href={`/${locale}${Routes.CONVERT}`}>{tCommon('links.convert')}</Link>
                  </li>
                  <li className="w-fit relative before:transition-all before:absolute before:bottom-[2px] before:left-1/2 before:translate-x-1/2 before:content-[''] before:w-0 before:h-[1px] before:bg-white hover:before:left-0 hover:before:translate-x-0 hover:before:w-full">
                    <Link href={`/${locale}${Routes.CURRENCY_CHARTS}`}>{tCommon('links.graphs')}</Link>
                  </li>
                </ul>
              </div>
              <div className="w-fit mx-auto sm:m-0">
                <div className="flex flex-col-reverse justify-between items-center mx-auto mb-[5px] sm:mx-0 sm:flex-row">
                  <div className="flex justify-between w-[115px]">
                    {/* Facebook */}
                    <div className="w-[32px] h-[32px] rounded-full cursor-pointer hover:shadow-[0px_0px_8px_1px_rgba(21,128,61,0.75)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        data-id="icon-facebook"
                        viewBox="0 0 40 40"
                      >
                        <g fill="#fff">
                          <path d="M33.542 7.5a1.042 1.042 0 110-2.084 1.042 1.042 0 010 2.084zm2.825 1.012A19.868 19.868 0 0140 20c0 11.028-8.972 20-20 20S0 31.028 0 20 8.972 0 20 0a19.87 19.87 0 0111.488 3.634.833.833 0 01-.959 1.362A18.214 18.214 0 0020 1.667C9.89 1.667 1.667 9.891 1.667 20 1.667 30.11 9.89 38.334 20 38.334c10.11 0 18.333-8.225 18.333-18.334a18.21 18.21 0 00-3.33-10.53.833.833 0 111.364-.958z"></path>
                          <path d="M25.198 21.603l.57-4.44H21.37v-2.835c0-1.285.353-2.164 2.198-2.164h2.362V8.19A31.38 31.38 0 0022.483 8c-3.388 0-5.707 2.069-5.707 5.87v3.277H13v4.44h3.793V33h4.586V21.603h3.82z"></path>
                        </g>
                      </svg>
                    </div>

                    {/* Twitter */}
                    <div className="w-[32px] h-[32px] rounded-full cursor-pointer hover:shadow-[0px_0px_8px_1px_rgba(21,128,61,0.75)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        data-id="icon-twitter"
                        viewBox="0 0 40 40"
                      >
                        <g fill="#fff">
                          <path d="M33.542 7.5a1.042 1.042 0 110-2.084 1.042 1.042 0 010 2.084zm2.825 1.012A19.868 19.868 0 0140 20c0 11.028-8.972 20-20 20S0 31.028 0 20 8.972 0 20 0a19.87 19.87 0 0111.488 3.634.833.833 0 01-.959 1.362A18.214 18.214 0 0020 1.667C9.89 1.667 1.667 9.891 1.667 20 1.667 30.11 9.89 38.334 20 38.334c10.11 0 18.333-8.225 18.333-18.334a18.21 18.21 0 00-3.33-10.53.833.833 0 111.364-.958z"></path>
                          <path d="M31.102 14.21a9.05 9.05 0 01-2.593.743 4.538 4.538 0 001.997-2.506 9.059 9.059 0 01-2.861 1.063 4.538 4.538 0 00-7.78 4.14 12.862 12.862 0 01-9.344-4.736 4.538 4.538 0 001.4 6.05 4.512 4.512 0 01-2.03-.553 4.538 4.538 0 003.638 4.443 4.564 4.564 0 01-2.057.07 4.538 4.538 0 004.236 3.145 9.093 9.093 0 01-5.628 1.937c-.36 0-.721-.02-1.08-.06A12.897 12.897 0 0028.88 17.08v-.588a9.232 9.232 0 002.222-2.282z"></path>
                        </g>
                      </svg>
                    </div>

                    {/* Instagram */}
                    <div className="w-[32px] h-[32px] rounded-full cursor-pointer hover:shadow-[0px_0px_8px_1px_rgba(21,128,61,0.75)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        data-id="icon-instagram"
                        viewBox="0 0 32 32"
                      >
                        <g fill="#fff">
                          <path d="M26.4001 6.40005C26.8419 6.40005 27.2001 6.04188 27.2001 5.60005C27.2001 5.15822 26.8419 4.80005 26.4001 4.80005C25.9583 4.80005 25.6001 5.15822 25.6001 5.60005C25.6001 6.04188 25.9583 6.40005 26.4001 6.40005Z"></path>
                          <path d="M16.0031 31.9999C12.6393 31.9995 9.36114 30.9391 6.63444 28.9692C3.90773 26.9993 1.87115 24.2203 0.814066 21.0269C-0.243021 17.8335 -0.266852 14.3881 0.745959 11.1804C1.75877 7.9727 3.75671 5.16573 6.4559 3.15834C9.15563 1.15135 12.4194 0.0466892 15.7831 0.00144728C19.1468 -0.0437946 22.4392 0.972689 25.1919 2.90634C25.3365 3.00807 25.4348 3.16308 25.4651 3.33727C25.4954 3.51145 25.4552 3.69054 25.3535 3.83514C25.2518 3.97973 25.0968 4.07799 24.9226 4.1083C24.7484 4.1386 24.5693 4.09847 24.4247 3.99674C18.1959 -0.376065 9.6583 0.740736 4.7631 6.56874C-0.132897 12.3967 0.239902 20.9999 5.6223 26.3831C11.0031 31.7655 19.6063 32.1391 25.4327 27.2423C31.2599 22.3463 32.3767 13.8063 28.0039 7.57674C27.9021 7.43225 27.8618 7.25322 27.8919 7.07903C27.9221 6.90485 28.0202 6.74978 28.1647 6.64794C28.3092 6.54609 28.4882 6.50582 28.6624 6.53597C28.8366 6.56613 28.9917 6.66425 29.0935 6.80873C30.7769 9.20545 31.77 12.0183 31.9647 14.9406C32.1594 17.863 31.5481 20.7827 30.1975 23.3815C28.8473 25.98 26.8096 28.1578 24.3066 29.6775C21.8036 31.1973 18.9314 32.0006 16.0031 31.9999Z"></path>
                          <path d="M12.2726 7.06294C11.315 7.10812 10.6611 7.26095 10.0894 7.48559C9.49772 7.71617 8.99623 8.02559 8.49727 8.52636C7.9983 9.02712 7.69104 9.52897 7.46208 10.1215C7.2405 10.6945 7.09038 11.349 7.04808 12.3071C7.00577 13.2653 6.99641 13.5733 7.00109 16.0173C7.00577 18.4614 7.01657 18.7677 7.06302 19.7279C7.10874 20.6853 7.26102 21.3391 7.48566 21.9109C7.7166 22.5026 8.02566 23.0039 8.52661 23.5031C9.02755 24.0022 9.52904 24.3087 10.123 24.5381C10.6955 24.7593 11.3501 24.9101 12.3081 24.9521C13.2661 24.994 13.5744 25.0037 16.0177 24.999C18.4611 24.9944 18.7687 24.9836 19.7287 24.938C20.6886 24.8925 21.339 24.7391 21.911 24.5156C22.5027 24.2841 23.0043 23.9756 23.5031 23.4744C24.0019 22.9733 24.309 22.4711 24.5378 21.8782C24.7595 21.3058 24.9102 20.6511 24.9518 19.6939C24.9937 18.7332 25.0036 18.4265 24.9989 15.9828C24.9943 13.5391 24.9833 13.2327 24.9377 12.2729C24.8922 11.3131 24.7397 10.6614 24.5153 10.0891C24.284 9.49747 23.9753 8.99652 23.4745 8.49702C22.9737 7.99751 22.4712 7.69061 21.8784 7.46237C21.3057 7.24079 20.6514 7.08976 19.6934 7.04836C18.7354 7.00696 18.4271 6.99634 15.9828 7.00102C13.5386 7.0057 13.2326 7.01614 12.2726 7.06294ZM12.3777 23.333C11.5002 23.2948 11.0238 23.149 10.7063 23.0269C10.2858 22.8649 9.98624 22.6691 9.6698 22.3557C9.35336 22.0423 9.15896 21.7417 8.99479 21.3221C8.87149 21.0046 8.72299 20.5287 8.68195 19.6512C8.63731 18.7028 8.62795 18.418 8.62273 16.0152C8.61751 13.6123 8.62669 13.3279 8.66827 12.3791C8.70571 11.5023 8.85241 11.0253 8.97427 10.708C9.13628 10.287 9.3314 9.98797 9.6455 9.67171C9.9596 9.35545 10.2593 9.16069 10.6793 8.99652C10.9964 8.87268 11.4723 8.72544 12.3495 8.68368C13.2986 8.63868 13.583 8.62968 15.9855 8.62446C18.388 8.61924 18.6731 8.62824 19.6226 8.67C20.4994 8.70816 20.9766 8.85342 21.2936 8.976C21.7143 9.13801 22.0136 9.33259 22.3299 9.64723C22.6461 9.96187 22.8411 10.2605 23.0052 10.6813C23.1293 10.9976 23.2765 11.4733 23.3179 12.351C23.3631 13.3002 23.3733 13.5848 23.3777 15.9871C23.382 18.3894 23.3735 18.6747 23.3319 19.6231C23.2936 20.5006 23.1482 20.9773 23.0259 21.2951C22.8639 21.7155 22.6686 22.0152 22.3543 22.3312C22.0401 22.6473 21.7407 22.8421 21.3206 23.0062C21.0038 23.1299 20.5273 23.2775 19.6509 23.3193C18.7018 23.3639 18.4174 23.3733 16.014 23.3785C13.6106 23.3837 13.3271 23.374 12.3779 23.333M19.7148 11.1898C19.7152 11.4035 19.7789 11.6122 19.8978 11.7896C20.0168 11.967 20.1858 12.1052 20.3833 12.1866C20.5808 12.268 20.798 12.289 21.0074 12.2469C21.2169 12.2049 21.4091 12.1017 21.5599 11.9503C21.7107 11.799 21.8132 11.6064 21.8545 11.3968C21.8957 11.1872 21.8739 10.97 21.7918 10.7728C21.7097 10.5756 21.5709 10.4072 21.3931 10.2889C21.2152 10.1705 21.0063 10.1076 20.7927 10.108C20.5063 10.1086 20.2319 10.2229 20.0297 10.4258C19.8276 10.6286 19.7143 10.9035 19.7148 11.1898ZM11.3789 16.009C11.384 18.5615 13.4569 20.6259 16.0087 20.621C18.5606 20.6162 20.6265 18.5435 20.6217 15.991C20.6168 13.4386 18.5434 11.3736 15.9911 11.3787C13.4389 11.3837 11.3741 13.457 11.3789 16.009ZM13 16.0058C12.9988 15.4124 13.1736 14.8321 13.5023 14.338C13.831 13.844 14.2988 13.4586 14.8465 13.2304C15.3943 13.0023 15.9974 12.9417 16.5796 13.0563C17.1617 13.1709 17.6969 13.4555 18.1173 13.8743C18.5377 14.293 18.8245 14.827 18.9414 15.4087C19.0583 15.9905 19.0001 16.5938 18.7741 17.1425C18.5481 17.6911 18.1645 18.1604 17.6718 18.491C17.1791 18.8217 16.5994 18.9988 16.006 18.9999C15.6121 19.0008 15.2218 18.924 14.8575 18.7739C14.4931 18.6239 14.162 18.4036 13.8828 18.1255C13.6037 17.8475 13.382 17.5172 13.2306 17.1535C13.0791 16.7898 13.0007 16.3998 13 16.0058Z"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="mb-[10px] sm:mb-0">
                    <LangSwitch />
                  </div>
                </div>
                <p>© 2023 The Exchange Corner Inc.</p>
              </div>
            </div>
          </footer>
        </ToastProvider>
      </body>
    </html>
  )
}