import React from "react";
import {Component,Fragment} from "react";
import NavbarAdmin from "../../../../Components/Admin/NavbarAdmin/navbarAdmin";
import ManageOneOrder from "../../../../Components/Admin/ManageOneOrder/ManageOneOrder";

export default class ManageOrderPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            orderId : this.props.match.params.id
        }
    }

    render() {
        return (
            <Fragment>
                <NavbarAdmin/>
                <ManageOneOrder orderId={this.state.orderId}/>
            </Fragment>
        );
    }
}