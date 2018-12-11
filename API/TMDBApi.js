// API/TMDBApi.js

const API_TOKEN = "4cbbabe76589d6fa9684b49f588388c3";

export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'http://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}
