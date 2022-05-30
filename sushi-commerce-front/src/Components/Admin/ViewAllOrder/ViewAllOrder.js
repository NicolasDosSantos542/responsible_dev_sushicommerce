import React from "react";
import {Component, Fragment} from "react";
import {environement} from "../../../Environment/environment";
import AuthService from "../../../services/auth.service";
import axios from "axios";
import {Link} from "react-router-dom";


export default class ViewAllOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allOrder : [{}]
        };
    }

    componentDidMount() {
        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }
        axios.get(environement.backBase+"/order", {headers:headers}).then(response => {
            this.setState({allOrder: response.data.order})
        })
    }

    countProducts(data) {
        if (data)
            return data.length;
    }

    cleanDate(data) {
        if (data)
            return data.substr(0,10);
    }

    render() {
        return(
            <Fragment>
                <div className={"container font_cabin"}>
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Créé le :</th>
                            <th>Nombre d'articles</th>
                            <th>Prix total</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.allOrder.map((order, index) => {
                            let roundedQuantity = (Math.round(order.totalAmount*100) / 100).toFixed(2);
                            return[
                                <tr key={index}>
                                    <td>{order._id}</td>
                                    <td>{this.cleanDate(order.createdAt)}</td>
                                    <td>{this.countProducts(order.articles)}</td>
                                    <td>{roundedQuantity}</td>
                                    <td>{}</td>
                                    <td>
                                        <Link className={"link--modify"} to={{pathname:"/admin/manageOrder/"+order._id}}>
                                            <i className="far fa-eye icon--view" />
                                        </Link>
                                    </td>
                                </tr>
                            ]
                        })
                        }
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }

}


