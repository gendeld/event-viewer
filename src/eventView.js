import React, { Component } from 'react';
import EventValueView from './eventValueView.js';
import './eventView.css';

class EventView extends Component {
  render() {
    const event = !!this.props.event ? this.props.event : {};
    const { name, unit, logo, value, date } = event;
    const { searchValue } = this.props;
    return (
      <div className="event-container">
        <div className="event">
            <img className="event-logo" src={logo} alt="Event type" />
            <EventValueView className="event-name" eventValue={`${name}`} searchValue={`${searchValue}`} />
            <EventValueView className="event-value" eventValue={`${value}${unit}`} searchValue={`${searchValue}`} />
            <EventValueView className="event-value" eventValue={`${date}`} searchValue={`${searchValue}`} />
        </div>
      </div>
    );
  }
}

export default EventView;
