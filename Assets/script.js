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