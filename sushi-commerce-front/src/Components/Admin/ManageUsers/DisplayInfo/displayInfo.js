import React from "react";
import {Component, Fragment} from "react";
import {environement} from "../../../../Environment/environment";
import AuthService from "../../../../services/auth.service";
import axios from "axios";
import {Link} from "react-router-dom";


export default class DisplayInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : [{}]
        };
    }

    componentDidMount() {
        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }
        axios.get(environement.backBase+"/admin/all", {headers:headers}).then(response => {
            this.setState({users: response.data.users})
        })
    }



    cleanDate(data) {
        if (data)
            return data.substr(0,10);
    }

    render() {
        return(
            <Fragment>
                <div className="input-group rounded col-sg-12 container">
                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                           aria-describedby="search-addon"/>
                    <span className="input-group-text border-0" id="search-addon"><i className="fas fa-search"></i></span>
                </div>

                <div className={"container font_cabin"}>
                    <table className={"table"}>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Depuis le :</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map((user, index) => {
                           return[
                               <tr key={index}>
                                   <td>{user.firstName}</td>
                                   <td>{user.lastName}</td>
                                   <td>{user.email}</td>
                                   <td>{this.cleanDate(user.createdAt)}</td>
                                   <td>
                                       <Link className={"link--modify"} to={{pathname:"/admin/manageUsers/"+user._id}}>
                                           <i className="far fa-eye icon--view" />
                                       </Link>
                                   </td>
                               </tr>
                               ]
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
    }

}


