import React, {Component, Fragment} from 'react';
import {Redirect} from "react-router-dom";

const Environement = require('../../../../Environment/environment')
const Env = Environement.environement

class DeleteAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            registered: null,
            sure: null,
            delete: null,
            api: Env.backUser
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.areYouSure = this.areYouSure.bind(this)

    }

    areYouSure() {
        if (this.state.sure === null) this.setState({sure: true})
        else if (this.state.sure === true) this.setState({sure: null})
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.sure === true) {
            fetch(this.state.api, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('letShopToken')
                }
            })
                .then(res => res.json())
                .then(data => {
                    if(data.success) {
                        localStorage.removeItem('letShopToken');
                        localStorage.removeItem('letShopEmail');
                        localStorage.removeItem('letShopAdmin');
                        this.setState({redirect: true})
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/login"/>
        } else if (this.state.sure !== null) {
            return (
                <Fragment>
                    <div className="row justify-content-center mb-5">
                        <div className="col-12 ps-4 pe-4">
                            <h5 className="text-center profil_title">Êtes-vous sur de vouloir supprimer votre compte
                                <span className="text-danger"> définitivement ?</span></h5>
                            <div className="row justify-content-center mt-3">
                                <div className="col-3 text-center">
                                    <button type="submit" className="btn btn-outline-success btn-lg font_lobster mt-4 col-3"
                                            onClick={this.areYouSure}>
                                        Non
                                    </button>
                                </div>
                                <div className="col-3 text-center">
                                    <button type="submit" className="btn btn-outline-danger btn-lg font_lobster danger mt-4 col-3"
                                            onClick={this.handleSubmit}>
                                        Oui
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <div className="row justify-content-center mb-5">
                    <div className="col-12 ps-4 pe-4">
                        <h5 className="text-center profil_title">Supprimer mon compte</h5>
                        <div className="row justify-content-center mt-3">
                            <div className="col-6 text-center">
                                <button type="submit" className="btn btn-outline-danger font_lobster fs-5 mt-4 col-5" onClick={this.areYouSure}>
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default DeleteAccount