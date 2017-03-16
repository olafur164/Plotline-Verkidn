// @flow
import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import redux from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
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
	      	<Route path="/about" component={About}/>
	    </div>
	  </Router>,
	document.getElementById('app')
)