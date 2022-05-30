import React from "react";
import {Component, Fragment} from "react";
import NavbarProduct from "../../../Components/Admin/products/NavbarProduct/navbarProduct";
import DeleteProduct from "../../../Components/Admin/products/deleteProduct";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";

export default class DeleteProductPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: this.props.state.location.state.product
        }
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <NavbarProduct/>
                <DeleteProduct product={this.state.product}/>
            </Fragment>
        )
    }
}
