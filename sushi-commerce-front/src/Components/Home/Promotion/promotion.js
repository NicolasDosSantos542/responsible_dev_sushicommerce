import React from "react";
import {Component, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {environement as Env} from "../../../Environment/environment";

export default class Promotion extends Component {
    constructor(props) {
        super(props);
        this.state = {items: null, descCat: null}
        this.newId = null;
    }

    componentDidMount() {
        this.getAllProduct()
    }

    componentDidUpdate() {
    }

    getAllProduct() {

        axios.get(Env.backBase + '/product/sort/views')
            .then(res => {
                this.setState({items: res.data.products})
            })
            .catch(error =>
                console.log(error)
            );
    }


    displayReductPrice(item) {
        if (item.events.discount !== null) {
            let reduction = (item.price * item.events.discount) / 100;
            let realPrice = item.price - reduction;
            return (
                <Fragment>
                    <div className="row text-center text-danger">
                        <div><strike>{item.price.toFixed(2)} €</strike></div>
                        <span className="h2">{realPrice.toFixed(2)} €</span>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div className="row text-center text-danger">
                        <span className="h2">{item.price.toFixed(2)} €</span>
                    </div>
                </Fragment>
            )
        }
    }

    displayBadgeProduct(events) {
        let newProduct = events.new;
        let soldePercent = events.discount;
        let serialEnding = events.serialEnding;
        let badgeNew;
        let badgeSolde;
        let badgeEnd;

        if (newProduct === true) badgeNew = <div className="col-1"><span className="badge rounded-pill bg-success align-top">New !</span></div>
        if (soldePercent !== null) badgeSolde = <div className="col-1"><span className="badge rounded-pill bg-danger align-top">-{soldePercent}%</span></div>
        if (serialEnding === true) badgeEnd = <div className="col-1"><span className="badge rounded-pill bg-warning align-top">Fin de série</span></div>

        return (
            <Fragment>
                <div className="col-7">
                    <div className="row">
                        {badgeSolde}
                        {badgeNew}
                        {badgeEnd}
                    </div>
                </div>
            </Fragment>
        )
    }

    render() {
        let itemsMap = [];
        let subCat = "";
        if (this.state.items) {
            itemsMap = this.state.items.map((item) => {
                return (
                    <Link className="subCatDetail_Link" to={"/produit/" + item._id} key={item._id}>
                        <div className="row bg-white m-2 mt-3 p-2 rounded-3 subCatDetail_item">
                            <div className="col-2">
                                <img width="150px" height="150px"src={item.bigPicture.mini} className="img-fluid" alt="produit"/>
                            </div>
                            <div className="col-8 pt-3">
                                <div className="row">{this.displayBadgeProduct(item.events)}</div>
                                <div className="row h5 mt-4">{item.name}</div>
                                <div className="row">{item.description}</div>
                            </div>
                            <div className="col-2 d-flex justify-content-center align-items-center">
                                {this.displayReductPrice(item)}
                            </div>
                        </div>
                    </Link>
                )
            })
        }
        if (this.state.descCat) {
            subCat = this.state.descCat
            if (this.state.descCat.category) {
            }
        }
        return (
            <div className="bef-container">
                <div className="container-fluid">
                    <div className="row rounded-3 subCatDetail_item">
                        <div className="row justify-content-center pt-2 pb-2">
                            <div className="col-12">
                                {subCat.description}
                            </div>
                        </div>
                        {/* <div className="col-2">
                            Filtre coming soon
                        </div> */}
                        <div className="col-10">
                            {itemsMap}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
