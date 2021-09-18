// / - Create an app object
// - Create an init method and call it at the end of our js file
// - Fetch api
//     - Store url and key in variables for cleaner code
// - Use querySelector to get our form element and store it in a variable
//     - Add an event listener to our form element
// - Store user input’s value in a variable using query Selector
// - Upon user’s click, make an API call, get movies based on year and genre selection
// - Go through the array and append 10 picks on the page

const movieApp = {};

movieApp.apiURL = 'https://api.themoviedb.org/3/discover/movie';
movieApp.apiKey = 'e70332005f91b878abd0a2a43b066814';

movieApp.getMovies = function() {
    const url = new URL(movieApp.apiURL);
    
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey
    })
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData) {
        console.log(jsonData)
    });
}

movieApp.init = function() {
    movieApp.getMovies();
}

movieApp.init();