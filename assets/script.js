//weather api key: 580736b4e81d6ca498d989b1ea6ba5b1


weatherApiLink = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=580736b4e81d6ca498d989b1ea6ba5b1";

function getApi(){
    fetch(weatherApiLink)
    .then(function(response){
        if(response.ok){

        }else{
            alert("Please input a valid city.")
        }
    })
}