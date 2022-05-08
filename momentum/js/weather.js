const API_KEY = 'YOUR_API_KEY';

// callback function when getCurrentPosition was succeed
function onGeoSucceed(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = document.querySelector('#city');
      const weather = document.querySelector('#weather');
      const temp = document.querySelector('#temp');
      city.innerHTML = data.name;
      weather.innerHTML = data.weather[0].main;
      weather.innerHTML = data.weather[0].main;
      temp.innerHTML = `${data.main.temp}&#8451;`;
    });
}

// callback function when getCurrentPosition got error
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

// get current positision
navigator.geolocation.getCurrentPosition(onGeoSucceed, onGeoError);
