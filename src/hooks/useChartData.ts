import { useEffect, useState } from 'react';
import { getChartData } from '../api/getChartData';

export const useChartData = () => {
  const [chartData, setChartData] = useState();

  const loadData = async () => {
    const responseData = await getChartData();
    setChartData(responseData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return chartData;
};
