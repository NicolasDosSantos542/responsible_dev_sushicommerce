import React, {Component, Fragment} from 'react';
import './ordered.css';
import {environement} from "../../../Environment/environment";


class Ordered extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders : [{}]
        };
    }

    componentDidMount() {
        const headers = {
            headers: {
                'Authorization' : 'Bearer '+localStorage.getItem('letShopToken')
            }
        }
        fetch(environement.backBase+"/order/orderedUser", headers)
            .then(res => res.json())
            .then(response => {
                this.setState({orders: response.order})
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

    displayProduct(data) {
        if (data) {
           return data.map((product, index) => {
                return (
                    <tbody key={index} >
                    <tr>
                        <td>  {product.name}</td>
                        <td> {product.price}</td>
                    </tr>
                  </tbody>)
            })
        }
    }

    render() {
        return (
            <Fragment>
                <h1>Historique des commandes</h1>
                {this.state.orders.length !== 0 ?

                    <div className={"row"}>
                        <div className={"col-12"}>
                            <table className={"table table-striped box__category--color mt-3 mb-5"}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Prix</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.orders.map((order, index) => {
                                   let roundedQuantity = (Math.round(order.totalAmount*100) / 100).toFixed(2);
                                    return [
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{this.cleanDate(order.createdAt)}</td>
                                            <td>{order.status}</td>
                                            <td>{roundedQuantity}</td>
                                            <td>
                                                <button type="button" className="btn btn-default" data-bs-toggle="modal" data-bs-target={"#l"+order._id}>
                                                    <i className="far fa-eye icon--view" />
                                                </button>
                                                <div className="modal fade" id={"l"+order._id} tabIndex="-1" aria-labelledby="exampleModalLabel"
                                                     aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Votre commande du {this.cleanDate(order.createdAt)}</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                                                            </div>
                                                            <div className="modal-body">

                                                                <div>Nombre d'article : {this.countProducts(order.articles)}</div>
                                                                Articles :
                                                                <table className={"table"}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Nom </th>
                                                                            <th> Prix </th>
                                                                        </tr>
                                                                    </thead>
                                                                    {this.displayProduct(order.articles)}
                                                                </table>
                                                                <div>Prix total : {order.totalAmount}</div>
                                                                <div> Status : {order.status}</div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Retour</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    ]
                                 })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div>
                        <p className={"text-center mt-5"}>Vous n'avez pas encore de commandes !</p>
                    </div>
                }
            </Fragment>
        )
    }
}

export default Ordered