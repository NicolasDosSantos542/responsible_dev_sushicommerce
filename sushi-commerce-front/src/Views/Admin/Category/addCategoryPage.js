import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import AddCategory from "../../../Components/Admin/Labels/Category/addCategory";

export default class AddCategoryPage extends Component {

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <AddCategory/>
            </Fragment>
        )
    }
}
