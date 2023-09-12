import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

export const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p>날짜 : {payload[0].payload.date}</p>
        <p>시간 : {payload[0].payload.time}</p>
        <p>지역 : {payload[0].payload.id}</p>
        <p>영역 차트 : {payload[0].payload.value_area}</p>
        <p>막대 차트 : {payload[0].payload.value_bar}</p>
      </div>
    );
  }
};
