import React, { Component } from "react";
import { connect } from "react-redux";
import MovieCard from '../MovieCard/MovieCard'
import {addMovieFavorite, getMovies} from '../../actions/index'
import Styles from './Buscador.module.css';
import apiKey from '../../config.js'

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      response: {},
      films: [],
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value });   // Each time the input change, the value is saved 
    if (event.target.value.length >=3){
      fetch(`http://www.omdbapi.com/?${apiKey}&s=${event.target.value}`)  // we fetch to the API the films that can mach the value
      .then(response => response.json())
      .then(response => this.setState({response: response})) //
      if (this.state.response.Response === 'True'){
        let moviesTitles;
        moviesTitles= this.state.response.Search.map((movie => movie.Title))
        this.setState({films: moviesTitles})
      } 
    }

  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title)
  }

  render() {
    const { title } = this.state;
    return (
      <div className={Styles.cnt} >      
        <form className={Styles.formContainer} onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className={Styles.label} htmlFor="title">Película: </label>
            <input
              className={Styles.input}
              placeholder='Escriba un título'
              type="text"
              id="txtAutoComplete"
              list="MovieList"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
            <datalist id="MovieList">
            {this.state.films.map(
              (film , idx) => <option key = {film+idx} value={film}>{film}</option>
            )}
            </datalist>
          </div>
          <button className={Styles.button} type="submit" >BUSCAR</button>

        </form>
        {!this.props.movies 
        ? (<div>Por favor ingrese un nombre de una pelicula</div>)
        :
        <div className={Styles.container}>
          {
            this.props.movies.map((movie)=>{
              return(
                <MovieCard key = {movie.imdbID} movie = {movie} action = {this.props.addMovieFavorite} text = 'Add to Favorite' />
              )})
            
          }
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buscador);
