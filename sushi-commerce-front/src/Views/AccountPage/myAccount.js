import React, {Component, Fragment} from 'react';
import Me from "../../Components/UserAccount/Me/me"
import Adress from "../../Components/UserAccount/Adress/adress"
import Ordered from "../../Components/UserAccount/Ordered/ordered"
import './myAccount.css';
import {Link} from "react-router-dom";
import AuthService from "../../services/auth.service"
import Flash from "../../Components/Flash/flash";

class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: true,
            adress: false,
            ordered: false,
            user: null,
            redirect: false,
        };

        this.handleChangeForMe = this.handleChangeForMe.bind(this);
        this.handleChangeForAdress = this.handleChangeForAdress.bind(this);
        this.handleChangeForOrdered = this.handleChangeForOrdered.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
    }

    componentDidMount() {
        let url = "https://localhost:4244/user/";
        let request = {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('letShopToken')
            },
        }
        fetch(url, request)
            .then(res => res.json())
            .then(data => {
                this.setState({user: data.user})
                return true;
            })
    }

    componentDidUpdate() {
        if (this.state.redirect === false) {
            if (this.state.me === true) document.getElementById('myAccount_btnMe').classList.add('myAccount_selectedBtn');
            if (this.state.me === true) document.getElementById('myAccount_btnMe').classList.add('myAccount_selectedBtn');
            else document.getElementById('myAccount_btnMe').classList.remove('myAccount_selectedBtn');
            if (this.state.adress === true) document.getElementById('myAccount_btnAdress').classList.add('myAccount_selectedBtn');
            else document.getElementById('myAccount_btnAdress').classList.remove('myAccount_selectedBtn');
            if (this.state.ordered === true) document.getElementById('myAccount_btnOrdered').classList.add('myAccount_selectedBtn');
            else document.getElementById('myAccount_btnOrdered').classList.remove('myAccount_selectedBtn');
        }
    }

    handleChangeForMe() {
        this.setState({me: true, adress: false, ordered: false})
    }

    handleChangeForAdress() {
        this.setState({me: false, adress: true, ordered: false})
    }

    handleChangeForOrdered() {
        this.setState({me: false, adress: false, ordered: true})
    }


    handleDisconnect() {
        localStorage.removeItem('letShopToken');
        localStorage.removeItem('letShopEmail');
        localStorage.removeItem('letShopAdmin');
        this.setState({redirect: true});
        window.location.href = "/login";
    }

    render() {
        let me = this.state.me;
        let adress = this.state.adress;
        let ordered = this.state.ordered;
        if (this.state.user !== null) {
            return (
                <Fragment>
                    <div className="container-fluid font_cabin mt-3">
                        <div className="row justify-content-center">
                            <div className="col-2  pt-2">
                                <div className="row myAccount_leftMenu global_bgColor--charcoal global_fontColor--whiteSmoke justify-content-center">
                                    <div className="myAccount_me global_fontColor--whiteSmoke text-center">Nom Prénom</div>
                                    <div className="row justify-content-center">
                                        <button className=" btn btn-default text-center text-danger mb-2" onClick={this.handleDisconnect}>
                                            <img src={process.env.PUBLIC_URL + '/assets/icons8-fermer-96.png'} alt="Boutton de déconnection" className="myAccount_img--disconnect global_fontColor--whiteSmoke"/>
                                            Me déconnecter
                                        </button>
                                    </div>
                                    { AuthService.isAdmin() ?
                                        <div className="row justify-content-center myAccount_separatorMenu text-center pt-2 pb-2">
                                            <Link to={"/admin/home"}><i className="fas fa-user-cog text--admin text-info"> Gestion du site</i></Link>
                                        </div> : null
                                    }
                                    <div className="row myAccount_separatorMenu" id="myAccount_btnMe">
                                        <button className="btn btn-default global_fontColor--whiteSmoke text-center pt-2 pb-2" onClick={this.handleChangeForMe}>Mes informations</button>
                                    </div>
                                    <div className="row myAccount_separatorMenu" id="myAccount_btnAdress">
                                        <button className="btn btn-default global_fontColor--whiteSmoke text-center pt-2 pb-2" onClick={this.handleChangeForAdress}>Mes adresses</button>
                                    </div>
                                    <div className="row myAccount_separatorMenu" id="myAccount_btnOrdered">
                                        <button className="btn btn-default global_fontColor--whiteSmoke text-center pt-2 pb-2" onClick={this.handleChangeForOrdered}>Mes commandes</button>
                                    </div>

                                </div>
                            </div>
                            <div className="col-7">
                                {(() => {
                                    switch (true) {
                                        case me:
                                            return (<Me data={this.state.user}/>);
                                        case adress:
                                            return (<Adress data={this.state.user}/>);
                                        case ordered:
                                            return (<Ordered/>);
                                        default:
                                            return (<Me data={this.state.user}/>);
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div className="container">
                        <Flash />
                        <div className="row justify-content-center text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Chargement de votre profil</span>
                            </div>
                            Chargement de votre profil
                        </div>
                    </div>
                </Fragment>
            )
        }
    }
}

export default MyAccount
