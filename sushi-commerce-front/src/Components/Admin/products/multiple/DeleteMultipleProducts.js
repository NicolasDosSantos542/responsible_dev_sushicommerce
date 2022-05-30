import React from "react";
import {Component, Fragment} from "react";
import axios from "axios";
import {environement} from "../../../../Environment/environment";
import AuthService from "../../../../services/auth.service"
import "./DeleteMultipleProducts.css";
import {Redirect} from "react-router-dom";
import ErrorForm from "../../../error/ErrorForm";

export default class DeleteMultipleProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: this.props.products,
            redirection: false,
            arrChecked: [],
            arrBegin: [],
            errorMsg: "",
        }
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        let arrBegin = [];
        if(this.state.products.length > 0){
            for(let i = 0; i < this.state.products.length; i++) {
                arrBegin.push({ref: i, id: this.state.products[i].id, value: false})
            }
        }
        this.setState({arrBegin: arrBegin});
    }

    handleCheck = (e) => {
        let arrBegin = this.state.arrBegin;
        let arrChecked = this.state.arrChecked;
        if(e.target.checked === true) {
            for(let i = 0; i < arrBegin.length; i++) {
                if(e.target.value === arrBegin[i].id) {
                    arrBegin[i].value = true;
                }
            }
            arrChecked.push({id: e.target.value, ref: parseInt(e.target.id)})
        } else {
            if(arrChecked.length > 0) {
                for (let i= 0; i < arrChecked.length; i++) {
                    if(arrChecked[i].id === e.target.value) {
                        arrChecked.splice(i,1);
                    }
                }
            }
            for(let i = 0; i < arrBegin.length; i++) {
                if(e.target.value === arrBegin[i].id) {
                    arrBegin[i].value = false;
                }
            }
        }
        this.setState({arrBegin: arrBegin});
        this.setState({arrChecked: arrChecked});
    }

    handleBack(e) {
        e.preventDefault();
        this.setState({redirection: true});
    }

    handleSubmit = (e) => {

        e.preventDefault();

        this.setState({errorMsg: ""});
        let canSend = true;
        let arrChecked = [];
        if(this.state.arrChecked.length < 1) {
            canSend = false;
            this.setState({errorMsg: "Vous devez selectionner un produit au minimum"})
        } else {
            for(let i =0; i < this.state.arrChecked.length; i++) {
                arrChecked.push({id: this.state.arrChecked[i].id})
            }
        }

        if(canSend) {
            const headers = {
                'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
            }

            axios.delete(environement.backBase+"/product/",{ data: arrChecked,headers: headers}).then( res => {
                this.setState({ redirection: true });
            }).catch( error => {
                if( error.response ) {
                    console.log(error.response.data)
                    if(error.response.data.errors) {
                        this.setState({ errorMsg: "Pas de produits à supprimer ou une erreur est survenue"});
                    } else {
                        this.setState({ errorMsg: error.response.data.message});
                    }

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
                    {this.state.products && this.state.products.length > 0 ?
                        this.state.products.map((product, index) => {
                            return[
                            <div className="alert alert-warning mt-5" key={index} role="alert">
                                <h2 className={"text-center"}>Supprimer le produit {product.product.name}</h2>
                                <div className={"row"}>
                                    <div className={"col-10 offset-1"}>
                                        <div className={"ml-5"}>
                                            {this.state.arrBegin && this.state.arrBegin.length > 0 ?
                                                this.state.arrBegin.map((productCheck, indexCheck) => {
                                                    return productCheck.value === false && productCheck.ref === index ?
                                                        <div className={"d-flex justify-content-center mt-4"}>
                                                            <img src={product.product.bigPicture}
                                                                 style={{height: "20em", margin: "1em 0.5em"}}
                                                                 alt={"Produit"}/>
                                                        </div>: null
                                                }):null
                                            }
                                            <p className={"text-center"}>Description: {product.product.description}</p>
                                        </div>
                                        <h5 className={"text-center"}>Images</h5>
                                        <div className={"d-md-flex justify-content-center"}>
                                            {product.product.pictures && product.product.pictures.length > 1?

                                                product.product.pictures.map((image, index) => {
                                                    return <div key={index}>
                                                        <img className={"ml-2"} style={{height: "10em", margin: "1em 0.5em"}} src={image.url} alt={index}/>
                                                    </div>
                                                })
                                                :<p className={"text-center"}>Il n'y a pas d'image trouvé</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={"d-flex justify-content-center mt-2"}>
                                    <p className={"fw-bold text-danger"}>Êtes-vous sur de vouloir supprimer ce produit?</p>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-12"}>
                                        <div className={"d-flex justify-content-center pt-1"}>
                                            <div className="form-check box__check">
                                                <input className="form-check-input icon--check" type="checkbox" value={product.id}
                                                       id={index} onChange={this.handleCheck}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>]
                        }): null
                    }

                    {this.state.arrChecked && this.state.arrChecked.length > 0 ?
                        <div className={"row text-center mt-2 box__detail"}>
                            <p className={"fw-bold text-danger mt-2"}>Êtes-vous sur de vouloir supprimer les produits sélectionnés?</p>
                            {this.state.errorMsg && this.state.errorMsg.length > 0 ? <ErrorForm error={this.state.errorMsg}/> : null}
                            <div className={"d-flex justify-content-center"}>
                                <button className={"btn-sm btn-warning m-2"} onClick={this.handleBack}>Non</button>
                                <button className={"btn-sm btn-danger m-2"} onClick={this.handleSubmit}>Oui</button>
                            </div>
                        </div>:
                        <div className={"row text-center mt-2 box__detail"}>
                            <p className={"fw-bold text-info mt-2"}>Vous devez selectionner un produit au minimum pour valider</p>
                            <div className={"d-flex justify-content-center"}>
                                <button className={"btn-sm btn-warning m-2"} onClick={this.handleBack}>Retour</button>
                            </div>
                        </div>
                    }
                </div>
            </Fragment>
        )
    }
}
