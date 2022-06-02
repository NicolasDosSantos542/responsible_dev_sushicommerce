import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import './productDetail.css'
import {Image, ImageGroup} from 'react-fullscreen-image'
import axios from "axios";

const Environement = require('../../Environment/environment')
const Env = Environement.environement

export default class ChangeProduct extends Component {


    constructor(props) {
        super(props);
        this.state = {
            product: null,
            reductedPrice: null,
            checked: true,
            descCat: null,
            cartSize: 0
        }
        this.displayInStock = this.displayInStock.bind(this)
        this.displayReductPrice = this.displayReductPrice.bind(this)
        this.displayCommandButton = this.displayCommandButton.bind(this)
        this.sendToCart = this.sendToCart.bind(this)
        this.id = this.props.match.params.id
    }

    componentDidMount() {
        this.getThisProduct();
    }

    componentDidUpdate() {

        if (this.state.product.events.discount && this.state.checked) {
            this.setState({checked: false})
            let reduction = (this.state.product.price * this.state.product.events.discount) / 100;
            let realPrice = this.state.product.price - reduction;
            this.setState({reductedPrice: realPrice.toFixed(2)})
        }
    }

    checkLocalStorage() {
        const cart = localStorage.getItem("cart");
        const cartPrice = localStorage.getItem("cartPrice");
        const cartSize = localStorage.getItem("cartSize");
        let myCart;
        if (!cart) {
            myCart = [];
        } else {
            myCart = JSON.parse(cart);
        }
        let myCartPrice;
        if (!cartPrice) {
            myCartPrice = 0;
        } else {
            myCartPrice = parseInt(cartPrice);
        }
        let myCartSize;
        if (!cartSize) {
            myCartSize = 0;
        } else {
            myCartSize = parseInt(cartSize);
        }
        return {cart: myCart, size: myCartSize, price: myCartPrice}

    }

    sendToCart(e) {
        e.preventDefault();
        let storage = this.checkLocalStorage();
        // console.log(storage)
        let myCart = storage.cart;
        let myCartPrice = storage.price;
        let myCartSize = storage.size;


        let productToCart = {
            name: this.state.product.name,
            id: this.state.product._id,
            price: this.state.product.price,
            unitPrice: this.state.product.price,
            qty: 1
        }
        let newSize;
        let newPrice;
        const ids = myCart.map(el => el.id);
        if (!ids.includes(productToCart.id)) {
            myCart.push(productToCart)
            newSize = myCartSize + productToCart.qty;
            newPrice = myCartPrice + productToCart.price
            localStorage.setItem('cartPrice', newPrice.toString());
            localStorage.setItem('cartSize', newSize.toString());
            this.setState({cartSize: newSize})
        }
        // console.log("mon cart", myCart)
        localStorage.setItem('cart', JSON.stringify(myCart));
      window.location.href = "/"


    }



    getThisProduct() {
        this.id = this.props.match.params.id
        axios.get(Env.backBase + "/product/one/" + this.id)
            .then(res => {
                this.setState({product: res.data.products})
                axios.get(Env.backBase + '/subCategory/' + res.data.products.subCategoryId._id)
                    .then(res => {
                        // console.log(res.data.subCategory)
                        this.setState({descCat: res.data.subCategory})
                    })
                    .catch(error =>
                        console.log(error)
                    );
            })
            .catch(error =>
                console.log(error)
            );
    }


    displayInStock() {
        if (this.state.product) {
            if (this.state.product.available) {
                return (
                    <div className="text-center bg-success text-white p-1">En Stock</div>
                )
            } else {
                return (
                    <div className="text-center bg-danger text-white p-1">Epuisé</div>
                )
            }
        }
    }

    displayReductPrice() {
        if (this.state.product) {
            if (this.state.reductedPrice) {
                return (
                    <Fragment>
                        <div className="row text-center text-danger  mt-5 mb-0 ">
                            <span className="h1 productDetail_textLine">{this.state.product.price} €<span
                                className="badge rounded-pill bg-danger align-top productDetail_badgeReduction">-{this.state.product.events.discount}%</span></span>
                        </div>
                        <h1 className="text-center text-danger mb-0">{this.state.reductedPrice} €</h1>
                    </Fragment>
                )
            } else {
                return (
                    <Fragment>
                        <h1 className="text-center text-danger mt-5 mb-0">{this.state.product.price} €</h1>
                    </Fragment>
                )
            }
        }
    }

    displayCommandButton() {
        if (this.state.product) {
            if (this.state.product.available) {
                return (
                    <button
                        onClick={this.sendToCart}
                        className="col-6 mt-3 mb-4 btn btn-success btn-lg">Ajouter au Chariot</button>
                )
            } else {
                return (
                    <button className="col-8 mt-3 mb-4 btn btn-warning btn-lg" disabled>Non disponible</button>
                )
            }
        }
    }

    render() {
        let imageList = [];
        let Avis = [];
        let product = {};
        let subCat = "";
        let Cat = "";
        if (this.state.product) {
            product = this.state.product
            if (product.pictures) {
                imageList = product.pictures.map((item, index) => {
                    return (
                        <li key={index}>
                            <Image src={item.maxi}/>
                        </li>
                    )
                })
            }
            if (product.comment) {
                Avis = product.comment.map((item, index) => {
                    return (
                        <div className="row bg-white m-2 mt-3 p-2 rounded-3 productDetail_comment" key={index}>
                            <div className="h5 pb-2">{item.titre}</div>
                            <div>{item.contenu}</div>
                        </div>
                    )
                })
            }
            // if(product.bigPicture){
            //     bigPicture=
            // }
        }
        // console.log(this.state.descCat)
        if (this.state.descCat) {
            subCat = this.state.descCat
            // console.log(subCat)
            if (this.state.descCat.category) {
                Cat = this.state.descCat.category
                console.log(Cat)

            }
        }
        console.log(product)
        return (
            <Fragment>
                <div className="container-fluid mt-3">
                    <div className="row m-0">
                        <div className="col-10 p-0">
                            <div className="row justify-content-center m-2 productDetail_container p-0">
                                <div className="row m-0 p-2 productDetail_breadcrumb bg-light">
                                    <div aria-label="breadcrumb">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link
                                                className="productDetail_LinkBreadcrumb" to="/">Let's shop</Link></li>
                                            <li className="breadcrumb-item">{Cat.name}</li>
                                            <li className="breadcrumb-item"><Link
                                                className="productDetail_LinkBreadcrumb"
                                                to={"/subCat/" + subCat._id}>{subCat.name}</Link></li>
                                            <li className="breadcrumb-item active"
                                                aria-current="page">{product.name}</li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="row mt-4 mb-4">
                                    <div className="col-5">
                                        <img className="img-fluid p-1" src={product.bigPicture} alt=""/>
                                    </div>
                                    <div className="col-7 p-4">
                                        <h1 className="fs-4 pb-2">{product.name}</h1>
                                        <h2 className="fs-5">Produit par {product.brand}</h2>
                                        <div className="fs-6 mt-5 mb-5">{product.description}</div>
                                        <div className="row pt-5">
                                            <ImageGroup>
                                                <ul className="images">
                                                    {imageList}
                                                </ul>
                                            </ImageGroup>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-2 pe-0 productDetail_Avis bg-light">
                                        <div className="fs-5 p-2">
                                            Les avis
                                        </div>
                                    </div>
                                    <div className="col-10 productDetail_Avis--bottomBorder ps-0 ms-0">
                                    </div>
                                </div>
                                <div className="row pb-3">
                                    <div className="col-12 p-3 productDetail_Avis--container bg-light">
                                        {Avis}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div
                                className="row bg-light mt-2 p-0 productDetail_rightPart rounded-3 justify-content-center sticky-top"
                                style={{zIndex: 0}}>
                                {this.displayInStock()}
                                {this.displayReductPrice()}
                                <div className="text-center text-secondary mb-3">Encore {product.quantity} en stock
                                </div>
                                {this.displayCommandButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}