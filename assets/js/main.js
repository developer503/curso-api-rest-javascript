
async function getTrendingMoviesPreview(){
    const res = await fetch("https://api.themoviedb.org/3/trending/movies/day?api_key=" + API_KEY);
    const data = await res.json();
    const movies = data.results;
    
    const trendingPreviewMovieList = document.querySelector("#trendingPreview .trendingPreview-movieList");

    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");

        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.setAttribute("src","https://image.tmdb.org/t/p/w300" + movie.poster_path);
        movieImg.setAttribute("alt", movie.title);
        
        movieContainer.appendChild(movieImg);
        trendingPreviewMovieList.appendChild(movieContainer);
    });
}

async function getListCategories(){
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=es&api_key=" + API_KEY);
    const data = await res.json();
    const categories = data.genres;

    const categoriesContainerPreview = document.querySelector("#categoriesPreview .categoriesPreview-list");

    categories.forEach(category => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");
        
        const h3 = document.createElement("h3");
        h3.classList.add("category-title");
        const textTitle = document.createTextNode(category.name);
        h3.setAttribute("id", "id" + category.id);
        
        h3.appendChild(textTitle);
        categoryContainer.appendChild(h3);
        categoriesContainerPreview.appendChild(categoryContainer);

    })
}

getTrendingMoviesPreview();
getListCategories();