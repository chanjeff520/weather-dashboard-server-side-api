//weather api key: 580736b4e81d6ca498d989b1ea6ba5b1

//Not finished

var city = [];

function validate(cityInfo){
    
    if(cityInfo === ""){
        alert("Please input a city");
        return false;
    }else if(city.includes(cityInfo)){
        alert("Please input a different City that's not in the saved area");
        return false
    }

    return true;
}

//not finished exclude hour
function getApi(cityinfo){
    var weatherApiLink = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityinfo +"&units=imperial&appid=580736b4e81d6ca498d989b1ea6ba5b1";
    //var currentWeatherApi
    
    fetch(weatherApiLink)
    .then(function(response){
        if(response.ok){
            return response.json();
        }else{
            alert("Please input a valid city.")
            return;
        }
    })
    .then(function(data){
        clearDisplay();
        renderWeather(data);
    })
}

//adds a new button with an event listener below the search button
function makeCityBtn(){
    var cityInfo = document.getElementById("input-city");
    if(validate(cityInfo.value)){
        var newCityBtn = document.createElement("button");
        newCityBtn.setAttribute("class", "mx-auto mb-1 btn-block")
        newCityBtn.textContent = cityInfo.value;
        newCityBtn.onclick = onclickHistoryBtn ;

        //adds a new city on to the array city
        addCityToList(newCityBtn.textContent);

        //appendsd the city btn to save-cities div
        document.getElementById("saved-cities").appendChild(newCityBtn);

        getApi(newCityBtn.textContent);
    }
}

// targets the button that was clicked, then pass the text content of the button onto getApi function
function onclickHistoryBtn(event) {
    getApi(event.target.textContent);
}

//renders current weather
function renderWeather(data){
    var currentWeatherEl = document.getElementById("current-weather");
    var cityName = document.createElement("h2");
    var icon = document.createElement("img");
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");

    cityName.textContent = data.city.name + " (" + moment.unix(data.list[0].dt).format("MM/D/YYYY") + ")";
    cityName.setAttribute("class", "d-inline");
    icon.setAttribute("src", "http://openweathermap.org/img/w/"+ data.list[0].weather[0].icon + ".png");
    icon.setAttribute("class","d-inline");
    temp.textContent = "Temperature: "+data.list[0].main.temp + "°F";
    wind.textContent = "Wind speed: "+data.list[0].wind.speed + " mph";
    humidity.textContent = "Humidity: "+data.list[0].main.humidity + "%";

    currentWeatherEl.appendChild(cityName);
    currentWeatherEl.appendChild(icon);
    currentWeatherEl.appendChild(temp);
    currentWeatherEl.appendChild(wind);
    currentWeatherEl.appendChild(humidity);

    //makes the forecast title
    var forecastTitle = document.getElementById("forecast-banner")
    var fiveTitle = document.createElement("h3");
    fiveTitle.textContent = "5-Day Forecast:";
    forecastTitle.appendChild(fiveTitle);

    //For the 5-day weather display
    var fiveDayWeather = document.getElementById("five-day-weather");
    fiveDayWeather.setAttribute("class", "row");

    for(var i = 7; i<data.list.length; i+=8){
        var divEl = document.createElement("div");
        var date = document.createElement("h4")
        var icon = document.createElement("img");
        var temp = document.createElement("p");
        var wind = document.createElement("p");
        var humidity = document.createElement("p");

        divEl.setAttribute("class", "d-inline row-col-2 bg-info bg-gradient mx-2 px-1");
        date.textContent = moment.unix(data.list[i].dt).format("MM/D/YYYY");
        icon.setAttribute("src", "http://openweathermap.org/img/w/"+ data.list[i].weather[0].icon + ".png");
        temp.textContent = "Temperature: "+data.list[i].main.temp + "°F";
        wind.textContent = "Wind speed: "+data.list[i].wind.speed + " mph";
        humidity.textContent = "Humidity: "+data.list[i].main.humidity + "%";

        divEl.appendChild(date);
        divEl.appendChild(icon);
        divEl.appendChild(temp);
        divEl.appendChild(wind);
        divEl.appendChild(humidity);
        fiveDayWeather.appendChild(divEl);
    }
}

//clear the display screen before loading a new one
function clearDisplay(){
     var elements = [document.getElementById("current-weather"), 
                    document.getElementById("forecast-banner"),
                    document.getElementById("five-day-weather")];

    for(var i = 0; i<elements.length; i++){
        while (elements[i].hasChildNodes()){
            elements[i].removeChild(elements[i].firstChild);
        }
    }
}

//loads all the button from the side if there is local data of it
function loadBtns(){
    //get data from localStorage
    city = JSON.parse(localStorage.getItem('cityList'));
    //checks if there is local storages of cities
    if(city == null){
        city = [];
        return;
    }else{
        for(var i = 0; i < city.length; i++){
            var newCityBtn = document.createElement("button");

            newCityBtn.setAttribute("class", "mx-auto mb-1 btn-block")
            newCityBtn.textContent = city[i];
            newCityBtn.onclick = onclickHistoryBtn;
            document.getElementById("saved-cities").appendChild(newCityBtn);
        }
    }
}

//add a new city to the list, then save to local data
function addCityToList(cityName){
    city.push(cityName);
    localStorage.setItem("cityList",JSON.stringify(city));
}

function init(){
    loadBtns();
}

document.getElementById("enter-btn").addEventListener("click", makeCityBtn);
init();
