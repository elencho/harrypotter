import React, { Component } from 'react';
import './App.css';
import btnIcon from './imgs/icon.png'

class ImgSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    film: null,
    slide: 0
    }
  }

  async componentDidMount() {
    this.getData()
  }
  getData = async () => {
    const api_key = '1efc065ba18d1bab5e09dca920757697';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=harry%20potter`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ film: data.results,
     // data.results[this.state.slide], 
      loading: false })
     

  }

  render() {



   let film;


   if(this.state.film) {
     film = this.state.film[this.state.slide];
   }
    
    return (
      <>
      {
        this.state.loading?(
          <div>loading...</div>
        ):(
          <>
          {
            this.state.film?(
      <div className='main-container' >
        <img alt ='poster-img'className='btn-icon back' src={btnIcon} onClick={() => {
          let slide = this.state.slide;
          if(slide-1 < 0){
            slide = this.state.film.length-1;
          }
           else if(this.state.film.length+1 > slide) {
            slide--;
          }else{
            slide = 0 }
            this.setState({ slide })


          }
          
          
        }></img>
      <div className="hajime">
        <img className= 'poster'src={'http://image.tmdb.org/t/p/w400' + film.poster_path} alt="" />
 
        <div className='text-box'>
          <h1>
            {film.original_title}</h1>
          <p>{film.overview}</p>
          <br></br>
          <p>Release date : {film.release_date}</p>
          <p>Vote average : {film.vote_average}</p>
      </div>
       </div>
        <img alt='icon'className='btn-icon'src={btnIcon} onClick={() => {
          let slide = this.state.slide;
          if(this.state.film.length-1 > slide) {
            slide++
          }else{
            slide = 0 }
          
          this.setState({ slide }) 

        }}/>
      </div>
            ):(
  <div>didn't get a film</div>
            )
  }
      </>)  
  }
      </>
    );
  } 
}

export default ImgSlider;
