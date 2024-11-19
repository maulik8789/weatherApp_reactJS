import React from 'react';

const RecentSearch = ({ cityList, handleCityClick }) => {
  return (
    <div>
      <h3 className='recentsearch'>Recent Search:</h3>
      <ul className="listCity">
        {cityList.map((city, index) => (
          <li
            className="city-item"
            key={index}
            onClick={() => handleCityClick(city)}
            style={{
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'underline',
            }}
          >
            {city.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearch;
