import React from "react";
import {Component, Fragment} from "react";
import './displayProducts.css';

export default class DisplayProducts extends Component {
    constructor(props) {
        super(props);
        this.state={name:'',category:'',description:'',pictures:'',events:'',stock:''}
    }

    componentDidMount() {
        //requete axios pour récupérer les données
    }

    render() {
        return(
            <Fragment>
                <form className="DisplayProducts_container container d-flex flex-wrap">
                    <div className="DisplayProducts_container_box">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        </div>
                        <div className="DisplayProducts_info">
                            <div>
                                <p>Nom article</p>
                                <p>Description</p>
                            </div>
                            <div>
                                <p>Catégorie</p>
                                <p>Stock</p>
                            </div>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }
}