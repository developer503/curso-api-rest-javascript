
const api = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    params: {
        "api_key": API_KEY
    }
});

async function getTrendingMoviesPreview(){
    const {data} = await api("/trending/movies/day");
    
    drawMovies(data.results,trendingMoviesPreviewList);
}

async function getTrendingMovies(){
    const {data} = await api("/trending/movies/day");
    
    drawMovies(data.results,genericSection);
}

async function getMoviesByCategory(id){
    const {data} = await api("/discover/movie", {
        params: {
            with_genres: id
        }
    });

    drawMovies(data.results, genericSection); 
}

async function getListCategories(){
    const { data } = await api("/genre/movie/list", {
        params: {
            "language" : "es"
        }
    });
  
    drawCategories(data.genres,categoriesPreviewList);
}

async function searchMovies(key){
    const { data } = await api("/search/movie", {
        params: {
            language : "es",
            query: key
        }
    });

    drawMovies(data.results, genericSection); 
}

async function getDetailMovie(id){
    const { data } = await api("/movie/" + id, {
        params: {
            language : "es"
        }
    });

    const urlImageBackground = "https://image.tmdb.org/t/p/w300" + data.poster_path;
    headerSection.style.background = `
        linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
        url(${urlImageBackground})`;

    movieDetailTitle.textContent = data.title;
    movieDetailDescription.textContent = data.overview;
    movieDetailScore.textContent = data.vote_average;

   
    drawCategories(data.genres,movieDetailCategoriesList);
    getSimilarMovies(data.id);
    console.log(data);
}

async function getSimilarMovies(id){
    const { data } = await api(`/movie/${id}/similar`, {
        params: {
            language : "es"
        }
    });

    drawMovies(data.results, relatedMoviesContainer);
}

function drawMovies(movies, container){

    container.innerHTML = "";
    
    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");

        movieContainer.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });

        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.setAttribute("src","https://image.tmdb.org/t/p/w300" + movie.poster_path);
        movieImg.setAttribute("alt", movie.title);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function drawCategories(categories, container){
    container.innerHTML = "";

    categories.forEach(category => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");
        
        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        const textTitle = document.createTextNode(category.name);
        categoryTitle.setAttribute("id", "id" + category.id);
        categoryTitle.addEventListener("click", () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        categoryTitle.appendChild(textTitle);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);

    })
}

