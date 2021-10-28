//function convertToFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 66;
//}
//function convertToCelsius(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");

// temperatureElement.innerHTML = 19;
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);
//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);

//sleep function

//function sleep(ms) {
//return new Promise((resolve) => {
//setTimeout(resolve, ms);
//});
//}

// Formatting date

function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let todayDate = date.getDate();
  let hour = date.getHours();

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let ampmReturn = ampm(hour);
  let hour12 = hour % 12;

  function ampm(hour) {
    if (hour - 12 > 0) {
      return "PM";
    } else {
      return "AM";
    }
  }
  return `${month} ${todayDate}, ${day} ${hour12}:${minutes} ${ampmReturn}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// updating city value with search input

function cityUpdate(event) {
  //outerContainer.classList.add("loading");
  //await sleep(500);
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  currentCity.innerHTML = `${cityInput.value}`;

  let apiKey = "866a208a73eeff02182218e9441647a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeTemperature);
  //await sleep(1500);
  //outerContainer.classList.remove("loading");
}

let currentCity = document.querySelector(".currentCity");
let searchCity = document.querySelector("#search-city-form");
//let outerContainer = document.querySelector(".containerOuter");
let searchBtn = document.querySelector(".searchBtn");
searchCity.addEventListener("submit", cityUpdate);
searchBtn.addEventListener("click", cityUpdate);
// update temperature from search bar input

function changeTemperature(response) {
  let currentTemperature = document.querySelector("#temperature");
  let newTemperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = newTemperature;
}

// current location button update temperature and location

function displayWeather(response) {
  //navigator.geolocation.getCurrentPosition(showPosition);
  let currentTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}`;

  currentCity.innerHTML = response.data.name;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "866a208a73eeff02182218e9441647a1";
  let apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiLocationUrl).then(displayWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationBtn = document.querySelector("#current-location-button");
currentLocationBtn.addEventListener("click", getCurrentLocation);
getCurrentLocation();
