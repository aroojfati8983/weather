import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './index.css';
function App() {
  let [city, setCity] = useState("");
  let [data, setData] = useState(null);
  let [searched, setSearched] = useState(false);
  let nameCity = (e) => {
    e.preventDefault();
    setSearched(true); 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=63089e68349f64e8b4b91cbe51a111fc&units=metric`)
    
      .then((res) => res.json())
      .then((responseData) => {
        if (responseData.cod !== 200) {
          setData(null); 
        } else {
          setData(responseData);
        }
      })
      .catch(() => {
        setData(null);
      });
  };

  // weather image
  const getWeatherImage = () => {
    if (!data || !data.weather) return null;
    
    const condition = data.weather[0].main.toLowerCase();
    
    if (condition.includes('clear')) {
      return '☀️'; // sunny
    } else if (condition.includes('cloud')) {
      return '☁️'; // clouds
    } else if (condition.includes('rain')) {
      return '🌧️'; // rain
    } else if (condition.includes('snow')) {
      return '❄️'; // snow
    } else if (condition.includes('thunderstorm')) {
      return '⚡'; //light
    } else if (condition.includes('haze') || condition.includes('mist') || condition.includes('fog')) {
      return '🌫️'; // fog
    } else if (condition.includes('wind')) {
      return '💨'; //air
    } else {
      return '🌈'; // ranbow
    }
  };

  //  season color
  const getWeatherColor = () => {
    if (!data || !data.weather) return '#74b9ff';
    
    const condition = data.weather[0].main.toLowerCase();
    
    if (condition.includes('clear')) return '#FFD700';
    if (condition.includes('cloud')) return '#78909C';
    if (condition.includes('rain')) return '#1976D2';
    if (condition.includes('snow')) return '#29B6F6';
    if (condition.includes('haze')) return '#FFA726';
    if (condition.includes('thunderstorm')) return '#FF8F00';
    
    return '#74b9ff';
  };

  return (
    <div className="app-container">
      <form onSubmit={nameCity}>
        <label>City Name:</label>
        <input 
          type="text" 
          placeholder='Enter City Name' 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
        />
        <button><FaSearch /> Search</button>
      </form>

      {data && data.main && (
        <div 
          className="weather-card"
          style={{ 
            background: `linear-gradient(135deg, ${getWeatherColor()} 0%, #0984e3 100%)`,
            color: 'white'
          }}
        >
          <div className="weather-emoji">
            {getWeatherImage()}
          </div>
          <h3>{data.name}<span>{data.sys.country}</span></h3>
          <h2>{data.main.temp}°C</h2>
          <p>{data.weather[0].description}</p>
        </div>
      )}

      {searched && !data && (
        <p className="error-message">No Data found for "{city}"</p>
      )}

      {!searched && (
        <p className="initial-message">Search for a city to see weather</p>
      )}
    </div>
  );
}

export default App;