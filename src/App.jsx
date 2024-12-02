import ExtraWeather from './components/ExtraWeather';
import MainWeather from './components/MainWeather';
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Ha Noi');

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  // Log weather data first time to console and update when weatherData changes
  useEffect(() => {
    if (weatherData) {
      console.log(weatherData);
    }
  }, [weatherData]);

  const fetchWeatherData = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });
  }

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <div>
      <div className='border-b-2'>
        <Navbar onSearch={handleSearch} />
      </div>
      <div className='flex justify-center container m-auto'>
        <div className='flex flex-col w-1/5 pt-4'>
          <div>
            <MainWeather weatherData={weatherData} />
          </div>
          <div className='mt-3'>
            <ExtraWeather />
          </div>
          
        </div>
        <div className='w-4/5 pt-4'>
          <div className='bg-gray-500 h-full rounded-3xl'>
            <p className='text-white p-4'>Map</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App;