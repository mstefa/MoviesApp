import React, { Component } from "react";
import { connect } from "react-redux";
import MovieCard from '../MovieCard/MovieCard'
import { NavLink } from 'react-router-dom';
import {addMovieFavorite, getMovies} from '../../actions/index'
import './Buscador.css';



export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
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
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
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
