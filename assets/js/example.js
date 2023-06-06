const API_KEY = "47de525c8b6e8be1118dc5ace4b3687a"; //should be private, but no server, nothing to hide btw.

const city = "Arad";
const source = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

fetch(source)
  .then((x) => x.text())
  .then((y) => (document.getElementById("demo").innerHTML = y));
