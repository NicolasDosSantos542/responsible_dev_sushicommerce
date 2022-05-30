import React, {Fragment} from "react";
import {Component} from "react";
import AuthService from "../../../services/auth.service";
import axios from "axios";
import {environement} from "../../../Environment/environment";
import {Link} from "react-router-dom";
import "./ManageOneOrder.css"

export default class ManageOneOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId : this.props.orderId,
            order : [{}]
        }
    }

    componentDidMount() {
        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }
        axios.get(environement.backBase+"/order/admin/order/"+ this.state.orderId, {headers:headers}).then(response => {
            this.setState({order: response.data.order})
        })
    }

    cleanDate(data) {
        if (data)
            return data.substr(0,10);
    }
    countProducts(data) {
        if (data)
            return data.length;
    }

    rounded(data) {
       return (Math.round(data*100) / 100).toFixed(2);
    }

    displayProduct(data) {
        if (data) {
            return data.map((product, index) => {
                return (
                    <div key={index} className={"articles__box col-3 font_montserrat text-center"}>
                        <button id={"btn__delete_article"} type={"submit"}><span className={"fas fa-trash-alt ManageOne__delete_articles"}/></button>
                        <p>  {product.name}</p>
                        <p> {product.price}</p>
                        <img alt={"productimg"} className={"ManageOne--img"} src={product.pictures[0].url}/>
                    </div>
                )
            })
        }


    }

    render() {
        return (
            <Fragment>
                <div className={"d-flex justify-content-center ManageOne__intro"}>
                    <h1 className={"text-center ManageOne__title font_montserrat"}>Gestion d'une commande </h1>
                    <Link to={{pathname:"/admin/viewAllOrder"}}>
                        <button type="button" className="btn global_bgColor--charcoal text-white font_montserrat">Retour</button>
                    </Link>
                </div>


                <div className={"container font_cabin"}>
                    <h3 className={"font_montserrat"}>Informations de la commande</h3>
                    <form id={"ManageOne_form"}>
                        <fieldset>
                            <div className="form-group" >
                                <label htmlFor="disabledTextInput">Crée le :</label>
                                <input disabled type="text" id="disabledTextInput" className="form-control" placeholder={this.cleanDate(this.state.order.createdAt)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput">Nombre d'articles :</label>
                                <input disabled type="text" id="disabledTextInput" className="form-control" placeholder={this.countProducts(this.state.order.articles)}/>
                            </div>
                            <label htmlFor="disabledTextInput">Articles :</label>
                            <div className={"d-flex justify-content-around container ManageOne__articles_container"}>
                                {this.displayProduct(this.state.order.articles)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput">Montant total :</label>
                                <input disabled type="text" id="disabledTextInput" className="form-control" placeholder={this.rounded(this.state.order.totalAmount)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="disabledTextInput">Statut :</label>
                                <input disabled type="text" id="disabledTextInput" className="form-control" placeholder={this.state.order.status}/>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </Fragment>
        );
    }
}