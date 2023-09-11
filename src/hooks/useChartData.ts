import { useEffect, useState } from 'react';
import { getChartData } from '../api/getChartData';
import { IChartData, IResponseData } from '../@types';

export const useChartData = () => {
  const [chartData, setChartData] = useState<IChartData[]>();

  const loadData = async () => {
    const responseData: IResponseData = await getChartData();
    const convertedData =
      responseData &&
      Object.entries(responseData).map(([time, data]) => {
        return {
          time,
          id: data.id,
          value_area: data.value_area,
          value_bar: data.value_bar,
        };
      });

    setChartData(convertedData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return chartData;
};
