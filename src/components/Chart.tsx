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
} from 'recharts';
import { useChartData } from '../hooks/useChartData';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

export const Chart = () => {
  const chartData = useChartData();
  const uniqueIdsSet = new Set(chartData && chartData.map((data) => data.id));
  const ids = [...uniqueIdsSet];

  return (
    <>
      <div>
        <button>초기화</button>
        {ids.map((id) => (
          <button key={id}>{id}</button>
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
        <Bar dataKey="value_bar" barSize={20} fill="#bde24f" yAxisId="value_bar" />
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
