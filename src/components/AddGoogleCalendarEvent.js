import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'

class AddGoogleCalendarEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarEvent: {
                summary: "",
                description: "",
                end: {
                    date: format(new Date(), 'yyyy-MM-dd')
                },
                start: {
                    date: format(new Date(), 'yyyy-MM-dd')
                }
            }
        };
    }
    handleSubmitButton = (evt) => {
        evt.preventDefault();
        let url = "google/calendar/event/save?access_token=" + this.props.accessToken;
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
    handleDateInputChange = (date, fieldName) => {
        let dateField = { ...this.state.calendarEvent[fieldName] };
        dateField.date = format(date, 'yyyy-MM-dd');
        this.setState(prevState => ({
            calendarEvent: {
                ...prevState.calendarEvent,
                [fieldName]: dateField // update the value of specific key
            }
        }));
    };
    render() {
        return (<div>
            <h3>Add Calendar Event</h3>
            <form onSubmit={(evt) => { this.handleSubmitButton(evt); }}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Summary</label></td>
                            <td><input type="text" name="summary" required value={this.state.calendarEvent.summary} onChange={(evt) => { this.handleInputChange(evt); }} /></td>
                        </tr>
                        <tr>
                            <td><label>Description</label></td>
                            <td> <input type="text" name="description" required value={this.state.calendarEvent.description} onChange={(evt) => { this.handleInputChange(evt); }} /></td>
                        </tr>
                        <tr>
                            <td><label>Start Date</label></td>
                            <td>
                                <DatePicker
                                    dateFormat='yyyy-MM-dd'
                                    value={this.state.calendarEvent.start.date}
                                    onChange={(date) => { this.handleDateInputChange(date, "start"); }}
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td> <label>End Date</label></td>
                            <td>
                                <DatePicker
                                    dateFormat='yyyy-MM-dd'
                                    value={this.state.calendarEvent.end.date}
                                    onChange={(date) => { this.handleDateInputChange(date, "end"); }}
                                    />
                            </td>
                        </tr>
                    </tbody>
                </table>        
                <input type="submit" value="Add" />
            </form>
            <br />
            <br />
        </div>);
    }
}

export default AddGoogleCalendarEvent;
