import React from "react";
import {Component, Fragment} from "react";
import NavbarProduct from "../../../../Components/Admin/products/NavbarProduct/navbarProduct";
import DeleteMultipleProducts from "../../../../Components/Admin/products/multiple/DeleteMultipleProducts";
import NavbarAdmin from "../../../../Components/Admin/NavbarAdmin/navbarAdmin";

export default class DeleteMultipleProductsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: this.props.location.state.arrProducts
        }
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <NavbarProduct/>
                <DeleteMultipleProducts products={this.state.products}/>
            </Fragment>
        )
    }
}
