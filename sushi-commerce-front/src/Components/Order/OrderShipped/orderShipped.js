import React from "react";
import {Component, Fragment} from "react";
import './orderShipped.css'
import AuthService from "../../../services/auth.service";
import axios from "axios";
import {environement} from "../../../Environment/environment";

export default class OrderShipped extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order:[{}]
        }
    }

    componentDidMount() {
        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }
        axios.get(environement.backBase+"/order/status/expédiée/asc", {headers:headers}).then(response => {
            this.setState({order: response.data.order})
        })
    }
    render() {
        return (
            <Fragment>
                <div className="Admin_order_shipped">
                    <div className="order_shipped_icone">
                        <p className="order_shipped_title">Commandes expédiées<i className="fas fa-shipping-fast"></i></p>
                    </div>
                    <div>
                    <div className="Admin_orderShipped_container">
                        {this.state.order && this.state.order.length !== 0 ?
                            <form onClick={this.handleSubmit}>
                                <div className={"row"} id={"orderPaid"}>
                                    <div className={"col-12"}>
                                        <table className={"table table-striped"}>
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>nom</th>
                                                <th>statut</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.order.map((order, index) => {
                                                return [
                                                    <tr className={"orderShipped_data_bgColor"} key={index}>
                                                        <td>{index}</td>
                                                        <td>{order.client_ID}</td>
                                                        <td>{order.status}</td>
                                                    </tr>
                                                ]
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </form>

                            :
                            <div>
                                <p className={"text-center mt-5"}>Pas de commande à afficher </p>
                            </div>
                        }
                    </div>
                </div>
                </div>
            </Fragment>
        )
    }
}

