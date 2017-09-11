import React from 'react';
import css from '../movieDetails.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import MyService from '../services/Myservice';
import Slider from 'react-slick';

export default class MovieDetails extends React.Component{
    constructor(props){
        super();
        this.state ={
            movieData: null
        }
    }

    componentWillMount(){
        MyService.getMovie(this.props.match.params.id).then((response)=>{
        // MyService.getMovie(321612).then((response)=>{
            response.json().then( resp => {
                console.log(resp);
                this.setState({ movieData: resp} );
            });
        }).catch((err)=>{
            console.log(err);
            console.log("Sorry an error has acurred fetching movie details!");
        });
    }

    imagesPath(key, gender){
        if(key){
            return MyService.imagesUrl342+key;
        }else{
            return gender==1?"https://sbxcloud.com/www/mytest/avatar-woman.png":
                             "https://sbxcloud.com/www/mytest/avatar-man.png";
        }
    }

    MovieTop(data){
        return (
            <div className="md-content-top">
                <div className="wrapper clearfix">
                    <div className="col-md-4 col-sm-4">
                        <img src={this.imagesPath(data.poster_path)}></img>
                    </div>
                    <div className="col-md-8 col-sm-4">
                        <div className="md-right">
                            <p>{data.original_title }  {  new Date(data.release_date).getFullYear()}</p>
                            <p><i className="md-percentage">{((data.vote_average*100))/10}%</i>User score</p>
                            <p>General</p>
                            <p>{data.overview }</p>
                            <div>
                                <p>{data.credits.crew[0].name}</p>
                                <p>{data.credits.crew[0].job}</p>
                            </div>
                            
                        </div>
                    </div>   
                </div>
            </div>
        );
    }

    Actors(data){
        let list=data.map( actor =>{
            return(
                <div key={actor.id} className="md-list-actors">
                    <img src={this.imagesPath(actor.profile_path, actor.gender)}>
                    </img>
                    <div>
                        <p>{actor.name}</p>
                        <p>{actor.character}</p>
                    </div>
                    
                </div>
            )
        });
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1
          };

        return(
            <div className="md-content-elenco">
                <div className="wrapper">
                    <p>Elenco principal</p>
                    <Slider {...settings}>
                            {
                                list
                            }
                    </Slider> 
                </div>
            </div>
        );
    }

    Globes(data, sw){
        let elems;
        if(sw==1){
            elems=data.genres.map( genre => {
                return(
                    <li key={genre.id}> {genre.name}</li>
                )
            });
        }else{
            elems=data.keywords.keywords.map( k => {
                return(
                    <li key={k.id}> {k.name}</li>
                )
            });
        }
        return(
            elems
        )
    }

    Datos(data){
        let videoUrl;
        if(data.videos.results.length>0){
            videoUrl=true;
        }
        return (
            <div className="md-content-datos">
                <div className="wrapper">
                    <p>Datos</p>
                    <div className="">
                        <ul className="md-list-datos">
                            <li className="">
                                <p>Titulo original</p>
                                <p>{data.original_title}</p>
                            </li>
                            <li className="">
                                <p>Estatus</p>
                                <p>{data.status}</p>
                            </li>
                            <li className="">
                                <p>Lenguaje Original</p>
                                <p>{data.original_language}</p>
                            </li>
                            <li className="">
                                <p>Duración</p>
                                <p>{data.runtime} min</p>
                            </li>
                            <li className="">
                                <p>Presupuesto</p>
                                <p>{MyService.formatter(Number(data.budget))}</p>
                            </li>
                            <li className="">
                                <p>Ingresos</p>
                                <p>{MyService.formatter(Number(data.revenue))}</p>
                            </li>
                        </ul>
                    </div>
                    <p>Generos</p>
                    <ul className="md-globes">
                        { this.Globes(data,1) }
                    </ul>
                    <p>Palabras Clave</p>
                    <ul className="md-globes">
                        { this.Globes(data,2) }
                    </ul>
                    <div className="video">
                        <p>Trailer</p>
                        {
                            videoUrl?<iframe src={MyService.youtube+data.videos.results[0].key}>
                    </iframe>:"No video available..."
                        }
                        
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div className="md-content"> 
                 {this.state.movieData?this.MovieTop(this.state.movieData):""}
                 {this.state.movieData?this.Actors(this.state.movieData.credits.cast):""}
                 {this.state.movieData?this.Datos(this.state.movieData):""}
            </div>

        )
    }
}