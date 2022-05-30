import React, {Fragment} from "react";
import {Component} from "react";
import AuthService from "../../../../services/auth.service";
import axios from "axios";
import {environement} from "../../../../Environment/environment";
import {Link} from "react-router-dom";
import "./manageOneUser.css";

export default class ManageOneUser extends Component {
    constructor(props) {
        super(props);
        this.state= {
            user: [{}],
            userId : this.props.userId
        }
    }

    componentDidMount() {
        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }
        axios.get(environement.backBase+"/admin/oneUser/"+ this.state.userId, {headers:headers}).then(response => {
            this.setState({user: response.data.users})
        })
    }

    cleanDate(data) {
        if (data)
            return data.substr(0,10);
    }



    render() {
        return (
            <Fragment>
               <div className={"d-flex justify-content-center ManageOne__intro"}>
                   <h1 className={"text-center ManageOne__title font_montserrat"}>Gestion d'un utilisateur - {this.state.user.firstName} {this.state.user.lastName} </h1>
                   <Link to={{pathname:"/admin/manageUsers"}}>
                       <button type="button" className="btn global_bgColor--charcoal text-white font_montserrat">Retour</button>
                   </Link>
               </div>


                <div className={"container font_cabin"}>
                   <h3 className={"font_montserrat"}>Informations du compte</h3>
                    <form>
                        <fieldset disabled>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput">Prénom :</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.user.firstName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput">Nom :</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.user.lastName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput">Genre :</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.user.gender}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput">Date de naissance :</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={this.cleanDate(this.state.user.birth)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput">Adresse email :</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={this.state.user.email}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput">Compte créé le :</label>
                                <input type="text" id="disabledTextInput" className="form-control" placeholder={this.cleanDate(this.state.user.createdAt)}/>
                            </div>

                        </fieldset>
                    </form>
                </div>
            </Fragment>
        );
    }
}