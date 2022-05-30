import React from "react";
import {Component, Fragment} from "react";
import '../newProduct.css'
import axios from "axios";
import {environement} from "../../../../Environment/environment";
import AuthService from "../../../../services/auth.service"
import ErrorForm from "../../../error/ErrorForm";
import {Redirect} from "react-router-dom";
import BodyUpdateProduct from "../formBody/bodyUpdateProduct";

export default class UpdateMultipleProducts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productsToUpdate: [],
            errorMsg: "",
            redirection: false,
            products: this.props.products,

        }
        this.handleBack = this.handleBack.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBack(e) {
        e.preventDefault();
        this.setState({redirection: true});
    }

    handleBodyUpdate = (productToUpdate) => {
        let exist = false;
        if(this.state.productsToUpdate.length > 0) {
            for(let i=0; i < this.state.productsToUpdate.length; i++) {
                if(this.state.productsToUpdate[i]._id === productToUpdate._id) {
                    exist = true;
                }
            }
        }
        if(!exist) {
            this.setState({ productsToUpdate: [...this.state.productsToUpdate, productToUpdate]})
        } else {
            let arrChecked = this.state.productsToUpdate;
            if(arrChecked.length > 0) {
                for (let i= 0; i < arrChecked.length; i++) {
                    if(arrChecked[i]._id === productToUpdate._id) {
                        arrChecked.splice(i,1);
                    }
                }
            }
            arrChecked.push(productToUpdate);
            this.setState({ productsToUpdate: arrChecked})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({errorMsg: ""})

        let canSend = true;
        if(this.state.productsToUpdate.length < 1) {
            canSend = false;
            this.setState({errorMsg: "Vous n'avez pas de produits à modifier"})
        }

        if(canSend) {
            const headers = {
                'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
            }

            axios.put(environement.backBase+"/product/update",
                this.state.productsToUpdate
                , { headers: headers}).then( res => {
                    this.setState({ success: res.data.message });
                    this.setState({ redirection: true });
                }).catch( error => {
                    console.log(error.response)
                    if(!error.response.errors) {
                        this.setState({ errorMsg: error.response.statusText });
                        if(error.response.data.errors.code === 11000) {
                            this.setState({ errorMsg: "Un des nom existe déjà"});
                        }
                    } else {
                        this.setState({ errorMsg: error.response.data.errors.message });
                        console.log(error.response.data.errors)
                    }
                })
        }
    }

    render() {
        const {redirection} = this.state;

        if (redirection) {
            return <Redirect to={{pathname: "/admin/subCategory/" + this.state.products[0].product.subCategoryId._id, state: {name: this.state.products[0].product.subCategoryId.name}}}/>
        }
        return(
            <Fragment>
                <div className={"container"}>
                    <h2 className={"text-center mb-5 mt-5"}>Modifier des produits</h2>
                    {this.state.products && this.state.products.length > 0 ?
                        this.state.products.map((mainProduct, index) => {

                            return mainProduct.product ?
                                <BodyUpdateProduct onUpdateProduct={this.handleBodyUpdate} product={mainProduct.product}/>
                                : <p>Il n'y a pas de produit à modifier</p>
                        }): <p>Il n'y a pas de produit à modifier</p>
                    }
                    {this.state.productsToUpdate && this.state.productsToUpdate.length > 0?
                        <div className={"row"}>
                            <div className={"col-6 text-center mt-2 box__detail"}>
                                <p className={"fw-bold text-danger mt-2"}>Êtes-vous sur de vouloir modifier les produits sélectionnés?</p>
                                {this.state.errorMsg && this.state.errorMsg.length > 0 ? <ErrorForm error={this.state.errorMsg}/> : null}
                                <div className={"d-flex justify-content-center"}>
                                    <button className={"btn-sm btn-warning m-2"} onClick={this.handleBack}>Non</button>
                                    <button className={"btn-sm btn-danger m-2"} onClick={this.handleSubmit}>Oui</button>
                                </div>
                            </div>
                        </div>
                            :
                        <div className={"row"}>
                            <div className={"col-6 text-center mt-2 box__detail"}>
                                <p className={"fw-bold text-info mt-2"}>Vous devez mettre à jour un produit au minimum pour valider</p>
                                <div className={"d-flex justify-content-center"}>
                                    <button className={"btn-sm btn-warning m-2"} onClick={this.handleBack}>Retour</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Fragment>
        )
    }
}
