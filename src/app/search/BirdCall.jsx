import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class SimpleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    // this.onChange = input => this.setState({ input });
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(event) {
    event.preventDefault();
    /*
    send a post to /search route so that it returns an object 
    with a photo a sound clip and a short description

    */
   console.log(this.state.input);
    axios.post('/search', {
      search: this.state.input,
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    });
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>
      <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

SimpleForm.propType = {
  birdCatcher: PropTypes.func.isRequired,
};

export default SimpleForm;
