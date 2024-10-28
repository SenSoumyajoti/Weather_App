const apiKey = 'a91347a2c7d100423d49d9e7f2a933d2'; // OpenWeatherMap API Key
const weatherContainer = document.getElementById('weather-data');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');

// Function to fetch weather data from the API
async function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message); // Display the error if the city is not found
    }
}

// Function to display weather data
function displayWeather(data) {
    const temperature = Math.round(data.main.temp); // Temperature in Celsius
    const city = data.name; // City name
    const humidity = data.main.humidity; // Humidity percentage
    const windSpeed = (data.wind.speed * 3.6).toFixed(2); // Wind speed in km/h (API returns in m/s)
    const weatherIcon = data.weather[0].icon; // Weather icon

    // Update the HTML content with the weather data
    weatherContainer.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" class="weather-icon" alt="Weather Icon">
        <h1 class="temp">${temperature}°C</h1>
        <p class="city">${city}</p>
        <div class="details">
            <div class="col">
                <img src="./icons/humidity.png" class="humidity-png">
                <div>
                    <p class="humidity">${humidity}%</p>
                    <p>humidity</p>
                </div>
            </div>

            <div class="col">
                <img src="./icons/wind.png" class="wind-png">
                <div>
                    <p class="wind">${windSpeed} km/h</p>
                    <p>wind speed</p>
                </div>
            </div>
        </div>
    `;
}

// Event listener for form submission or button click
locationForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload on form submit
    const city = locationInput.value.trim();
    
    if (city !== '') {
        fetchWeather(city); // Fetch weather for the entered city
        locationInput.value = ''; // Clear the input field
    } else {
        alert('Please enter a valid city name');
    }
});

// Initial call to fetch weather for Raniganj when the page loads
window.onload = function () {
    fetchWeather('Raniganj');
};
