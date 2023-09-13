import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { CustomTooltip } from '../components/CustomTooltip';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { SetURLSearchParams } from 'react-router-dom';
import { IChartData } from '../@types';
import { useState } from 'react';

export const Chart = ({ chartData, selectedId, setSearchParams }: IChartProp) => {
  const [selectedDate, setSelectedDate] = useState('2023.02.01');
  const handleChartClick = (data: CategoricalChartState) => {
    if (!data.activePayload) return;
    const targetId = data.activePayload[0].payload.id;
    setSearchParams({ id: targetId });
  };
  const uniqueDateSet = new Set(chartData && chartData.map((data) => data.date));
  const dates = [...uniqueDateSet];
  const filteredData = chartData?.filter((data) => data.date === selectedDate);

  return (
    <div className="flex flex-col gap-4">
      <div className="self-end">
        <label htmlFor="date">조회 일자</label>
        <select id="date" onChange={(e) => setSelectedDate(e.target.value)}>
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        <ComposedChart
          data={filteredData}
          margin={{
            top: 40,
            bottom: 40,
          }}
          onClick={handleChartClick}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="time" scale="auto" angle={-30} tick={{ dy: 20, dx: -30 }} />
          <YAxis
            dataKey="value_area"
            orientation="right"
            yAxisId="value_area"
            label={{ value: 'Area', position: 'top', offset: 20 }}
            domain={[0, 150]}
          />
          <YAxis
            dataKey="value_bar"
            yAxisId="value_bar"
            label={{ value: 'Bar', position: 'top', offset: 20 }}
          />
          <Tooltip content={<CustomTooltip />} />

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
      </ResponsiveContainer>
    </div>
  );
};

interface IChartProp {
  chartData: IChartData[] | undefined;
  selectedId: string | null;
  setSearchParams: SetURLSearchParams;
}
