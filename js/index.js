// load efect
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});

////////// EFEITO EXPANÇÃO FULL SCREEN INPUT SEARCH ////////////////////

const btnOpen = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-container input");
const searchContainer = document.querySelector(".search-container");
const searchCloseBtn = document.querySelector(".search-close-btn");
const btnNextOpen = document.querySelector(".btn-search1")

btnOpen.addEventListener("click", () => {
  searchContainer.classList.add("active");
  searchCloseBtn.style.display = "block";
  searchInput.style.display = "block";
  btnNextOpen.style.display = "block";
  btnOpen.style.display = "none"
});

btnNextOpen.addEventListener("click", () => {
    searchContainer.classList.remove("active");
    searchCloseBtn.style.display = "none";
    searchInput.style.display = "none";
    btnNextOpen.style.display = "none";
    btnOpen.style.display = "block"
    //searchInput.value = "";
})

searchCloseBtn.addEventListener("click", () => {
  searchContainer.classList.remove("active");
  searchCloseBtn.style.display = "none";
  searchInput.style.display = "none";
  btnNextOpen.style.display = "none";
  btnOpen.style.display = "block"
  //searchInput.value = "";
});

////////////////////////////////////////////////////////////

/////////////////////// MENU HAMBERGUER ////////////////////

const searchBtnClose = document.querySelector(".search-close-btn-menu");
const openBtn = document.querySelector(".mobile-sidebar")

searchBtnClose.addEventListener("click", () => {
  searchBtnClose.style.display = "none";
});

openBtn.addEventListener("click", () => {
  searchBtnClose.style.display = "block";
})

////////////////////////////////////////////////////////////

const loader = document.querySelector('.loader-wrapper');
const apikey = '0fe15371e2f5ef4035accd68fb8832ac';
const form = document.getElementById('form')
form.addEventListener('submit', getCity);

let country;
function getCity(e){
    //nao fazer load à pagina quando faço submit
    e.preventDefault();
    // load efect
    loader.attributeStyleMap.delete('display')
    $(".loader-wrapper").fadeOut(2000);

    let city = document.getElementById('search').value;
    console.log(city)
    if(!city){
        alert('Digite uma Cidade')
        // para nao fechar o ecrã de pesquisa caso nao procure nada
        searchContainer.classList.add("active");
        searchCloseBtn.style.display = "block";
        searchInput.style.display = "block";
        btnNextOpen.style.display = "block";
        btnOpen.style.display = "none"
    }else{
        document.getElementById('search').value = '';
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
            .then(data => data.json())
            .then(json => {
                let location = document.getElementById('location');
                location.innerHTML = (json.name + ', '+ Convertreturn(json.sys.country))
                //IMG TEMP
                document.getElementById('principal-IMG').src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@4x.png`;
                //CONVET TEMPERATURA PARA CELSIUS
                let temp = KtoC(json.main.temp);
                let tempo = document.getElementById('graus')
                tempo.innerHTML = temp+ 'ºC'
                // CAIXA INFO
                let humidade = document.getElementById('humidade')
                humidade.innerHTML = json.main.humidity + '%';
                let velocidadeVento = document.getElementById('velocidade-vento')
                velocidadeVento.innerHTML = json.wind.speed + 'km/h'
                let nublado = document.getElementById('nublado')
                nublado.innerHTML = json.clouds.all + '%'
                let pressaoAtmosferica = document.getElementById('pressao-atmosferica')
                pressaoAtmosferica.innerHTML = json.main.pressure + 'mba'
                HoursPrevisao(json.coord.lat, json.coord.lon);
                console.log(json)
                //loader.style.display = 'none';
            })
            .catch(err => {
                //loader.style.display = 'none';
                console.log('Erro: ', err)
            });
    }      
}
//Kelvin to Cesius
function KtoC(K) {
    return Math.floor(K - 273.15);
}

function HoursPrevisao(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`)

    .then(data => data.json())
    .then(json => {

        FiveDayCards(json);
        console.log(json)
    })
    .catch(err => console.log('Erro: ', err))
    console.log('Lat: ',lat)
    console.log('Lon: ',lon)
}

function FiveDayCards( json ){
    
    /*
    for(i=0; i<5; i++){
        let mediaDiaGraus = avg(json.list[i].main.temp_min,json.list[i].main.temp_max)
        const cards = document.createElement('div');
        let aux = document.getElementById('section-cards')
        aux.innerHTML = '';

        cards.innerHTML = `
        <div class="card blue">
            <div class="all-card blue">
                <p class="hour p-cards blue">12:00</p>
                <!--Colocar aqui o caminho da imagem-->
                <img src="https://openweathermap.org/img/wn/${json.list[i].weather[0].icon}@4x.png" alt="Previsão Visual/IMG" class="img-clima-card blue">           
                <p class="graus-hour p-cards blue">${mediaDiaGraus}ºC</p>
            </div>    
        </div>
        `;

        document.getElementById('section-cards').appendChild(cards);
        console.log(cards)
    }
    */
    
    let newArrayToday = [];

    for(i=0; i<json.cnt; i++) {

        //COMPARAR À DATA ATUAL
        let today = new Date().toLocaleDateString('fr-CA', {timeZone: 'UTC'}) //
        let aux = json.list[i].dt_txt
        //let getHours = aux.split(' ')[1];
        //VERIFICAR EM CADA OBJETO SE A DATA É IGUAL AO DIA DE HOJE
        if ( aux.includes(today) || i <= 6 ) {
            newArrayToday.push([json.list[i]])
        }
    }


    let cards
    let aux = document.getElementById('section-cards1')
    aux.innerHTML = '';


    //LOOP AO ARRAY DE OBJETOS PARA COLOCAR NO HTML

    newArrayToday.forEach( (element, index) => {

        //(( VALIDAÇÃO POR CAUSA DAS CORES DOS CARDS))//

        let color = 'white';
        let pcolor = 'grey';

        if ( index == 0){
            color = 'blue'
            pcolor = ''
        }        
        
        ///////////////////////////////////////////////
        
        let cards = document.createElement('div');
       
        
        let hours = element[0].dt_txt.split(' ')[1].split(':')[0];
        let minutes = element[0].dt_txt.split(' ')[1].split(':')[1];

        cards.innerHTML = `
            <div class="swiper-slide" role="group">
                <div class="card item ${color}">
                    <div class="all-card ${color}">
                        <p class="hour p-cards ${color} ${pcolor}">${hours + ':' + minutes}</p>
                        <!--Colocar aqui o caminho da imagem-->
                        <img src="https://openweathermap.org/img/wn/${element[0].weather[0].icon}@4x.png" alt="Previsão Visual/IMG"class="img-clima-card ${color}">           
                        <p class="graus-hour p-cards ${color} ${pcolor}">${KtoC(element[0].main.temp)}ºC</p>
                    </div> 
                </div>
            </div>
        `;
        
        aux.appendChild(cards);
    })
}

function avg(num1, num2){
    /*
    console.log('NMum1: ',num1)
    console.log('NMum2: ',num2)
    console.log('Media: ',KtoC((Number(num1)+Number(num2))/2))
    */
    return KtoC((Number(num1)+Number(num2))/2);
}

function Convertreturn (countrySigla){
    let country;
    
    switch (countrySigla) {
        case 'AF':
            return country = 'Afrikaans'
        break;							
        case 'AL': 
            return country = 'Albanian'
        break;	
        case 'AR': 
            return country = 'Arabic'
        break;	
        case 'AZ': 
            return country = 'Azerbaijani'
        break;	
        case 'BG': 
            return country = 'Bulgarian'
        break;	
        case 'CA': 
            return country = 'Catalan'
        break;	
        case 'CZ': 
            return country = 'Czech'
        break;	
        case 'DA': 
            return country = 'Danish'
        break;	
        case 'DE': 
            return country = 'German'
        break;	
        case 'EL': 
            return country = 'Greek'
        break;	
        case 'EN': 
            return country = 'English'
        break;	
        case 'EU': 
            return country = 'Basque'
        break;	
        case 'FA': 
            return country = 'Persian (Farsi)'
        break;	
        case 'FI': 
            return country = 'Finnish'
        break;	
        case 'FR': 
            return country = 'French'
        break;	
        case 'GL': 
            return country = 'Galician'
        break;	
        case 'HE': 
            return country = 'Hebrew'
        break;	
        case 'HI': 
            return country = 'Hindi'
        break;	
        case 'HR': 
            return country = 'Croatian'
        break;	
        case 'HU': 
            return country = 'Hungarian'
        break;
        case 'ID': 
            return country = 'Indonesian'
        break;	
        case 'IT': 
            return country = 'Italian'
        break;	
        case 'JA': 
            return country = 'Japanese'
        break;	
        case 'KR': 
            return country = 'Korean'
        break;	
        case 'LA': 
            return country = 'Latvian'
        break;	
        case 'LT': 
            return country = 'Lithuanian'
        break;	
        case 'MK': 
            return country = 'Macedonian'
        break;	
        case 'NO':
            return country = 'Norwegian'
        break;	
        case 'NL':
            return country = 'Dutch'
        break;	
        case 'PL':
            return country = 'Polish'
        break;	
        case 'PT':
            return country = 'Portugal'
        break;	
        case 'BR': 
            return country = 'Português Brasil'
        break;	
        case 'RO': 
            return country = 'Romanian'
        break;	
        case 'RU': 
            return country = 'Russian'
        break;	
        case 'SE':
            return country = 'Swedish'
        break;	
        case 'SK': 
            return country = 'Slovak'
        break;	
        case 'SL': 
            return country = 'Slovenian'
        break;	
        case 'ES': 
            return country = 'Spanish'
        break;	
        case 'SR': 
            return country = 'Serbian'
        break;	
        case 'TH': 
            return country = 'Thai'
        break;	
        case 'TR':
            return country = 'Turkish'
        break;	
        case 'UA': 
            return country = 'Ukrainian'
        break;
        case 'VI': 
            return country = 'Vietnamese'	
        break;
        case 'CN':
            return country = 'Chinese Simplified'
        break;
        case 'TW': 
            return country = 'Chinese Traditional'
        break;
        case 'ZU': 
            return country = 'Zulu'
        break;
        default:
            return country = 'Indefinido'
            
    }
}