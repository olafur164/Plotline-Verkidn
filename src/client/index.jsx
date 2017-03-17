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
require('./css/bootstrap.css');
require('./css/main.css');
require('./css/main-mk.css');


const base_uri = 'https://api.themoviedb.org/3/'
const api_key = '5caf95feed570ed071f7cb0839668613'
const image_uri = 'https://image.tmdb.org/t/p/'

const Home = () => (
  <div className="container-fluid">
  	<div className="row">
	  	<div className="col-xs-1 col-lg-2 timeline">

	  	</div>
	  	<div className="col-xs-11 col-lg-10 categories">
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
			          	slidesToShow: 2.5,
			          	centerPadding: '20px',
			          	slidesToScroll: 1
			        }
			      },
			      {
			        breakpoint: 480,
			        settings: {
			          	slidesToShow: 1,
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
						{this.state.data.map(movie => 
							movie.poster_path.length > 0 &&
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
			genres: []
		}
	}
	componentDidMount() {
		fetch(`${base_uri}movie/${this.props.movieid}?api_key=${api_key}`)
		    .then(res => {
		    	return res.json();
		    })
		    .then(json => {
		    	const data = json;
		    	const genres = data.genres.map(obj => obj);
		    	console.log(data);
		    	this.setState({data, genres});
		    	console.log(this.state);
		    });
	}
	
	render() {
	  	return (
	  		<div>
		  		<div className="plotline-head">
		  			<div id="plotline-title">
		  				<h1>{this.state.data.title}</h1>
		  			</div>
		  			<div id="plotline-year">
		  				<h2>{this.state.data.release_date}</h2>
		  			</div>
		  		</div>
		  		<div className="plotline-poster">
		  			<img src={`${image_uri}w500/${this.state.data.poster_path}`} />
		  		</div>
		  		<div className="plotline-plot">
		  			<h3>Plot Summary</h3>
		  			<div className="plotline-genres">
		  				{this.state.genres.map(genre => 
		  					<span key={genre.id}>{genre.name} </span>
		  				)}
		  			</div>
		  			<div className="plotline-runtime">
		  				{this.state.data.runtime}
		  			</div>
		  			<div className="plotline-overview">
		  				{this.state.data.overview}
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