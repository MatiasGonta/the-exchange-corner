import React from 'react';
import { getMonthlyHistoryExchange } from '@/services';
import { AreaChart, Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from "@tremor/react";
import { TypeWithKey } from '@/models';
import { getTranslations } from 'next-intl/server';

export default async function MonthlyAreaChart({ from, to }: { from: string, to: string }) {
    const tCurrencyCharts = await getTranslations('CurrencyCharts');

    const response = await getMonthlyHistoryExchange(from, to);

    const monthlyFXData = response["Time Series FX (Monthly)"];

    const monthlyFXDataFormatted: [year: string, TypeWithKey<string>[]][] = [];

    // Dates array
    const allDates: string[] = Object.keys(monthlyFXData);

    let currentYear: string = '';
    let currentYearData: TypeWithKey<string>[] = [];

    allDates.forEach(date => {
        const year = date.split('-')[0];

        if (year !== currentYear) {
            // Change year and add FX data of before year to "monthlyFXDataFormatted"
            if (currentYear !== '') {
                monthlyFXDataFormatted.push([currentYear, currentYearData]);
            }

            // Initialize for new year
            currentYear = year;
            currentYearData = [];
        }

        const exchangeRate: string = monthlyFXData[date]["4. close"];

        // Add FX data of current date
        currentYearData.push({
            date,
            [tCurrencyCharts('charts.monthly.category', { from, to })]: exchangeRate
        });
    });

    // Add last year to "monthlyFXDataFormatted"
    if (currentYear !== '') {
        monthlyFXDataFormatted.push([currentYear, currentYearData]);
    }

    // Colors for each year chart
    const chartsColors = ["green-900", "cyan", "indigo", "amber", "teal", "blue", "red", "emerald", "fuchsia", "pink"];

    return (
        <TabGroup>
            <TabList className="mt-8 pb-[5px] overflow-x-scroll overflow-y-hidden md:overflow-visible md:p-0">
                {
                    monthlyFXDataFormatted.map(([year, fx], index) => (
                        <Tab key={index} className="min-w-[45px] w-[45px] border-b-exchange-corner">{year}</Tab>
                    ))
                }
            </TabList>
            <TabPanels>
                {
                    monthlyFXDataFormatted.map(([year, fx], index) => (
                        <TabPanel key={index}>
                            <Card>
                                <Title>{tCurrencyCharts('charts.monthly.title', { from, to, year })}</Title>
                                <AreaChart
                                    className="h-72 mt-4"
                                    data={fx}
                                    index="date"
                                    categories={[tCurrencyCharts('charts.monthly.category', { from, to })]}
                                    colors={[`${chartsColors[index]}`]}
                                    yAxisWidth={30}
                                    showAnimation={true}
                                />
                            </Card>
                        </TabPanel>
                    ))
                }
            </TabPanels>
        </TabGroup>
    )
}