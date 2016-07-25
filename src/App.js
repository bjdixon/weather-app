import React, { Component } from 'react';
import 'whatwg-fetch';
import './App.css';
import LocationForm from './LocationForm';


class App extends Component {
  constructor(props) {
    super(props);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }
  fetchWeatherData(location) {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    const attrs = {
      appid: '6cba3a4c3d666fe9b486db2c5d8329db',
      units: 'metric',
      cnt: 5,
      q: location.replace(/\s/g, '')
    }
    let queryString = '?';
    for (let property in attrs) {
      if (attrs.hasOwnProperty(property)) {
        queryString += `${property}=${attrs[property]}&`;
      }
    }
    fetch(baseUrl + queryString)
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(exception => console.error(exception));
  }
  render() {
    return (
      <div className="App">
        <h1>Find the weather for your city</h1>
        <LocationForm fetchWeatherData={this.fetchWeatherData} />
      </div>
    );
  }
}

export default App;
