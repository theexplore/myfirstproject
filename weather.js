const apiKey = 'fe47524918159c8da027f923f93a925d'; // Replace this with your actual API key if needed

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const cityName = document.getElementById('city-name');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');


const fetchWeather = () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  // Fetch data from the API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`City not found: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      
      const { name, main, weather, wind } = data;

      
      weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      temperature.textContent = `${main.temp}°C`;
      cityName.textContent = name;
      humidity.textContent = `${main.humidity}%`;
      windSpeed.textContent = `${wind.speed} km/hr`;
    })
    .catch(error => {
      alert(`Error: ${error.message}`);
    });
};


searchBtn.addEventListener('click', fetchWeather);

cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    fetchWeather();
  }
});
