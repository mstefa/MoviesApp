import React from 'react'
import { Link } from 'react-router-dom';
import Styles from './MovieCard.module.css';

export default function MovieCard({movie, action, text}) {
  return (
    <div className={Styles.container}> 
      <Link to={`/movie/${movie.imdbID}`}>
      <img className={Styles.img} src = {movie.Poster} alt='film poster'/>
      <h3 className={Styles.title}>{movie.Title}</h3>
      <p className={Styles.description}>{movie.Year} </p>
      </Link>
      <button onClick={()=> action(movie)}>{text}</button> 
    </div>)

}