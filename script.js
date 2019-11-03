

function capitalize(str) {
    return str[0].toUppercase() + str.slice(1);
}

async function main() {

    // 1. Prendre l'adresse ip du pc ciblé
    // fetch va cherhcher des infos distantes et retourne des promesses.
    const ip = await fetch('https://api.ipify.org?format=json')
        .then( resultat => resultat.json() ) 
        .then(json => json.ip);
            
    // 2. Prendre l'a ville grâce à l'adresse ip sur freegoip.net/json/ip
    const ville = await fetch(`http://api.ipstack.com/${ip}?access_key=614948059492de6ec22ecf301fa30373`)
        .then(resultat => resultat.json())
        .then(json => json.city)

    // 3. Prendre les infos meteo sur openweather grâce à la ville
    const apiKey = "544b58ac1f6b678d3d472bea4247901f"
    const resultat = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => console.log(json))

    
}

main();