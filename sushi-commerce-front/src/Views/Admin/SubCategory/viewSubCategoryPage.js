import React from "react";
import {Component, Fragment} from "react";
import ViewAllCategory from "../../../Components/Admin/Labels/Category/viewAllCategory";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";

export default class ViewSubCategoryPage extends Component {

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <ViewAllCategory/>
            </Fragment>
        )
    }
}
