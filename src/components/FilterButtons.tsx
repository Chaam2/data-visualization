import { Link, SetURLSearchParams } from 'react-router-dom';

export const FilterButtons = ({ ids, setSearchParams }: IFilterButtonsProp) => {
  return (
    <div>
      <Link to="/">초기화</Link>
      {ids.map((id) => (
        <button
          key={id}
          onClick={() => {
            setSearchParams({ id: id });
          }}
        >
          {id}
        </button>
      ))}
    </div>
  );
};

interface IFilterButtonsProp {
  ids: string[];
  setSearchParams: SetURLSearchParams;
}
