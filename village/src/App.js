import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, withRouter, NavLink} from 'react-router-dom';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      activeSmurf: null
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    console.log('CDM')
    axios
    .get('http://localhost:3333/smurfs')
    .then(res => {
      console.log(res)
      this.setState({ smurfs: res.data});
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    console.log(this.state.smurfs)
    return (
      <div className="App">
      <nav>
      <NavLink exact to="/smurf-form">Add New Smurfs!</NavLink>
      </nav>
      <Route exact path="/smurf-form" render={props => <SmurfForm {...props}/>} />
      <Route  exact path="/" render={props =>  <Smurfs smurfs={this.state.smurfs} {...props} />}/>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App)

export default AppWithRouter;
