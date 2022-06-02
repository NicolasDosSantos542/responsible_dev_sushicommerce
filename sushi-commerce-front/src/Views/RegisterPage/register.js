import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import './register.css';
import logoBigBlack from "../../Assets/logo-big-white.webP";

const Environement = require('../../Environment/environment')
const Env = Environement.environement

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {email: "", password: "", gender: "male", firstName: "", lastName: "", birth: "", redirect: false};

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleChangeGender(event) {
        this.setState({gender: event.target.value});
    }

    handleChangeFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    handleChangeLastName(event) {
        this.setState({lastName: event.target.value});
    }

    handleChangeBirthday(event) {
        this.setState({birth: event.target.value});
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateForm() {
        let validate = {email: false, password: false, firstName: false, lastName: false};
        let emailInput = document.getElementById('Register_email');
        let passwordInput = document.getElementById('Register_password');
        let firstNameInput = document.getElementById('Register_firstName');
        let lastNameInput = document.getElementById('Register_lastName');
        let birthInput = document.getElementById('Register_birth');

        if (!this.validateEmail(this.state.email)) {
            emailInput.classList.add("is-invalid");
            emailInput.classList.remove("is-valid");
            validate.email = false;
        } else {
            emailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");
            validate.email = true;
        }
        if (this.state.password.length < 2) {
            passwordInput.classList.add("is-invalid");
            passwordInput.classList.remove("is-valid");
            validate.password = false;
        } else {
            passwordInput.classList.remove("is-invalid");
            passwordInput.classList.add("is-valid");
            validate.password = true;
        }
        if (this.state.firstName.length < 2) {
            firstNameInput.classList.add("is-invalid");
            firstNameInput.classList.remove("is-valid");
            validate.firstName = false;
        } else {
            firstNameInput.classList.remove("is-invalid");
            firstNameInput.classList.add("is-valid");
            validate.firstName = true;
        }
        if (this.state.lastName.length < 2) {
            lastNameInput.classList.add("is-invalid");
            lastNameInput.classList.remove("is-valid");
            validate.lastName = false;
        } else {
            lastNameInput.classList.remove("is-invalid");
            lastNameInput.classList.add("is-valid");
            validate.lastName = true;
        }
        if (!this.state.birth) {
            birthInput.classList.add("is-invalid");
            birthInput.classList.remove("is-valid");
            validate.birth = false;
        } else {
            birthInput.classList.remove("is-invalid");
            birthInput.classList.add("is-valid");
            validate.birth = true;
        }
        return !(validate.email === false || validate.password === false || validate.firstName === false || validate.lastName === false || validate.birth === false)
    }

    async handleSubmitRegister(event) {
        event.preventDefault();
        let valid = this.validateForm();
        if (valid === true) {
            let url = Env.backBase + "/user";
            let option = {
                method: "POST",
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    gender: this.state.gender,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    birth: this.state.birth
                })
            }
            return await fetch(url, option)
                .then(response => response.json())
                .then(data => {
                    if(data.success) {
                        this.setState({redirect: true})
                    } else {
                        if(data.errors.email){
                            let emailInput = document.getElementById('Register_email');
                            emailInput.classList.add("is-invalid");
                            emailInput.classList.remove("is-valid");
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        if(this.state.redirect === true || localStorage.getItem('letShopToken')){
            return <Redirect to="/login" />
        }
        return (
            <Fragment>
                <div className="Register_page d-flex row font_cabin justify-content-center m-0">
                    <div className="col-6 align-self-center text-center">
                        <Link to="/" className="navbar-brand p-0"><img src={process.env.PUBLIC_URL + logoBigBlack} alt="Logo de let's shop"/></Link>
                        <p className="text-white global_sentence">Le matériel qui s'adapte à vous</p>
                    </div>
                    <div className="col-6 text-white">
                        <div className="row justify-content-center">
                            <div className="col-8 global_bgColor--charcoal Register_main mt-5 pb-5">
                                <div className="row font_montserrat text-center fs-4">
                                    <Link className="col-6 Register_connectBtn pt-2 pb-2" to="/login">Connexion</Link>
                                    <div className="col-6 text-white pt-2 pb-2">Inscription</div>
                                </div>
                                <div className="row justify-content-center  mt-4">
                                    <h1 className="h4 text-center font_montserrat">Identifiants</h1>
                                    <div className="col-8 pt-3 pb-3">
                                        <div className="form-floating mb-4">
                                            <input type="email" className="form-control text-white Register_input ps-0 pe-0 global_fontColorTest--charcoal" id="Register_email" placeholder="name@example.com" onChange={this.handleChangeEmail}/>
                                            <label htmlFor="Register_email" className="ps-0 pe-0 pt-0">Adresse e-mail</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="password" className="form-control text-white  Register_input ps-0 pe-0 " id="Register_password" placeholder="• • • • • • • • •" onChange={this.handleChangePassword}/>
                                            <label htmlFor="Register_password" className="ps-0 pe-0 pt-0">Mot de passe</label>
                                        </div>
                                    </div>
                                    <h1 className="h4 text-center font_montserrat mt-5">Information personnelles</h1>
                                    <div className="col-8 pt-3 pb-3" id="Register_GenderInput--style">
                                        <label className="font_montserrat mb-4">Civilité</label>
                                        <div className="form-floating row mb-4">
                                            <div className="col-4">
                                                <input type='radio' name="gender" id="male" defaultChecked value={"male"} onChange={this.handleChangeGender}/>
                                                <label htmlFor="male" className="ms-2 ">Homme</label>
                                            </div>
                                            <div className="col-4">
                                                <input type='radio' name="gender" id="female" value={"female"} onChange={this.handleChangeGender}/>
                                                <label htmlFor="female" className="ms-2">Femme</label>
                                            </div>
                                            <div className="col-4">
                                                <input type='radio' name="gender" id="other" value={"other"} onChange={this.handleChangeGender}/>
                                                <label htmlFor="other" className="ms-2">Autres</label>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control  Register_input ps-0 pe-0 global_bgColor--charcoal text-white" id="Register_firstName" placeholder="Prénom" onChange={this.handleChangeFirstName}/>
                                            <label htmlFor="Register_firstName" className="font_montserrat ps-0 pe-0 pt-0">Prénom</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control  Register_input ps-0 pe-0 text-white global_bgColor--charcoal" id="Register_lastName" placeholder="Nom" onChange={this.handleChangeLastName}/>
                                            <label htmlFor="Register_lastName" className="font_montserrat ps-0 pe-0 pt-0">Nom</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="date" className="form-control  Register_input ps-0 pe-0 text-white global_bgColor--charcoal" id="Register_birth" placeholder="01/01/1970" onChange={this.handleChangeBirthday}/>
                                            <label htmlFor="Register_birth" className="font_montserrat ps-0 pe-0 pt-0">Date de naissance</label>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-3">
                                        <button className="btn btn-default col-3 fs-5 global_bgColor--blueSky" onClick={this.handleSubmitRegister}>Valider</button>
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

export default Register