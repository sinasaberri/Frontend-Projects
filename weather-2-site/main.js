// DOM Elements
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const locationBtn = document.getElementById('location-btn');
        const weatherCard = document.getElementById('weather-card');
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const errorMessage = document.getElementById('error-message');
        const themeToggle = document.getElementById('theme-toggle');
        const unitToggle = document.getElementById('unit-toggle');
        const tempUnit = document.getElementById('temp-unit');
        
        // Weather elements
        const cityName = document.getElementById('city-name');
        const weatherDesc = document.getElementById('weather-desc');
        const tempValue = document.getElementById('temp-value');
        const weatherIcon = document.getElementById('weather-icon');
        const feelsLike = document.getElementById('feels-like');
        const humidity = document.getElementById('humidity');
        const wind = document.getElementById('wind');
        const pressure = document.getElementById('pressure');
        const forecastContainer = document.getElementById('forecast-container');
        
        // State variables
        let isCelsius = true;
        let darkMode = false;

        // Initialize the app
        function init() {
            // Check for saved theme preference
            if (localStorage.getItem('darkMode') === 'true') {
                darkMode = true;
                document.body.classList.add('dark-mode');
                themeToggle.checked = true;
            }
            
            // Check for saved unit preference
            if (localStorage.getItem('tempUnit') === 'F') {
                isCelsius = false;
                tempUnit.textContent = '°F';
                unitToggle.checked = true;
            }
            
            // Load last searched city
            const lastCity = localStorage.getItem('lastCity');
            if (lastCity) {
                searchWeather(lastCity);
            } else {
                // Try to get user's location
                getUserLocation();
            }
            
            // Event listeners
            searchForm.addEventListener('submit', handleSearch);
            locationBtn.addEventListener('click', getUserLocation);
            themeToggle.addEventListener('change', toggleTheme);
            unitToggle.addEventListener('change', toggleUnit);
            tempUnit.addEventListener('click', toggleUnit);
        }
        
        // Handle search form submission
        function handleSearch(e) {
            e.preventDefault();
            const city = searchInput.value.trim();
            if (city) {
                searchWeather(city);
                searchInput.value = '';
            }
        }
        
        // Get user's current location
        function getUserLocation() {
            if (navigator.geolocation) {
                loading.style.display = 'block';
                weatherCard.style.display = 'none';
                error.style.display = 'none';
                
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherByCoords(latitude, longitude);
                    },
                    error => {
                        console.error('Geolocation error:', error);
                        // Fallback to a default city
                        searchWeather('New York');
                    }
                );
            } else {
                // Geolocation not supported
                searchWeather('New York');
            }
        }
        
        // Search weather by city name
        function searchWeather(city) {
            loading.style.display = 'block';
            weatherCard.style.display = 'none';
            error.style.display = 'none';
            
            // Save last searched city
            localStorage.setItem('lastCity', city);
            
            // Fetch weather data
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('City not found');
                    }
                    return response.json();
                })
                .then(data => {
                    displayWeather(data);
                    fetchForecast(data.coord.lat, data.coord.lon);
                })
                .catch(err => {
                    showError(err.message);
                });
        }
        
        // Fetch weather by coordinates
        function fetchWeatherByCoords(lat, lon) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Location not found');
                    }
                    return response.json();
                })
                .then(data => {
                    displayWeather(data);
                    fetchForecast(lat, lon);
                })
                .catch(err => {
                    showError(err.message);
                });
        }
        
        // Fetch 5-day forecast
        function fetchForecast(lat, lon) {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    displayForecast(data);
                })
                .catch(err => {
                    console.error('Forecast error:', err);
                });
        }
        
        // Display current weather
        function displayWeather(data) {
            // Update city name
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            
            // Update weather description
            weatherDesc.textContent = data.weather[0].description;
            
            // Update temperature
            const temp = isCelsius ? data.main.temp : (data.main.temp * 9/5) + 32;
            tempValue.textContent = Math.round(temp);
            
            // Update "feels like"
            const feelsLikeTemp = isCelsius ? data.main.feels_like : (data.main.feels_like * 9/5) + 32;
            feelsLike.textContent = `${Math.round(feelsLikeTemp)}${isCelsius ? '°C' : '°F'}`;
            
            // Update other details
            humidity.textContent = `${data.main.humidity}%`;
            wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
            pressure.textContent = `${data.main.pressure} hPa`;
            
            // Update weather icon
            const iconCode = data.weather[0].icon;
            weatherIcon.className = getWeatherIcon(data.weather[0].main);
            
            // Set background based on weather
            setWeatherBackground(data.weather[0].main);
            
            // Show weather card
            setTimeout(() => {
                loading.style.display = 'none';
                weatherCard.style.display = 'block';
                weatherCard.classList.add('visible');
            }, 300);
        }
        
        // Display 5-day forecast
        function displayForecast(data) {
            forecastContainer.innerHTML = '';
            
            // Get forecast for next 5 days (one per day)
            const dailyData = [];
            const today = new Date().getDate();
            
            for (let i = 0; i < data.list.length; i++) {
                const forecastDate = new Date(data.list[i].dt * 1000);
                const forecastDay = forecastDate.getDate();
                
                // Skip today
                if (forecastDay === today) continue;
                
                // Get one forecast per day (around noon)
                if (forecastDate.getHours() === 12) {
                    dailyData.push(data.list[i]);
                    if (dailyData.length === 5) break;
                }
            }
            
            dailyData.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                const temp = isCelsius ? forecast.main.temp : (forecast.main.temp * 9/5) + 32;
                const icon = getWeatherIcon(forecast.weather[0].main);
                
                const forecastItem = document.createElement('div');
                forecastItem.className = 'forecast-day';
                forecastItem.innerHTML = `
                    <div class="day-name">${dayName}</div>
                    <div class="forecast-icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="forecast-temp">${Math.round(temp)}°</div>
                `;
                forecastContainer.appendChild(forecastItem);
            });
        }
        
        // Get appropriate weather icon class
        function getWeatherIcon(weatherMain) {
            switch(weatherMain) {
                case 'Clear': return 'fas fa-sun';
                case 'Clouds': return 'fas fa-cloud';
                case 'Rain': return 'fas fa-cloud-rain';
                case 'Drizzle': return 'fas fa-cloud-showers-heavy';
                case 'Thunderstorm': return 'fas fa-bolt';
                case 'Snow': return 'fas fa-snowflake';
                case 'Mist': 
                case 'Fog': 
                case 'Haze': return 'fas fa-smog';
                default: return 'fas fa-cloud';
            }
        }
        
        // Set background based on weather condition
        function setWeatherBackground(weatherMain) {
            document.body.className = ''; // Reset classes
            
            // Add theme class if dark mode is enabled
            if (darkMode) {
                document.body.classList.add('dark-mode');
            }
            
            // Add weather-specific class
            switch(weatherMain) {
                case 'Clear': 
                    document.body.classList.add('weather-clear');
                    break;
                case 'Clouds': 
                    document.body.classList.add('weather-cloudy');
                    break;
                case 'Rain': 
                case 'Drizzle': 
                    document.body.classList.add('weather-rainy');
                    break;
                case 'Thunderstorm': 
                    document.body.classList.add('weather-stormy');
                    break;
                case 'Snow': 
                    document.body.classList.add('weather-snowy');
                    break;
                default: 
                    // Keep the default gradient
            }
        }
        
        // Show error message
        function showError(message) {
            loading.style.display = 'none';
            weatherCard.style.display = 'none';
            error.style.display = 'block';
            errorMessage.textContent = message;
        }
        
        // Toggle between dark/light mode
        function toggleTheme() {
            darkMode = !darkMode;
            localStorage.setItem('darkMode', darkMode);
            
            if (darkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            
            // Re-apply weather background to maintain theme
            const currentWeather = weatherDesc.textContent;
            const weatherMain = [...document.body.classList].find(cls => 
                cls.startsWith('weather-')
            );
            
            if (weatherMain) {
                document.body.className = weatherMain;
                if (darkMode) {
                    document.body.classList.add('dark-mode');
                }
            }
        }
        
        // Toggle between Celsius and Fahrenheit
        function toggleUnit() {
            isCelsius = !isCelsius;
            localStorage.setItem('tempUnit', isCelsius ? 'C' : 'F');
            
            if (isCelsius) {
                tempUnit.textContent = '°C';
                unitToggle.checked = false;
            } else {
                tempUnit.textContent = '°F';
                unitToggle.checked = true;
            }
            
            // Update displayed temperature if weather is already loaded
            if (weatherCard.style.display !== 'none') {
                const currentTemp = parseFloat(tempValue.textContent);
                const newTemp = isCelsius ? 
                    (currentTemp - 32) * 5/9 : 
                    currentTemp * 9/5 + 32;
                tempValue.textContent = Math.round(newTemp);
                
                // Update "feels like"
                const feelsLikeTemp = feelsLike.textContent;
                const tempValueOnly = parseFloat(feelsLikeTemp);
                const newFeelsLike = isCelsius ? 
                    (tempValueOnly - 32) * 5/9 : 
                    tempValueOnly * 9/5 + 32;
                feelsLike.textContent = `${Math.round(newFeelsLike)}${isCelsius ? '°C' : '°F'}`;
                
                // Update forecast
                const forecastItems = document.querySelectorAll('.forecast-temp');
                forecastItems.forEach(item => {
                    const temp = parseFloat(item.textContent);
                    const newTemp = isCelsius ? 
                        (temp - 32) * 5/9 : 
                        temp * 9/5 + 32;
                    item.textContent = `${Math.round(newTemp)}°`;
                });
            }
        }
        
        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);