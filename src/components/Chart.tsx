import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useChartData } from '../hooks/useChartData';

export const Chart = () => {
  const chartData = useChartData();

  return (
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
      <Tooltip />
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
  );
};
