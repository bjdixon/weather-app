import React, { Component } from 'react';
import './LocationForm.css';
import {persistLocation, recoverLocation} from './locationPersistence'

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      defaultLocation: recoverLocation() || 'Toronto, CA'
    };
  }
  submitForm(e) {
    e.preventDefault();
    const location = this.refs.city.value || this.refs.city.placeholder;
    persistLocation(location);
    this.props.fetchWeatherData(location);
  }
  render() {
    return (
      <form className='FindLocation' onSubmit={this.submitForm}>
        <input type='text' placeholder={this.state.defaultLocation} ref='city' />
        <button>Go</button>
        <p>You can enter the name of the city ({this.state.defaultLocation.split(',')[0]}), or the city followed by a two letter country code ({this.state.defaultLocation})</p>
      </form>
    );
  }
}

export default LocationForm;
