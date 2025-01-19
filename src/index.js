function updateWeatherInfo(response) {
    let temperatureElement = document.querySelector("#weather-app-temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city");
    let cityCondition = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let icon = document.querySelector("#icon");
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"></img>`;
    timeElement.innerHTML = formatDate(date);
    windElement.innerHTML = `${response.data.wind.speed}km/h`
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    cityCondition.innerHTML = response.data.condition.description;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    getForecast(response.data.city);
}
function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
    let apiKey = "ffaeodfecfc1t6ea1f3ed031874f0dab";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiURL).then(updateWeatherInfo);
}
function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}
function formatDay(timestamp) {
    let date = new Date (timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}
function getForecast(city) {
    let apiKey = "ffaeodfecfc1t6ea1f3ed031874f0dab";
    let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
    
    
    let forecastHtml = "";
    response.data.daily.forEach(function (day, index){
        if (index < 5) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
    <div class="weather-forecast-temps">
      <div class="weather-forecast-temp">
        <strong>${Math.round(day.temperature.maximum)}° </strong>
      </div>
      <div class="weather-forecast-temp">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>
`;
    }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("NewYork");
displayForecast();