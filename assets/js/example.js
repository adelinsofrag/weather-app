

function cautare() {

  const API_KEY = "47de525c8b6e8be1118dc5ace4b3687a";
  var input = document.getElementById("searchInput").value;


  const source = `http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${API_KEY}`;

  fetch(source)

    .then((response) => {
      if (!response.ok) {
        document.getElementById("status").innerHTML = "A apărut o eroare: " + response.status;
      }
      return response.json();
    })
    .then((data) => {
      //Deocamdata se afiseaza numele orasului cautat
      document.getElementById("demo").innerHTML = data.city.name;

      let istoricCautari = localStorage.getItem("istoricCautari");
      if (!istoricCautari) {
        istoricCautari = [];
      } else {
        istoricCautari = JSON.parse(istoricCautari);
      }
      istoricCautari.push(input);
      localStorage.setItem("istoricCautari", JSON.stringify(istoricCautari));
    })
    .catch((error) => {
      console.error("A apărut o eroare:", error);
    });

    
}





