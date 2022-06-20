
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
   
    const movies = data.results;
    
    //const trendingMoviesPreviewList = document.querySelector("#trendingPreview .trendingPreview-movieList");
    trendingMoviesPreviewList.innerHTML = "";
    
    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");

        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.setAttribute("src","https://image.tmdb.org/t/p/w300" + movie.poster_path);
        movieImg.setAttribute("alt", movie.title);
        
        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}

async function getListCategories(){
    const { data } = await api("/genre/movie/list", {
        params: {
            "language" : "es"
        }
    });
  
    const categories = data.genres;

    //const categoriesContainerPreview = document.querySelector("#categoriesPreview .categoriesPreview-list");
    categoriesPreviewList.innerHTML = "";

    categories.forEach(category => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");
        
        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        const textTitle = document.createTextNode(category.name);
        categoryTitle.setAttribute("id", "id" + category.id);
        
        categoryTitle.appendChild(textTitle);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);

    })
}
