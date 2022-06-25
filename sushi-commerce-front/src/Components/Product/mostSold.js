import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import '../../index.css'
import './mostSold.css'
import {environement as Env} from "../../Environment/environment";

export default class MostSold extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: null,
            name: "",
            id: ""
        }
        this.name = this.props.data.name;
        this.id = this.props.data.id;

    }

    componentDidMount() {
        this.name = this.props.data.name;
        this.id = this.props.data.id;
        this.setState({name: this.name, id: this.id});
        this.getItems();
    }

    getItems() {

        const url = Env.backBase + "/product/best_sales/" + this.props.data.id;
        const requestOptions = {
            method: 'GET',
            headers: {"Content-Type": 'application/json'},
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({items: data.products})
            });
    }

    componentDidUpdate() {
        this.newName = this.props.data.name
        if (this.name !== this.newName) {
            this.name = this.props.data.name
            this.setState({name: this.name});
             this.getItems();
        }

    }

    displayBadgeProduct(events) {
        let newProduct = events.new;
        let soldePercent = events.discount;
        let serialEnding = events.serialEnding;
        let badgeNew;
        let badgeSolde;
        let badgeEnd;

        if (newProduct === true) badgeNew = <div className="col-3 p-0 text-center"><span
            className="badge rounded-pill bg-success align-top">New !</span></div>
        if (soldePercent !== null) badgeSolde = <div className="col-3 p-0 text-center"><span
            className="badge rounded-pill bg-danger align-top">-{soldePercent}%</span></div>
        if (serialEnding === true) badgeEnd =
            <div className="col-3 p-0 text-center"><span className="badge rounded-pill bg-warning align-top">Fin de série</span>
            </div>

        return (
            <Fragment>
                <div className="row justify-content-center">
                    {badgeSolde}
                    {badgeNew}
                    {badgeEnd}
                </div>
            </Fragment>
        )
    }

    displayPrice(item) {
        let reduction = (item.price * item.events.discount) / 100;
        return item.price - reduction
    }

    render() {

        let itemsMap = []
        if (this.state.items) {
            itemsMap = this.state.items.map((item, index) => {
                return (
                    <Link className="col-2 subCatDetail_Link" to={"/produit/" + item._id} key={index}>
                        <div className="row p-2 justify-content-center">
                            {this.displayBadgeProduct(item.events)}
                            <img src={item.bigPicture.mini} className="img-fluid" style={{"width": "80%"}} alt={item.name}/>
                            <div>{item.name}</div>
                            <div className="text-center text-danger h5">{this.displayPrice(item).toFixed(2)} €</div>
                        </div>
                    </Link>
                )
            })
        }
        return (
            <Fragment>
                {/* Voir probleme de cls ici */}
                <div className="row rounded-3 mt-1 mostSold_container">
                    <div className="global_bgColor--orange rounded-1 text-white ps-4">Meilleur vente
                        de {this.state.name}</div>
                    {itemsMap}
                </div>
            </Fragment>
        )
    }
}
