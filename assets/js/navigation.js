let maxPage;
let page = 1;
let infiniteScroll;

window.addEventListener("load", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);

searchFormBtn.addEventListener("click", () => {
    location.hash = "#search=" + decodeURI(searchFormInput.value);
});

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends";
    getTrendingMovies();
});

arrowBtn.addEventListener("click", () => {
    location.hash = window.history.back();
  
});

function navigator(){

    if (infiniteScroll){
        window.removeEventListener("scroll", infiniteScroll, { passive: false});
        infiniteScroll = undefined;
    }
    const v_hash = location.hash;
    if (v_hash.startsWith("#trends")){
        trendsPage();
    } else if (v_hash.startsWith("#search=")){
        searchPage();
    } else if (v_hash.startsWith("#movie=")){
       moviePage();
    } else if (v_hash.startsWith("#category=")){
        categoriesPage();
    } else {
        homePage();
    }

    if (infiniteScroll){
        window.addEventListener("scroll", infiniteScroll, { passive: false});
    }
}

function homePage() {

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.classList.add("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");
    
    getTrendingMoviesPreview();
    getListCategories();
}

function trendsPage(){

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    headerCategoryTitle.innerHTML = "";
    headerCategoryTitle.innerHTML = "Tendencias";
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    getTrendingMovies();

    infiniteScroll = getPaginationTradingMovies;
   
}

function searchPage(){

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    let key = location.hash.split("=")[1];
    searchMovies(key);
    infiniteScroll = getPaginationMoviesBySearch(key);

    
}

function moviePage(){
   
    headerSection.classList.add('header-container--long');
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive");

    let movie_id = location.hash.split("=")[1];
    getDetailMovie(movie_id);
}

function categoriesPage(){
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    headerCategoryTitle.innerHTML = "";
    headerCategoryTitle.innerHTML = decodeURI(location.hash.split("-")[1]);
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    let idCategory = location.hash.split("-")[0].split("=")[1];
    getMoviesByCategory(idCategory);
    infiniteScroll = getPaginationMoviesByCategory(idCategory);
    smoothscroll();
}

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};
