import css from '../primaryBox.css';
import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import MyService from '../services/Myservice';
import MovieCard from './movieCard';
import { Link } from 'react-router-dom';

export default class PrimaryBox extends React.Component{
    constructor(props){
        super();
        this.state ={
            data: null,
            years: [...Array(1+2017-1990).keys()].map(v => 1990+v).reverse(),
            orderBy: [
                {
                    text:"Popularidad ascendente",
                    param:"popularity.asc"
                },
                {
                    text:"Popularidad descendente",
                    param:"popularity.desc"
                },
                {
                    text:"Rating ascendente",
                    param:"vote_average.asc"
                },
                {
                    text:"Rating descendente",
                    param:"vote_average.desc"
                }
            ],
            genres: null,
            keywordField: null,
            titles: [0, 0, 0, ""],
            resultMovies: null
        };

        this.setYear = this.setYear.bind(this);
        this.setGenre = this.setGenre.bind(this);
        this.setOrder = this.setOrder.bind(this);
        this.setKeyword = this.setKeyword.bind(this);
        this.searchMovies = this.searchMovies.bind(this);
    }

    setYear(e){
        console.log(e);
        let titlesRes =[e,this.state.titles[1],this.state.titles[2],this.state.titles[3]];
        console.log(titlesRes);
        this.setState({titles: titlesRes });
        let params={
            year: this.state.years[titlesRes[0]],
            // sort_by: this.state.orderBy[titlesRes[1]].param,
            // with_genres: this.state.genres[titlesRes[2]].id,
            // with_keywords: titlesRes[3]
        };
        let res=MyService.getDiscover(params);
        res.then((response)=>{
            response.json().then((movies)=>{
                console.log(movies);
                this.setState({data: movies});
            })
        }).catch((err)=>{
            // Error :(
            console.log("Sorry an error has ocurred fetching movies discover");
        });
        
    }

    setGenre(e){
        console.log(e);
        let titlesRes =[this.state.titles[0], this.state.titles[1], e,this.state.titles[3]];
        console.log(titlesRes);
        this.setState({titles: titlesRes });
        let params={
            // year: this.state.years[titlesRes[0]],
            // sort_by: this.state.orderBy[titlesRes[1]].param,
            with_genres: this.state.genres[titlesRes[2]].id,
            // with_keywords: titlesRes[3]
        };
        let res=MyService.getDiscover(params);
        res.then((response)=>{
            response.json().then((movies)=>{
                console.log(movies);
                this.setState({data: movies});
            })
        }).catch((err)=>{
            // Error :(
            console.log("Sorry an error has ocurred fetching movies discover");
        });
        
    }

    setOrder(e){
        console.log(e);
        let titlesRes =[this.state.titles[0],e,this.state.titles[2],this.state.titles[3]];
        console.log(titlesRes);
        this.setState({titles: titlesRes });
        let params={
            // year: this.state.years[titlesRes[0]],
            sort_by: this.state.orderBy[titlesRes[1]].param,
            // with_genres: this.state.genres[titlesRes[2]].id,
            // with_keywords: titlesRes[3]
        };
        let res=MyService.getDiscover(params);
        res.then((response)=>{
            response.json().then((movies)=>{
                console.log(movies);
                this.setState({data: movies});
            })
        }).catch((err)=>{
            // Error :(
            console.log("Sorry an error has ocurred fetching movies discover");
        });
    }

    setKeyword(e){
        console.log(e.target.value);
        let titlesRes =[this.state.titles[0],this.state.titles[1],this.state.titles[2], e.target.value];
        console.log(titlesRes);
        this.setState({titles: titlesRes });
        let params={
            // year: this.state.years[titlesRes[0]],
            // sort_by: this.state.orderBy[titlesRes[1]].param,
            // with_genres: this.state.genres[titlesRes[2]].id,
            with_keywords: titlesRes[3]
        };
        let res=MyService.getDiscover(params);
        res.then((response)=>{
            response.json().then((movies)=>{
                console.log(movies);
                this.setState({data: movies});
            })
        }).catch((err)=>{
            // Error :(
            console.log("Sorry an error has ocurred fetching movies discover");
        });
    }

    componentWillMount(){
        let resII=MyService.getGenres();
        resII.then((response)=>{
            response.json().then((result)=>{
                console.log(result);
                this.setState({genres: result.genres});
                let res=MyService.getDiscover();
                res.then((response)=>{
                    response.json().then((movies)=>{
                        console.log(movies);
                        this.setState({data: movies});
                    })
                }).catch((err)=>{
                    // Error :(
                    console.log("Sorry an error has ocurred fetching movies discover");
                });
            })
        }).catch((err)=>{
            // Error :(
            console.log("Sorry an error has ocurred fetching genres");
        });
    }

    showMovies(){
        let elems = this.state.data.results.map( movie =>{
            return(
            <MovieCard key={movie.id} data={movie} genres={this.state.genres}/>
            );
        });
        return elems;
    }

    populate(parm){
        let elems;
        switch(parm){
            case 1:
            elems = this.state.years.map( (year, index) =>{
                return(
                <MenuItem eventKey={index} key={index}> { year }</MenuItem>
                );
            });
            break;
            case 2:
            elems = this.state.orderBy.map((elem, index) =>{
                return(
                <MenuItem eventKey={index} key={index}> { elem.text }</MenuItem>
                );
            });
            break;
            case 3:
            elems = this.state.genres.map((genre, index) =>{
                return(
                <MenuItem eventKey={index} key={genre.id}> { genre.name }</MenuItem>
                );
            });
            break;
            default:
            elems = this.state.resultMovies.results.map(movie =>{
                return(
                <Link to={`movie/${movie.id}`} key={movie.id}>  
                    <div className="movie-result" >
                        <div className="wrapper">
                            <img src={MyService.imagesUrl92+movie.poster_path}></img>
                            <div className="inline">
                                <p><strong>{ movie.original_title}</strong></p>
                                <p>{ new Date(movie.release_date).getFullYear()}</p>
                            </div>
                        </div>
                    </div>
                </Link>
                );
            });
            break;
        }
        return elems;
    }

    searchMovies(e){
        // debugger
        if(e.target.value){
            MyService.search(e.target.value).then((response)=>{
                response.json().then((result)=>{
                    console.log(result);
                    this.setState({resultMovies: result});
                })
            }).catch((err)=>{
                // Error :(
                console.log("Sorry an error has ocurred fetching genres");
            });
        }else{
            this.setState({resultMovies: null});
        }
    }



    render(){
        let movies;
        let years = this.populate(1);
        let order = this.populate(2);
        let genres;
        let genreSelected="";
        let searchResults;
        if(this.state.data){
            movies=this.showMovies();
        }
        if(this.state.genres){
            genres = this.populate(3);
            genreSelected=this.state.genres[this.state.titles[2]].name;
        }
        if(this.state.resultMovies){
            searchResults = this.populate(4)
        }
        return(
            <div className="pb-content">
                <div className="pb-search">
                    <div className="wrapper">
                        <i className="fa fa-search"></i>
                        <input className="pb" type="search" placeholder="Buscar" onChange={this.searchMovies}></input>
                    </div>
                </div>
                <div className="pb-result-search">
                        { searchResults }
                </div>
                <div className="wrapper">
                    <section id="filters-section">
                        <h4>Descubre nuevas películas</h4>  
                        <div className="pb-filters">
                            <label>Año</label>
                            <DropdownButton title={this.state.years[this.state.titles[0]]} id="Año" onSelect={this.setYear}>
                                {
                                    years
                                }
                            </DropdownButton>
                        </div>
                        <div className="pb-filters">
                            <label>Ordenar por</label>
                            <DropdownButton title={this.state.orderBy[this.state.titles[1]].text} id="orden" onSelect={this.setOrder}>
                                {
                                    order
                                }
                            </DropdownButton>
                        </div>
                        <div className="pb-filters">
                            <label>Géneros</label>
                            <DropdownButton title={genreSelected} id="genero" onSelect={this.setGenre}>
                                {
                                    genres
                                }
                            </DropdownButton>
                        </div>
                        <div className="pb-filters">
                            <label>Palabra Clave</label>
                            <input type="text" onChange={this.setKeyword} value={this.state.titles[3]}></input>
                        </div>
                    </section>
                    <div className="pb-center">
                        {
                            !this.state.data ? <i className="fa fa-spinner fa-spin fa-3x"/>:movies
                        }
                    </div>
                </div>
            </div>         
        );
    }
}