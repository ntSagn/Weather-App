import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Ha Noi');
  
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    if (weatherData) {
      console.log(weatherData);
    }
  }, [weatherData]);

  const fetchWeatherData = () => {
    const API_KEY = 'add19c82a47a6a5e35df99fae69aa248'
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
      <Navbar onSearch={handleSearch} />
    </div>
  )
}

export default App;