function initPage() {
  //Variables
  var apiKey = "69f2f83fa1ec5ab81a7cffde9061a7f6";
  var searchInput = document.getElementById("search-input");
  var searchBtn = document.getElementById("search-btn");
  var clearHistoryBtn = document.getElementById("clear-btn");
  var cityName = document.getElementById("city-name");
  var weatherIcon = document.getElementById("weather-icon");
  var temperature = document.getElementById("temperature");
  var humidity = document.getElementById("humidity");
  var windspeed = document.getElementById("wind-speed");
  var currentUVEl = document.getElementById("uvi");
  var userHistory = document.getElementById("history");

  //Render search history
  var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  console.log(searchHistory);

  //Inital API call

  function getWeather(city) {
    var requestURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey;

    fetch(requestURL)
      .then(function (response) {
        // ES5
        if (!response.ok) {
          throw Error(response.message);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        //Render Results
        //Convert long date value as dd/mm/yyyy
        var currentDate = new Date(data.dt * 1000);
        console.log(currentDate);
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        cityName.innerHTML =
          data.name + " (" + day + "/" + month + "/" + year + ") ";
        var icon = data.weather[0].icon;
        weatherIcon.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        );
        weatherIcon.setAttribute("alt", data.weather[0].description);
        temperature.innerHTML = "Temperature: " + data.main.temp + " &deg;C";
        humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
        windspeed.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";

        //Second API call
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        var requestURL2 =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&units=metric&appid=" +
          apiKey +
          "&cnt=5";
        fetch(requestURL2)
          .then(function (response) {
            if (!response.ok) {
              throw Error(response.message);
            }
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            //Render UV Index
            var UVIndex = document.createElement("span");
            UVIndex.innerHTML = data.current.uvi;
            var uvResult = data.current.uvi;

            //UV Index color coding
            currentUVEl.innerHTML = "UV Index: ";
            currentUVEl.append(UVIndex);
            if (uvResult < 4) {
              currentUVEl.setAttribute("class", "badge badge-success");
            } else if (uvResult >= 4 || UVIndex <= 6) {
              currentUVEl.setAttribute("class", "badge badge-warning");
            } else {
              currentUVEl.setAttribute("class", "badge badge-danger");
            }

            //5 day forecast
            var dailyForecast = document.querySelectorAll(".forecast");

            for (var i = 0; i < dailyForecast.length; i++) {
              dailyForecast[i].innerHTML = "";
              var forecastDate = new Date(data.daily[i].dt * 1000);
              var forecastDay = forecastDate.getDate() + 1;
              var forecastMonth = forecastDate.getMonth() + 1;
              var forecastYear = forecastDate.getFullYear();
              var forecastDateEl = document.createElement("p");
              forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
              forecastDateEl.innerHTML =
                forecastDay + "/" + forecastMonth + "/" + forecastYear;
              dailyForecast[i].append(forecastDateEl);

              //   Daily forecast icon render
              var forecastIcon = document.createElement("img");
              forecastIcon.setAttribute(
                "src",
                "https://openweathermap.org/img/wn/" +
                  data.daily[i].weather[0].icon +
                  "@2x.png"
              );
              dailyForecast[i].append(forecastIcon);

              //   Daily forecast Temperature render

              var forecastTemp = document.createElement("p");
              forecastTemp.innerHTML =
                "Temp: " + data.daily[i].temp.max + " &deg;C";
              dailyForecast[i].append(forecastTemp);
              var forecastHumidity = document.createElement("p");
              forecastHumidity.innerHTML =
                "Humidity: " + data.daily[i].humidity + "%";
              dailyForecast[i].append(forecastHumidity);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  }

  //Save search to local storage
  searchBtn.addEventListener("click", function () {
    var citySearch = searchInput.value;
    getWeather(citySearch);
    searchHistory.push(citySearch);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
  });

  clearHistoryBtn.addEventListener("click", function () {
    searchHistory = [];
    renderSearchHistory();
  });

  //Display recent search history

  function renderSearchHistory() {
    userHistory.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
      var historyItem = document.createElement("input");
      historyItem.setAttribute("type", "text");
      historyItem.setAttribute("readonly", true);
      historyItem.setAttribute("class", "form-control d-block bg-white");
      historyItem.setAttribute("value", searchHistory[i]);
      historyItem.addEventListener("click", function () {
        getWeather(historyItem.value);
      });
      userHistory.append(historyItem);
    }
  }

  renderSearchHistory();
  if (searchHistory.length > 0) {
    getWeather(searchHistory[searchHistory.length - 1]);
  }
}
initPage();
