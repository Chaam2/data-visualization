import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

export const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative block overflow-hidden rounded-lg border border-gray-100  px-6 py-4 bg-white/80	">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-red-300 via-violet-300 to-blue-300"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            🕓 {payload[0].payload.time}
          </h3>
        </div>

        <div className="mt-2">
          <p className="max-w-[40ch] text-sm text-gray-500">📆 {payload[0].payload.date}</p>
          <p className="max-w-[40ch] text-sm text-gray-500">📍 {payload[0].payload.id}</p>
        </div>

        <dl className="mt-4 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">{payload[0].payload.value_area}</dt>
            <dd className="text-xs text-gray-500">영역 차트 값</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">{payload[0].payload.value_bar}</dt>
            <dd className="text-xs text-gray-500">막대 차트 값</dd>
          </div>
        </dl>
      </div>
    );
  }
};
