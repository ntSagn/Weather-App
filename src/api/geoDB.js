import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEODB_API_KEY;
const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const geoDBClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
});

export const fetchCities = async (query) => {
  try {
    const response = await geoDBClient.get('/cities', {
      params: {
        namePrefix: query,
        limit: 10,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};