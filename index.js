let today = document.querySelector("#date");
let time = new Date();
let hours = time.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let thisDay = time.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
today.innerHTML = `${days[thisDay]} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");

  let cityInput = document.querySelector("#city-input");
  cityName.innerHTML = "Results for " + cityInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function currentPosition(position) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = position.coords.latitude;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function getCurrentPosiion() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button = document.querySelector("#button");
button.addEventListener("click", getCurrentPosiion);

function showMyPositionTemperature(response) {
  let temperature = Math.round(response.data.main);
  console.log(response.data.main.feels_like);
  console.log(response.data.name);
}

function feelsTemperature(response) {
  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  let temperature = response.data.main.feels_like;

  let message = `The temperature feels like ${temperature}°C`;
  let feelsLike = document.querySelector("#feels");
  feelsLike.innerHTML = message;
  console.log(apiUrl);
}

navigator.geolocation.getCurrentPosition(function (position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(feelsTemperature);
});
