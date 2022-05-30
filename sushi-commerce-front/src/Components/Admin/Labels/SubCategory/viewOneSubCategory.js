import React from "react";
import {Component, Fragment} from "react";
import axios from "axios";
import { environement } from "../../../../Environment/environment";
import ProductsInSub from "./productsInSub";
import {Redirect} from "react-router-dom";

export default class ViewOneSubCategory extends Component {
    constructor(props) {
        super(props);
        this.state={
            subCategoryId: this.props.subCategoryId,
            subCategory: {},
            products: [],
            comeBack: false,
        }
        this.comeBack = this.comeBack.bind(this)
    }

    componentDidMount() {
        axios.get(environement.backBase+"/subCategory/"+this.state.subCategoryId).then(response => {
            this.setState({subCategory: response.data.subCategory})
        })
    }

    comeBack() {
        this.setState({comeBack: true});
    }

    render() {
        const comeBack = this.state.comeBack;
        if(comeBack) {
            return <Redirect to={{pathname: "/admin/category/"+ this.state.subCategory.category._id, state: {name: this.state.subCategory.category.name }}}/>
        }
        return(
            <Fragment>
                <div className={"container"}>
                    <div className={"d-flex justify-content-center"}>
                        <h2 className={"text-center"}>Voir la sous catégorie {this.state.subCategory.name}</h2>
                        <i className="fas fa-arrow-left btn btn-info text-center mt-2" style={{margin: "0 0.7em", height: "2em"}} onClick={this.comeBack}> Revenir </i>
                    </div>

                    <div className={"row"}>
                        <div className={"col-12 mb-5"}>
                            <div className={"d-flex justify-content-center mt-3"}>
                                <img src={this.state.subCategory.img} alt={this.state.subCategory.name}></img>
                            </div>
                            <div className={"col-12"}>
                                <p>Description: {this.state.subCategory.description}</p>
                            </div>
                            <ProductsInSub subCategoryId={this.state.subCategoryId} subName={this.state.subCategory.name}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
