import React from "react"
import {Component, Fragment} from "react";
import './products.css'
import NavbarProduct from "../../../Components/Admin/products/NavbarProduct/navbarProduct";
import NewProduct from "../../../Components/Admin/products/newProduct";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
export default class Products extends Component {

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <NavbarProduct/>
                <NewProduct/>
            </Fragment>
        )
    }

}
