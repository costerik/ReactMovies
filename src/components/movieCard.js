import css from '../movieCard.css';
import React from 'react';
import MyService from '../services/Myservice';
import { Link } from 'react-router-dom';

export default class MovieCard extends React.Component{
    constructor(props){
        super();
        this.state = { genres: null };
    }

    componentWillMount(){
        let genresMap={};
        if(this.props.genres){
            this.props.genres.forEach( genre => {
                genresMap[genre.id]=genre.name;
            });
            this.setState({genres: genresMap});
        }
    }

    matchGenres(){
        let result ="";
        this.props.data.genre_ids.map( elem => {
            result+=this.state.genres[elem]+", ";
        });

        return (
            <p> {result.substring(0,result.length-2)} </p>
        )
    }

    render(){
        return(
            <div className="mc-content">
                <Link to={`movie/${this.props.data.id}`}>
                    <img src={MyService.imagesUrl+this.props.data.poster_path}/>
                </Link>
                <div className="mc-data-movie">
                    <div>
                        <div className="title">
                            <div className="mc-start">
                            <Link to={`movie/${this.props.data.id}`}>
                                {this.props.data.original_title}
                            </Link>
                                <div className="average push-right">
                                    {this.props.data.vote_average}
                                    <i className="fa fa-star"></i>
                                </div>  
                            </div>
                            
                        </div>
                        <div className="year">
                            <p className="">{new Date(this.props.data.release_date).getFullYear() }</p>
                            {this.state.genres? this.matchGenres():"Nada"}
                        </div>
                        <div className="">
                            <p className="overview">
                                {this.props.data.overview}
                            </p>
                        </div>
                    </div>
                    <div className="mas-info">
                        {/* <p><a href='#' target="_self">Mas información</a></p> */}
                        <Link to={`movie/${this.props.data.id}`}>Mas información</Link>
                    </div>
                </div>
            </div>
        );
    }
}