import {ADD_MOVIE_FAVORITE, GET_MOVIES, REMOVE_MOVIE_FAVORITE, GET_MOVIE_DETAIL} from './types'
import apiKey from '../config.js'

export function addMovieFavorite(payload) {
  return { 
    type: ADD_MOVIE_FAVORITE, 
    payload,
  }
}


export function removeMovieFavorite(payload) {
  return { 
    type: REMOVE_MOVIE_FAVORITE, 
    payload,
  };
}

export function getMovieDetail(id) {
  return function(dispatch) {
    return fetch(`http://www.omdbapi.com/?${apiKey}&i=${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_MOVIE_DETAIL, payload: json });
      });
  }
}

export function getMovies(titulo) {
  return function(dispatch) {
    return fetch(`http://www.omdbapi.com/?${apiKey}&s=${titulo}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_MOVIES, payload: json });
      });
  };
}

