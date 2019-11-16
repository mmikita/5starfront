import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';
import '../css/Login.css';


class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        // if(this.state.username==='in28minutes' && this.state.password==='dummy'){
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/5starflow`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
        // const { history, location } = this.props;
        // if (location.pathname === '/courses') {
        //   history.replace(`/reload`);
        //   setTimeout(() => {
        //     history.replace(`/5starflow`);
        //   });
        // } else {
        //   history.push('/5starflow');
        // }
        // this.props.history.push(`/5starflow`)
        // this.setState({showSuccessMessage:true})
        // this.setState({hasLoginFailed:false})
        // }
        // else {
        //      this.setState({showSuccessMessage:false})
        //      this.setState({hasLoginFailed:true})
        // }
    }

    render() {
        return (
            <div className="loginContainer">

            <div className="login">
                <div className="logo">Agent Q Dashboard</div>
                <div>
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Nieprawidłowe dane</div>}
                    {this.state.showSuccessMessage && <div>Zalogowany</div>}

                    <div className="form-field">

                        <label className="user" htmlFor="login-username"><span className="hidden">Username</span></label>
                        <input id="login-username" type="text" className="form-input" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} required />
                    </div>




                    <div className="form-field">
                        <label className="lock" htmlFor="login-password"><span className="hidden">Password</span></label>
                        <input id="login-password" type="password" className="form-input" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required />


                    </div>








                    <div className="form-field">
                        <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                    </div>

                </div>
            </div>
             </div>
        )
    }
}

export default LoginComponent