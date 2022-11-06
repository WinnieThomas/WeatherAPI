const WEATHER_API_URL='https://api.openweathermap.org/'
const WEATHER_API_KEY='c4240879a090c28a85299a3204b7e907'
const Max_Weather_Forecast=5;


const getLocation=() =>{
    const searchlocation=locationInput.value;
    if(searchlocation==''){
        errorsec.textContent=error;
    }else{
       locationcheck(searchlocation);
    }
}
    const locationcheck=function(search){
        var apiurl=`${WEATHER_API_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
        fetch(apiurl)
        .then(function(response){
            console.log(response);
            return response.json();})
           .then(function(data){
            console.log(data);
            const location=data[0];
            displayWeather(location);
           });
                
         }

         
    
    const displayWeather=function(weatherData){
    document.getElementById('inputlocation').innerHTML=`${weatherData.name},${weatherData.country}`;
    getWeather(weatherData.lat,weatherData.lon);
    }

    const getWeather=function(lat,lon){
       var apiurl=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=d91f911bcf2c0f925fb6535547a5ddc9`;
        fetch(apiurl)
        .then(function(response){
         return response.json(); })
        .then(function(data){
            console.log(data);
            displayWeathernow(data);
            displayForecast(data);
        });
    }

    const displayWeathernow=function(weatherData){
        const currentData=weatherData.current;
        document.getElementById('temperature-value').textContent=currentData.temp;
        document.getElementById('wind-value').textContent=currentData.wind_speed;
        document.getElementById('humidity-value').textContent=currentData.humidity;
        document.getElementById('uv-index').textContent=currentData.uvi;
    }

    const displayForecast=function(weatherData){
        const dailyData = weatherData.daily;
        document.getElementById('forecast').style.display='block';
        const forecastList=document.getElementById('dailyforecast');
        forecastList.innerHTML='';
        for(var i=0;i<Max_Weather_Forecast;i++){
            const dailyForecast=dailyData[i];
            //const day=newDate(dailyForecast.dt*1000).toLocalDataString('en-GB',{weekday:'long'});
            const temp=dailyForecast.temp.day;
            const humidity=dailyForecast.humidity;
            const wind=dailyForecast.wind_speed;

            const newForecast=document.createElement('div');
            newForecast.classList.add('forecast-day');
            newForecast.innerHTML=`<div class="weather-info">
            
            <div class="temp">
            <span>${temp}</span></div>
            <div class="humidity">
            <span>${humidity}</span></div>
            <div class="wind_speed">
            <span>${wind}</span></div>
            </div>`;
            forecastList.appendChild(newForecast);
        }
    }
            


    
    

const searchbutton=document.getElementById('search');
const locationInput=document.getElementById('locationval');
const errorsec=document.getElementById('error-sec');
searchbutton.addEventListener("click",getLocation);
