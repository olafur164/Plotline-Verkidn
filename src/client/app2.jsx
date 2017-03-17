// @flow
import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import redux from 'react-redux'
import Slider from 'react-slick';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import movieimg from './img/movie.png'
require('./css/flexboxgrid-min.css');
require('./css/main.css');
require('./css/main-mk.css');


const base_uri = 'https://api.themoviedb.org/3/'
const api_key = '5caf95feed570ed071f7cb0839668613'
const image_uri = 'https://image.tmdb.org/t/p/'

const Home = () => (
  <div className="">
  	<div className="row">
	  	<div className="col-xs-1 col-sm-2 col-md-2 col-lg-1">
	  		<div className="timeline">
	  			<div className="timeline-dot">
	  				<img src={movieimg} />
	  			</div>
	  			<div className="timeline-line"></div>
	  			<div className="timeline-dot" id="second">
	  				<img src={movieimg} />
	  			</div>
	  			<div className="timeline-line" id="second"></div>
	  		</div>
	  	</div>
	  	<div className="col-xs-11 col-sm-10 col-md-10 col-lg-11 categories">
	    	<Category query="movie/upcoming" />
	    	<Category query="movie/top_rated" />
	    </div>
	</div>
  </div>
)

class Category extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		fetch(`${base_uri}${this.props.query}?api_key=${api_key}`)
		    .then(res => {
		    	return res.json();
		    })
		    .then(json => {
		    	const data = json.results.map(obj => obj);
		    	this.setState({data});
		    });
	}
	render() {
		let settings = {
		    infinite: true,
		    responsive:[
			  	{
			        breakpoint: 4600,
			        settings: {
			          	slidesToShow: 6.5,
			          	slidesToScroll: 1,
			        }
			      },			  	{
			        breakpoint: 1920,
			        settings: {
			          	slidesToShow: 4.5,
			          	slidesToScroll: 1,
			        }
			      },
			      {
			        breakpoint: 1024,
			        settings: {
			          	centerPadding: '20px',
			          	slidesToShow: 3.5,
			          	slidesToScroll: 1,
			        }
			      },
			      {
			        breakpoint: 768,
			        settings: {
			          	slidesToShow: 2	,
			          	centerPadding: '20px',
			          	slidesToScroll: 1
			        }
			      },
			      {
			        breakpoint: 480,
			        settings: {
			          	centerPadding: '10px',
			        	centerMode: true,
			          	slidesToShow: 2.5,
			          	slidesToScroll: 1,
			        }
			      }
		      ]
	    };
		const image = `${image_uri}w500`
		return (
			<div>
				<div className="category"> 
					<h3>Popular</h3>
					<Slider {...settings}>
						<div className="goAway"></div>
						{this.state.data.map((movie) => 
						<div className="movie" key={movie.id}>
							<Link to={"/movie/" + movie.id}>
								<img className="img-responsive" src={image + movie.poster_path}/>
							</Link>
						</div>

		  				) || <div></div>}
		  			</Slider>
	  			</div>
			</div>
		);
	}
}
class Movie extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {},
			genres: [],
			similar: [],
			cast: []
		}
	}
	componentDidMount() {
		fetch(`${base_uri}movie/${this.props.movieid}?api_key=${api_key}&append_to_response=videos,images,credits,similar,images`)
		    .then(res => {
		    	return res.json();
		    })
		    .then(json => {
		    	const data = json;
		    	const genres = data.genres.map(obj => obj);
		    	const cast = data.credits.cast.map(obj => obj);
		    	const similar = data.similar.results.map(obj => obj);
		    	this.setState({data, genres, similar, cast});
		    	console.log(this.state);
		    });
	}
	
	render() {
	  	return (
	  		<div>
			  	<div className="row">
				  	<div className="col-xs-1 col-sm-2 col-md-2 col-lg-1">
				  		<div className="timeline">
				  			<div className="timeline-dot">
				  				<img src={movieimg} />
				  			</div>
				  			<div className="timeline-line"></div>
				  			<div className="timeline-dot" id="movie-second">
				  				<img src={movieimg} />
				  			</div>
				  			<div className="timeline-line" id="movie-second"></div>
				  		</div>
				  	</div>
				  	<div className="col-xs-11 col-sm-10 col-md-10 col-lg-11">
				  		<div className="row">
					  		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					  			<div id="plotline-title">
					  				<h1>{this.state.data.title}</h1>
					  			</div>
					  			<div id="plotline-year">
					  				{this.state.data.release_date}
					  			</div>
					  			<div className="margin-fix"></div>
					  		</div>
					  		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
						  		<div className="plotline-poster">
						  			<img className="img-responsive" src={`${image_uri}w500/${this.state.data.poster_path}`} />
						  		</div>
						  	</div>
					  		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-9">
						  		<div className="plotline-plot">
						  			<h3 className="plot-summary">Plot Summary</h3>
							  			<div className="plotline-information">
						  				{this.state.genres.map(genre => 
						  					<span key={genre.id}>{genre.name}, </span>
						  				)}
						  				<br/>
						  				<span>
							  				Runtime:{this.state.data.runtime}
							  			</span>
							  			</div>
						  			<div className="plotline-overview">
						  				{this.state.data.overview}
						  			</div>
						  		</div>
						  	</div>
					  		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						  		<div className="plotline-cast">
						  			<h3 className="plot-summary">Top Billed Cast</h3>
						  			<div className="cast">
							  			<div className="container-fluid">
								  			<div className="row">
							  				{this.state.cast.map((actor, i)=> 
							  					actor.cast_id < 12 &&
							  					<div className="actor" key={actor.cast_id}>
							  						<img className="img-responsive" src={image_uri + 'w500' + actor.profile_path} />
							  						<div className="actor-name">{actor.name}</div>
							  					</div>
							  				)}
								  			</div>
							  			</div>
						  			</div>
						  		</div>
						  	</div>
					  		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						  		<div className="plotline-Similar">
						  			<h3 className="plot-summary">Similar Movies</h3>
						  			<div className="container">
						  				<div className="similar">
						  					<div className="row">
												{this.state.similar.map((movie, i) => 
													{
														if(i < 3) {
															return (
															<div className="col-lg-4 similar-movie" key={movie.id}>
																<Link to={"/movie/" + movie.id}>
																	<img className="img-responsive" src={image_uri + 'w500' + movie.poster_path}/>
																</Link>
															</div>
															);
														}
													}
							  					)}
						  					</div>
							  			</div>
						  			</div>
						  		</div>
						  	</div>
					  	</div>
				  	</div>
				</div>
	  		</div>
	  	);
	}
}
const MoviePage = ({ match }) => (
  <div>
  	<Movie movieid={match.params.id} />
  </div>
)

ReactDOM.render(
	<Router>
	    <div>
	      	<div className="nav">
	      		<div className="logo">
					<svg viewBox="148 10 26 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
					    <defs></defs>
					    <g id="Clipped" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(148.000000, 10.000000)">
					        <path d="M25.0416667,2.22166665 C25.0416667,3.44358331 24.0189394,4.44333331 22.7689394,4.44333331 C22.5643939,4.44333331 22.3712121,4.42111664 22.1893939,4.36557498 L18.1439394,8.30903329 C18.2007576,8.48676662 18.2234848,8.68671662 18.2234848,8.88666662 C18.2234848,10.1085833 17.2007576,11.1083333 15.9507576,11.1083333 C14.7007576,11.1083333 13.6780303,10.1085833 13.6780303,8.88666662 C13.6780303,8.68671662 13.7007576,8.48676662 13.7575758,8.30903329 L10.8598485,5.4764083 C10.6780303,5.53194997 10.4734848,5.55416663 10.2689394,5.55416663 C10.0643939,5.55416663 9.85984848,5.53194997 9.6780303,5.4764083 L4.50757576,10.5418083 C4.56439394,10.7195416 4.58712121,10.9083833 4.58712121,11.1083333 C4.58712121,12.3302499 3.56439394,13.3299999 2.31439394,13.3299999 C1.06439394,13.3299999 0.0416666667,12.3302499 0.0416666667,11.1083333 C0.0416666667,9.88641661 1.06439394,8.88666662 2.31439394,8.88666662 C2.51893939,8.88666662 2.71212121,8.90888328 2.89393939,8.96442495 L8.07575758,3.91013331 C8.01893939,3.73239998 7.99621212,3.53244998 7.99621212,3.33249998 C7.99621212,2.11058332 9.01893939,1.11083333 10.2689394,1.11083333 C11.5189394,1.11083333 12.5416667,2.11058332 12.5416667,3.33249998 C12.5416667,3.53244998 12.5189394,3.73239998 12.4621212,3.91013331 L15.3598485,6.74275829 C15.5416667,6.68721663 15.7462121,6.66499996 15.9507576,6.66499996 C16.155303,6.66499996 16.3598485,6.68721663 16.5416667,6.74275829 L20.5757576,2.78819165 C20.5189394,2.61045832 20.4962121,2.42161665 20.4962121,2.22166665 C20.4962121,0.999749994 21.5189394,0 22.7689394,0 C24.0189394,0 25.0416667,0.999749994 25.0416667,2.22166665 Z" id="Shape" fill="#8CB5D7" fillRule="nonzero"></path>
					    </g>
					</svg>
					<p>plotline</p>
				</div>
	      	</div>
	      	<div className="margin-fix"></div>
	      	<Route exact path="/" component={Home}/>
	      	<Route path="/movie/:id" component={MoviePage}/>
	    </div>
	  </Router>,
	document.getElementById('app')
)