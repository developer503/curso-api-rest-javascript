
const api = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    params: {
        "api_key": API_KEY
    }
});

/*Utils */

const lazyLoader = new IntersectionObserver((entries) => {
    
    entries.forEach((entry) => {
      
        if (entry.isIntersecting){
            const urlImage = entry.target.getAttribute("data-img");
            entry.target.setAttribute("src", urlImage);
        }
    })
});

async function getTrendingMoviesPreview(){
    const {data} = await api("/trending/movie/day");
    
    drawMovies(data.results, trendingMoviesPreviewList, true);
}

async function getTrendingMovies(){
    const {data} = await api("/trending/movie/day");
    maxPage = data.total_pages;
    drawMovies(data.results, genericSection, { lazyLoad: true, clear:true});

    /*
    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Cargar más';
    btnLoadMore.addEventListener('click', getAllTradingMovies);
    genericSection.appendChild(btnLoadMore);    */
}

async function getPaginationTradingMovies(){
    
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;

    const scrollIsEnd = (scrollTop + clientHeight) >= (scrollHeight - 15);
    
    const pageIsNotMax = page < maxPage;

    if (scrollIsEnd && pageIsNotMax){
        page++;
        const {data} = await api("/trending/movie/day",
        {
            params: {
                page: page
            }
        });
        
        drawMovies(data.results,genericSection, { lazyLoad: true, clear:false});
    }
   
/*
    const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Cargar más';
    btnLoadMore.addEventListener('click', getAllTradingMovies);
    genericSection.appendChild(btnLoadMore);    */

}
async function getMoviesByCategory(id){
    const {data} = await api("/discover/movie", {
        params: {
            with_genres: id
        }
    });
    maxPage = data.total_pages;
    drawMovies(data.results, genericSection, { lazyLoad: true, clear:true}); 
}

function getPaginationMoviesByCategory(id){
    return async function(){
        const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
        const scrollIsEnd = (scrollTop + clientHeight) >= (scrollHeight - 15);
    
        const pageIsNotMax = page < maxPage;
       
        if (scrollIsEnd && pageIsNotMax){
            page++;
        
            const {data} = await api("/discover/movie", {
                params: {
                    with_genres: id,
                    page: page
                }
            });
            drawMovies(data.results,genericSection, { lazyLoad: true, clear:false});
        }
    }
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
    maxPage = data.total_pages;
    drawMovies(data.results, genericSection, { lazyLoad: true, clear: true}); 
}

function getPaginationMoviesBySearch(key){
    return async function(){
        const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
        const scrollIsEnd = (scrollTop + clientHeight) >= (scrollHeight - 15);
    
        const pageIsNotMax = page < maxPage;

        if (scrollIsEnd && pageIsNotMax){
            page++;
        
            const { data } = await api("/search/movie", {
                params: {
                    language : "es",
                    query: key,
                    page: page
                }
            });
            
            drawMovies(data.results,genericSection, { lazyLoad: true, clear:false});
        }
    }
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
}

async function getSimilarMovies(id){
    const { data } = await api(`/movie/${id}/similar`, {
        params: {
            language : "es"
        }
    });

    drawMovies(data.results, relatedMoviesContainer, { lazyLoad: false, clear: true});
    relatedMoviesContainer.scrollTo(0, 0);
}

function drawMovies(movies, container, { lazyLoad = false, clear = true }){

    if (clear) container.innerHTML = "";
    
    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");

        movieContainer.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });

        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");

        movieImg.setAttribute(lazyLoad ? "data-img" : "src","https://image.tmdb.org/t/p/w300" + movie.poster_path);
        movieImg.setAttribute("alt", movie.title);

        movieImg.addEventListener('error', () => {
            movieImg.setAttribute(
              'src',
              'https://static.platzi.com/static/images/error/img404.png',
            );
          })

        if (lazyLoad){
            lazyLoader.observe(movieImg);
        }
        
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

