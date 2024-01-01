import { getDailyHistoryExchange } from '@/services';
import { AreaChart, Card, Subtitle, Title } from "@tremor/react";
import { lastUpdatedDateFormatted } from '@/utilities';
import { getTranslations } from 'next-intl/server';

export default async function DailyAreaChart({ from, to }: { from: string, to: string }) {
  const tCurrencyCharts = await getTranslations('CurrencyCharts');

  const response = await getDailyHistoryExchange(from, to);;

  const dailyFXData = Object.entries(response["Time Series FX (Daily)"]);

  // Create FXDaily data array for chart
  const chartData = dailyFXData.map(([date, fx]) => ({
    date,
    [tCurrencyCharts('charts.daily.category', { from, to })]: parseFloat(fx['4. close']),
  }));

  // Exchange data last updated info
  const lastUpdatedDate = lastUpdatedDateFormatted(response["Meta Data"]["5. Last Refreshed"], response["Meta Data"]["6. Time Zone"])

  return (
    <div className="shadow-lg">
      <Card>
        <Title>{tCurrencyCharts('charts.daily.title', { from, to })}</Title>
        <Subtitle>{tCurrencyCharts('charts.daily.subtitle')} {lastUpdatedDate}</Subtitle>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="date"
          categories={[tCurrencyCharts('charts.daily.category', { from, to })]}
          colors={["green-900"]}
          yAxisWidth={30}
          showAnimation={true}
        />
      </Card>
    </div>
  );
}