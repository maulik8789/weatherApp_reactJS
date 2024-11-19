import React from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

const SearchOut = ({
  search,
  setSearch,
  handleOnChange,
  handleFocus,
  loadOptions,
}) => {
  return (
    <div
      className="searchOut"
      onClick={() => {
        setSearch(null);
      }}
    >
      <AsyncPaginate
        className="citySearch"
        classNamePrefix="custom"
        placeholder="Enter City Name"
        debounceTimeout={1000}
        value={search}
        onChange={handleOnChange}
        onFocus={handleFocus}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default SearchOut;
