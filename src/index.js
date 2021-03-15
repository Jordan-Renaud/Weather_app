//gets current time and returns formated version.
function getCurrentTime(){
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const currentTime = new Date();
  const day = days[currentTime.getDay()];
  const hour = currentTime.getHours();
  const minutes = currentTime.getMinutes() < 9 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes();

  return `${day} ${hour}:${minutes}`
};

//check if city is inputed and changes title
function checkCity(event){
  event.preventDefault();
  const newCity = cityInput.value;
  if (newCity.length > 0) {
    city.innerHTML = newCity;
    getWeatherBy(newCity);
  }
}


function getWeatherBy(city){
  const apiKey = "8d030da1fb95c3588ed90416bc6b659f";
  const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showWeather).catch(console.error);
}


function showWeather(response) {
  let temp = Math.floor(response.data.list[0].main.temp);
  console.log(temp)
  ctemp = temp;
  currentTemp.innerHTML = `${temp}°`;
}




//changes current temp measurement
function changeTempMeasurement(event) {
  if (measurmentType.checked) {
    //change to farenheit
    measurmentLabel.innerHTML = "°F";
    currentTemp.innerHTML = `${ftemp}°`;
  } else {
    //change to celsius
    measurmentLabel.innerHTML = "°C";
    currentTemp.innerHTML = `${ctemp}°`;
  }
}


//converts from celsius to farenheit and rounds down.
function celsiusToFarenheit(temp) {
  return Math.floor((temp * 9/5) + 32);
}

const city = document.querySelector("#city");
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const measurmentType = document.querySelector("#btn-check-outlined");
const measurmentLabel = document.querySelector(".button_name");
const currentTemp = document.querySelector(".temp");
let ctemp = 0;
let ftemp = celsiusToFarenheit(ctemp);

document.querySelector(".date").innerHTML = getCurrentTime();

searchButton.addEventListener("click", checkCity);
measurmentType.addEventListener("click", changeTempMeasurement);

