const chartLines = 'w-full h-[2px] mt-[6px]';
const yAxisStyles = 'w-[13px] h-[10px] mr-[5px]';
const xAxisStyles = 'w-1/4 max-w-[70px] h-full';

export function DailyAreaChartSkeleton() {
    return (
        <div className="w-full h-[405px] p-[24px] border border-[#e5e7eb] flex flex-col rounded-lg">
            <div className="skeleton-fragment h-[35px] mb-[10px]"></div>
            <div className="skeleton-fragment w-full max-w-[425px] h-[30px]"></div>
            <div className="w-[215px] h-[20px] my-[30px] flex items-center self-end">
                <div className="skeleton-fragment w-[8px] h-[8px] rounded-full mr-[5px]"></div>
                <div className="skeleton-fragment w-[200px] h-full"></div>
            </div>
            <div className="flex flex-col">
                <div className="flex mb-[60px]">
                    <div className={`skeleton-fragment ${yAxisStyles}`}></div>
                    <div className={`skeleton-fragment ${chartLines}`}></div>
                </div>
                <div className="flex mb-[60px]">
                    <div className={`skeleton-fragment ${yAxisStyles}`}></div>
                    <div className={`skeleton-fragment ${chartLines}`}></div>
                </div>
                <div className="flex mb-[60px]">
                    <div className={`skeleton-fragment ${yAxisStyles}`}></div>
                    <div className={`skeleton-fragment ${chartLines}`}></div>
                </div>
                <div className="flex mb-[15px]">
                    <div className={`skeleton-fragment ${yAxisStyles}`}></div>
                    <div className={`skeleton-fragment ${chartLines}`}></div>
                </div>
                <div className="w-full h-[17px] flex justify-evenly">
                    <div className={`skeleton-fragment ${xAxisStyles}`}></div>
                    <div className={`skeleton-fragment ${xAxisStyles}`}></div>
                    <div className={`skeleton-fragment ${xAxisStyles}`}></div>
                    <div className={`skeleton-fragment ${xAxisStyles}`}></div>
                </div>
            </div>
        </div>
    )
}

export function MonthlyAreaChartSkeleton() {
    return (
        <div className="w-full flex flex-col">
            <div className="w-full max-w-[600px] h-[17px] flex justify-between">
                <div className="skeleton-fragment w-[40px] h-full mr-[24px]"></div>
                <div className="skeleton-fragment w-[40px] h-full mr-[24px]"></div>
                <div className="skeleton-fragment w-[40px] h-full mr-[24px]"></div>
                <div className="skeleton-fragment w-[40px] h-full mr-[24px]"></div>
                <div className="skeleton-fragment w-[40px] h-full mr-[24px]"></div>
                <div className="skeleton-fragment w-[40px] h-full mr-[24px]"></div>
                <div className="skeleton-fragment w-[40px] h-full mr-[24px]"></div>
                <div className="skeleton-fragment w-[40px] h-full"></div>
            </div>
            <div className="w-full h-[1px] mt-[12px] mb-[5px] border-b bg-[#e5e7eb]"></div>
            <div className="w-full h-[380px] p-[24px] border border-[#e5e7eb] flex flex-col rounded-lg">
                <div className="skeleton-fragment h-[28px]"></div>
                <div className="w-[215px] h-[20px] my-[30px] flex items-center self-end">
                    <div className="skeleton-fragment w-[8px] h-[8px] rounded-full mr-[5px]"></div>
                    <div className="skeleton-fragment w-[200px] h-full"></div>
                </div>
                <div className="flex flex-col">
                    <div className="flex mb-[60px]">
                        <div className={`skeleton-fragment ${yAxisStyles}`}></div>
                        <div className={`skeleton-fragment ${chartLines}`}></div>
                    </div>
                    <div className="flex mb-[60px]">
                        <div className={`skeleton-fragment ${yAxisStyles}`}></div>
                        <div className={`skeleton-fragment ${chartLines}`}></div>
                    </div>
                    <div className="flex mb-[60px]">
                        <div className={`skeleton-fragment ${yAxisStyles}`}></div>
                        <div className={`skeleton-fragment ${chartLines}`}></div>
                    </div>
                    <div className="flex mb-[15px]">
                        <div className={`skeleton-fragment ${yAxisStyles}`}></div>
                        <div className={`skeleton-fragment ${chartLines}`}></div>
                    </div>
                    <div className="w-full h-[17px] flex justify-evenly">
                        <div className={`skeleton-fragment ${xAxisStyles}`}></div>
                        <div className={`skeleton-fragment ${xAxisStyles}`}></div>
                        <div className={`skeleton-fragment ${xAxisStyles}`}></div>
                        <div className={`skeleton-fragment ${xAxisStyles}`}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}