// TODO: split into modules
// TODO: refactor and cleanup

const API_KEY = "590a513141eb4c219130973ea1824f3d"; //should be private, but no server, nothing to hide btw.
/* ---------------------------------- */
/*           Event Listeners          */
/* ---------------------------------- */
const handleSearch = function (city = "Arad") {
  // TODO: loading animation
  // use this function if you want to add some loading animation
  // before fetching or even displaying the data
  console.info("Searching for:", city);
  fetchData(city);
};

const inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener("input", (e) => handleSearch(e.target.value));
/* ---------------------------------- */
/*       Get 5d with 3h forecast      */
/* ---------------------------------- */
/**
 * @function fetchData
 *
 * @param city
 *
 * will call @function handleJSONResponse()
 */
const fetchData = (city) => {
  const API_SRC = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(API_SRC)
    .then((response) => response.json())
    .then((responseJSON) => handleJSONResponse(responseJSON));
};
/**
 * @function handleJSONResponse
 *
 * parse incoming @var data
 * calling @function compose5DaysForecastCards() for each item
 *
 * if 200 will call @function setCurrentLocation() & insert cards into DOM
 *
 * @param {*} data
 */
const handleJSONResponse = (data) => {
  const forecastArea = document.querySelector("#forecast");
  let output = "";

  data.list?.forEach((dataFor3h) => {
    if (dataFor3h) output += compose5DaysForecastCards(dataFor3h);
  });

  if (data.cod === "200") {
    getWeather(data.city.coord.lat, data.city.coord.lon);
    forecastArea.innerHTML = output;
  }
};
/**
 * @function compose5DaysForecastCards
 *
 *
 * @param destruct the incoming param into the needed fields
 * @returns HTML in a template string format
 */
const compose5DaysForecastCards = ({ dt, main: { temp }, weather: [{ main, icon }] }) => {
  const date = new Date(dt * 1000);
  return `
  <div class="py-2 px-3 small text-secondary bg-white bg-gradient">
    <p class="small text-nowrap mb-0">${date.toLocaleDateString("en-us", { weekday: "short" })}</p>
    <p class="small">${date.getDate()} / ${date.getMonth()}</p>
    <p class="mb-0">${main}</p>
    <img class="img-fluid my-1" src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p class="lead mb-0">${date.getHours()}:00</p>
    <p class="small mb-0">${temp.toFixed()}°C</p>
  </div>`;
};
/* ---------------------------------- */
/*      Setting current location      */
/* ---------------------------------- */
/**
 * @function setCurrentLocation
 *
 * @param lat
 * @param long
 *
 * will set the current location
 * will get the weather for this location
 */
const currentLocation = document.querySelector("#location");
const setCurrentLocation = (name) => {
  console.log("setCurrentLocation", name, currentLocation);

  currentLocation.textContent = name;
};
/**
 * @function getCurrentLocation
 *
 * uses geolocation to get the Geolocation API data from the browser
 * @callback success > should fetch for current location weather details
 * @callback error > handles error
 */
const getCurrentLocation = () => {
  const error = (err) => console.error(err);
  const success = ({ coords: { latitude, longitude } }) => getWeather(latitude, longitude);

  navigator.geolocation.getCurrentPosition(success, error);
};
const getWeather = (latitude, longitude) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((responseJSON) => {
      const {
        name,
        weather: [{ main, description, icon }],
        main: { temp },
        ...rest
      } = responseJSON;

      document.querySelector("#conditionsCurrent").textContent = main;
      document.querySelector("#conditionsCurrentDescription").textContent = description;
      document.querySelector(
        "#iconCurrent"
      ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      document.querySelector("#degreeCurrent").textContent = temp.toFixed() + "°C";

      console.log("getWeather in fetch", name);

      setCurrentLocation(name);
      setTheme(main);
    });
};
/**
 * @function setTheme()
 *
 * using a switch will update the styling of the card
 * depending on the current condition provided
 *
 * @param {*} condition
 */
const setTheme = (condition) => {
  let conditionStyle = "";

  switch (condition) {
    case "Clouds":
    case "Rain":
      conditionStyle =
        "color:var(--theme-color-light) !important; background-color: var(--theme-color-dark) !important";
      break;

    case "Thunderstorm":
      conditionStyle =
        "color:var(--theme-color-light) !important; background-color: var(--theme-color-accent) !important";
      break;

    case "Clear":
    case "Snow":
    default:
      conditionStyle = "color:inherit; background-color: var(--theme-color-light) !important";
      break;
  }

  document.querySelector("#widget").style = conditionStyle;
};
/* ---------------------------------- */
/*     Initialize current location    */
/* ---------------------------------- */
setTimeout(() => getCurrentLocation(), 500);
