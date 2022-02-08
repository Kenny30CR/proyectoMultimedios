import { MY_API_KEY } from './config.js';

(function onLoad()
{
    // Funcion del boton buscar
    setButtonFunctions();

    // fetch del API
    //getCurrencyExchangeRates();
})();

function setButtonFunctions()
{
    document.getElementById('buscar').onclick = getCurrencyExchangeRates;
   
}


// Currency Exchange rates
async function getCurrencyExchangeRates()
{
    console.log("boton buscar")
    const q = document.getElementById('buscarpelicula').value;
    
    await fetch("https://imdb8.p.rapidapi.com/auto-complete?q=" + q , {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Pelicula:");
        console.log(response.d[0].l);
        console.log("\n");

        

        // Mostrar datos
        document.getElementById('nombrepeli').innerHTML =  response.d[0].l;
        document.getElementById('imgpeli').src =  response.d[0].i.imageUrl;
        //document.getElementById('trailerpeli').src = response.d[0].v[0];
        document.getElementById('actores').innerHTML = 'Actores: '+  response.d[0].s;
        document.getElementById('año').innerHTML = 'Año: '+ response.d[0].y;
        document.getElementById('ranking').innerHTML = 'Ranking: '+ response.d[0].rank;
        document.getElementById('categoria').innerHTML ='Categoria: '+  response.d[0].q;
    })
    .catch(err => {
        console.log(err);
    });
}