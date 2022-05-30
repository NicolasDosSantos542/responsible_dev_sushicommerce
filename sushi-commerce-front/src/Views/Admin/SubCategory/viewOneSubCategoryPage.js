import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import ViewOneSubCategory from "../../../Components/Admin/Labels/SubCategory/viewOneSubCategory";

export default class ViewOneSubCategoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subCategoryId: this.props.match.params.id,
        }
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <ViewOneSubCategory subCategoryId={this.state.subCategoryId}/>
            </Fragment>
        )
    }
}
