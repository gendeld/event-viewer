import React, { Component } from 'react';
import './App.css';
import Sockette from 'sockette';
import EventView from './eventView.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        searchValue: '',
        events: []
    };
    // Queue events so they won't appear too fast
    this.eventQueue = [];
  }

  // On an interval, takes an event from the queue and adds it to the state
  addEvent() {
    if(this.eventQueue.length>0) {
      let events = this.state.events.slice();
      let event = this.eventQueue.shift();
      events.unshift(event);
      this.setState({ events });
    }
  }

  // Message received, add event data to queue
  onMessage(e) {
    console.log('Received:', e);
    let event = JSON.parse(e.data);
    this.eventQueue.unshift(event);
  }

  // Connected successfully to the WebSocket, send a message in order to start receiving events
  onConnect(e) {
    console.log('Connected!', e);
    this.ws.send('Hello World!');
    setInterval(this.addEvent.bind(this),500);
  }

  componentDidMount() {
    // Sets up connection to WebSocket
    this.ws = new Sockette('ws://events-stream.herokuapp.com/', {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: this.onConnect.bind(this),
      onmessage: this.onMessage.bind(this),
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    });
  }

  // Sets input value to state
  handleChange(event) {
      this.setState({searchValue: event.target.value});
  }

  // Filter events by search input value
  filterEvents(events, searchValue) {
    let filteredEvents = events.slice();
    filteredEvents = filteredEvents.filter((event) => {
        let eventKeys = Object.keys(event);
        let i = 0;
        let foundLogo = false;
        // Do not filter by logo address
        while(!foundLogo&&i<eventKeys.length) {
            if(eventKeys[i]==="logo") {
                foundLogo=true;
                eventKeys.splice(i,1);
            }
            i++;
        }
        let eventValues = eventKeys.map((eventKey) => {
            return event[eventKey];
        });
        // If some of the values contain the search input, return true
        return eventValues.some((eventValue) => {
            return eventValue.toString().toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
        });
    });
    return filteredEvents;
  }

  render() {
    const { events, searchValue } = this.state;

    return (
      <div className="App">
        <div className="card">
            <div className="events-container">
                <div className="search">
                    <img src="./images/search.svg" alt="Search" />
                    <input type="text"
                        value={searchValue}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
                <div className="events">
                    {
                        this.filterEvents(events, searchValue).map((event) => {
                            return (
                                <EventView highlight={searchValue} event={event} searchValue={searchValue} />
                            )
                        })
                    }
                </div>
                <div className="event-counter">
                    {events.length} Events
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
