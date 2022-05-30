import React from "react"
import {Component, Fragment} from "react";
import './seekBarCategories.css'
import Select from "react-select";
import axios from "axios";
import {environement} from "../../../../Environment/environment";

export default class SeekbarCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            saveCategory: [],
            allCategory: [],
            allSubCategory: [],
            currentSubCategory: [],
            subCategoryId: "",
            positionCategory: 0,
            selectedCategory: {
                value: "",
                label: "",
            },
            positionSubCategory: 0,
            selectedSubCategory: {
                value: "",
                label: "",
            },
            categoryError: "",
            subCategoryError: "",
        }
    }

    componentDidMount() {
        let arrCategory = [];
        let arrSubCategory = [];
        axios.get(environement.backBase+"/category/all").then(response => {
            this.setState({allCategory: response.data.category})
            this.setState({saveCategory: response.data.category})
            this.state.allCategory.map(category => arrCategory.push({label: category.name, value: category._id}));
            this.setState({allCategory: arrCategory})

            this.state.saveCategory.map(category => arrSubCategory.push({category: category.name, subCategory: category.subCategory}));
            this.setState({allSubCategory: arrSubCategory})

            arrCategory = [];
            let arrFirstSubCategory = [];
            if(this.state.allSubCategory.length > 0) {
                arrCategory.push(this.state.allSubCategory[0].subCategory)
                arrCategory.map(subCategory =>
                    subCategory.map(sub => arrFirstSubCategory.push({label: sub.name , value: sub._id})));
            }
            this.setState({ currentSubCategory: arrFirstSubCategory })

        }).catch( error => {
            console.log(error)
        })
    }

    selectedChangeCat = (value, { action })  => {
        if (action === 'select-option') {
            let saveSubCategory = []
            let arrSubCategory = [];
            if(this.state.allSubCategory.length > 0) {
                let pos = 0;
                for(let i = 0; i < this.state.allSubCategory.length; i++) {
                    if(this.state.allSubCategory[i].category === value.label) {
                        pos = i;
                    }
                }
                saveSubCategory.push(this.state.allSubCategory[pos].subCategory)
                saveSubCategory.map(subCategory =>
                    subCategory.map(sub => arrSubCategory.push({label: sub.name , value: sub._id})));
            }
            this.setState({ currentSubCategory: [] });
            this.setState({ selectedCategory: value })
            this.setState({ selectedSubCategory: {}} )
            this.setState({ currentSubCategory: arrSubCategory });
        }
    }

    selectedChangeSubCat = (value, { action })  => {
        if (action === 'select-option') {
            this.setState({ selectedSubCategory: value })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let canSend = true;

        if(typeof this.state.selectedSubCategory.value === "undefined" || this.state.selectedSubCategory.value.length < 1) {
            canSend = false;
        }

        if(canSend) {
            this.props.onSelectSubCategory(this.state.selectedSubCategory);
        }
    }

    render() {
        return(
            <Fragment>
                <div className="d-flex justify-content-center mt-5">
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <form onSubmit={this.handleSubmit}>
                                <div className={"box__seekBarCategory d-flex justify-content-around"}>
                                    <div className={"box__category"}>
                                        <div className={""}>
                                            <h5 className={"text-center seekBarCategory--title"}>Catégorie</h5>
                                            <Select
                                                onChange={this.selectedChangeCat}
                                                options={this.state.allCategory}
                                            />
                                        </div>
                                    </div>
                                    <div className={"box__subCategory"}>
                                        <div className={""}>
                                            <h5 className={"text-center seekBarCategory--title"}>Sous catégorie</h5>
                                            <Select
                                                onChange={this.selectedChangeSubCat}
                                                options={this.state.currentSubCategory}
                                            />
                                        </div>
                                    </div>
                                    <div className={"box__seek mt-2"}>
                                        <input type="submit" className={"btn btn-outline mt-4"} value="Rechercher" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
