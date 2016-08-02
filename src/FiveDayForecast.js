import React, { Component } from 'react';
import './FiveDayForecast.css';
import Forecast from './Forecast';


class FiveDayForecast extends Component {
  constructor(props) {
    super(props);
    this.showForecast = this.showForecast.bind(this);
    this.state = {
      show: false
    };
  }
  showForecast() {
    this.setState({ show: true });
  }
  render() {
    let forecasts = [];
    this.props.weather.forEach((forecast) => {
      forecasts.push(<Forecast weather={ forecast } key={ forecast.dt } />);
    });
    return (
      <div className="FiveDayForecast">
        { !this.state.show ? <a href='#' onClick={ this.showForecast }>Click here for the 5 day weather forecast</a> : <strong>Your 5 day weather forecast</strong> }
        <br />
        { this.state.show ? forecasts : null }
      </div>
    );
  }
}

export default FiveDayForecast;
