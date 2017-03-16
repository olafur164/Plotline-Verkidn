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

require('./css/flexboxgrid-min.css');
require('./css/main.css');
require('./css/main-mk.css');


const base_uri = 'https://api.themoviedb.org/3/'
const api_key = '5caf95feed570ed071f7cb0839668613'
const image_uri = 'https://image.tmdb.org/t/p/'

const Home = () => (
  <div>
    <h2>Home</h2>
    <Category query="movie/popular" />
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
		    	console.log(this.state);
		    });
	}
	render() {
		let settings = {
		    infinite: false,
		    speed: 300,
		    slidesToShow: 3.5,
		    centerMode: false,
		    centerPadding: '40px',
		    responsive:[	
			  	{
			        breakpoint: 1920,
			        settings: {
			          slidesToShow: 3.5,
			          slidesToScroll: 2,
			          infinite: false,
			        }
			      },
			      {
			        breakpoint: 1024,
			        settings: {
			          centerPadding: '20px',
			          slidesToShow: 3.5,
			          slidesToScroll: 2,
			          infinite: false,
			        }
			      },
			      {
			        breakpoint: 768,
			        settings: {
			          slidesToShow: 2,
			          centerPadding: '20px',
			          slidesToScroll: 1
			        }
			      },
			      {
			        breakpoint: 480,
			        settings: {
			        	infinite:true,
			        	centerMode: true,
			          slidesToShow: 1,
			          slidesToScroll: 1,
			          centerPadding: '20px'
			        }
			      }
		      ]
	    };
		const image = `${image_uri}w500`
		return (
			<div>
				<div className="category">
					<Slider {...settings}>
						<div></div>
						{this.state.data.map(movie => 
						<div className="movie" key={movie.id}>
							<img className="img-responsive" src={image + movie.poster_path}/>
						</div>
		  				) || <div></div>}
		  			</Slider>
	  			</div>
			</div>
		);
	}
}
/*
function getPopular() {
	const data = fetch(base_uri + `movie/popular?api_key=${api_key}`)
		    .then(res => {
		    	return res.json();
		    })
		    .then(json => {
		    	const data = json;
		    	return data;
		    });
 	return data

}
console.log(getPopular());
*/
class Movie extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {},
			genres: []
		}
	}
	componentDidMount() {
		fetch(`${base_uri}movie/${this.props.movieid}?api_key=pi_key}`)
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
		  			<img src={this.image_uri + this.image_options.Original + this.state.data.poster_path} />
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
	      	<ul>
		        <li><Link to="/">Home</Link></li>
		        <li><Link to="/about">About</Link></li>
	      	</ul>

	      	<hr/>

	      	<Route exact path="/" component={Home}/>
	      	<Route path="/movie/:id" component={MoviePage}/>
	    </div>
	  </Router>,
	document.getElementById('app')
)