import React from 'react';
import axios from 'axios';
import {LINK_API_CLIENT_ID,
    LINK_API_BASE_URL_API,
    LINK_API_BASE_URL} from "../ClientAppConstants";
import Home from "./Home";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'Sample',
            password:'1234',
            accessToken: "",
            googleClientId: "",
        }
    }

    componentWillMount() {
        axios.defaults.baseURL = LINK_API_BASE_URL_API;
    }
    
    handleInputChange = (evt) => {
        let name = evt.target.name;
        let value = evt.target.value
        this.setState({ [name]: value });
    }

    handleSubmitButton = (evt) => {
        evt.preventDefault()
        const options = {
            url: "oauth/token",
            baseURL: LINK_API_BASE_URL,
            method: "post",
            params: {
                grant_type: "password",
                client_id: LINK_API_CLIENT_ID,
                username: this.state.username,
                password: this.state.password
            }
        }

        axios(options)
        .then(response => {
            let linkApiAccessToken = response.data.access_token;
            axios.get("google/get/clientId?access_token="+response.data.access_token)
            .then(response => {
                this.setState({accessToken: linkApiAccessToken,
                    googleClientId: response.data})
            })
        })
        .catch(error => {
            alert("Invalid Username or Password!")
            console.log("Opppsss..." + error);
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.accessToken !== "" ?
                    <Home 
                        accessToken={this.state.accessToken} 
                        googleClientId={this.state.googleClientId} />
                    :
                    <div>
                        <h3>Sign in</h3>
                        <form onSubmit={(evt) => {this.handleSubmitButton(evt)}}>
                            <input type="text" name="username" value={this.state.username} placeholder="Username"  onChange={(evt) => {this.handleInputChange(evt)}} />
                            <input type="password" value={this.state.password} name="password" placeholder="Password" onChange={(evt) => {this.handleInputChange(evt)}}/>
                            <input type="submit" value="Login" />
                        </form>
                    </div>
                }
            </div>
        )
    }

}

export default Login;

