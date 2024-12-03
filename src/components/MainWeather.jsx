import React, { useEffect, useState } from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export const RenderTemperatureIcon = ({ temperatureCelcius }) => {
  if (temperatureCelcius > 30) {
    return <WbSunnyIcon />
  }
  if (temperatureCelcius <= 30 && temperatureCelcius >= 20) {
    return <CloudIcon />
  }
  if (temperatureCelcius < 20 && temperatureCelcius >= 10) {
    return <AcUnitIcon />
  }
  if (temperatureCelcius < 10) {
    return <SevereColdIcon />
  }
}

const MainWeather = ({ weatherData }) => {
  const temperatureCelcius = weatherData?.main?.temp || "Loading...";
  const description = weatherData?.weather[0]?.description || "Loading...";
  const location = weatherData?.name || "Loading...";
  const city = weatherData?.sys?.country || "Loading...";
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  var day = currentTime.getDate();
  var month = currentTime.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = currentTime.getFullYear();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  if (day < 10) {
    day = '0' + day;
  };
  if (month < 10) {
    month = '0' + month;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  };
  if (minutes < 10) {
    minutes = '0' + minutes;
  };
  if (hours < 10) {
    hours = '0' + hours;
  };
  return (
    <div className='w-4/5 bg-gray-500 text-white rounded-3xl p-4'>
      <div className='flex justify-between items-center border-b-2 mb-1'>
        <h3 className='font-semibold'>Now</h3>
        <p className='text-sm font-semibold'>{day}/{month}/{year}</p>
      </div>
      <div>
        <div className='flex items-center text-3xl gap-2'>
          {<RenderTemperatureIcon temperatureCelcius={temperatureCelcius} />}
          <p className='font-semibold'>{temperatureCelcius}°C</p>
        </div>

        <div className='flex items-center mt-1 gap-2'>
          {<DescriptionIcon />}
          <p className='text-sm'>{description}</p>
        </div>

        <div className='flex items-center mt-1 gap-2'>
          {<LocationOnIcon />}
          <p className='text-sm'>{location}, {city}</p>
        </div>

        <div className='flex items-center mt-1 gap-2'>
          {<AccessTimeFilledIcon />}
          <p className='text-sm'>{hours}:{minutes}:{seconds}</p>
        </div>
      </div>
    </div>

  )
}

export default MainWeather