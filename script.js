let city_name = "";
let keyword = "";
const api_key = "59d72f97ba078dc7417f199d642eb0ae4ef65ad7";
const api_url = "https://api.waqi.info/feed/"+city_name+"/?token=" + api_key;
const search_api = "https://api.waqi.info/search/?keyword="+keyword+"&token="+api_key;
const aqi = document.getElementById("aqi");
const cur_location = document.getElementById("cur_location");
const location_name = document.getElementById("location");
const air_quality = document.getElementById("quality");
const info_div = document.getElementById("info");
const submit = document.getElementById("submit");
const search_input = document.getElementById("search_input");
const search_table = document.getElementById('search_table');

const pollutant = document.getElementById("pollutant");
const co = document.getElementById("co");
const rh = document.getElementById("rh");
const no2 = document.getElementById("no2");
const o3 = document.getElementById("o3");
const atm = document.getElementById("atm");
const pm10 = document.getElementById("pm10");
const pm25 = document.getElementById("pm25");
const so2 = document.getElementById("so2");
const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const time = document.getElementById("time");



function change_color(aqi){
    if (aqi< 50){
        air_quality.innerHTML = "Good"
        info_div.style.background =  "linear-gradient(to right, #a8e063, #56ab2f)"; 
    }
    else if (aqi >= 50 && aqi < 100){
        air_quality.innerHTML = "Satisfactory"
        info_div.style.background = "linear-gradient(to right top, #d5cd2c, #dbd73b, #e2e149, #e8ec56, #eff663)";
        
    }
    else if (aqi >= 100 && aqi < 150){
        air_quality.innerHTML = "Moderately Polluted"
        info_div.style.background = "linear-gradient(to right top, #f88243, #fa9844, #faad4a, #f8c254, #f6d663)";    
    }
    else if (aqi >= 150 && aqi < 250){
        air_quality.innerHTML = "Poor"
        info_div.style.background = "linear-gradient(to right top, #e96c35, #ec7740, #f0824c, #f38c57, #f69663)";
    }
    else if (aqi >= 250 && aqi < 300){
        air_quality.innerHTML = "Very Poor"
        info_div.style.background = "linear-gradient(to right top, #e95435, #d5502f, #c14c2a, #ae4726, #9b4222)";
    }
    else if(aqi >= 300 && aqi < 500){
        air_quality.innerHTML = "Severe"
        info_div.style.background = "linear-gradient(to right top, #4b160a, #5e2012, #722b17, #86361d, #9b4222)";
    }  
}


async function cur_data(city_name){
    const response = await fetch("https://api.waqi.info/feed/"+city_name+"/?token=" + api_key);
    const data = await response.json();
  
    const iaqi = data.data.iaqi;
    if (data.status == "error"){
        console.log("invalid city name")
        search_input.style.boxShadow = "0px 10px 6px -6px red";
        setTimeout(function(){search_input.style.boxShadow = "none"}, 800)
        
    }
    else{
        change_color(data.data.aqi)

    aqi.innerHTML = data.data.aqi;
    location_name.innerHTML = data.data.city.name;
    pollutant.innerHTML = data.data.dominentpol;
    co.innerHTML = iaqi.co.v;
    rh.innerHTML = iaqi.h.v + " %";
    no2.innerHTML = iaqi.no2.v;
    o3.innerHTML = iaqi.o3.v;
    atm.innerHTML = iaqi.p.v + " mb";
    pm10.innerHTML = iaqi.pm10.v;
    pm25.innerHTML = iaqi.pm25.v;
    so2.innerHTML = iaqi.so2.v;
    wind.innerHTML = iaqi.w.v + " m/s";
    temp.innerHTML = iaqi.t.v + " °C";
    time.innerHTML = data.data.time.s;

    }
 
}

async function search_data(keyword){
    const response = await fetch("https://api.waqi.info/search/?keyword="+keyword+"&token="+api_key);
    const data = await response.json();

    search_table.innerHTML = ""
    for(let i = 0; i <= 5 && i < data.data.length; i++){
    const element = document.createElement("li");
    element.innerHTML = data.data[i].station.name;
    element.id = "element"+i;
    
    search_table.appendChild(element);
      
    };
    if(data.data.length > 5){
        const element = document.createElement("li");
        element.innerHTML = data.data.length - 5 + " more results.";
        element.id = "more_result";
        search_table.appendChild(element);
    }
    
    const element0 = document.getElementById("element0");
    const element1 = document.getElementById("element1");
    const element2 = document.getElementById("element2");
    const element3 = document.getElementById("element3");
    const element4 = document.getElementById("element4");
    const element5 = document.getElementById("element4");

    element0.addEventListener("click", function(){
        cur_data(element0.innerText);
        search_table.innerHTML = "";
        search_input.value = ""
    });
    element1.addEventListener("click", function(){
        cur_data(element1.innerText);
        search_table.innerHTML = "";
        search_input.value = ""
    });
    element2.addEventListener("click", function(){
        cur_data(element2.innerText);
        search_table.innerHTML = "";
        search_input.value = ""
    });
    element3.addEventListener("click", function(){
        cur_data(element3.innerText);
        search_table.innerHTML = "";
        search_input.value = ""
    });
    element4.addEventListener("click", function(){
        cur_data(element4.innerText);
        search_table.innerHTML = "";
        search_input.value = ""
    });
    element5.addEventListener("click", function(){
        cur_data(element5.innerText);
        search_table.innerHTML = "";
        search_input.value = ""
    });
    
}


function search(){
    search_data(search_input.value);
}

cur_data("here");
// for current location
cur_location.addEventListener("click" , function(){
    city_name = "here";
    cur_data(city_name);
})

submit.addEventListener("click", function(){
    cur_data(search_input.value);
    search_table.innerHTML = "";
    search_input.value = ""

})
