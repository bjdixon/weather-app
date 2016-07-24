import React, { Component } from 'react';
import './App.css';
import LocationForm from './LocationForm';

const appId = '6cba3a4c3d666fe9b486db2c5d8329db';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }
  fetchWeatherData(location) {
    console.log(location);
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
