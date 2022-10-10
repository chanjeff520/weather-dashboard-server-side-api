//weather api key: 580736b4e81d6ca498d989b1ea6ba5b1

//Not finished

var city = [];

function validate(cityInfo){
    
    if(cityInfo === ""){
        alert("Please input a city");
        return false;
    }
    return true;
}

//not finished exclude hour
function getApi(cityinfo){
    var weatherApiLink = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityinfo +"&units=imperial&appid=580736b4e81d6ca498d989b1ea6ba5b1";

    
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

function renderWeather(data){

}

function loadBtns(){

}

function addCityToList(cityName){
    city.push(cityName);
    JSON.stringify("cityList", city);
}


document.getElementById("enter-btn").addEventListener("click", makeCityBtn);
