import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import DeleteSubCategory from "../../../Components/Admin/Labels/SubCategory/deleteSubCategory";

export default class DeleteSubCategoriePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subCategory: this.props.location.state.subCategory,
            category: this.props.location.state
        }
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <DeleteSubCategory subCategory={this.state.subCategory} category={this.state.category}/>
            </Fragment>
        )
    }
}
