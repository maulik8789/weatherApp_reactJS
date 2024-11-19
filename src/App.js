import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from "./components/search/search";
import Container from './components/container/container';
import {API_URL, API_KEY} from './getOptions';
// import Forecast from './components/forecast/forecast'; //TODO

var unit = 'metric'; //default weather unit
var cityName='';

function App() {
  const [data, setData] = useState({})
  const [timeOfDay, setTimeOfDay] = useState('day'); // 'day' or 'night'
  const [weatherCondition, setWeatherCondition] = useState('clear');
  // const [forecast, setForecast] = useState(null); //TODO 


  const onHandleSearchChange = (searchData, units) =>{
    cityName=searchData.label.split(",")[0]
    unit=units
    const [lat, lon] = searchData.value.split(" ");
    const url = `${API_URL}/weather?q=${searchData.label.split(",")[0]}&units=${units}&appid=${API_KEY}`

    axios.get(url).then((response) => {
      setData(response.data)
      // console.log('resp is ',response.data)
      if (data.cod !== '400'){
        if (response.data.dt >= response.data.sys.sunrise && response.data.dt < response.data.sys.sunset ){
          setTimeOfDay('day'); 
        }
        else{
          setTimeOfDay('night');
        }

        let condition='';
        if (response.data.weather[0].id > 700 && response.data.weather[0].id < 782){
          condition='haze';
        }
        else{
          condition = response.data.weather[0].main.toLowerCase(); // Example condition
        }
        // console.log('weather data ',response.data.weather[0], condition);
        setWeatherCondition(condition);
      }

      const forecastFetch = fetch(
        `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      Promise.all([forecastFetch])
        .then(async (response) => {
          // const forcastResponse = await response[1].json(); //TODO
          // setForecast({ city: searchData.label, ...forcastResponse }); //TODO
        })
        .catch(console.log);
    })
  }

    const fetchDataWithCache = async (key, fetchFunction) => {
      const cachedData = localStorage.getItem(key);
      if (cachedData) {
          return JSON.parse(cachedData);
      }
      const data = await fetchFunction();
      localStorage.setItem(key, JSON.stringify(data));
      return data;
  };
  

  useEffect(() => {
      const fetchData = async () => {
          const data = await fetchDataWithCache('userData', async () => {
              const response = await fetch(`${API_URL}/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`);
              return response.json();
          });
          console.log('data is: \n', data);
      };
      fetchData();
  }, []);

  return (
    <div className={`app ${timeOfDay} ${weatherCondition}`}>
      <Search onSearchChange={onHandleSearchChange} unitSet={unit}/>
      <Container data={data} unit={unit} />
       {/* <Forecast />  TODO */}
    </div>
  );
}

export default App;