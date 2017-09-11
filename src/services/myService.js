const _apiUrl= 'https://api.themoviedb.org/3/';
const _imagesUrl= 'https://image.tmdb.org/t/p/w185';
const _imagesUrl342= 'https://image.tmdb.org/t/p/w342';
const _imagesUrl92= 'https://image.tmdb.org/t/p/w92';
const _youtube='https://www.youtube.com/embed/';
const _key='2c76f2934b9b26dd102cc7de830a7455';
const _endPoints={
    discover: 'discover/movie',
    detail: 'movie',
    search: 'search/movie',
    popular: 'movie/popular',
    genres: 'genre/movie/list'
};

module.exports = {
    apiUrl: _apiUrl,
    imagesUrl: _imagesUrl,
    imagesUrl342: _imagesUrl342,
    imagesUrl92: _imagesUrl92,
    youtube: _youtube,
    getDiscover: (params)=>{
        let paramsUrl="";
        for(let key in params){
            paramsUrl+="&"+key+"="+params[key];
        }
        return fetch(`${_apiUrl+_endPoints.discover}?api_key=${_key}${paramsUrl}`, {
            method: 'get'
        });
    },
    getGenres:()=>{
        return fetch(`${_apiUrl+_endPoints.genres}?api_key=${_key}`, {
            method: 'get'
        });
    },
    getMovie:(id)=>{
        return fetch(`${_apiUrl+_endPoints.detail}/${id}?api_key=${_key}&append_to_response=keywords,credits,videos`, {
            method: 'get'
        });
    },
    search:(text)=>{
        return fetch(`${_apiUrl+_endPoints.search}?api_key=${_key}&query=${text}`, {
            method: 'get'
        });
    },
    formatter: (number)=>{
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            // the default value for minimumFractionDigits depends on the currency
            // and is usually already 2
          }).format(number);
    }
};