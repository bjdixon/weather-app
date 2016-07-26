import React, { Component } from 'react';
import './WeatherOutput.css';


class WeatherOutput extends Component {
  show5DayForecast() {
    this.setState({ show5DayForecast: true });
  }
  render() {
    const todaysWeather = this.props.weather.list[0],
      location = `${this.props.weather.city.name}, ${this.props.weather.city.country}`,
      description = todaysWeather.weather[0].description,
      highTemperature = `${Math.round(todaysWeather.main.temp_max)}ºC`,
      lowTemperature = `${Math.round(todaysWeather.main.temp_min)}ºC`,
      imgUrl = `http://openweathermap.org/img/w/${todaysWeather.weather[0].icon}.png`,
      clouds = `${todaysWeather.clouds.all}%`;
    return (
        <div className='WeatherOutput'>
          <h2>{location} <img src={imgUrl} alt={description} /></h2>
          <p>
           <strong>Description: </strong> {description}<br />
           <strong>Clouds: </strong> {clouds}<br />
           <strong>High temperature: </strong> {highTemperature}<br />
           <strong>Low temperature: </strong> {lowTemperature}
          </p>
        </div>
    );
  }
}

export default WeatherOutput;
