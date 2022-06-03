import React, {Component, Suspense, Fragment} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import '../App.css';

// import Admin from "./Pioche/views/AdminAccount/admin";
// import Products from "./Pioche/views/Products/products";
// import ManageUsers from "./Pioche/views/ManageUsers/manageUsers";
// import ChangeProduct from "./Pioche/views/ChangeProduct/changeProduct";
// import ManageLabels from "./Pioche/views/ManageLabels/manageLabels";

//import HomePage from "../Views/HomePage/homepage";
import Navbar from "../Components/Navigation/Navbar/navbar";
import HomePage from "../Views/HomePage/homepage";



import {createBrowserHistory} from "history";

const ViewOneOrder = React.lazy(() => import('../Components/UserAccount/OneOrder/viewOneOrder'));
const ManageOneUserPage = React.lazy(() => import("../Views/Admin/ManageOneUserPage/manageOneUserPage"));
//multiple product
const DetailMultipleProductsPage = React.lazy(() => import("../Views/Admin/products/multiple/DetailMultipleProductsPage"));
const UpdateMultipleProductsPage = React.lazy(() => import("../Views/Admin/products/multiple/UpdateMultipleProductsPage"));
const DeleteMultipleProductsPage = React.lazy(() => import("../Views/Admin/products/multiple/DeleteMultipleProductsPage"));
// end multiple

const ViewCategoryPage = React.lazy(() => import("../Views/Admin/Category/viewCategoryPage"));
const AddCategoryPage = React.lazy(() => import("../Views/Admin/Category/addCategoryPage"));
const ViewOneCategoryPage = React.lazy(() => import("../Views/Admin/Category/viewOneCategoryPage"));
const ModifyCategoryPage = React.lazy(() => import("../Views/Admin/Category/modifyCategoryPage"));
const DeleteCategoryPage = React.lazy(() => import("../Views/Admin/Category/deleteCategoryPage"));

const UserAccount = React.lazy(() => import("../Views/AccountPage/myAccount"));
const Login = React.lazy(() => import("../Views/LoginPage/connexion"));
const Register = React.lazy(() => import("../Views/RegisterPage/register"));



const PrivateRoute = React.lazy(() => import("../Components/privateRoute/PrivateRoute"));
const AdminPage = React.lazy(() => import("../Views/Admin/adminPage"));

const ViewOneSubCategoryPage = React.lazy(() => import("../Views/Admin/SubCategory/viewOneSubCategoryPage"));
const AddSubCategoryPage = React.lazy(() => import("../Views/Admin/SubCategory/addSubCategoryPage"));
const ModifySubCategoryPage = React.lazy(() => import("../Views/Admin/SubCategory/modifySubCategoryPage"));
const ResearchProduct = React.lazy(() => import("../Views/Products/products"));
const DeleteSubCategoriePage = React.lazy(() => import("../Views/Admin/SubCategory/deleteSubCategoriePage"));
const SubCatDetail = React.lazy(() => import("../Views/subCatDetail/subCatDetail"));
const ManageUsers = React.lazy(() => import("../Views/Admin/ManageUsers/manageUsers"));
const ManageOrderPage = React.lazy(() => import("../Views/Admin/ViewOrder/ManageOrder/ManageOrderPage"));

const ViewProductsPage = React.lazy(() => import("../Views/Admin/products/viewProductsPage"));
const AddProductPage = React.lazy(() => import("../Views/Admin/products/addProductPage"));
const ProductDetail = React.lazy(() => import("../Views/ProductDetail/productDetail"));
const ModifyProductPage = React.lazy(() => import("../Views/Admin/products/modifyProductPage"));
const DetailProductPage = React.lazy(() => import("../Views/Admin/products/detailproductPage"));
const DeleteProductPage = React.lazy(() => import("../Views/Admin/products/deleteProductPage"));
const ViewAll = React.lazy(() => import("../Views/Admin/ViewOrder/ViewAll/ViewAll"));

export default class MainRouter extends Component {

    constructor(props) {
        super(props);
        const history = createBrowserHistory()
        this.state = {
            route: history.location.pathname,
            redirection: false,
            research: "",
        }
        this.getDataFromSearchBar=this.getDataFromSearchBar.bind(this)
    }

    getDataFromSearchBar = (data) => {
        this.setState({
            research: data.research,
            redirection: true,
        })
    }

    render() {
        const {redirection} = this.state;
        if (redirection) {
            this.setState({redirection: false})
            return <Redirect to={{
                pathname: this.state.research,
            }}/>
        }
        return (
            <Fragment>
                <Router>
                    {this.state.route === "/login" ? null : this.state.route === "/register" ? null :
                        <Navbar parentCallback={this.getDataFromSearchBar}/>
                    }

                    <Switch>
                        <Suspense fallback={<div>Chargement en cour...</div>}>
                            <Route path="/register" component={Register}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/account" component={UserAccount}/>
                            <Route path="/admin/home" component={AdminPage}/>
                            <Route path="/produit/:id" component={ProductDetail}/>
                            <Route path="/account/:id" component={ViewOneOrder}/>
                            <Route path="/subCat/:id" component={SubCatDetail}/>
                            <Route path="/products/productsFromResearch/:research" component={ResearchProduct}/>

                            {/* admin Products */}

                            <PrivateRoute exact path={"/admin/viewProducts"} component={ViewProductsPage}/>
                            <PrivateRoute exact path={"/admin/newProduct"} component={AddProductPage}/>
                            <PrivateRoute exact path={"/admin/product/delete/:id"} component={DeleteProductPage}/>
                            <PrivateRoute exact path={"/admin/product/detail/:id"} component={DetailProductPage}/>
                            <PrivateRoute exact path={"/admin/product/modify/:id"} component={ModifyProductPage}/>
                            {/* Multiple Product */}
                            <PrivateRoute exact path={"/admin/product/multiple/detail"} component={DetailMultipleProductsPage}/>
                            <PrivateRoute exact path={"/admin/product/multiple/modify"} component={UpdateMultipleProductsPage}/>
                            <PrivateRoute exact path={"/admin/product/multiple/delete"} component={DeleteMultipleProductsPage}/>
                            {/* end Multiple Product */}

                            {/* end admin Products */}

                            {/* admin category */}
                            <PrivateRoute exact path={"/admin/manageLabels"} component={ViewCategoryPage}/>
                            <PrivateRoute exact path={"/admin/addCategory"} component={AddCategoryPage}/>
                            <PrivateRoute exact path={"/admin/category/:id"} component={ViewOneCategoryPage}/>
                            <PrivateRoute exact path={"/admin/modifyCategory/:id"} component={ModifyCategoryPage}/>
                            <PrivateRoute exact path={"/admin/category/delete/:id"} component={DeleteCategoryPage}/>
                            {/* end admin category */}

                            {/*admin manage user*/}
                            <PrivateRoute exact path={"/admin/manageUsers"} component={ManageUsers}/>
                            <PrivateRoute exact path={"/admin/manageUsers/:id"} component={ManageOneUserPage}/>
                            {/*end admin manage user*/}

                            <PrivateRoute exact path={"/admin/viewAllOrder"} component={ViewAll}/>
                            <PrivateRoute exact path={"/admin/manageOrder/:id"} component={ManageOrderPage}/>

                            {/* admin SubCategory */}
                            <PrivateRoute exact path={"/admin/subCategory/:id"} component={ViewOneSubCategoryPage}/>
                            <PrivateRoute exact path={"/admin/addSubCategory/:id"} component={AddSubCategoryPage}/>
                            <PrivateRoute exact path={"/admin/subCategory/modify/:id"} component={ModifySubCategoryPage}/>
                            <PrivateRoute exact path={"/admin/subCategory/delete/:id"} component={DeleteSubCategoriePage}/>
                            {/* end admin SubCategory */}
                            <PrivateRoute exact path={"/admin"} component={AdminPage}/>
                            <Route path="/" component={HomePage}/>
                        </Suspense>
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}
