const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
    console.log("state in toggle favoris")
    console.log(state)
    console.log(action)
    const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)

    if(favoriteFilmIndex !== -1){
      // film already exists, delete it
      nextState = {
        ...state,
        favoritesFilm: state.favoritesFilm.filter( (item,index) => index !== favoriteFilmIndex)
      }
    } else {
      // new favorite film, add it to the list
      nextState = {
        ...state,
        favoritesFilm: [...state.favoritesFilm, action.value]
      }
    }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite
