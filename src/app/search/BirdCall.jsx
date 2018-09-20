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
    console.log(this.state.input);
    // geocodeByAddress(this.state.address)
    //   .then(results => getLatLng(results[0]))
    //   .then((latLng) => {
    //     axios.post('/map', latLng)
    //     .then((response) => {
    //       console.log(response, 'search response');
    //       this.props.birdCatcher(response);
    //     })
    //     .catch(error => console.error(error));
    //     this.props.getLatLng(latLng);
    //     console.log('Success', latLng);
    //   })
    //   .catch(error => console.error('Error', error));
  }

  handleChange(event) {
    this.setState({input: event.target.value});
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
