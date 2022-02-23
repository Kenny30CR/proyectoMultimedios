
const URL = 'https://api.themoviedb.org/3/movie/';
const MY_API_KEY= '2aab36ceaf5eea00ec420ea81f1fe8ce';
const pageHeading = document.getElementById('pageHeading');

async function loadMovie(){
    const movieId = localStorage.getItem('movieId');
    const movieDetail = document.getElementById('contenedor');
    try{
        const answer = await fetch(`${URL}${movieId}?api_key=${MY_API_KEY}&language=es-MX`);
        const movieVideo = await fetch(`${URL}${movieId}/videos?api_key=${MY_API_KEY}&language=es-MX`);
        const similarMovies = await fetch(`${URL}${movieId}/similar?api_key=${MY_API_KEY}&language=es-MX`);

        const videoData = await movieVideo.json();
        const data = await answer.json();
        const similarMoviesData = await similarMovies.json();
        const sMovies= similarMoviesData.results.slice(0,3);

        pageHeading.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`;

        movieDetail.innerHTML = 
        //movie detail, similar movies and trailer
        `<div class="container">
            <div class="row">
                <div class="col-md-4">
                    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.title}" class="img-fluid rounded animate__animated animate__slideInLeft">
                </div> 
                <div class="col-md-8">
                    <h2 class="fs-1 rounded text-center mb-2" style="color: white;">${data.title}</h2>
                    <p class="text-justify mb-3" style="color: white;"><b>Descripción:</b> ${data.overview}</p>
                    <p class="mb-3" style="color: white;"><b>Fecha lanzamiento:</b> ${data.release_date}</p>
                    <p class="mb-3" style="color: white;"><b>Promedio votación:</b> ${data.vote_average}</p>
                    <p class="mb-3" style="color: white;"><b>Estado:</b> ${data.status}</p>
                </div>
            </div>
        </div>
        <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2 class="fs-1 my-5" style="color: white;">Películas similares👇:</h2>
                <div class="row">
                    ${sMovies.map(movie => `
                        <div class="col-md-3">  
                                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="img-fluid rounded">
                                <h6 class="text-center mt-2" style="color: white";>${movie.title}</h6>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
        <div class="container mt-5" style=display:${videoData.length !== 0 ? `inline`:`none`};>
            <div class="row">
                <div class="col-md-12">
                    <h2 class="fs-1 my-5" style="color: white;">Trailer✌:</h2>
                    <div class="embed-responsive embed-responsive-16by9 rounded">
                        <iframe class="embed-responsive-item" src=${videoData.results.length !== 0 ? `https://www.youtube.com/embed/${videoData.results[0].key}`:``}></iframe>
                    </div>
                </div>
            </div>
        </div>`; 

    }catch(error){ console.log(error); }
}

function createRelatedMovies(){}
function createTrailer(){}

loadMovie();