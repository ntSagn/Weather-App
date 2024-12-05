import ExtraWeather from './components/ExtraWeather';
import MainWeather from './components/MainWeather';
import Navbar from './components/Navbar'
import HighlightWeather from './components/HighlightWeather';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Ha Noi');
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDaysForecast, setFiveDaysForecast] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('City not found');
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
        fetchAirQualityData(data?.coord?.lat, data?.coord?.lon);
        fetchFiveDaysForecast(data?.coord?.lat, data?.coord?.lon);
        setError('');
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY1 = import.meta.env.VITE_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY1}`)
      .then((res) => res.json())
      .then((data) => {
        setAirQualityData(data.list[0]);
      })
      .catch((error) => console.log(error));
  }

  const fetchFiveDaysForecast = (lat, lon) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setFiveDaysForecast(data.list);
      })
      .catch((error) => {
        console.log(error)
        setError
      });
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setCity(data.name);
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div>
      <div className='border-b-2'>
        <Navbar onSearch={handleSearch} currentLocation={handleGetCurrentLocation}/>
        {error && (
          <div className='text-red-500 text-center'>
            <Alert severity="error">{error}</Alert>
          </div>
        )}
      </div>

      <div className='flex justify-center container m-auto mt-2'>
        <div className='flex flex-col w-1/5 pt-4'>
          <div>
            <MainWeather weatherData={weatherData} />
          </div>
          <div className='mt-5'>
            <ExtraWeather fiveDaysForecast={fiveDaysForecast} />
          </div>

        </div>
        <div className='w-4/5 pt-4'>
          <div className='bg-gray-500 h-full rounded-3xl'>
            <div className='text-white p-4 h-full'>
              <HighlightWeather weatherData={weatherData} airQualityData={airQualityData} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App;