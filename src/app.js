import css from './app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import Login from "./components/login";
import PrimaryBox from "./components/primaryBox";
import Layout from "./components/layout";
import MovieDetails from "./components/movieDetails";

export class MyApp extends React.Component{
  constructor(props){
    super();
  }
  
  render(){
    return(
      <Router>
        <div>
          <header>
            <div className="wrapper">
              <h1><Link to="/"></Link></h1>
              Descubre
            </div>
          </header>
          <Route exact path="/" component={PrimaryBox}/>
          <Route path="/movie/:id" component={MovieDetails}/>
          <footer>
            <h2>Footer</h2>
            <section className='footer-logos'>
              Siguenos
              <ul>
                <li><a href="#" target="_self" rel="nofollow" ><i className="fa fa-youtube fa-2x"></i></a></li>
                <li><a href="#" target="_self" rel="nofollow" ><i className="fa fa-instagram fa-2x"></i></a></li>
                <li><a href="#" target="_self" rel="nofollow" ><i className="fa fa-pinterest fa-2x"></i></a></li>
                <li><a href="#" target="_self" rel="nofollow"><i className="fa fa-twitter fa-2x"></i></a></li>
                <li><a href="#" target="_self" rel="nofollow" ><i className="fa fa-facebook fa-2x"></i></a></li>
              </ul>
            </section>

            <section className='footer-links'>
              <ul>
                <li><a href='#' target="_self">Ayuda</a></li>
                <li><a href='#' target="_self">Sobre Nosotros</a></li>  
                <li><a href='#' target="_self">Contacto</a></li>
              </ul>
              <ul>
                <li><a href='#' target="_self">Términos y Condiciones</a></li>
                <li><a href='#' target="_self">Política de tratamiento de datos personales</a></li>  
                <li><a href='#' target="_self">Politicas de Privacidad</a></li>
                <li><a href='#' target="_self">Peticiones quejas y reclamos</a></li>
                <li><a href='#' target="_self">SICR</a></li>
                <li><a href='#' target="_self">Responsabilidad Social</a></li>
                <li><a href='#' target="_self">Trabaja con nosotros</a></li>
              </ul>
            </section>
          </footer>
          
          {/* <Route path="/main" component={Layout}/> */}
          
        </div>
      </Router>
    );
  }
} 

ReactDOM.render(
  <MyApp/>,
  document.getElementById('root')
);