import React from "react";
import {Component, Fragment} from "react";
import './getStockOut.css';
import {environement} from "../../../Environment/environment";
import axios from "axios";
import AuthService from "../../../services/auth.service"


export default class GetStockOut extends Component {
    constructor(props) {
        super(props);
        this.state={
            products: [{}],
        }
    }

    componentDidMount() {
        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }
        axios.get(environement.backBase+"/product/verifyStock", {headers:headers}).then(response => {
            this.setState({products: response.data.products})
        })
    }

    render() {
        return (
            <Fragment>
                {this.state.products && this.state.products.length !== 0 ?
                    <form onClick={this.handleSubmit}>
                        <div className={"row"} id={"productsOut"}>
                            <div className={"col-12"}>
                                <table className={"table table-striped"}>
                                    <thead>
                                    <tr>
                                        <th>nom</th>
                                        <th>statut</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.products.map((products) => {

                                        if(products.quantity === 0) {
                                            return [
                                                <tr key={products._id}>
                                                    <td>{products.name}</td>
                                                    <td><i className={"productsOut__rupture"}>Rupture Stock</i></td>
                                                </tr>
                                            ]
                                        }
                                        else{
                                            return (<span/>)
                                        }
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>

                    :
                    <div>
                        <p className={"text-center mt-5"}>Erreur!</p>
                    </div>
                }
            </Fragment>
        );
    }

}