import React, {Fragment} from "react";
import {Component} from "react";
import NavbarAdmin from "../../../../Components/Admin/NavbarAdmin/navbarAdmin";
import ViewAllOrder from "../../../../Components/Admin/ViewAllOrder/ViewAllOrder";

export default class ViewAll extends Component {

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <h1 className={"text-center font_montserrat"}>Dashboard Admin - Gestion des commandes</h1>
                <ViewAllOrder/>
            </Fragment>
        )
    }
}