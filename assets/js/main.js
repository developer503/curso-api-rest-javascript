
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



function drawMovies(movies, container){

    container.innerHTML = "";
    
    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");

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