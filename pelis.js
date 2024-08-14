const fs = require('fs');

// Define el pathway al archivo JSON
const PATH_TO_JSON = 'D:\\Facultad\\CURSO APX\\BUSCADOR PELIS\\pelis.json';

const loadMovies = () => {
    const data = fs.readFileSync(PATH_TO_JSON, 'utf8');
    return JSON.parse(data);
};

const listMovies = (sortAttribute = null) => {
    const movies = loadMovies();
    if (sortAttribute) {
        movies.sort((a, b) => {
            const valueA = a[sortAttribute];
            const valueB = b[sortAttribute];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return valueA.localeCompare(valueB, undefined, { sensitivity: 'base' });
            } else if (typeof valueA === 'number' && typeof valueB === 'number') {
                return valueA - valueB;
            } else {
                return 0;
            }
        });
    }
    return movies;
};

const findMovieByTitle = (title) => {
    const movies = loadMovies();
    return movies.find(movie => movie.title.toLowerCase() === title.toLowerCase());
};

const filterMoviesByTag = (tag) => {
    const movies = loadMovies();
    return movies.filter(movie => {
        return movie.tags.some(t => t.toLowerCase() === tag.toLowerCase());
    });
};

const searchMoviesByTitle = (searchTerm) => {
    const movies = loadMovies();
    return movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
};

module.exports = {
    listMovies,
    findMovieByTitle,
    filterMoviesByTag,
    searchMoviesByTitle
};
