import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import DeleteCategory from "../../../Components/Admin/Labels/Category/deleteCategory";

export default class DeleteCategoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: this.props.location.state.category
        }
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <DeleteCategory category={this.state.category}/>
            </Fragment>
        )
    }
}
