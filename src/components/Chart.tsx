import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  Legend,
  Cell,
} from 'recharts';
import { useChartData } from '../hooks/useChartData';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { Link, useSearchParams } from 'react-router-dom';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';

export const Chart = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('id');

  const chartData = useChartData();
  const uniqueIdsSet = new Set(chartData && chartData.map((data) => data.id));
  const ids = [...uniqueIdsSet];

  const handleChartClick = (data: CategoricalChartState) => {
    if (!data.activePayload) return;
    const targetId = data.activePayload[0].payload.id;
    setSearchParams({ id: targetId });
  };

  return (
    <>
      <div>
        <Link to="/">초기화</Link>
        {ids.map((id) => (
          <button
            key={id}
            onClick={() => {
              setSearchParams({ id: id });
            }}
          >
            {id}
          </button>
        ))}
      </div>

      <ComposedChart
        width={1200}
        height={500}
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        onClick={handleChartClick}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="time" scale="band" />
        <YAxis
          dataKey="value_area"
          orientation="right"
          yAxisId="value_area"
          label={{ value: 'value_area', angle: -90, position: 'insideLeft' }}
        />
        <YAxis
          dataKey="value_bar"
          yAxisId="value_bar"
          label={{ value: 'value_bar', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="value_bar" barSize={20} yAxisId="value_bar">
          {chartData?.map((data) => (
            <Cell key={data.id} fill={data.id === selectedId ? '#5ac5f2' : '#bde24f'} />
          ))}
        </Bar>
        <Area
          type="monotone"
          dataKey="value_area"
          fill="#e166a3"
          stroke="#f06aca"
          yAxisId="value_area"
        />
      </ComposedChart>
    </>
  );
};

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p>time:{payload[0].payload.time}</p>
        <p>id:{payload[0].payload.id}</p>
        <p>value_area:{payload[0].payload.value_area}</p>
        <p>value_bar:{payload[0].payload.value_bar}</p>
      </div>
    );
  }
};
