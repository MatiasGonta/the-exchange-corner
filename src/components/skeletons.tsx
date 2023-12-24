export function ExchangeRateDisplaySkeleton() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col my-[20px]">
                <div className="skeleton-fragment w-full max-w-[350px] h-[24px]"></div>
                <div className="skeleton-fragment my-[15px] w-full max-w-[400px] h-[38px]"></div>
                <div className="flex flex-col w-full max-w-[375px] h-[55px]">
                    <div className="skeleton-fragment w-full h-full mb-[5px]"></div>
                    <div className="skeleton-fragment w-full h-full"></div>
                </div>
            </div>
            <div className="h-[36px] w-full max-w-[350px] self-end flex items-center">
                <div className="skeleton-fragment w-[15px] h-[15px] mt-[10px] mr-[15px] rounded-[50%]"></div>
                <div className="skeleton-fragment w-full h-full"></div>
            </div>
        </div>
    )
}

export function FlagIconSkeleton() {
    return (
        <div className="skeleton-fragment w-[32px] h-[24px] absolute left-[10px] top-[12.5px]"></div>
    )
}