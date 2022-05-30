import React from "react";
import {Component, Fragment} from "react";
import './manageUsers.css';
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";
import DisplayInfo from "../../../Components/Admin/ManageUsers/DisplayInfo/displayInfo";

export default class ManageUsers extends Component {

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <h1 className={"text-center font_montserrat"}>Dashboard Admin - Gestion des utilisateurs</h1>
                <DisplayInfo/>
            </Fragment>
        )
    }
}
