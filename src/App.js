import React, { Component } from 'react';
import 'whatwg-fetch';
import './App.css';
import LocationForm from './LocationForm';
import WeatherOutput from './WeatherOutput';


class App extends Component {
  constructor(props) {
    super(props);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.showWeather = this.showWeather.bind(this);
    this.state = {
      showWeather: false,
      weatherData: null
    };
  }
  fetchWeatherData(location) {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily',
      attrs = {
      appid: '6cba3a4c3d666fe9b486db2c5d8329db',
      units: 'metric',
      cnt: 5,
      q: location.replace(/\s/g, '')
    };
    let queryString = '?';
    for (let property in attrs) {
      if (attrs.hasOwnProperty(property)) {
        queryString += `${ property }=${ attrs[property] }&`;
      }
    }
    let _this = this;
    fetch(baseUrl + queryString)
      .then(response => response.json())
      .then(function (json) { this.showWeather(json); }.bind(_this))
      .catch(exception => console.error(exception));
  }
  showWeather(weatherData) {
    this.setState({ weatherData: weatherData });
    this.setState({ showWeather: true });
  }
  render() {
    return (
      <div className="App">
        <h1>Find the weather for your city</h1>
        <LocationForm fetchWeatherData={ this.fetchWeatherData } />
        <hr />
        { this.state.showWeather ? <WeatherOutput weather={ this.state.weatherData } /> : null }
      </div>
    );
  }
}

export default App;
