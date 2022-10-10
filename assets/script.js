//weather api key: 580736b4e81d6ca498d989b1ea6ba5b1

//Not finished

var city = [];

function validate(cityInfo){
    
    if(cityInfo === ""){
        alert("Please input a city");
        return;
    }
}

//not finished
function getApi(cityinfo){
    var weatherApiLink = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityinfo +"&appid=580736b4e81d6ca498d989b1ea6ba5b1";
    var long;
    var lat;
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

//not tested
function makeCityBtn(){
    var newCityBtn = document.createElement("button");
    var cityInfo = document.getElementById("input-city");
    newCityBtn.setAttribute("class", "mx-auto mb-1 btn-block")
    newCityBtn.textContent = cityInfo.value;
    newCityBtn.onclick =onclickHistoryBtn ;

    document.getElementById("saved-cities").appendChild(newCityBtn);
}
function onclickHistoryBtn(event) {
    console.log(event.target);
    console.log(event.target.textContent);
    getApi(event.target.textContent);
}

function renderCity(){
    var cityInfo = document.getElementById("input-city").value;
    validate(cityInfo);
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
