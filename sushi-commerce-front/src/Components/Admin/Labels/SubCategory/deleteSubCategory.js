import React from "react";
import {Component, Fragment} from "react";
import axios from "axios";
import {environement} from "../../../../Environment/environment";
import AuthService from "../../../../services/auth.service"
import {Redirect} from "react-router-dom";

export default class DeleteSubCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category,
            categoryId: this.props.category._id,
            subCategoryId: this.props.category.subCategory._id,
            name: this.props.category.subCategory.name,
            imgUrl: this.props.category.subCategory.img,
            description: this.props.category.subCategory.description,
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

        axios.delete(environement.backBase+"/subCategory/"+ this.state.subCategoryId, { headers: headers}).then( res => {
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
            return <Redirect to={{pathname: '/admin/category/'+ this.state.category.category._id, state:{ name: this.state.category.category.name }}}/>
        }
        return(
            <Fragment>
                <div className={"container"}>
                    <div className="alert alert-warning box__category--color mb-5" role="alert">
                        <h2 className={"text-center mt-5"}>Supprimer la sous catégorie {this.state.name}</h2>
                        <div className={"row"}>
                            <div className={"col-10 offset-1"}>
                                <div className={"ml-5"}>
                                    <div className={"d-flex justify-content-center mt-4"}>
                                        <img src={this.state.img} alt={"Catégorie"}/>
                                    </div>
                                    <p>Description: {this.state.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className={"d-flex justify-content-center mt-2"}>
                            <p className={"fw-bold text-danger"}>Êtes-vous sur de vouloir supprimer cette sous catégorie?</p>
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
