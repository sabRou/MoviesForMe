// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import {connect} from 'react-redux'

class FilmDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }


  _displayLoading(){
    if(this.state.isLoading){
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _toggleFavorite(){
    const action = { type: "TOGGLE_FAVORITE", value:this.state.film }
    this.props.dispatch(action)

  }
  _diplayFavoriteImage(){
    var sourceImage = require('../Images/ic_favorite_border.png')
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../Images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  _displayFilm() {
    const {film} = this.state
  if (film != undefined) {
    return (
      <ScrollView style={styles.scrollview_container}>
      <Image
        style={styles.image}
        source={{uri: getImageFromApi(film.poster_path)}}
      />
        <Text style={styles.title_text}>{film.title}</Text>
        <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>
          {this._diplayFavoriteImage()}
        </TouchableOpacity>
        <Text style={styles.description_text}>{film.overview}</Text>
      <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
      <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
             return genre.name;
           }).join(" / ")}
           </Text>
           <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
             return company.name;
           }).join(" / ")}
         </Text>
         <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>

      </ScrollView>
    )
  }
}

componentDidMount(){
  getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
         this.setState({
           film: data,
           isLoading: false
         })
       })
}

componentDidUpdate(){
  console.log("componentDidUpate: ")
  console.log(this.props.favoritesFilm)
}
  render() {
    return (
      // this.props.navigation.getParam('idFilm')
      //  <Text>Détail du film {this.props.navigation.state.params.idFilm} </Text>
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
},
 scrollview_container: {
    flex: 1,
  },
  image: {
    height: 170,
    margin:5
  },
  title_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',

  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 10,
    marginTop:10
  },
  default_text: {
  marginLeft: 5,
  marginRight: 5,
  marginTop: 5,
}, favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
}, favorite_image: {
  width: 40,
  height:40
}
})
const mapStateToProps = (state) => {
  return {
  favoritesFilm: state.favoritesFilm
}
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail)
