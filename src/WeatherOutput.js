import React, { Component } from 'react';
import './WeatherOutput.css';
import FiveDayForecast from './FiveDayForecast';


class WeatherOutput extends Component {
  render() {
    const todaysWeather = this.props.weather.list[0],
      location = `${ this.props.weather.city.name }, ${ this.props.weather.city.country }`,
      description = todaysWeather.weather[0].description,
      highTemperature = `${ Math.round(todaysWeather.temp.max) }ºC`,
      lowTemperature = `${ Math.round(todaysWeather.temp.min) }ºC`,
      imgUrl = `http://openweathermap.org/img/w/${ todaysWeather.weather[0].icon }.png`,
      clouds = `${ todaysWeather.clouds }%`;
    return (
        <div className='WeatherOutput'>
          <h2>{ location } <img src={ imgUrl } alt={ description } /></h2>
          <p>
           <strong>Description: </strong> { description }<br />
           <strong>Clouds: </strong> { clouds }<br />
           <strong>High temperature: </strong> { highTemperature }<br />
           <strong>Low temperature: </strong> { lowTemperature }
          </p>
          <FiveDayForecast weather={ this.props.weather.list } />
        </div>
    );
  }
}

export default WeatherOutput;
