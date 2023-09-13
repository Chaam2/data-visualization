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
      <div className="self-end text-gray-500	">
        <label htmlFor="date" className="text-sm font-medium mr-1">
          조회 일자 :{' '}
        </label>
        <select
          id="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-1 rounded-md border-gray-300 border-2 text-sm outline-none	"
        >
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
          <XAxis
            dataKey="time"
            scale="auto"
            angle={-30}
            tick={{ dy: 20, dx: -30, fill: '#999999' }}
          />
          <YAxis
            dataKey="value_area"
            orientation="right"
            yAxisId="value_area"
            label={{ value: 'Area', position: 'top', offset: 20, fill: '#fb7aa3' }}
            domain={[0, 150]}
            tick={{ fill: '#fb7aa3' }}
          />
          <YAxis
            dataKey="value_bar"
            yAxisId="value_bar"
            label={{ value: 'Bar', position: 'top', offset: 20, fill: '#5ac5f2' }}
            tick={{ fill: '#5ac5f2' }}
          />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="value_bar" barSize={20} yAxisId="value_bar">
            {chartData?.map((data) => (
              <Cell key={data.id} fill={data.id === selectedId ? '#5ac5f2' : '#5ac4f262'} />
            ))}
          </Bar>
          <Area
            type="monotone"
            dataKey="value_area"
            fill="#ffaed2b9"
            stroke="#fb7aa3"
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
