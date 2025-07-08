let myWeatherKey = '41bbd662acc3df29d96978e7073fb19f';

function fetchWeather() {
  let inputField = document.getElementById('locationBox');
  let outputArea = document.getElementById('result');
  let enteredCity = inputField.value.trim();

  if (enteredCity === '') {
    outputArea.innerHTML = "<p>Please enter a valid city name.</p>";
    return;
  }

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=" + enteredCity + "&appid=" + myWeatherKey + "&units=metric";

  fetch(apiEndpoint)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("City not found, Check Spelling once or network issue.");
      }
      return response.json();
    })
    .then(function(data) {
      let cityName = data.name;
      let currentTemp = data.main.temp;
      let weatherDesc = data.weather[0].description;
      let humidity = data.main.humidity;

      outputArea.innerHTML = 
        "<h2>📍 Weather in " + cityName + "</h2>" +
        "<p>🌡 Temperature: " + currentTemp + " °C</p>" +
        "<p>🌧 Condition: " + weatherDesc + "</p>" +
        "<p>💧 Humidity: " + humidity + "%</p>";
    })
    .catch(function(error) {
      outputArea.innerHTML = "<p>Error: " + error.message + "</p>";
    });
}
