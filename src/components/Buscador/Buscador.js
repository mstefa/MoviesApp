import React, { Component } from "react";
import { connect } from "react-redux";
import MovieCard from '../MovieCard/MovieCard'
import { NavLink } from 'react-router-dom';
import {addMovieFavorite, getMovies} from '../../actions/index'
import './Buscador.css';
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

    if (event.target.value.leght >=3 &&  event.target.value.leght % 2 > 0){
      fetch('http://www.omdbapi.com/?=' + apiKey + '&s' + event.target.value)  // we fetch to the API the films that can mach the value
      .then(response => response.json())
      .then(response => this.setState({response: response}))
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
      <div>
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">Película: </label>
            <input
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
          <button type="submit" >BUSCAR</button>

        </form>
        {!this.props.movies 
        ? (<div>Por favor ingrese un nombre de una pelicula</div>)
        :
        <ul>
          {
            this.props.movies.map((movie)=>{
              return(
                <MovieCard movie = {movie} action = {this.props.addMovieFavorite} text = 'Add to Favorite' />
              )})
            
          }
        </ul>
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
