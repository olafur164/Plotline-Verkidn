// @flow
import React from 'react'; // eslint-disable-line no-unused-vars


export class Movie extends React.Component {
	constructor(props) {
		super(props)
		this.base_uri = 'https://api.themoviedb.org/3/'
		this.api_key = '5caf95feed570ed071f7cb0839668613'
		this.image_uri = 'https://image.tmdb.org/t/p/'
		this.image_options = {
			Original: 'original'
		}
		this.state = {
			data: {},
			genres: []
		}
	}
	componentDidMount() {
		fetch(this.base_uri + `movie/${this.props.movieid}?api_key=${this.api_key}`)
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