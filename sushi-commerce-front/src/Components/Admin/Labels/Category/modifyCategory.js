import React from "react";
import {Component, Fragment} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import { environement } from "../../../../Environment/environment";
import AuthService from "../../../../services/auth.service"
import ErrorForm from "../../../error/ErrorForm";
import ErrorFormLittle from "../../../error/ErrorFormLittle";

export default class ModifyCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: this.props.category.state._id,
            nameCategory: this.props.category.state.name,
            name: this.props.category.state.name,
            img: this.props.category.state.img,
            description: this.props.category.state.description,
            nameError: "",
            imgError: "",
            descriptionError: "",
            errorMsg: "",
            redirection: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

    }

    nameChange = event => {
        this.setState({name: event.target.value});
    }

    imgChange = event => {
        this.setState({img: event.target.value});
    }

    descriptionChange = event => {
        this.setState({description: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({nameError: ""});
        this.setState({descriptionError: ""});
        this.setState({errorMsg: ""});
        let canSend = true;
        if (this.state.name.length < 3) {
            this.setState({nameError: "Le nom doit comporter 3 caractère minimum"});
            canSend = false;
        }

        if (this.state.description.length < 5) {
            this.setState({descriptionError: "La description doit comporter 5 caractère minimum"});
            canSend = false;
        }

        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }

        if (canSend) {
            axios.put(environement.backBase + "/category/" + this.state.categoryId, {
                name: this.state.name,
                img: this.state.img,
                description: this.state.description,
            }, {headers: headers}).then(async res => {
                this.setState({success: res.data.message});
                this.setState({redirection: true});
            }).catch(error => {
                console.log(error.response);
                if (error.response) {
                    this.setState({errorMsg: error.response.data.message});
                }
            })
        }

    }

    render() {
        const {redirection} = this.state;

        if (redirection) {
            return <Redirect to='/admin/manageLabels'/>
        }
        return (
            <Fragment>
                <div className={"container"}>
                    <h2 className={"text-center mt-5"}>Modifier la catégorie {this.state.nameCategory}</h2>
                    <div className={"row"}>
                        <div className={"d-flex justify-content-center mb-5"}>
                            <div className={"col-4 box__category--color global_bgColor--whiteSmoke mt-4 mb-3"}>
                                <div className={"mt-2"}>
                                    {this.state.errorMsg.length > 0 ? <ErrorForm error={this.state.errorMsg}/> : null}
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="mt-3">
                                            <label htmlFor="name" className="form-label">Nom:</label>
                                            <input type="text" id="name" name="name" value={this.state.name}
                                                   onChange={this.nameChange} className={'form-control'}/>
                                            {this.state.nameError.length > 0 ?
                                                <ErrorFormLittle error={this.state.nameError}/> : null}
                                        </div>
                                        <div className="mt-3">
                                            <label htmlFor="img" className="form-label">Url de l'image:</label>
                                            <input type="text" id="img" name="img" value={this.state.img}
                                                   onChange={this.imgChange} className={'form-control'}/>
                                        </div>
                                        <div className="mt-3">
                                            <label htmlFor="description" className="form-label">description:</label>
                                            <textarea id="description" name="description" value={this.state.description}
                                                      onChange={this.descriptionChange} className={'form-control'}
                                                      rows={4}
                                                      cols={3}
                                            />
                                            {this.state.descriptionError.length > 0 ?
                                                <ErrorFormLittle error={this.state.descriptionError}/> : null}
                                        </div>
                                        <div className="row justify-content-center mt-3">
                                            <input type="submit" className={"btn global_bgColor--orange global_fontColor--whiteSmoke mt-4 mb-3 col-lg-5 col-md-7"}
                                                   value="Modifier"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
