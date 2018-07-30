import React, { Component } from 'react';
import './eventView.css';

class EventView extends Component {
  render() {
    const event = !!this.props.event ? this.props.event : {};
    const { name, unit, logo, value, date, device } = event;
    return (
      <div className="event-container">
        <div className="event">
            <img className="event-logo" src={logo} />
            <div className="event-name">{name}</div>
            <div className="event-value">{value}{unit}</div>
            <div>{date}</div>
        </div>
      </div>
    );
  }
}

export default EventView;
