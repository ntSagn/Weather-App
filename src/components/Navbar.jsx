import { React, useState } from 'react'
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
const Navbar = ({ onSearch, currentLocation }) => {
    const [searchCity, setSearchCity] = useState('');

    const handleSearchClick = () => {
        if (searchCity.trim()) {
            onSearch(searchCity);
        }
    }

    const handleGetCurrentLocation = () => {
        if (currentLocation) {
            onSearch(currentLocation);
        }
    }

    return (
        <nav className='flex justify-between items-center p-3'>
            <div className='flex items-center gap-1 m-4'>
                <img className='w-12' src="/logo.jpg" alt="Logo" />
                <p className='font-bold text-2xl'>Weather Forecast</p>
            </div>

            <div className='w-1/3'>
                <TextField
                    className='w-3/4'
                    label='Search City'
                    variant='outlined'
                    size='small'
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                />
                <Button onClick={handleSearchClick} color='black' endIcon={<SearchIcon />}>
                    Search
                </Button>
            </div>
            <div className='mr-6'>
                <Button onClick={handleGetCurrentLocation} variant='outlined' color='black' startIcon={<GpsFixedIcon />}>
                    Current Location
                </Button>
            </div>
        </nav>

    )
}

export default Navbar