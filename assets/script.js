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
        console.log(data);
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

        city.push(newCityBtn.textContent);

        document.getElementById("saved-cities").appendChild(newCityBtn);
    }
}

// targets the button that was clicked, then pass the text content of the button onto getApi function
function onclickHistoryBtn(event) {
    console.log(event.target);
    getApi(event.target.textContent);
}

function renderCity(){
    var cityInfo = document.getElementById("input-city").value;
    getApi(cityInfo)
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
}

function loadBtns(){

}

function addCityToList(cityName){
    city.push(cityName);
    JSON.stringify("cityList", city);
}


document.getElementById("enter-btn").addEventListener("click", makeCityBtn);
