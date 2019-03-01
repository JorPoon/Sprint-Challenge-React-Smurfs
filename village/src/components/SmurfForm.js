import React, { Component } from 'react';
import axios from 'axios';


class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    axios
    .post('http://localhost:3333/smurfs')
    .then(res => {
      console.log(res)
      this.setState({
        name: res.name,
        age: res.age,
        height: res.height
      });
    })
    .catch(err => {
      console.log(err);
    })
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
