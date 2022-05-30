import React from "react";
import {Component, Fragment} from "react";
import ViewAllCategory from "../../../Components/Admin/Labels/Category/viewAllCategory";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";

export default class ViewCategoryPage extends Component {

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <h1 className={"text-center font_montserrat"}>Dashboard Admin - Gestion des catégories</h1>
                <ViewAllCategory/>
            </Fragment>
        )
    }
}
