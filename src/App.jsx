import ExtraWeather from './components/ExtraWeather';
import MainWeather from './components/MainWeather';
import Navbar from './components/Navbar'
import HighlightWeather from './components/HighlightWeather';
import { useEffect, useState } from 'react';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Ha Noi');
  const [airQualityData, setAirQualityData] = useState(null);
  // const [fiveDaysForecast, setFiveDaysForecast] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    if (weatherData) {
      fetchAirQualityData(weatherData.coord.lat, weatherData.coord.lon);
    }
  }, [weatherData]);

  // Log weather data first time to console and update when weatherData changes
  useEffect(() => {
    if (weatherData) {
      console.log(weatherData);
    }
    if (airQualityData) {
      console.log(airQualityData);
    }
  }, [weatherData, airQualityData]);

  const fetchWeatherData = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });
  }

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY1 = import.meta.env.VITE_API_KEY1;
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY1}`)
      .then((res) => res.json())
      .then((data) => {
        setAirQualityData(data.list[0]);
      })
      .catch((error) => console.log(error));
  }


  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div>
      <div className='border-b-2'>
        <Navbar onSearch={handleSearch} />
      </div>
      <div className='flex justify-center container m-auto mt-2'>
        <div className='flex flex-col w-1/5 pt-4'>
          <div>
            <MainWeather weatherData={weatherData} />
          </div>
          <div className='mt-5'>
            <ExtraWeather />
          </div>

        </div>
        <div className='w-4/5 pt-4'>
          <div className='bg-gray-500 h-full rounded-3xl'>
            <div className='text-white p-4 h-full'>
              <HighlightWeather weatherData={weatherData} airQualityData={airQualityData}/>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App;