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
        const apiurl=`${WEATHER_API_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
        fetch(apiurl)
        .then(function(response){
            console.log(response);
            return response.json();})
           .then(function(data){
            console.log(data);
           });
                
         }
        
    

const searchbutton=document.getElementById('search');
const locationInput=document.getElementById('locationval');
const errorsec=document.getElementById('error-sec');
searchbutton.addEventListener("click",getLocation);
