import { TypeWithKey } from "@/models";

export function lastUpdatedDateFormatted(lastRefresh: string, timeZone: string): string {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const lastUpdatedDate: TypeWithKey<string> = {
        day: lastRefresh.split(' ')[0].split('-')[2],
        month: lastRefresh.split(' ')[0].split('-')[1],
        year: lastRefresh.split(' ')[0].split('-')[0],
        time: lastRefresh.split(' ')[1]
    };

    const lastUpdatedDateFormatted = `${lastUpdatedDate.day} ${monthNames[parseInt(lastUpdatedDate.month) - 1]} ${lastUpdatedDate.year} - ${lastUpdatedDate.time} ${timeZone}`;

    return lastUpdatedDateFormatted;
}