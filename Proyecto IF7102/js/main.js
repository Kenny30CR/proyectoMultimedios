import { MY_API_KEY } from './config.js';

let page= 1;
const btnAnterior= document.getElementById('btnAnterior');
const btnSiguiente= document.getElementById('btnSiguiente');
const btnBuscar= document.getElementById('buscar');

//Button events
btnAnterior.addEventListener('click', ()=>{
    if(page > 1){
        page -=1;
        loadMovies();
    }
});

btnSiguiente.addEventListener('click', ()=>{
    if(page < 1000){
        page +=1;
        loadMovies();
    }
});

btnBuscar.addEventListener('click', ()=>{ 
    if(document.getElementById('buscarpelicula').value != 0){
        searchMovie();
    }
    
 });

async function loadMovies(){
    try{
        const answer= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}&language=es-MX&page=${page}`);
        let { status }= answer;

        if(status === 200){
            let movies= '';
            const data = await answer.json();
            data.results.forEach(movie => {
                movies += `
                <div class="pelicula">
                <img class="poster" src=https://image.tmdb.org/t/p/w500/${movie.poster_path}>
                <h3 class="titulo">${movie.title}</h3>
                </div>
                `;
            });
            document.getElementById('contenedor').innerHTML=movies;
        }

    }catch(error){ console.log(error); }
}

async function searchMovie(){
    let movieToSearch = document.getElementById('buscarpelicula').value;
    try{
        let findMovies= '';
        const answer= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&language=es-MX&query=${movieToSearch}&page=${page}&include_adult=false`);

        if(answer.status === 200){
            const data = await answer.json();
            if(data.results.length > 0){
            data.results.forEach(movie => {
                if(movie.backdrop_path){
                    findMovies += `
                    <div class="pelicula">
                    <img class="poster" src=https://image.tmdb.org/t/p/w500/${movie.poster_path}>
                    <h3 class="titulo">${movie.title}</h3>
                    </div>
                    `;
                }
            });
        }else{ 
            document.getElementById('contenedor').innerHTML='No hay películas';
        }
            document.getElementById('contenedor').innerHTML=findMovies;
            document.getElementById('buscarpelicula').value='';
            
        }
    }catch(error){ console.log(error); }
}

loadMovies();
