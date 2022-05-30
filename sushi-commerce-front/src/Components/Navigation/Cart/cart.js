import React, {Component, Fragment} from 'react';
import './cart.css';
import axios from "axios";

const environnement = require('../../../Environment/environment')
const Env = environnement.environement

class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            myCart: [],
            cartPrice: 0,
            cartSize: 0
        }
        this.changeQuantity = this.changeQuantity.bind(this)
        this.sendData = this.sendData.bind(this)


    }

    componentDidMount() {
        let storage = this.checkLocalStorage();

        this.setState({
            myCart: storage.cart,
            cartPrice: storage.price,
            cartSize: storage.size
        })

    }


    passOrder() {
        axios.get(Env.backBase + '/category/all')
            .then(res => {
                this.setState({category: res.data.category})
            })
            .catch(error =>
                console.log(error)
            );
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


    saveCart() {
        let forSave = JSON.stringify(this.state.myCart);
        let newSize = this.state.cartSize;
        let newPrice = this.state.cartPrice;
        this.sendData();
        localStorage.setItem("cart", forSave);
        localStorage.setItem('cartSize', newSize.toString());
        localStorage.setItem('cartPrice', newPrice.toString());
    }

    calculate() {
        let size = 0;
        let price = 0;
        this.state.myCart.forEach(product => {
            size = size + parseInt(product.qty);
            price = price + parseFloat(product.price);
        })
        return {size: size, price: price}
    }

    async changeQuantity(e, id) {
        let product = this.state.myCart.find(el => el.id === id)
        let cart = this.state.myCart;
        cart.forEach((element) => {
            if (element === product) {
                element.qty = e.target.value
                element.price = element.unitPrice * e.target.value
            }
        })
        let totals = this.calculate();
        await this.setState({myCart: cart, cartSize: totals.size, cartPrice: totals.price})
        this.saveCart();
    }

    deleteProduct(e, id) {
        e.preventDefault();
        let cart = this.state.myCart;
        const ids = cart.map(el => el.id);
        let index = ids.indexOf(id)
        // let product = cart.find(el => el.id === id)
        cart.splice(index, 1)
        this.setState({myCart: cart})
        this.saveCart();

    }

    deleteLocalStorage(e) {
        e.preventDefault();
        localStorage.removeItem('cart');
        localStorage.removeItem('cartPrice');
        localStorage.removeItem('cartSize');

    }

    sendData = () => {
        this.props.parentCallback(
            {
                cartSize: this.state.cartSize,
            });
    }

    render() {
        let cart = [];

        if (this.state.myCart) {
            cart = this.state.myCart.map((product, index) => {
                return (
                    <div>

                        <tr>nom : {product.name}</tr>
                        <tr>prix : {product.price}</tr>
                        <tr>quantité :
                            <input onChange={(e) => this.changeQuantity(e, product.id)}
                                   className="saison-score pastille" type="number" min="1"
                                   max="100" placeholder={product.qty} size="2"/>
                        </tr>
                        <tr>
                            <button onClick={(e) => this.deleteProduct(e, product.id)}>suppr</button>
                        </tr>


                        <hr/>
                    </div>
                )
            })
        }
        return (
            <Fragment>
                <div className="Popup">
                    {/*<div className="btn" onClick={this.deleteLocalStorage}>vider local storage</div>*/}
                    <div>{cart}</div>
                </div>

            </Fragment>
        )
    }
}

export default Cart