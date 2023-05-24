import axios from 'axios'
import React, {useState} from 'react'

function App() {
  const apiKey = '61654eb8eb14fc8a83289de5371e06d0';

  const [data, setData]= useState({})
  const [location, setLocation] = useState('')

  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

      setLocation('');
    }
  };
  return (
    <div className='app'>
      <h2>QD Weather App</h2>

      <div className='container'>

        <div className='search'>
          <input 
          type='text' 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter City'
          />
        </div>

        <div className='top'>

          <div className='location'>
            <p>{data.name}</p>
          </div>

          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1>:null}
          </div>

          <div className='description'>
            {data.weather ? <p>{data.weather[0].description}</p>:null}
          </div>
        </div>

        {data.name &&
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like} °C</p>:null}
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity} %</p>:null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.main ? <p className='bold'>{data.wind.speed} m/s</p>:null}
            <p>Wind Speed</p>
          </div>
        </div>
        }

      </div>

    </div>
  );
}

export default App;
