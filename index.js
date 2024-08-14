const { listMovies, findMovieByTitle, filterMoviesByTag, searchMoviesByTitle } = require('./pelis');

const args = process.argv.slice(2);
let sortAttribute = null;

if (args.includes('--sort')) {
    const sortIndex = args.indexOf('--sort');
    sortAttribute = args[sortIndex + 1];
}

if (args.length === 0 || (args.length === 2 && sortAttribute)) {
    // Si no se pasan argumentos o solo se pasa el argumento --sort, listar todas las películas
    const movies = listMovies(sortAttribute);
    movies.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title} (${movie.year}) - ${movie.director} [${movie.genre}] - Rating: ${movie.rating}`);
    });
} else {
    const command = args[0];

    if (command === 'list') {
        const movies = listMovies(sortAttribute);
        movies.forEach((movie, index) => {
            console.log(`${index + 1}. ${movie.title} (${movie.year}) - ${movie.director} [${movie.genre}] - Rating: ${movie.rating}`);
        });
    } else if (command === 'find') {
        const title = args.slice(1).join(' ');
        if (title) {
            const movie = findMovieByTitle(title);
            if (movie) {
                console.log(`Found: ${movie.title} (${movie.year}) - ${movie.director} [${movie.genre}] - Rating: ${movie.rating}`);
            } else {
                console.log(`Movie "${title}" not found.`);
            }
        } else {
            console.log('Please provide a movie title to search for.');
        }
    } else if (command === '--tag') {
        const tag = args[1];
        if (tag) {
            const movies = filterMoviesByTag(tag);
            if (movies.length > 0) {
                movies.forEach((movie, index) => {
                    console.log(`${index + 1}. ${movie.title} (${movie.year}) - ${movie.director} [${movie.genre}] - Rating: ${movie.rating}`);
                });
            } else {
                console.log(`No movies found with tag "${tag}".`);
            }
        } else {
            console.log('Please provide a tag to search for.');
        }
    } else if (command === '--search') {
        const searchTerm = args[1];
        if (searchTerm) {
            const movies = searchMoviesByTitle(searchTerm);
            if (movies.length > 0) {
                movies.forEach((movie, index) => {
                    console.log(`${index + 1}. ${movie.title} (${movie.year}) - ${movie.director} [${movie.genre}] - Rating: ${movie.rating}`);
                });
            } else {
                console.log(`No movies found with the search term "${searchTerm}".`);
            }
        } else {
            console.log('Please provide a search term.');
        }
    } else {
        console.log(`Unknown command: ${command}`);
        console.log('Available commands: list, find, --tag, --search');
    }
}
