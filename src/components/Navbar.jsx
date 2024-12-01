import {React , useState} from 'react'
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
const Navbar = ({onSearch}) => {
    const [searchCity, setSearchCity] = useState('');
    const handleSearchClick = () => {
        if(searchCity.trim()){
            onSearch(searchCity);
        }
    }
    return (
        <nav className='flex justify-between items-center p-3'>
            <div className='flex items-center gap-1 m-4'>
                <FilterDramaIcon />
                <p className='font-bold text-xl'>Weather Now!</p>
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
                <Button onClick={handleSearchClick} color='black' endIcon={<SearchIcon/>}>
                    Search
                </Button>
            </div>
            <div className='mr-6'>
                <Button variant='outlined' color='black' startIcon={<GpsFixedIcon/>}>
                    Current Location
                </Button>
            </div>
        </nav>

    )
}

export default Navbar