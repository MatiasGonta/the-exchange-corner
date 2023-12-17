'use client'

import { useRouter } from 'next/navigation';

interface ButtonInterface {
    text: string;
    path: string;
}

const Button: React.FC<ButtonInterface> = ({ text, path }) => {
    const handleNavigation = () => {
        const router = useRouter();
        router.push(path);
    };

    return (
        <button
            type="button"
            className="text-white bg-green-900 font-bold rounded-[0.5rem] text-[1rem] leading-[2rem] px-[2rem] py-[0.7rem] align-center mr-[0.5rem] inline-flex items-center border-none hover:bg-green-800 hover:border-[2px] hover:border-[#222]"
            onClick={handleNavigation}
        >
            <svg
                viewBox="0 0 16 16"
                className="inline w-[1.3rem] h-[1.3rem] mr-[0.75rem]"
                fill="#fff"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"></path>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
            </svg>
            {text}
        </button>
    )
}

export default Button;