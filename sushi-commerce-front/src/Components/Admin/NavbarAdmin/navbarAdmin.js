import React from "react";
import {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import './navbarAdmin.css';
import articleIcone from "../../../Assets/article.webP"
import labelIcone from "../../../Assets/label.webP"
import orderIcone from "../../../Assets/shopping-bag.webP"
import userIcone from "../../../Assets/user.webP";
import homeIcone from "../../../Assets/home.webP"
import GetStockOut from "../GetStockOut/getStockOut";

export default class NavbarAdmin extends Component{
    render() {
        return (
            <Fragment>
                <div className="container col-5 AdminNavbar">
                    <nav id="nav nav-pills nav-justified">
                        <ul className="d-flex justify-content-between">
                            <Link className="NavBarAdmin_navLink" to="/admin/home"><img src={process.env.PUBLIC_URL + homeIcone} className="AdminNavbar_link_img" alt=""/></Link>
                            <Link className="NavBarAdmin_navLink global_bgColor--blueSky" to="/admin/newProduct"><img src={process.env.PUBLIC_URL + articleIcone} className="AdminNavbar_link_img" alt=""/></Link>
                            <Link className="NavBarAdmin_navLink NavBarAdmin_navLink--orange global_bgColor--orange" to="/admin/manageLabels"><img src={process.env.PUBLIC_URL + labelIcone} className="AdminNavbar_link_img" alt=""/></Link>
                            <Link className="NavBarAdmin_navLink NavBarAdmin_navLink--charcoal global_bgColor--charcoal" to="/admin/manageUsers"><img src={process.env.PUBLIC_URL + userIcone} className="AdminNavbar_link_img" alt=""/></Link>
                            <Link className="NavBarAdmin_navLink NavBarAdmin_navLink--whitesmoke global_bgColor--whiteSmoke" to="/admin/viewAllOrder"><img src={process.env.PUBLIC_URL + orderIcone} className="AdminNavbar_link_img" alt=""/></Link>
                        </ul>
                    </nav>
                    <GetStockOut/>
                </div>
            </Fragment>
        )
    }
}
