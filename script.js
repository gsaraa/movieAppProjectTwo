// / - Create an app object
// - Create an init method and call it at the end of our js file
// - Fetch genre and discover apis
//     - Store url and key in variables for cleaner code
// - Use genre endpoint to get genre id and name
    // - Dynamically create option elements using the genre id/name
    // - Append in the genre select section
// - Use querySelector to get our form element and store it in a variable
//     - Add an event listener to our form element
// - Store user input’s value in a variable using query Selector
// - Upon user’s click, make an API call, get movies based on year and genre selection
// - Go through the array and append 10 picks on the page

// 1. ==========
const movieApp = {};
// properties storing url and key for Genre endpoint
movieApp.genreApiUrl = 'https://api.themoviedb.org/3/genre/movie/list';
https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
movieApp.genreApiKey = 'c17d6ea449ecfb7983863b0e3f6a5d7d';

// =========== Getting list of genres from endpoint =================================
// store url & query info
movieApp.populateOptions = () => {
    const genreUrl = new URL(movieApp.genreApiUrl);
    genreUrl.search = new URLSearchParams({
        api_key: movieApp.genreApiKey
    })
    // make the api call & return the json object
    fetch(genreUrl)
    .then((response) => {
        return response.json();
    })
    .then((jsonResponse) => {
        // call the print function while sending the json response to it
        // the array of genres is one level inside the json object, so need to say 'jsonResponse.genres'
        movieApp.printDropdowns(jsonResponse.genres)
        // console.log(jsonResponse.genres)
    })
}
// function to print genres to dropdown menus
movieApp.printDropdowns =  function (genreData){
    const genreDropdown = document.querySelector('#genre'); /* select dropdown menu */
    genreData.forEach((item) => {
        const dropdownItem = document.createElement('option'); /* create the new elements */
        dropdownItem.value = item.id; /* Populate each option with value code for making queries later */
        dropdownItem.innerText = item.name; /* Populate each option with name of genre for user to see */
        genreDropdown.appendChild(dropdownItem); /* place new elements inside dropdown menu */
    });
    movieApp.getGenreId(); // Call getGenreId here so it runs AFTER the option elements are created
}
// 3. ============
movieApp.apiURL = 'https://api.themoviedb.org/3/discover/movie';
movieApp.apiKey = 'e70332005f91b878abd0a2a43b066814';

movieApp.getMovies = function(userGenreSelection, userYearSelection) {
    const url = new URL(movieApp.apiURL);
    // console.log(userGenreSelection);

    url.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        with_original_language: "en",
        with_genres: userGenreSelection,
        primary_release_year: userYearSelection
    })
    fetch(url)
    .then(function(apiResponse){
        return apiResponse.json();
    })
    .then(function (jsonData) {
        
        movieApp.displayMovie(jsonData.results);
    })
};

movieApp.displayMovie = function(movies) {
    
    const formEl = document.querySelector('.userSubmit');
    
    formEl.addEventListener('submit', function(event) {
        document.querySelector('.printMovies').innerHTML = '';

        event.preventDefault();
        
        movies.forEach(function(movieItem) {
            console.log(movieItem);
            const liElements = document.createElement('li');
            
            const movieTitle = document.createElement('h2');
            movieTitle.innerText = movieItem.original_title;
            
            const moviePoster = document.createElement('img');
            moviePoster.src = `https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`;
            moviePoster.alt = movieItem.title;
            
            const movieOverview = document.createElement('p');
            movieOverview.innerText = movieItem.overview;
            
            liElements.append(movieTitle, moviePoster, movieOverview);
            
            const ulElement = document.querySelector('.printMovies');
            ulElement.appendChild(liElements);
        });

        movieApp.getYear();
    });
};

movieApp.getGenreId = function() {
    document.querySelector('#genre').addEventListener('change', function() {
        movieApp.getMovies(this.value);
    });
};

movieApp.getYear = function() {
    const yearSection = document.querySelector('#year');
    // .addEventListener('change', function() {
        // if (this.value === this.value && this.value < 10) {
        //     movieApp.getMovies(userGenreSelection, [this].value)
        //     console.log('hiya');
        // }
        console.log(yearSection);
    // });

}



// 2. ========
// INIT FUNCTION
movieApp.init = function() {
    movieApp.populateOptions()
}

// 2a =========
// CALLING FUNCTIONS TO RUN APP
movieApp.init();

