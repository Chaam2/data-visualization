import { useChartData } from '../hooks/useChartData';

export const ChartPage = () => {
  const chartData = useChartData();

  console.log(chartData);

  return <div>ChartPage</div>;
};
