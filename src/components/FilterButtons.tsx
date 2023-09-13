import { Link, SetURLSearchParams } from 'react-router-dom';

export const FilterButtons = ({ ids, selectedId, setSearchParams }: IFilterButtonsProp) => {
  return (
    <div className="flex gap-2">
      <Link
        to="/"
        className="flex items-center border bg-white shadow-sm px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg  focus:relative"
      >
        초기화
      </Link>
      <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
        {ids.map((id) => (
          <button
            className={`inline-block rounded-md px-4 py-2 text-sm   focus:relative ${
              id === selectedId
                ? 'text-blue-500 bg-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            key={id}
            onClick={() => {
              setSearchParams({ id: id });
            }}
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  );
};

interface IFilterButtonsProp {
  ids: string[];
  selectedId: string | null;
  setSearchParams: SetURLSearchParams;
}
