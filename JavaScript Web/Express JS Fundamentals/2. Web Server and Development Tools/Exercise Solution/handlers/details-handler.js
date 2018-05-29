const database = require("../config/database");
const querystring = require("querystring");
const url = require("url");

function getMovieIndex(request) {
    return querystring.parse(url.parse(request.url).query).movie;
}

module.exports = {
    canHandle(path, request) {
        return path.startsWith("/movies/details") && getMovieIndex(request) !== undefined;
    },
    handle(request, response) {
        this.retrieveHtml("details", response, {
            fileProcessor(file) {
                const movie = database[getMovieIndex(request)];

                return file.replace("{{replaceMe}}", `
               <div class="content">
                    <img src="${decodeURIComponent(movie.moviePoster)}" alt=""/>
                    <h3>Title ${decodeURIComponent(movie.movieTitle)}</h3>
                    <h3>Year ${decodeURIComponent(movie.movieYear)}</h3>
                    <p> ${decodeURIComponent(movie.movieDescription)}</p>
               </div>`);
            }
        });
    }
};