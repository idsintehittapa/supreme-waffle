const containerToday = document.getElementById("weatherToday");
let citySearched = "Barcelona";

// this should come from a secrets store
const api_key = 'xxx';


//Fetch weather today API
const fetchWeatherToday = (citySearched) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&APPID=${api_key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weatherToday) => {
      containerToday.innerHTML += generatedHTMLForWeatherToday(weatherToday);
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("pickedPlace").value = "";
      containerToday.innerHTML = "";
      return alert("Searched place is not found, try again");
    });
};
fetchWeatherToday(citySearched);

//Function to invoke created functions and manipulate the DOM
const generatedHTMLForWeatherToday = (weatherToday) => {
  weatherTodayBackgroundColor(weatherToday.weather[0].main);
  const time = readableTime(weatherToday.dt, weatherToday.timezone);
  const date = readableDate(weatherToday.dt, weatherToday.timezone);
  const icon = weatherIcon[weatherToday.weather[0].main];
  const temp = roundTemp(weatherToday.main.temp);
  const description = weatherToday.weather[0].main;
  const cityName = weatherToday.name;
  const countryName = weatherToday.sys.country;

  //separate and build up the HTML tree
  let weatherTodayHTML = "";
  weatherTodayHTML += `<div class="main__city">`;
  weatherTodayHTML += `<p class="main__city-time">  ${time} </p>`;
  weatherTodayHTML += `<p class="main__city-date">  ${date} </p>`;
  weatherTodayHTML += `</div>`;
  weatherTodayHTML += `<div class="main__weather">`;
  weatherTodayHTML += `<img class="main__weather-image" src='${icon}' alt="icon of current weather/>`;
  weatherTodayHTML += `<p class="main__weather-space"></p>`;
  weatherTodayHTML += `<p class="main__weather-temp">${temp}°</p>`;
  weatherTodayHTML += `<p class="main__weather-description">${description}</p>`;
  weatherTodayHTML += `</div>`;
  weatherTodayHTML += `<div class="main__location">`;
  weatherTodayHTML += `<p class="main__location-city">  ${cityName} </p>`;
  weatherTodayHTML += `<p class="main__location-country">  ${countryName} </p>`;
  weatherTodayHTML += `</div>`;
  return weatherTodayHTML;
};

//function invoked when search button is clicked
const selectedPlace = () => {
  const city = document.getElementById("pickedPlace").value;
  if (city || country) {
    containerToday.innerHTML = "";
    citySearched = document.getElementById("pickedPlace").value;
    fetchWeatherToday(citySearched);
    document.getElementById("pickedPlace").value = "";
  }
};

//Change background color depending on weather description
const weatherTodayBackgroundColor = (description) => {
  const containerColor = document.querySelector(".background-color");
  if (description === "Clear") {
    containerColor.style.background =
      "linear-gradient(to left, #FCBC14, #F5901B)";
  } else if (description === "Clouds") {
    containerColor.style.background =
      "linear-gradient(to left, #C6C6C6, #bdc3c7)";
  } else if (description === "Drizzle" || "Fog" || "Mist") {
    containerColor.style.background =
      "linear-gradient(to left, #D0E1E6, #8CAEAB)";
  } else if (description === "Rain") {
    containerColor.style.background =
      "linear-gradient(to left, #737376, #777b88)";
  } else if (description === "Smoke") {
    containerColor.style.background =
      "linear-gradient(to left, #918f72, #525252)";
  } else if (description === "Snow") {
    containerColor.style.background =
      "linear-gradient(to left, #6dd5ed, #076585)";
  } else if (description === "Squall") {
    containerColor.style.background =
      "linear-gradient(to left, #DCDBDF, #bdc3c7)";
  } else if (description === "Thunderstorm" || "Tornado") {
    containerColor.style.background =
      "linear-gradient(to left, #3E5151, #DECBA4, #3E5151)";
  } else containerColor.style.backgroundColor = "#fff";
};

/// getting icon related to weather
const weatherIcon = {
  Clear: "https://openweathermap.org/img/wn/01d@2x.png",
  Clouds: "https://openweathermap.org/img/wn/03d@2x.png",
  Drizzle: "https://openweathermap.org/img/wn/09d@2x.png",
  Fog: "https://openweathermap.org/img/wn/50d@2x.png",
  Haze: "https://openweathermap.org/img/wn/50d@2x.png",
  Mist: "https://openweathermap.org/img/wn/50d@2x.png",
  Rain: "https://openweathermap.org/img/wn/10d@2x.png",
  Smoke: "https://openweathermap.org/img/wn/50d@2x.png",
  Snow: "https://openweathermap.org/img/wn/13d@2x.png",
  Squall: "https://openweathermap.org/img/wn/50d@2x.png",
  Thunderstorm: "https://openweathermap.org/img/wn/11d@2x.png",
  Tornado: "https://openweathermap.org/img/wn/50d@2x.png"
};

/// calculating the time into readable format
const readableTime = (time, offset) => {
  const localOffset = new Date().getTimezoneOffset();

  const readableTime = new Date(
    time * 1000 + offset * 1000 + localOffset * 60000
  );
  const sunTimeString = readableTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  return sunTimeString;
};

/// calculating the date into readable format
const readableDate = (date, offset) => {
  const readableDate = new Date(date * 1000 + offset * 1000);
  const dateReadableDate = readableDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    timezone: "UTC"
  });
  return dateReadableDate;
};

/// calculating a rounded number for the temp
const roundTemp = (number) => {
  const roundTemp = Math.round(number * 1) / 1;
  return roundTemp;
};