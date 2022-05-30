import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../../Components/Admin/NavbarAdmin/navbarAdmin";
import UpdateMultipleProducts from "../../../../Components/Admin/products/multiple/UpdateMultipleProducts";
import NavbarProduct from "../../../../Components/Admin/products/NavbarProduct/navbarProduct";

export default class UpdateMultipleProductsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: this.props.location.state.arrProducts,
        }
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <NavbarProduct/>
                <UpdateMultipleProducts products={this.state.products}/>
            </Fragment>
        )
    }
}
