import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import AddSubCategory from "../../../Components/Admin/Labels/SubCategory/addSubcategory";

export default class AddSubCategoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryName: this.props.location.state.name,
            categoryId: this.props.match.params.id,
        }
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <AddSubCategory categoryId={this.state.categoryId} name={this.state.categoryName}/>
            </Fragment>
        )
    }
}
