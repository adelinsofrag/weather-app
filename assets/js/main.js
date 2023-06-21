
const API_KEY = "47de525c8b6e8be1118dc5ace4b3687a";
const button = document.getElementById('submitForm');
const form = document.getElementById('form');


form.addEventListener('submit', (e) => handleSearchFormSubmit(e));

function handleSearchFormSubmit(e) {
  e.preventDefault();
  fetchData((searchItem = e.target[0].value));

}


function fetchData(searchItem) {

  if (!searchItem) {
    console.log("ERROR");
  } else {

    const source = `http://api.openweathermap.org/data/2.5/forecast?q=${searchItem}&appid=${API_KEY}`;

    fetch(source)

      .then((response) => {
        if (!response.ok) {
          console.log(response.status);
        }
        return response.json();
      })
      .then((data) => {
        handleResponse(data);
      })
      .catch((error) => { console.error("A apărut o eroare:", error) });
  }

}

function handleResponse(data) {

  const response = document.getElementById('responseContent');
  const weather24 = data.list.slice(1, 9);
  const weatherNow = data.list[0];

  const weatherData = {
    city: data.city.name,
    country: data.city.country,
    time: weatherNow.dt_txt,
    description: weatherNow.weather[0].description,
    icon: weatherNow.weather[0].icon,
    celsius: Math.floor(weatherNow.main.temp - 273.15),
    feels_like: Math.floor(weatherNow.main.feels_like - 273.15),
    tempMin: Math.floor(weatherNow.main.temp_min - 273.15),
    tempMax: Math.floor(weatherNow.main.temp_max - 273.15),
    pressure: weatherNow.main.pressure,
    humidity: weatherNow.main.humidity,
    windSpeed: weatherNow.wind.speed
  };

  const iconURL = `http://openweathermap.org/img/wn/${weatherData.icon}.png`;

  let html = `
  <div class=" d-flex justify-content-left">
  <div class="d-flex">

    <img src=${iconURL}>
  </div>
  ${weatherData.time}
  <h2> ${weatherData.city}</h2>
  <h3>${weatherData.country}</h3>
  <div>
    <h2>${weatherData.celsius}°C</h2>
    <p>temperatura resimtita ${weatherData.feels_like}</p>
    <p>temp min ${weatherData.tempMin}</p>
    <p>temp max ${weatherData.tempMax}</p>
    <p>presiune: ${weatherData.pressure} mb</p>
    <p>umiditate: ${weatherData.humidity} %</p>
    <p>viteza vantului: ${weatherData.windSpeed} m/s</p>
  </div>
  </div>
    ${weatherP(weather24)}
  `;

  response.innerHTML = html;
}

// Vremea pe 24 h evitand intervalul orar curent
function weatherP(weather) {
  let html = '';

  weather.forEach(currentWeather => {
    const weatherData = {
      time: currentWeather.dt_txt,
      description: currentWeather.weather[0].description,
      icon: currentWeather.weather[0].icon,
      celsius: Math.floor(currentWeather.main.temp - 273.15),
      feels_like: Math.floor(currentWeather.main.feels_like - 273.15),
      tempMin: Math.floor(currentWeather.main.temp_min - 273.15),
      tempMax: Math.floor(currentWeather.main.temp_max - 273.15),
      pressure: currentWeather.main.pressure,
      humidity: currentWeather.main.humidity,
      windSpeed: currentWeather.wind.speed
    };

    const iconURL = `http://openweathermap.org/img/wn/${weatherData.icon}.png`;

    html += `
      <div class="box-model d-flex justify-content-left">
        <div class="d-flex">
          ${weatherData.time}
        </div>
        <div>
          <img src=${iconURL} alt="logo">
          <h2>${weatherData.celsius}°C</h2>
          <p>temperatura resimtita ${weatherData.feels_like}</p>
          <p>temp min ${weatherData.tempMin}</p>
          <p>temp max ${weatherData.tempMax}</p>
          <p>presiune: ${weatherData.pressure} mb</p>
          <p>umiditate: ${weatherData.humidity} %</p>
          <p>viteza vantului: ${weatherData.windSpeed} m/s</p>
        </div>
      </div>
    `;
  });

  return html;
}















