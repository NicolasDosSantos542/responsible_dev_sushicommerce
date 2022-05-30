import React from "react";
import {Component, Fragment} from "react";
import axios from "axios";
import {environement} from "../../../Environment/environment";
import AuthService from "../../../services/auth.service"
import {Redirect} from "react-router-dom";

export default class DeleteProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
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

        axios.delete(environement.backBase+"/product/"+ this.state.product._id, { headers: headers}).then( res => {
            this.setState({ redirection: true });
        }).catch( error => {
            if( error.response ) {
                console.log(error.response.data)
                this.setState({ errorMsg: error.response.data.message });
            }
        })
    }

    render() {
        const {redirection} = this.state;

        if (redirection) {
            return <Redirect to={{pathname: "/admin/subCategory/" + this.state.product.subCategoryId._id, state: {name: this.state.product.subCategoryId.name}}}/>
        }
        return(
            <Fragment>
                <div className={"container"}>
                    <div className="alert alert-warning mt-5" role="alert">
                        <h2 className={"text-center"}>Supprimer le produit {this.state.product.name}</h2>
                        <div className={"row"}>
                            <div className={"col-10 offset-1"}>
                                <div className={"ml-5"}>
                                    <div className={"d-flex justify-content-center mt-4"}>
                                        <img src={this.state.product.bigPicture} style={{height: "20em", margin: "1em 0.5em"}} alt={"Produit"}/>
                                    </div>
                                    <p className={"text-center"}>Description: {this.state.product.description}</p>
                                </div>
                                <h5 className={"text-center"}>Images</h5>
                                <div className={"d-md-flex justify-content-center"}>
                                {this.state.product.pictures && this.state.product.pictures.length > 1?


                                    this.state.product.pictures.map((image, index) => {
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
