import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

export const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
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
