import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, withRouter, NavLink} from 'react-router-dom';


class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSmurf: null,
      name: '',
      age: '',
      height: ''
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.activeSmurf && prevProps.activeSmurf !== this.props.activeSmurf) {
      this.setState({
        activeSmurf: this.props.activeSmurf,
      })
    }
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    axios
    .post('http://localhost:3333/smurfs', {name: this.state.name, age: this.state.age, height: this.state.height})
    .then(res => {
      console.log(res)
      this.props.history.push('/')
    })
    .catch(err => {
      console.log(err);
    })
    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  handleInputChange = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'age') {
      value = parseInt(value, 10)
    }
    this.setState({[e.target.name]: value });
  };

  render() {
    console.log()
    return (
      <div className="SmurfForm">
      <NavLink to="/">Smurf List</NavLink>
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
