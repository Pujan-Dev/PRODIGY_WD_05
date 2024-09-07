const cityElement = document.querySelector('.input');
const error = document.querySelector('.error');
const searchButton = document.querySelector('.button');

const API_KEY = '5ec951337c041e5724f542c390fafe09';  // Replace with your API key

searchButton.addEventListener('click', () => {
    const city = cityElement.value;
    checkWeather(city);
});

cityElement.addEventListener('keydown', (key) => {
    if (key.key === 'Enter') {
        const city = cityElement.value;
        checkWeather(city);
    }
});

async function checkWeather(cityName) {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`;

    try {
        const response = await fetch(API_URL);
        if (response.status === 404 ) {
            showError('City not found');
        } else {
            const result = await response.json();
            displayWeather(result);
        }
    } catch (error) {
        showError('Error fetching weather data');
    }
}

function displayWeather(result) {
    document.querySelector('.city').textContent = result.name;
    document.querySelector('.temperature').innerHTML = `${Math.round(result.main.temp)}&deg;C`;
    document.querySelector('.humidity').textContent = `${result.main.humidity}%`;
    document.querySelector('.wind').textContent = `${result.wind.speed} km/h`;

    const weatherIcon = document.querySelector('.weather-icon');
    // OpenWeatherMap icon URL
    weatherIcon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}.png`;
    weatherIcon.alt = result.weather[0].description;

    document.querySelector('.weather').classList.add('active');
    error.style.display = 'none';
}

function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
    cityElement.value = '';
    cityElement.focus();
}
