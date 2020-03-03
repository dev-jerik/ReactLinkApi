import React from 'react';
import axios from 'axios';

export class GoogleCalendarEventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendar: {
                items: []
            }
        };
    }
    getGoogleCalendarEvents = () => {
        console.log("Calendar: ");
        let url = "google/calendar/events?access_token=" + this.props.accessToken;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                this.setState({ calendar: response.data });
            });
    };
    render() {
        let events;
        if (this.state.calendar.items === undefined || this.state.calendar.items.length == 0) {
            events = <p>No events</p>;
        }
        else {
            events = this.state.calendar.items.map((event, key) => <li key={key}>{event.summary}</li>);
        }
        return (<div>
            <button onClick={this.getGoogleCalendarEvents}>Get Google Calendar Events</button>
            <br />
            <ol>
                {events}
            </ol>
        </div>);
    }
}

export default GoogleCalendarEventList;