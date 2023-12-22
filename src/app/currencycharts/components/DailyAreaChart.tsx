import { getDailyHistoryExchange } from '@/services';
import { AreaChart, Card, Title } from "@tremor/react";
import { fetchDailyData } from '@/utilities';

export default async function DailyAreaChart({ from, to }: { from: string, to: string }) {
  // const response = await getDailyHistoryExchange(from, to);
  const response: any = await fetchDailyData();

  const dailyFXData = Object.entries(response["Time Series FX (Daily)"]);

  // Create FXDaily data array for chart
  const chartData = dailyFXData.map(([date, fx]) => ({
    date,
    [`Exchange from ${from} to ${to}`]: parseFloat(fx['4. close']),
  }));

  return (
    <div className="shadow-lg">
      <Card>
        <Title>{`${from} to ${to} Exchange Rate Over the Last 100 Days`}</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="date"
          categories={[`Exchange from ${from} to ${to}`]}
          colors={["green-900"]}
          yAxisWidth={30}
          showAnimation={true}
        />
      </Card>
    </div>
  );
}