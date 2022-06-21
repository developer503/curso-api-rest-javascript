window.addEventListener("load", navigator, false);
window.addEventListener("hashchange", navigator, false);

searchFormBtn.addEventListener("click", () => {
    location.hash = "#search=";
});

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
    location.hash = "#home";
});



function navigator(){
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
}

function homePage() {
    console.log("HOME");
 
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
    console.log("TRENDS")
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
}

function searchPage(){
    console.log("SEARCH")
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
}

function moviePage(){
    console.log("MOVIE")
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
}

function categoriesPage(){
    console.log("CATEGORY")
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
    smoothscroll();
}

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};
