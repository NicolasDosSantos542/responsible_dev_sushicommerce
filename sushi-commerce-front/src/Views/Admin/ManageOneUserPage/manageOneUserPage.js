import React, {Fragment} from "react";
import {Component} from "react";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import ManageOneUser from "../../../Components/Admin/ManageUsers/ManageOneUser/manageOneUser";

export default class ManageOneUserPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId : this.props.match.params.id
        }
    }

    render() {
        return (
           <Fragment>
               <NavbarAdmin/>
               <ManageOneUser userId={this.state.userId}/>
           </Fragment>
        );
    }
}