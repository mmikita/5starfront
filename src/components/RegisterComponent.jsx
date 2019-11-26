import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';
import '../css/Login.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../global.js'

const API_URL = global.apiUrl


class RegisterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            hiddenPassword: '',
            hasRegisterFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.registerClicked = this.registerClicked.bind(this)
        this.setRegisterError = this.setRegisterError.bind(this)

    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }
setRegisterError(){
    this.setState({ hasRegisterFailed: true })
}
    registerClicked() {
 if(this.state.password !== this.state.repeatPassword){
    this.setRegisterError();
}
 else{
 this.sendRegister(this.state.username, this.state.password, this.state.hiddenPassword);
 }

    }


    sendRegister(username, password, hiddenPassword) {
        return axios.post(`${API_URL}/register`, {
            username,
            password,
            hiddenPassword
        }).then(res => {
            console.log(res.data);
            if(res.data === false){
                this.setRegisterError();
            }
            else{
                this.props.history.push(`/`)   
            }
          })
    }
    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.registerClicked();
        } 
    }
    render() {
        return (
            <div className="loginContainer">

                <div className="loginPanel">
                    <div className="logo">Klikaj 5stary</div>
                    <div>
                        {this.state.hasRegisterFailed && <div className="alert alert-warning">Nieprawidłowe dane</div>}
                        {this.state.showSuccessMessage && <div>Zalogowany</div>}
                        <div className="form-field">

                            <label className="user" htmlFor="login-username"><span className="hidden">Login</span></label>
                            <input id="login-username" type="text" className="form-input" placeholder="Login" name="username" value={this.state.username} onChange={this.handleChange} required />
                        </div>
                        <div className="form-field">
                            <label className="lock" htmlFor="login-password"><span className="hidden">Hasło</span></label>
                            <input id="login-password" type="password" className="form-input" placeholder="Hasło" name="password" value={this.state.password} onChange={this.handleChange} required />
                        </div>
                        <div className="form-field">
                            <label className="lock" htmlFor="login-repeatPassword"><span className="hidden">Powtórz hasło</span></label>
                            <input id="login-repeatPassword" type="password" className="form-input" placeholder="Powtórz hasło" name="repeatPassword" value={this.state.repeatPassword} onChange={this.handleChange} required />
                        </div>
                               <div className="form-field">
                            <label className="lock" htmlFor="login-hiddenPassword"><span className="hidden">Tajne hasło</span></label>
                            <input id="login-hiddenPassword" type="password" className="form-input" placeholder="Tajne hasło" name="hiddenPassword" value={this.state.hiddenPassword} 
                            onChange={this.handleChange}  onKeyPress={this.enterPressed.bind(this)} required />
                        </div>

                        <div className="row form-field button">
                            <button className="btn btn-success" onClick={this.registerClicked}>Rejestracja</button>
                        </div>

                    </div>
                </div>
                    <div className="register">
                        <Link className="nav-link" to="/" onClick={AuthenticationService.logout}>Zaloguj sie</Link>
                    </div>
               
            </div>


        )
    }
}

export default RegisterComponent