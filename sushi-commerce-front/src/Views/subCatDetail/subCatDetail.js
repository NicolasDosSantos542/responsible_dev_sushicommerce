import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import './subCatDetail.css'
import MostSold from "../../Components/Product/mostSold";
import axios from "axios";

const Environement = require('../../Environment/environment')
const Env = Environement.environement

export default class SubCatDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {items: null, descCat: null}
        this.id = this.props.match.params.id
        this.newId = null;
    }

    componentDidMount() {
        this.getAllProduct()
        this.getThisCat()
    }

    componentDidUpdate() {
        this.newId = this.props.match.params.id
        if (this.id !== this.newId) {
            this.getAllProduct()
            this.getThisCat()
        }
    }

    getAllProduct() {
        this.id = this.props.match.params.id

        axios.get(Env.backBase + '/subCategory/' + this.id + '/products')
            .then(res => {
                this.setState({items: res.data.products})
            })
            .catch(error =>
                console.log(error)
            );
    }

    getThisCat() {
        axios.get(Env.backBase + '/subCategory/' + this.id)
            .then(res => {
                this.setState({descCat: res.data.subCategory})
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
        let Cat = "";
        if (this.state.items) {
            itemsMap = this.state.items.map((item) => {
                return (
                    <Link className="subCatDetail_Link" to={"/produit/" + item._id} key={item._id}>
                        <div className="row bg-white m-2 mt-3 p-2 rounded-3 subCatDetail_item">
                            <div className="col-2">
                                <img src={item.bigPicture.mini} className="img-fluid" style={{"width": "70%"}} alt=""/>
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
        if(this.state.descCat) {
            subCat = this.state.descCat
            if(this.state.descCat.category) {
                Cat = this.state.descCat.category
            }
        }
        return (
            <Fragment>
                <div className="container-fluid p-4">
                    <div className="row rounded-3 subCatDetail_item">
                        <div className="row m-0 p-2 subCatDetail_breadcrumb bg-light">
                            <div aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link className="subCatDetail_LinkBreadcrumb" to="/">Let's shop</Link></li>
                                    <li className="breadcrumb-item">{Cat.name}</li>
                                    <li className="breadcrumb-item active" aria-current="page">{subCat.name}</li>
                                </ol>
                            </div>
                        </div>
                        <div className="row justify-content-center pt-2 pb-2">
                            <div className="col-12">
                                {subCat.description}
                            </div>
                        </div>
                        <div className="row justify-content-center m-0">
                            <div className="col-12">

                                <MostSold data={{name: subCat.name, id: subCat._id}}/>
                            </div>
                        </div>
                        <div className="col-2">
                            Filtre coming soon
                        </div>
                        <div className="col-10">
                            {itemsMap}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}