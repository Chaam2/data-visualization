import { useChartData } from '../hooks/useChartData';
import { useSearchParams } from 'react-router-dom';
import { FilterButtons } from '../components/FilterButtons';
import { Chart } from '../components/Chart';

export const ChartPage = () => {
  const chartData = useChartData();
  const [searchParams, setSearchParams] = useSearchParams();
  const uniqueIdsSet = new Set(chartData && chartData.map((data) => data.id));
  const ids = [...uniqueIdsSet];
  const selectedId = searchParams.get('id');

  return (
    <div className="m-9">
      <FilterButtons ids={ids} selectedId={selectedId} setSearchParams={setSearchParams} />
      <Chart chartData={chartData} selectedId={selectedId} setSearchParams={setSearchParams} />
    </div>
  );
};
