const clockContainer = document.querySelector('.js-clock'),
      clockTitle = document.querySelector('.clock-time');


function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerHTML = `${hours < 10 ? `0${hours}` : hours}ч:${minutes < 10 ? `0${minutes}` : minutes}м:${seconds < 10 ? `0${seconds}` : seconds}с`;
}



function init() {
  getTime();
  setInterval(getTime, 1);

}

init();