import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import ViewOneCategory from "../../../Components/Admin/Labels/Category/viewOneCategory";

export default class ViewOneCategoryPage extends Component {

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
                <ViewOneCategory categoryId={this.state.categoryId} name={this.state.categoryName}/>
            </Fragment>
        )
    }
}
