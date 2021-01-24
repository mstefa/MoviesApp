import React from 'react';
import { connect } from 'react-redux';
import { getMovieDetail, addMovieFavorite } from '../../actions/index';
import Styles from './Movie.module.css'


class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
    

    componentDidMount(){
        this.props.getMovieDetail(this.props.match.params.id);
    } 

    render() {

      if(!!this.props.movieDetail){
        return (
          <div className={Styles.container}>
              <p className={Styles.titlespan}>{this.props.movieDetail.Title}</p>
              <img className={Styles.image} src={this.props.movieDetail.Poster} alt = 'Movie Poster' ></img>
              <p><strong>Año: {' '}</strong>{this.props.movieDetail.Year}</p>
              <p><strong>Tipo: {' '}</strong>{this.props.movieDetail.Type}</p>
              <p><strong>Plot: {' '}</strong>{this.props.movieDetail.Plot}</p>
              <p><strong>Actors {' '}</strong>{this.props.movieDetail.Actors}</p>
              <p><strong>Premios {' '}</strong>{this.props.movieDetail.Awards}</p>
              <p><strong>imdbRating {' '}</strong>{this.props.movieDetail.imdbRating}</p>
              <button onClick={()=> this.props.addMovieFavorite(this.props.movieDetail)}>Agregar a Favoritos</button> 
          </div>
      );
      }else{
        return(
          <div>Loading...</div>
        )
      }


    }
}

function mapStateToProps(state) {
    return {
        movieDetail: state.movieDetail
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        getMovieDetail: (movieId) => dispatch(getMovieDetail(movieId)),
        addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Movie);