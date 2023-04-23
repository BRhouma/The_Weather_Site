var city = "";
var cityArr = JSON.parse(localStorage.getItem("searchedCity")) || [];


// citys
function displayCities(cityArr) {
    $("#previous-searches").empty();

    if (!cityArr) {
        return false;
    } else {

        for (var s = 0; s < cityArr.length; s++) {
            var pastSearch = $("<button>");
            pastSearch.val(cityArr[s])
                .text(cityArr[s])
                .attr("search-number", s)
                .addClass("btn btn-secondary btn-block")
                .appendTo("#previous-searches");
        }
    }
}

// storage function
function storeCity(cityName) {
    cityArr = localStorage.setItem("searchedCity", JSON.stringify(cityName));

    console.log(JSON.parse(localStorage.getItem("searchedCity")));
}

// searchBtn for cities
$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    city = $("#searchTerm").val().trim();
    cityArr.push(city);
    displayCities(cityArr);
    localStorage.setItem("searchedCity", JSON.stringify(cityArr));
    $("searchTerm").val("");
    fetchWeather(city);

});

function fetchWeather(cityName) {

    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?' + 'q=' + cityName + '&appid=527dcf6e38939483d3ad43186117df6b';

    // fetch weather
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var cityLat = response[0].lat;
            var cityLong = response[0].lon;

            var requestUrl1 = 'https://api.openweathermap.org/data/2.5/onecall?' + '&lat=' + cityLat + '&lon=' + cityLong + '&exclude=minutely,hourly,alerts' + '&units=imperial' + '&appid=527dcf6e38939483d3ad43186117df6b';


            return fetch(requestUrl1);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var weatherDataArr = (response.daily);
            displayCurrentWeather(weatherDataArr);
            displayForecastWeather(weatherDataArr);
        });
}

function displayCurrentWeather(weatherData) {
    // console.log(weatherData);
    $("#city-stats-space").empty();
    var currentDate = moment.unix(weatherData[0].dt).format('dddd, MMMM Do, YYYY');
    $("#city-stats-space")
        .html("<h3>" + city + " - " + currentDate + "<img id='wicon' src='' alt='Weather icon'></h3>")

    var currentIcon = weatherData[0].weather[0].icon;
    var iconImg = "https://openweathermap.org/img/w/" + currentIcon + ".png";
    $("#wicon").attr("src", iconImg);

    var currentTemp = weatherData[0].temp.day;
    var currentWind = weatherData[0].wind_speed;
    var currentHumidity = weatherData[0].humidity;
    var currentUvi = weatherData[0].uvi;

    $("#current-stats-space")
        .html(
            "<p>Temperature:  " + currentTemp + "&deg;F</p>" +
            "<p>Wind Speed:  " + currentWind + " MPH</p>" +
            "<p>Humidity:  " + currentHumidity + "%</p>" +
            "<p>UV Index:  <span id='uv-style'>&nbsp;&nbsp;&nbsp;" + currentUvi + "&nbsp;&nbsp;&nbsp;</span></p>");

    if (currentUvi < 2.0) {
        $("#uv-style")
            .addClass("uv-favorable");
    } else if (currentUvi > 2.0 && currentUvi < 8.0) {
        $("#uv-style")
            .addClass("uv-moderate");
    } else if (currentUvi > 8.0) {
        $("#uv-style")
            .addClass("uv-severe");
    }
}