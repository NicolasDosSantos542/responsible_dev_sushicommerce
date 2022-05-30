import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import ModifySubCategory from "../../../Components/Admin/Labels/SubCategory/modifySubcategory";

export default class ModifySubCategoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subCategory: this.props.location.state
        }
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <ModifySubCategory subCategory={this.state.subCategory}/>
            </Fragment>
        )
    }
}
