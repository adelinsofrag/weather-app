let weather = {
    apiKey: "c0de1ea1443085b7e38ab3a1d9732d60",                   // Cheia API pentru OpenWeatherMap
    fetchWeather: function (city) {                               // Metoda pentru preluarea datelor meteo
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");                             // Afisam un mesaj de eroare daca nu se gaseste vremea
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));                 // Afisam datele meteo
    },

    // Metoda pentru afisarea datelor meteo in HTML

    displayWeather: function (data) {
      const { name } = data;                           // Extragem numele orasului
      const { icon, description } = data.weather[0];   // Extragem iconita si descrierea vremii
      const { temp, humidity } = data.main;            // Extragem temperatura si umiditatea
      const { speed } = data.wind;                     // Extragem viteza vantului
      document.querySelector(".city").innerText = "Weather in " + name;    // Actualizam elementul cu clasa "city" cu numele orasului
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";              // Actualizam imaginea cu iconita vremii
      document.querySelector(".description").innerText = description;      // Actualizam elementul cu clasa "description" cu descrierea vremii
      document.querySelector(".temp").innerText = temp + "°C";             // Actualizam elementul cu clasa "temp" cu temperatura
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";                                     // Actualizam elementul cu clasa "humidity" cu umiditatea
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";                                  // Actualizam elementul cu clasa "wind" cu viteza vantului
      document.querySelector(".weather").classList.remove("loading");      // Eliminam clasa "loading" de pe elementul cu clasa "weather"
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";       // Actualizam imaginea de fundal aleatorie a corpului paginii, cu dimensiunile mentionate
    },

     // Metoda pentru cautarea datelor meteo in functie de oras

    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  // Adaugam un event listener pentru butonul de cautare
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  // Adaugam un event listener pentru campul de cautare care asculta evenimentul "keyup"; daca tasta apasata este "Enter", se apeleaza metoda Search

  document.querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {                      
        weather.search();
      }
    });
  
  weather.fetchWeather("Brasov");   // Apelam metoda fetchWeather pentru orasul "Chisinau" (se poate inlocui cu orice alt oras)

  