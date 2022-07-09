

const apikey = '0fe15371e2f5ef4035accd68fb8832ac';

let city = document.getElementById('search').value;
console.log(city)

    const form = document.getElementById('form')
    form.addEventListener('submit', getCity(city, apikey));

function getCity(city, apikey){
    city.preventDefault()
    console.log(city);
    console.log(apikey);
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
            .then(data => data.json())
            .then(json => {
                console.log(json)
            })
            .catch(err => console.log('Erro: ', err))
}

