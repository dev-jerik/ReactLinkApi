import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            goolgeClientId: "",
            googleAccessToken: "",
            fullName: "",
            calendar: ""
        }
    }

    componentDidMount() {
        let url = "profile/get?access_token="+this.props.accessToken;
            axios.get(url)
            .then(response => {
                this.setState({fullName: response.data.fullName});
            })
    }
    responseGoogle = (response) => {
        if (response.code !== null) {
            console.log("Google Response: " + response.code);
            let url = "google/save/accessToken?access_token="+this.props.accessToken+"&authCode="+response.code;
            axios.get(url)
            .then(response => {
                console.log("Google Access Token" + response.data);
                if (response.data !== "") {
                    this.setState({googleAccessToken: response.data});
                }
            })
        }
    }

    getGoogleCalendar = () => {
        console.log("Calendar: ")
        let url = "google/calendar/events?access_token="+this.props.accessToken;
            axios.get(url)
            .then(response => {
               console.log(response.data)
               this.setState({calendar: response.data})
            })
    }

    render() {
        return (
            <div>
                <h1>Welcome, {this.state.fullName}!</h1>
                {
                    this.state.googleAccessToken !== "" ? 
                    <div>
                        <AddGoogleCalendar accessToken={this.props.accessToken} />
                        <button onClick={this.getGoogleCalendar}>Get Google Calendar</button>
                        {
                            this.state.calendar === ""?  ""
                            :
                            <GoogleCalendar calendar={this.state.calendar} />
                        }
                    </div>
                    :
                    <GoogleLogin
                    clientId={this.props.googleClientId}
                    buttonText="CONNECT WITH GOOGLE"
                    responseType="code"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle} />
                }
            </div>
        );
    }
}

export default Home;


class GoogleCalendar extends React.Component {
    render() {
        let events = this.props.calendar.items.map((event, key) =>
            <li key={key}>{event.summary}</li>
        )
        return (
            <div>
                <br />
                Google Calendar: {this.props.calendar.summary}
                <ol>
                    {events}
                </ol>
            </div>
        );
    }
}

class AddGoogleCalendar extends React.Component {  
    constructor(props) {
        super(props);
        this.state={
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
        }
    }

    handleSubmitButton = (evt) => {
        evt.preventDefault()
        let url = "google/calendar/event/add?access_token="+this.props.accessToken;
            axios.post(url, this.state.calendarEvent)
            .then(response => {
                alert("Successfully added!")
            })
            .catch(error => {
               alert("Cannot post data")
               console.log(error)
            });
    }

    handleInputChange = evt => {
        let name = evt.target.name;
        let value = evt.target.value
        this.setState(prevState => ({
            calendarEvent: {                   // object that we want to update
                ...prevState.calendarEvent,    // keep all other key-value pairs
                [name]: value      // update the value of specific key
            }
        }))
    }

    handleDateInputChange = evt => {
        let name = evt.target.name;
        let value = evt.target.value

        let dateField = {...this.state.calendarEvent[name]}
        dateField.date = value;
        this.setState(prevState => ({
            calendarEvent: {                   // object that we want to update
                ...prevState.calendarEvent,    // keep all other key-value pairs
                [name]: dateField      // update the value of specific key
            }
        }))
    }
    
    render() {
        return (
            <div>
                <h3>Add Calendar Event</h3>
                <form onSubmit={(evt) => {this.handleSubmitButton(evt)}}>
                    <input type="text" name="summary" value={this.state.calendarEvent.summary} placeholder="Summary" onChange={(evt) => {this.handleInputChange(evt)}}/>
                    <input type="text" name="description" value={this.state.calendarEvent.description} placeholder="Description" onChange={(evt) => {this.handleInputChange(evt)}}/>
                    <input type="text" name="start" value={this.state.calendarEvent.start.date} placeholder="Start Date (YYYY-MM-DD)" onChange={(evt) => {this.handleDateInputChange(evt)}}/>
                    <input type="text" name="end" value={this.state.calendarEvent.end.date} placeholder="End Date (YYYY-MM-DD)" onChange={(evt) => {this.handleDateInputChange(evt)}}/>
                    <input type="submit" value="Add" />
                </form>
                <br />
                <br />
            </div>
        );
    }
}