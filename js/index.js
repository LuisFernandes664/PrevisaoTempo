

const apikey = '0fe15371e2f5ef4035accd68fb8832ac';

const form = document.getElementById('form')
form.addEventListener('submit', getCity);

function getCity(e){
    //nao fazer load à pagina quando faço submit
    e.preventDefault();
    let city = document.getElementById('search').value;
    console.log(city);
    console.log(apikey);
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
            .then(data => data.json())
            .then(json => {
                console.log(json)
                console.log(json.coord.lon)
                console.log(json.coord.lat)
                CurrentWeather(json.coord.lat, json.coord.lon)
            })
            .catch(err => console.log('Erro: ', err))
}



function CurrentWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
    .then(data => data.json())
    .then(json => {
        console.log(json)
    })
    .catch(err => console.log('Erro: ', err))
    console.log('Lat: ',lat)
    console.log('Lon: ',lon)
}
