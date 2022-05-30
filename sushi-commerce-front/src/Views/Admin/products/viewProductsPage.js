import React from "react";
import {Component, Fragment} from "react";
import NavbarProduct from "../../../Components/Admin/products/NavbarProduct/navbarProduct";
import SeekbarCategories from "../../../Components/Admin/Utils/seekBarCategories/seekbarCategories";
import ProductsInSub from "../../../Components/Admin/Labels/SubCategory/productsInSub";
import NavbarAdmin from "../../../Components/Admin/NavbarAdmin/navbarAdmin";

export default class ViewProductsPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            subCategoryId: '',
            subCategoryName: '',
        }
    }

    handleSearchChange= (subCategory) => {
        this.setState({subCategoryId: subCategory.value});
        this.setState({subCategoryName: subCategory.label});
    }

    render() {
        return(
            <Fragment>
                <NavbarAdmin/>
                <NavbarProduct/>
                <SeekbarCategories onSelectSubCategory={this.handleSearchChange}/>
                <div className={"container"}>
                    { this.state.subCategoryId.length < 10 ?
                        <div className={"mb-5"}>
                            <h5 className={"text-center text-danger mt-4"}>Veuillez sélectionner une catégorie et une sous catégorie</h5>
                        </div>:
                        // <ViewOneSubCategory subCategoryId={this.state.subCategoryId}/>
                        <div className={"mb-5"}>

                            <ProductsInSub subCategoryId={this.state.subCategoryId} subName={this.state.subCategoryName}/>
                        </div>
                    }
                </div>

            </Fragment>
        )
    }
}
