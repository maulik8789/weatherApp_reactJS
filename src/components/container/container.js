import React from 'react';

const Container = ({ data, unit }) => {
  return (
    <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? (
            <h1>{data.main.temp.toFixed()} {unit === 'metric' ? '°C' : '°F'}</h1>
          ) : null}
          {data.weather ? (
            <p>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather description"
              />
            </p>
          ) : null}
        </div>
        <div className="feels">
          {data.main ? (
            <p className="bold">
              Feels Like: {data.main.feels_like.toFixed()}{' '}
              {unit === 'metric' ? '°C' : '°F'}
            </p>
          ) : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>

      {data.name !== undefined && (
        <div className="bottom">
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? (
              <p className="bold">
                {data.wind.speed.toFixed()} {unit === 'metric' ? 'KMPH' : 'MPH'}
              </p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
