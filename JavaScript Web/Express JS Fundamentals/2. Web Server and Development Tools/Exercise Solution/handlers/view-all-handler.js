const database = require("../config/database");

module.exports = {
    canHandle(path) {
        return path.endsWith("viewAllMovies");
    },
    handle(request, response) {
        this.retrieveHtml("viewAll", response, {
            fileProcessor(file) {
                let index = -1;

                const movies = database.map(movie =>
                    `<div class="movie">
                        <a href="/movies/details?movie=${++index}">
                            <img src="${decodeURIComponent(movie.moviePoster)}" alt="poster" class="moviePoster">
                        </a>
                     </div>`
                );

                return file.replace("{{replaceMe}}", movies);
            }
        });
    }
};