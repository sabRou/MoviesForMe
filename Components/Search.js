import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text , ActivityIndicator} from 'react-native'
import FilmItem from '../Components/FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends Component {

  constructor(props) {
  super(props)
  this.searchedText = ""
  this.page = 0 // Compteur pour connaître la page courante
  this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
  this.state = { films: [],
  isLoading: false }

}

_displayDetailForFilm = (idFilm) => {
  console.log("Display film " + idFilm)
  this.props.navigation.navigate("FilmDetail", {idFilm : idFilm})
}

_searchFilms(){
  this.page = 0
this.totalPages = 0
this.setState({
  films: []
}, () => {
  console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
  this._loadFilms()
  })
}
_loadFilms(){
  if(this.searchedText.length > 0){
    this.setState({isLoading: true})
  getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data =>
    {
      //console.log(data)
    this.page = data.page
    this.totalPages = data.total_pages
    this.setState({
      films:[...this.state.films, ...data.results]
      , isLoading: false})
    }
    )

    }
}
_searchTextInputChanged(text) {
  this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
}

_displayLoading(){
  if(this.state.isLoading){
    return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
          </View>
        )
  }
}


  render(){
    console.log("RENDER")
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.text_input} placeholder="looking for?"
        onChangeText={(text) => this._searchTextInputChanged(text)}
        onSubmitEditing={() => this._searchFilms()}/>
        <Button style={{height: 50}} title="Search" onPress={() => {this._searchFilms()}}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if(this.state.films.length > 0 && this.page < this.totalPages) {
              this._loadFilms()
              console.log("onEndReached")}
          }

          }
        />
         {this._displayLoading()}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  text_input: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
   position: 'absolute',
   left: 0,
   right: 0,
   top: 100,
   bottom: 0,
   alignItems: 'center',
   justifyContent: 'center'
 }
})

export default Search
