import { getDailyHistoryExchange } from '@/services';
import { AreaChart, Card, Subtitle, Title } from "@tremor/react";
import { fetchDailyData, lastUpdatedDateFormatted } from '@/utilities';

export default async function DailyAreaChart({ from, to }: { from: string, to: string }) {
  // const response = await getDailyHistoryExchange(from, to);
  const response: any = await fetchDailyData();

  const dailyFXData = Object.entries(response["Time Series FX (Daily)"]);

  // Create FXDaily data array for chart
  const chartData = dailyFXData.map(([date, fx]) => ({
    date,
    [`Tipo de cambio de ${from} a ${to}`]: parseFloat(fx['4. close']),
  }));

  // Exchange data last updated info
  const lastUpdatedDate = lastUpdatedDateFormatted(response["Meta Data"]["5. Last Refreshed"], response["Meta Data"]["6. Time Zone"])

  return (
    <div className="shadow-lg">
      <Card>
        <Title>{`Tipo de cambio de ${from} a ${to} en los últimos 100 días`}</Title>
        <Subtitle>Última actualización {lastUpdatedDate}</Subtitle>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="date"
          categories={[`Tipo de cambio de ${from} a ${to}`]}
          colors={["green-900"]}
          yAxisWidth={30}
          showAnimation={true}
        />
      </Card>
    </div>
  );
}