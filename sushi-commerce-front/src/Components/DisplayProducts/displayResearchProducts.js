import React from "react";
import {Component, Fragment} from "react";
import './displayProducts.css';

export default class DisplayResearchProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            research: this.props.research
        }
    }

    componentDidMount() {
        const url = "http://localhost:4244/product/search/" + this.state.research;
        const requestOptions = {
            method: 'GET',
            headers: {"Content-Type": 'application/json'},
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({products: data.products})
            });
    }

    render() {
        let productsToDisplay = [];
        if (this.state.products) {
                        productsToDisplay = this.state.products.map((product, index) => {
                return (
                    <div>
                        <p>nom : {product.name}</p>
                        <p>catégorie: {product.category}</p>
                        <p>prix : {product.price}</p>
                        <p>stock : {product.stock}</p>
                        <hr/>
                    </div>
                )
            })
        }
        return (
            <Fragment>
                <form className="DisplayProducts_container container d-flex flex-wrap">
                    <div className="DisplayProducts_container_box">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        </div>
                        <div className="DisplayProducts_info">
                            <div>
                                <p>Nom article</p>
                                <p>Description</p>
                            </div>
                            <div>
                                <p>Catégorie</p>
                                <p>Stock</p>
                            </div>
                            <div>{productsToDisplay}</div>
                        </div>
                        <div>

                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }
}