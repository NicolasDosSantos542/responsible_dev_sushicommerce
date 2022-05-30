import React from "react";
import {Component, Fragment} from "react";
import NavbarProduct from "../../../../Components/Admin/products/NavbarProduct/navbarProduct";
import DetailProduct from "../../../../Components/Admin/products/detailProduct";
import NavbarAdmin from "../../../../Components/Admin/NavbarAdmin/navbarAdmin";

export default class DetailMultipleProductsPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            products: this.props.location.state.arrProducts
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
                {this.state.products && this.state.products.length > 0?
                    this.state.products.map((product, index) => {
                        return <div key={index}>
                            <DetailProduct product={product.product}/>
                        </div>
                    }): null
                }
            </Fragment>
        )
    }
}
