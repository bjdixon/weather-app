import React, { Component } from 'react';
import './Forecast.css';


class Forecast extends Component {
  render() {
    console.log(this.props.weather);
    const weather = this.props.weather,
      date = new Date(weather.dt * 1000),
      description = weather.weather[0].description,
      highTemperature = `${ Math.round(weather.temp.max) }ºC`,
      lowTemperature =  `${ Math.round(weather.temp.min) }ºC`,
      imgUrl = `http://openweathermap.org/img/w/${ weather.weather[0].icon }.png`,
      clouds = `${ weather.clouds }%`;
    return (
      <div className="Forecast">
        <strong>{ date.toDateString() } </strong>,
        High: { highTemperature },
        Low: { lowTemperature },
        { description }.
        Clouds: { clouds }
        <img src={ imgUrl } alt={ description } />
      </div>
    );
  }
}

export default Forecast;
