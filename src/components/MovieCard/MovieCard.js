import React from 'react'
import { Link } from 'react-router-dom';

export default function MovieCard({movie, action, text}) {
  return (
    <li>
      <Link to={`/movie/${movie.imdbID}`}>
      {movie.Title} 
      </Link>
      <button onClick={()=> action(movie)}>{text}</button> 
    </li>)

}