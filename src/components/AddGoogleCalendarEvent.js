import React from 'react';
import axios from 'axios';

class AddGoogleCalendarEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarEvent: {
                summary: "",
                description: "",
                end: {
                    date: ""
                },
                start: {
                    date: ""
                }
            }
        };
    }
    handleSubmitButton = (evt) => {
        evt.preventDefault();
        let url = "google/calendar/event/add?access_token=" + this.props.accessToken;
        axios.post(url, this.state.calendarEvent)
            .then(response => {
                alert("Successfully added!");
            })
            .catch(error => {
                alert("Cannot post data");
                console.log(error);
            });
    };
    handleInputChange = evt => {
        let name = evt.target.name;
        let value = evt.target.value;
        this.setState(prevState => ({
            calendarEvent: {
                ...prevState.calendarEvent,
                [name]: value // update the value of specific key
            }
        }));
    };
    handleDateInputChange = evt => {
        let name = evt.target.name;
        let value = evt.target.value;
        let dateField = { ...this.state.calendarEvent[name] };
        dateField.date = value;
        this.setState(prevState => ({
            calendarEvent: {
                ...prevState.calendarEvent,
                [name]: dateField // update the value of specific key
            }
        }));
    };
    render() {
        return (<div>
            <h3>Add Calendar Event</h3>
            <form onSubmit={(evt) => { this.handleSubmitButton(evt); }}>
                <input type="text" name="summary" value={this.state.calendarEvent.summary} placeholder="Summary" onChange={(evt) => { this.handleInputChange(evt); }} />
                <input type="text" name="description" value={this.state.calendarEvent.description} placeholder="Description" onChange={(evt) => { this.handleInputChange(evt); }} />
                <input type="text" name="start" value={this.state.calendarEvent.start.date} placeholder="Start Date (YYYY-MM-DD)" onChange={(evt) => { this.handleDateInputChange(evt); }} />
                <input type="text" name="end" value={this.state.calendarEvent.end.date} placeholder="End Date (YYYY-MM-DD)" onChange={(evt) => { this.handleDateInputChange(evt); }} />
                <input type="submit" value="Add" />
            </form>
            <br />
            <br />
        </div>);
    }
}

export default AddGoogleCalendarEvent;
