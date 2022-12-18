function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function currentTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let areaElement = document.querySelector("#area");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let dateElement = document.querySelector("#date");
  iconViewElement = document.querySelector("#icon-view");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  areaElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconViewElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconViewElement.setAttribute("alt", response.data.weather[0].icon);
}

function search(city) {
  let apiKey = `0dbe12992e5d53586af614683d70937`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function currentFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (19 * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", currentFahrenheit);
