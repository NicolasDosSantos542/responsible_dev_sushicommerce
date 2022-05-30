import React from "react";
import {Component, Fragment} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import ModifyCategory from "../../../Components/Admin/Labels/Category/modifyCategory";

export default class ModifyCategoryPage extends Component {

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <ModifyCategory category={this.props.location.state}/>
            </Fragment>
        )
    }
}
