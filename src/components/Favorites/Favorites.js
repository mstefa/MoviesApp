import React, { Component } from "react";
import { connect } from "react-redux";
import {removeMovieFavorite} from '../../actions/index'
import MovieCard from '../MovieCard/MovieCard'
import { removeArticle } from "../../actions/index";

import './Favorites.css';

export class ConnectedList extends Component {

  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        {!(this.props.favMovies.length)  ?
          <div> No hay peliculas favoritas seleccionadas </div>
        :<ul>
          {this.props.favMovies.map((movie)=>{
            return(
              <MovieCard movie = {movie} action = {this.props.removeMovieFavorite} text = 'remove' />
            )
          })}
        </ul>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favMovies: state.movies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeMovieFavorite: (movie) => dispatch(removeMovieFavorite(movie) ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedList);
