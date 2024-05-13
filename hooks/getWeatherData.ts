import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;


export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

    
export const getWeatherData = async (location: string) : Promise < WeatherData | null > => {
    console.log(API_KEY)
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        return response.data
      } catch (error) {
        console.error('Error fetching weather:', error);
        return null
      }
    
};


