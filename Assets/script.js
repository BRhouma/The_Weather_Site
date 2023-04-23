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
  $("#searchBtn").on("click", function(event) {
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
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          var cityLat = response[0].lat;
          var cityLong = response[0].lon;
          
        var requestUrl1 = 'https://api.openweathermap.org/data/2.5/onecall?' + '&lat=' + cityLat + '&lon=' + cityLong + '&exclude=minutely,hourly,alerts' + '&units=imperial' + '&appid=527dcf6e38939483d3ad43186117df6b';  
  
  
          return fetch(requestUrl1);
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
            var weatherDataArr = (response.daily);
            displayCurrentWeather(weatherDataArr);
            displayForecastWeather(weatherDataArr);
        });
  }

  