import React from "react";
import Select from 'react-select'
import {Component, Fragment} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import { environement } from "../../../../Environment/environment";
import AuthService from "../../../../services/auth.service"
import ErrorForm from "../../../error/ErrorForm";
import ErrorFormLittle from "../../../error/ErrorFormLittle";

export default class ModifySubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: {},
            positionCategory: 0,
            allCategory: [],
            categoryName: this.props.subCategory.name,
            categoryId: this.props.subCategory.idCategory,
            subCategoryId: this.props.subCategory.subCategory._id,
            nameSubCategory: this.props.subCategory.subCategory.name,
            name: this.props.subCategory.subCategory.name,
            img: this.props.subCategory.subCategory.img,
            description: this.props.subCategory.subCategory.description,
            nameError: "",
            imgError: "",
            descriptionError: "",
            errorMsg: "",
            redirection: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectedChange = this.selectedChange.bind(this)
    }

    componentDidMount() {
        let arrCategory = [];
        axios.get(environement.backBase+"/category/all").then(response => {
            this.setState({allCategory: response.data.category})
            this.state.allCategory.map(category => arrCategory.push({label: category.name, value: category._id}));
            this.setState({allCategory: arrCategory})
            let pos = this.state.allCategory.findIndex(obj => obj['value'] === this.state.categoryId);
            this.setState({ positionCategory: pos })
            this.setState({selectedCategory: this.state.allCategory[pos]})
        });
    }

    selectedChange = (value, { action })  => {
        if (action === 'select-option') {
            this.setState({ selectedCategory: value })
        }
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
            axios.put(environement.backBase + "/subCategory/" + this.state.subCategoryId, {
                category: this.state.selectedCategory.value,
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
            return <Redirect to={{pathname:'/admin/category/'+ this.state.selectedCategory.value , state:{ name: this.state.selectedCategory.label}}}/>
        }
        return (
            <Fragment>
                <div className={"container"}>
                    <h2 className={"text-center mt-5"}>Modifier la sous catégorie {this.state.nameSubCategory}</h2>
                    <div className={"row"}>
                        <div className={"d-flex justify-content-center mb-5"}>
                            <div className={"col-4 box__category--color global_bgColor--whiteSmoke mt-3"}>
                                <div className={"mt-2"}>
                                    {this.state.errorMsg.length > 0 ? <ErrorForm error={this.state.errorMsg}/> : null}
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="mt-3">
                                            <label htmlFor="category" className="form-label">Catégorie:</label>
                                            <Select
                                                onChange={this.selectedChange}
                                                options={this.state.allCategory}
                                                defaultValue={this.state.allCategory[this.state.positionCategory]}
                                            />
                                        </div>
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
                                        <div className="row justify-content-center mt-3 mb-4">
                                            <input type="submit" className={"btn global_bgColor--orange global_fontColor--whiteSmoke mt-4 col-lg-5 col-md-7"}
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
