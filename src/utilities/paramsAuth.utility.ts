import { countryISOList } from "@/models";

export function paramsAuth( from: string, to: string ): boolean {
    const fromCheck = from && from.length === 3 && from in countryISOList;
    const toCheck = to && to.length === 3 && to in countryISOList;

    if (fromCheck && toCheck) {
        return true;
    } else {
        return false;
    }
}