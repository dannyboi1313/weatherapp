document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=33b8d541d21eb0f78a7a56ef81d423c8";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let city = "";
      let results = "<div class=\"curr-weather-main\">";
      let sunData = "";
      city += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	results += '<img src="https://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h1>' + json.main.temp + " &deg;F</h1> </div>"
      results += "<div class=\"curr-weather-range\"> <h2> "
      for (let i=0; i < json.weather.length; i++) {
	results += json.weather[i].description
	if (i !== json.weather.length - 1)
	  results += ", "
      }
      results += "</h2><h2> High: " + json.main.temp_max + "</h2><h2> Low: " + json.main.temp_min + "</h2> </div>";
      
      sunData += "<div class=\"weather-data\"> <p> Feels Like: " + json.main.feels_like + "&deg;F</p> </div>";
      sunData += "<div class=\"weather-data\"> <p> Humidity: " + json.main.humidity + "%</p> </div>";
      sunData += "<div class=\"weather-data\"> <p> Pressure: " + json.main.pressure + " hPa</p> </div>"; 
      sunData += "<div class=\"weather-data\"> <p> Wind Speed: " + json.wind.speed + " m/s</p> </div>"; 
      document.getElementById("curr-sun").innerHTML = sunData;
      document.getElementById("curr-city").innerHTML = city;
      document.getElementById("weatherResults").innerHTML = results;
    });
    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=33b8d541d21eb0f78a7a56ef81d423c8";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
        let forecast = "";
        let date = "";

        for (let i=0; i < json.list.length; i++) {
            forecast += "<div class=\"forecastContainer\">";
            forecast += "<div class=\"forecast-date\">";
            forecast += "<p>" + moment(json.list[i].dt_txt).format('MM-D h:mm a') + "</p> </div>";
            forecast += "<div class=\"forecast-weather\">";
            forecast += '<img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
            forecast += "<h2>" + json.list[i].main.temp + "&deg;F</h2>";
            forecast += "<p>" + json.list[i].weather[0].description + "</p> </div>";
            forecast += "</div>"
        }

        document.getElementById("forecastResults").innerHTML = forecast;
      });
    


});