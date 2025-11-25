import { useEffect, useState } from "react";

// IMPORTANT: this uses your .env value, or falls back to localhost:4000
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Halifax");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        // THIS is the critical line: note API_BASE_URL + /api/weather
        const response = await fetch(
          `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("City not found.");
          }
          throw new Error("Failed to fetch weather data.");
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setWeather(null);
        setError(err.message || "Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <section aria-labelledby="home-heading">
      <div className="text-center py-4">
        <h1 id="home-heading" className="display-5 fw-bold">
          Hi, I’m Sidhantdeep Singh 👋
        </h1>
        <p className="lead mt-3">
          A 4th-year Applied Computer Science student focusing on web
          development and user-centered design.
        </p>
      </div>

      <div className="mt-4">
        <h2 className="h4 mb-3">Current Weather</h2>
        <div className="row g-3 align-items-end">
          <div className="col-sm-4">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              id="city"
              type="text"
              className="form-control"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter city name"
            />
          </div>
        </div>

        <div className="mt-3">
          {loading && <p>Loading weather...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {weather && !loading && !error && (
            <div className="card mt-2" aria-label="Weather information card">
              <div className="card-body">
                <h3 className="card-title h5">{weather.city}</h3>
                <p className="card-text mb-1">
                  <strong>Temperature:</strong> {weather.temperature}°C
                </p>
                <p className="card-text mb-1">
                  <strong>Humidity:</strong> {weather.humidity}%
                </p>
                <p className="card-text mb-0">
                  <strong>Conditions:</strong> {weather.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
