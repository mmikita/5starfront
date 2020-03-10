import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';
import { Link } from 'react-router-dom'


class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
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
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                sessionStorage.setItem('authenticatedUser', this.state.username);
                this.props.history.push(`/5starflow`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            this.loginClicked();
        }
    }

    render() {
        return (
            <div className="loginContainer">

                <div className="loginPanel">
                    <div className="logo">Zaloguj się</div>
                    <div>
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Nieprawidłowe dane</div>}
                        {this.state.showSuccessMessage && <div>Zalogowany</div>}
                        <form>
                        <div className="form-field">

                            <label className="user" htmlFor="login-username"><span className="hidden">Login</span></label>
                            <input id="login-username" type="text" className="form-input" placeholder="Login" name="username" value={this.state.username} onChange={this.handleChange} required />
                        </div>
                        <div className="form-field">
                            
                            <label className="lock" htmlFor="login-password"><span className="hidden">Hasło</span></label>
                            <input  id="login-password"  autoComplete="off" type="password" className="form-input" placeholder="Hasło" name="password" value={this.state.password} onChange={this.handleChange} onKeyPress={this.enterPressed.bind(this)} required />
                          
                        </div>
                        </form>
                        <div className="row form-field loginbutton">
                            <button className="btn btn-success" onClick={this.loginClicked}>Zaloguj</button>
                        </div>

                    </div>
                </div>
                <div className="register">
                    <Link className="nav-link" to="/register" onClick={AuthenticationService.logout}>Załóż konto</Link>
                </div>

            </div>


        )
    }
}

export default LoginComponent