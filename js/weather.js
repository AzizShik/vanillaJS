const COORDS_LS = 'coords',
  API_KEY = '5e7ad537bfe69a28309768eadbc44681';

  const weatherContainer = document.querySelector('.js-weather');

function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weatherContainer.innerHTML = `${temperature} @ ${place}`
    });
}


function saveCoords(positionObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(positionObj));
}

function geoSuccesHandler(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const positionObj = {
    // latitude: latitude,
    // longitude: longitude,
    latitude,
    longitude,
  };

  saveCoords(positionObj);
  getWeather(latitude, longitude);
}
function geoErrorHandler() {
  console.log('Error: Geoposition not found')
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(geoSuccesHandler, geoErrorHandler);
}

function getCoords() {
  const coords = localStorage.getItem(COORDS_LS);
  if (coords === null) {
    askForCoords();
  } else {
    const loadedCoords = JSON.parse(coords);
    getWeather(loadedCoords.latitude, loadedCoords.longitude);
  }
}

function init() {
  getCoords()
}

init();