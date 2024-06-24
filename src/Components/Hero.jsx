import { useState, useEffect } from "react";
import axios from "axios";
import "./Hero.css";

const Hero = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
              params: {
                q: city,
                appid: "983923c3fed3590893a7bf30ff519d5c",
                units: "metric",
              },
            }
          );
          setWeather(response.data);
          setError(null);
        } catch (err) {
          setError("Failed to fetch weather data");
          setWeather(null);
        }
      };

      const fetchForecast = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast`,
            {
              params: {
                q: city,
                appid: "983923c3fed3590893a7bf30ff519d5c",
                units: "metric",
                cnt: 48,
              },
            }
          );
          const filteredForecast = [];
          const uniqueDays = new Set();
          response.data.list.forEach((entry) => {
            const date = new Date(entry.dt * 1000);
            const day = date.toLocaleDateString("en-US", { weekday: "long" });
            if (!uniqueDays.has(day)) {
              uniqueDays.add(day);
              filteredForecast.push(entry);
            }
          });
          setForecast({ list: filteredForecast });
          setError(null);
        } catch (err) {
          setError("Failed to fetch forecast data");
          setForecast(null);
        }
      };

      const fetchBackgroundImage = async () => {
        try {
          const response = await axios.get(
            `https://api.unsplash.com/photos/random`,
            {
              params: {
                query: city,
                client_id: "W1eJ_D4IEhblOsfW9ykmC8KlfjhPGvzat_U5_fG1r_E",
              },
            }
          );
          setBackgroundImage(response.data.urls.full);
        } catch (err) {
          console.error("Failed to fetch background image");
          setBackgroundImage(null);
        }
      };

      fetchWeather();
      fetchForecast();
      fetchBackgroundImage();
    }
  }, [city]);

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <main
      className="main"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {weather ? (
        <div className="weather-info mb-5">
          <h2 className="my-4">{`Weather in ${city}`}</h2>
          <p className="display-4">{`${weather.main.temp} °C`}</p>
          <p>{`${weather.weather[0].description}`}</p>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <p>Enter a city to get the weather information.</p>
      )}
      {forecast && (
        <div className="forecast">
          <h3 className="text-center mb-4">Weekly Forecast</h3>
          <div className="row justify-content-center">
            {forecast.list.map((day, index) => (
              <div key={index} className="col-md-2">
                <div className="card text-center">
                  <div className="card-body">
                    <p className="card-title">{getDayName(day.dt)}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                      className="card-img-top"
                    />
                    <p className="card-text">{`${day.main.temp} °C`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Hero;
