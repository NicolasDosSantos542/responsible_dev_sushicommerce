import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import ModifyProduct from "../../../Components/Admin/products/modifyProduct";
import NavbarProduct from "../../../Components/Admin/products/NavbarProduct/navbarProduct";

export default class ModifyProductPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: this.props.location.state.product,
        }
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <NavbarProduct/>
                <ModifyProduct product={this.state.product}/>
            </Fragment>
        )
    }
}
