import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import GoogleCalendarEventList from '../components/GoogleCalendarEventList';
import AddGoogleCalendarEvent from '../components/AddGoogleCalendarEvent';

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
            let url = "google/accesstoken/save?access_token="+this.props.accessToken+"&authCode="+response.code;
            axios.get(url)
            .then(response => {
                console.log("Google Access Token" + response.data);
                if (response.data !== "") {
                    this.setState({googleAccessToken: response.data});
                }
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome, {this.state.fullName}!</h1>
                {
                    this.state.googleAccessToken !== "" ? 
                    <div>
                        <AddGoogleCalendarEvent accessToken={this.props.accessToken} />
                        <GoogleCalendarEventList accessToken={this.props.accessToken} />
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


