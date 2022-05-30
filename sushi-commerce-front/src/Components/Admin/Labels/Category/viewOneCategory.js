import React from "react";
import {Component, Fragment} from "react";
import axios from "axios";
import { environement } from "../../../../Environment/environment";
import './viewOneCategory.css';
import {Link, Redirect} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

export default class ViewOneCategory extends Component {
    constructor(props) {
        super(props);
        this.state={
            categoryId: this.props.categoryId,
            nameCategory: this.props.name,
            category: {},
            comeBack: false,
        }
        this.comeBack = this.comeBack.bind(this)
    }

    componentDidMount() {
        axios.get(environement.backBase+"/category/"+this.state.categoryId).then(response => {
            this.setState({category: response.data.category})
        })
    }

    comeBack() {
        this.setState({comeBack: true});
    }

    render() {
        const comeBack = this.state.comeBack;
        if(comeBack) {
            return <Redirect to={"/admin/manageLabels"}/>
        }
        return(
            <Fragment>
                <div className={"container"}>
                    <div className={"d-flex justify-content-center mt-5"}>
                        <h2 className={"text-center"}>Voir les sous categories de {this.state.nameCategory}</h2>
                        <i className="fas fa-arrow-left btn btn-info text-center mt-2" style={{margin: "0 0.7em", height: "2em"}} onClick={this.comeBack}> Revenir </i>
                    </div>
                    {this.state.category && this.state.category.length !== 0 ?

                        <div className={"row"}>
                            <div className={"col-12"}>
                                <div className={"d-flex justify-content-center mt-3"}>
                                    <img src={this.state.category.img} alt={this.state.nameCategory}></img>
                                </div>
                                <p>Description: {this.state.category.description}</p>

                                <table className={"table table-striped box__category--color mt-4 mb-5"}>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>nom</th>
                                        <th>description</th>
                                        <th className={"actions--content"}>actions</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {this.state.category.subCategory ?

                                        this.state.category.subCategory.map((subCategory, index) => {

                                            return [
                                                <tr key={index}>
                                                    <td className={"align-middle"}>{index}</td>
                                                    <td className={"align-middle text--name"}>{subCategory.name}</td>
                                                    <td>{subCategory.description}</td>
                                                    <td className={"align-middle"}>
                                                        <Tooltip title="Voir">
                                                            <Link className={"link--view"} to={"/admin/subCategory/"+subCategory._id}><i className="far fa-eye icon--view"></i></Link>
                                                        </Tooltip>
                                                        <Tooltip title="Modifier">
                                                            <Link className={"link--modify"} to={{pathname:"/admin/subCategory/modify/"+subCategory._id, state: { subCategory: subCategory, idCategory: this.state.categoryId, name:this.state.nameCategory}}}><i className="fas fa-pencil-alt icon--modify"></i></Link>
                                                        </Tooltip>
                                                        <Tooltip title="Supprimer">
                                                            <Link className={"link--delete"} to={{pathname:"/admin/subCategory/delete/"+subCategory._id , state: { subCategory: subCategory, category: this.state.category}}}><i className="fas fa-times icon--delete"></i></Link>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            ]
                                        }):null
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        <div>
                            <p className={"text-center mt-5"}>Vous n'avez pas encore de catégories !</p>
                        </div>
                    }
                </div>
            </Fragment>
        )
    }
}
