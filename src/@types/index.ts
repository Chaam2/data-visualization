export interface IResponseData {
  [key: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}
export interface IChartData {
  time: string;
  id: string;
  value_area: number;
  value_bar: number;
}
