
async function main() {

    // 1. Prendre l'adresse ip du pc ciblé
    const ip = await fetch('https://api.ipify.org?format=json')
        .then( result => result.json() ) 
        .then(json => json.ip);
            
    // 2. Prendre l'a ville grâce à l'adresse ip
    const city = await fetch(`http://api.ipstack.com/${ip}?access_key=614948059492de6ec22ecf301fa30373`)
        .then(result => result.json())
        .then(json => json.city);

    // 3. Prendre les infos meteo sur openweather grâce à la ville
    const apiKey = "544b58ac1f6b678d3d472bea4247901f"
    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`)
        .then(result => result.json())
        .then(json => json);
    
    // 4. Affichage
    displayWeatherInfos(meteo)
}

// objet qui gère les correspondances entre l'API openWeather et la librairie weather-icons
const weatherIcons = {
    "Rain"    : "wi wi-day-rain",
    "Clouds"  : "wi wi-day-cloudy",
    "Clear"   : "wi wi-day-sunny",
    "Snow"    : "wi wi-day-snow",
    "mist"    : "wi wi-day-fog",
    "Drizzle" : "wi wi-day-sleet",
}

// Rend capitale première lettre d'une string
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

// Placer les informations dans le DOW
function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector("#city").textContent = name;
    document.querySelector("#temperature").textContent = Math.round(temperature);
    document.querySelector("#conditions").textContent = capitalize(description);
    // gestion classes image de fond selon la météo
    document.querySelector("i.wi").className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase()

}

main();