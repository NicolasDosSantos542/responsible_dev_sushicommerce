import React from "react";
import {Component, Fragment} from "react";
import axios from "axios";
import {environement} from "../../../../Environment/environment";
import AuthService from "../../../../services/auth.service"
import {Redirect} from "react-router-dom";

export default class DeleteCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryId: this.props.category._id,
            category: this.props.category,
            name: this.props.category.name,
            imgUrl: this.props.category.img,
            description: this.props.category.description,
            redirection: false
        }
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack(e) {
        e.preventDefault();
        this.setState({redirection: true});
    }

    handleSubmit = (e) => {

        e.preventDefault();

        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }

        axios.delete(environement.backBase+"/category/"+ this.state.categoryId, { headers: headers}).then( res => {
            this.setState({ redirection: true });
        }).catch( error => {
            console.log(error.response)
            if( error.response ) {
                this.setState({ errorMsg: error.response.data.message });
            }
        })
    }

    render() {
        const {redirection} = this.state;

        if (redirection) {
            return <Redirect to={{pathname: '/admin/manageLabels/'}}/>
        }
        return(
            <Fragment>
                <div className={"container"}>
                    <div className="alert alert-warning box__category--color mb-5" role="alert">
                        <h2 className={"text-center mt-5"}>Supprimer la catégorie {this.state.name}</h2>
                        <div className={"row"}>
                            <div className={"col-10 offset-1"}>
                                <div className={"ml-5"}>
                                    <div className={"d-flex justify-content-center mt-4"}>
                                        <img src={this.state.category.img} alt={"Sous catégorie"}/>
                                    </div>
                                    <p>Description: {this.state.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className={"d-flex justify-content-center mt-2"}>
                            <p className={"fw-bold text-danger"}>Êtes-vous sur de vouloir supprimer cette catégorie?</p>
                        </div>
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <div className={"d-flex justify-content-center pt-1"}>
                                    <button className={"btn-sm btn-warning m-2"} onClick={this.handleBack}>Non</button>
                                    <button className={"btn-sm btn-danger m-2"} onClick={this.handleSubmit}>Oui</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
