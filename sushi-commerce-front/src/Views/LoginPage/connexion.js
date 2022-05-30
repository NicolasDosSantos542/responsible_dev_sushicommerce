import React, {Component, Fragment} from 'react';
import './connexion.css';
import {Link} from "react-router-dom";
import logoBigBlack from '../../Assets/logo-big-white.png';
import Flash from "../../Components/Flash/flash";

const Environement = require('../../Environment/environment')
const Env = Environement.environement

export default class Connexion extends Component {

    constructor(props) {
        super(props)
        this.state = {email: "", password: "", redirect: false}
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    handleChangeEmail(event){
        this.setState({email: event.target.value});
    }

    handleChangePassword(event){
        this.setState({password: event.target.value});
    }

    handleSubmitLogin(event){
        event.preventDefault();
        const url = Env.backBase + "/user/login";
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                let inputEmail = document.getElementById('Login_email');
                let inputPassword = document.getElementById('Login_password');
                if (!data.success) {
                    inputEmail.classList.remove('is-valid');
                    inputPassword.classList.remove('is-valid');
                    inputEmail.classList.add('is-invalid');
                    inputPassword.classList.add('is-invalid');
                    window.flash("", "Vos identifiants sont incorrects !", "danger")
                } else {
                    inputEmail.classList.remove('is-invalid');
                    inputPassword.classList.remove('is-invalid');
                    inputEmail.classList.add('is-valid');
                    inputPassword.classList.add('is-valid');

                    localStorage.setItem('letShopToken', data.token);
                    localStorage.setItem('letShopEmail', this.state.email);
                    localStorage.setItem('letShopAdmin', data.admin);

                    this.setState({redirect: true})
                    window.location.href = "/";
                }
            });
    }

    render() {
        return (
            <Fragment>
                <div className="Login_page d-flex row font_cabin justify-content-center m-0">
                    <div className="col-6 align-self-center text-center">
                        <Link to="/" className="navbar-brand p-0"><img src={process.env.PUBLIC_URL + logoBigBlack} alt="Logo de let's shop"/></Link>
                        <p className="text-center global_sentence">Le matériel qui s'adapte à vous</p>
                    </div>
                    <div className="col-6">
                        <div className="row justify-content-center vh-100">
                            <div className="col-8 mt-3 mb-3 Login_main pb-4 align-self-center">
                                <div className="row font_montserrat text-center fs-4">
                                    <div className="col-6 pt-2 pb-2" >Connexion</div>
                                    <Link className="col-6 Login_registerBtn  pt-2 pb-2" to="/register">Inscription</Link>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-8 pt-3 pb-3">
                                        <Flash />
                                        <div className="form-floating mb-4">
                                            <input type="email" className="form-control Login_input ps-0 pe-0" id="Login_email" placeholder="name@example.com" onChange={this.handleChangeEmail}/>
                                            <label htmlFor="Login_email" className="ps-0 pe-0 pt-0">Adresse e-mail</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="password" className="form-control Login_input ps-0 pe-0" id="Login_password" placeholder="• • • • • • • • •" onChange={this.handleChangePassword}/>
                                            <label htmlFor="Login_password" className="ps-0 pe-0 pt-0">Mot de passe</label>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-3">
                                        <button className="btn btn-default col-3 fs-5 global_bgColor--blueSky" onClick={this.handleSubmitLogin}>Se connecter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
