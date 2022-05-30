import React from "react";
import {Component, Fragment} from "react";
import './newProduct.css';
import ErrorFormLittle from "../../error/ErrorFormLittle";
import Select from "react-select";
import axios from "axios";
import {environement} from "../../../Environment/environment";
import AuthService from "../../../services/auth.service"
import Tooltip from '@material-ui/core/Tooltip';
import ErrorForm from "../../error/ErrorForm";
import {Redirect} from "react-router-dom";

export default class NewProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            redirection: false,
            iconNew: 'far fa-check-circle text-success icon--availableP',
            iconEndOfSeries: 'fas fa-times-circle text-danger icon--availableP',
            iconAvailable: 'fas fa-times-circle text-danger icon--availableP',
            saveCategory: [],
            allCategory: [],
            allSubCategory: [],
            currentSubCategory: [],
            subCategoryId: "",
            name: "",
            brand: "",
            description: "",
            bigPictures: "",
            pictureUrl: "",
            pictures: [],
            //events:
            new: true,
            discount: 0,
            endOfSerie: false,
            //endEvents
            quantity: 0,
            available: false,
            price: 0,
            weight: 0,
            colors: "",
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
            nameError: "",
            brandError: "",
            colorsError: "",
            discountError: "",
            quantityError: "",
            weightError: "",
            priceError: "",
            bigPictureError:"",
            picturesError: "",
            descriptionError: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddPictures = this.handleAddPictures.bind(this);
        this.handleChangeAvailable = this.handleChangeAvailable.bind(this);
        this.handleChangeNew = this.handleChangeNew.bind(this);
        //this.handleChangeEndOfSeries = this.handleChangeEndOfSeries.bind(this);
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
            // setTimeout(() => {
                this.setState({ currentSubCategory: arrSubCategory });
            // }, 500);
        }
    }

    selectedChangeSubCat = (value, { action })  => {
        if (action === 'select-option') {
            this.setState({ selectedSubCategory: value })
        }
    }

    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    }

    handleChangeBrand = (event) => {
        this.setState({ brand: event.target.value });
    }

    handleAddPictures = () => {
        if(this.state.pictureUrl.length > 0) {
            let images = this.state.pictures;
            images.push({url: this.state.pictureUrl})
            this.setState({pictureUrl: ""});
            this.setState({ picture: images });
        }
    }

    handleChangeColors = (event) => {
        this.setState({ colors: event.target.value });
    }

    handleChangeAvailable() {
        if(this.state.available) {
            this.setState({ iconAvailable: "fas fa-times-circle text-danger icon--availableP" })
            this.setState({ available: false })
        } else {
            this.setState({ iconAvailable: "far fa-check-circle text-success icon--availableP" })
            this.setState({ available: true });
        }
    }

    handleChangeNew = () => {
        if(this.state.new) {
            this.setState({ iconNew: "fas fa-times-circle text-danger icon--availableP" })
            this.setState({ new: false})
        } else {
            this.setState({ iconNew: "far fa-check-circle text-success icon--availableP" })
            this.setState({ new: true });
        }
    }

    handleChangeEndOfSeries = (event) => {
        this.setState({ endOfSeries: event.target.value })
    }

    handleChangeBigPictures = (event) => {
        this.setState({ bigPictures: event.target.value })
    }

    handleChangePictures = (event) => {
        this.setState({ pictureUrl: event.target.value })
    }

    handleChangeDescription = (event) => {
        this.setState({ description: event.target.value});
    }

    handleChangeDiscount = (event) => {
        this.setState({ discount: event.target.value});
    }

    handleChangeQuantity = (event) => {
        this.setState({ quantity: event.target.value });
        if(event.target.value > 0) {
            this.setState({ iconAvailable: "far fa-check-circle text-success icon--availableP" })
            this.setState({ available: true });
        } else {
            this.setState({ iconAvailable: "fas fa-times-circle text-danger icon--availableP" })
            this.setState({ available: false })
        }
    }

    handleChangePrice = (event) => {
        this.setState({ price: event.target.value });
    }

    handleChangeWeight = (event) => {
        this.setState({ weight: event.target.value });
    }

    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({errorMsg: ""})
        this.setState({categoryError: ""})
        this.setState({subCategoryError: ""});
        this.setState({nameError: ""})
        this.setState({brandError: ""});
        this.setState({colorsError: ""});
        this.setState({bigPictureError: ""})
        this.setState({picturesError: ""})
        this.setState({quantityError: ""});
        this.setState({discountError: ""});
        this.setState({weightError: ""});
        this.setState({priceError: ""});
        this.setState({descriptionError: ""})

        let canSend = true;
        if(this.state.selectedCategory.value.length < 1) {
            this.setState({ categoryError: "Vous devez choisir une catégorie" })
            canSend = false;
        }

        if(typeof this.state.selectedSubCategory.value === "undefined" || this.state.selectedSubCategory.value.length < 1) {
            this.setState({ subCategoryError: "Vous devez choisir une sous catégorie" })
            canSend = false;
        }

        if(this.state.name.length > 70 || this.state.name.length < 3) {
            this.setState({nameError: "Le nom du produit doit contenir entre 3 et 70 caractères"})
            canSend = false;
        }

        if(this.state.brand && this.state.brand.length > 40) {
            this.setState({brandError: "40 caractères maximum"})
            canSend = false;
        }

        if(this.state.colors && this.state.colors.length > 40) {
            this.setState({colorsError: "40 caractères maximum"})
            canSend = false;
        }

        if(this.state.bigPictures.length > 1) {
            if(!this.isValidHttpUrl(this.state.bigPictures)) {
                this.setState({bigPicturesError: "Vous devez rentrer une Url correcte"})
                canSend = false;
            }
        }

        if(this.state.pictures.length < 1) {
            this.setState({picturesError: "Vous devez rentrer au moin une image"})
            canSend = false;
        }

        let urlOk = true;
        let urlNbr = null;
        for (let i=0; i < this.state.pictures.length; i++) {
            if(!this.isValidHttpUrl(this.state.pictures[i].url)) {
                urlOk = false
                urlNbr = i+1;
            }
        }
        if(!urlOk) {
            this.setState({ picturesError: "Votre image n°" + urlNbr + " n'est pas correcte" })
            canSend = false;
        }

        if(isNaN(parseInt(this.state.quantity))) {
            this.setState({quantityError: "Vous devez rentrer un chiffre"});
            canSend = false;
        } else if (parseInt(this.state.quantity) < 0) {
            this.setState({ quantityError: "Votre quantité doit être égal ou supérieur à 0" });
            canSend = false;
        }

        if(isNaN(parseInt(this.state.discount))) {
            this.setState({discountError: "Vous devez rentrer un chiffre"});
            canSend = false;
        } else if (parseInt(this.state.discount) < 0) {
            this.setState({ discountError: "Votre prix doit être égal ou supérieur à 0" });
            canSend = false;
        }

        if(isNaN(parseInt(this.state.weight))) {
            this.setState({weightError: "Vous devez rentrer un chiffre"});
            canSend = false;
        } else if (this.state.weight === 0 || this.state.weight <= 0) {
            this.setState({ weightError: "Le poids doit être supérieur à 0" });
            canSend = false;
        }

        if(isNaN(parseInt(this.state.price))) {
            this.setState({ priceError: "Vous devez rentrer un chiffre" });
            canSend = false;
        } else if (parseInt(this.state.price) <= 0) {
            this.setState({ priceError: "Votre prix doit être supérieur à 0" });
            canSend = false;
        }

        if(this.state.description.length < 1) {
            this.setState({descriptionError: "vous devez rentrer une description"})
            canSend = false;
        } else if (this.state.description.length > 255) {
            this.setState({descriptionError: "La description doit être inférieure à 255 caractères"})
            canSend = false;
        }

        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }

        if(canSend) {
            axios.post(environement.backBase+"/product/create", {
                subCategoryId: this.state.selectedSubCategory.value,
                name: this.state.name,
                brand: this.state.brand,
                color: this.state.colors,
                bigPicture: this.state.bigPictures,
                pictures: this.state.pictures,
                available: this.state.available,
                events: {
                    new: this.state.new,
                    discount: parseInt(this.state.discount),
                    endOfSerie: false
                },
                quantity: this.state.quantity,
                price: this.state.price,
                weight: this.state.weight,
                description: this.state.description,
            }, { headers: headers}).then( res => {
                this.setState({ success: res.data.message });
                this.setState({ redirection: true });
            }).catch( error => {
                console.log(error.response)
                if( error.response ) {
                    this.setState({ errorMsg: error.response.data.errors.message });
                }
            })
        }
    }

    render() {
        const {redirection} = this.state;

        if (redirection) {
            return <Redirect to={{pathname:'/admin/subCategory/' + this.state.selectedSubCategory.value}}/>
        }
        return(
            <Fragment>
                <div className={"container"}>
                    <div className={"row justify-content-center mt-5"}>
                        <div className={"col-6"}>
                            <h2 className={"text-center mb-5"}>Ajouter un produit</h2>
                            <form className="box__product--color NewProduct_container global_bgColor--whiteSmoke container font_montserrat d-flex flex-column align-items-center pb-5 mb-5" onSubmit={this.handleSubmit}>
                                <div className={"col-10"}>
                                    <div className="mt-5">
                                        <label htmlFor="category" className="form-label"><span className={"text-danger required"}>*</span> Catégorie:</label>
                                        <Select
                                            onChange={this.selectedChangeCat}
                                            options={this.state.allCategory}
                                            //defaultValue={this.state.allCategory[this.state.positionCategory]}
                                        />
                                        { this.state.categoryError.length > 0 ?
                                            <ErrorFormLittle error={this.state.categoryError}/> : null
                                        }
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="category" className="form-label"><span className={"text-danger required"}>*</span> Sous catégorie:</label>
                                        <Select
                                            onChange={this.selectedChangeSubCat}
                                            options={this.state.currentSubCategory}
                                            //defaultValue={this.state.currentSubCategory[this.state.positionSubCategory]}
                                        />
                                        { this.state.subCategoryError.length > 0 ?
                                            <ErrorFormLittle error={this.state.subCategoryError}/> : null
                                        }
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="name" className="form-label"><span className={"text-danger required"}>*</span> Nom:</label>
                                        <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChangeName} className={'form-control'}/>
                                        {this.state.nameError.length > 0 ? <ErrorFormLittle error={this.state.nameError}/> : null}
                                    </div>

                                        <div className={"d-lg-flex justify-content-between"}>
                                            <div className="mt-3">
                                                <label htmlFor="brand" className="form-label">Marque:</label>
                                                <input type="text" id="brand" name="brand" value={this.state.brand} onChange={this.handleChangeBrand} className={'form-control'}/>
                                                {this.state.brandError.length > 0 ? <ErrorFormLittle error={this.state.brandError}/> : null}
                                            </div>
                                            <div className="mt-3">
                                                <label htmlFor="colors" className="form-label">Couleur:</label>
                                                <input type="text" id="colors" name="colors" value={this.state.colors} onChange={this.handleChangeColors} className={'form-control'}/>
                                                {this.state.colorsError.length > 0 ? <ErrorFormLittle error={this.state.colorsError}/> : null}
                                            </div>
                                        </div>

                                    <div className="mt-3">
                                        <label htmlFor="bigPictures" className="form-label">Url de l'image principale:</label>
                                        <input type="text" id="bigPictures" name="bigPictures" value={this.state.bigPictures} onChange={this.handleChangeBigPictures} className={'form-control'}/>
                                        {this.state.bigPictureError.length > 0 ? <ErrorFormLittle error={this.state.bigPictureError}/> : null}
                                    </div>
                                    {this.state.bigPictures && this.state.bigPictures.length > 0?
                                        <div className={"d-flex justify-content-center"}>
                                            <img className={"little--picture"} src={this.state.bigPictures} alt={"grande taille"}/>
                                        </div> : null
                                    }
                                    <div className="mt-3">
                                        <label htmlFor="pictures" className="form-label"><span className={"text-danger required"}>*</span> Url des petites images:</label>
                                        <div className={"d-flex"}>
                                            <input type="text" id="pictures" name="pictures" value={this.state.pictureUrl} onChange={this.handleChangePictures} className={'form-control'}/>
                                            <Tooltip title="Ajouter une image">
                                                <i className="fas fa-plus-square text-success mt-2 add--pictures" onClick={this.handleAddPictures}/>
                                            </Tooltip>
                                        </div>

                                        {this.state.picturesError.length > 0 ? <ErrorFormLittle error={this.state.picturesError}/> : null}
                                    </div>
                                    { this.state.pictures && this.state.pictures.length > 0?
                                        <div className={"d-flex justify-content-around"}>
                                            { this.state.pictures.map((picture, index) => {
                                                return <img className={"little--picture"} src={picture.url} key={index} alt={index}/>
                                            }) }
                                        </div>:null
                                    }

                                    <div className={"row"}>
                                        <div className={"d-lg-flex justify-content-around"}>
                                            <div className="mt-3">
                                                <label htmlFor="available" className="form-label d-flex justify-content-between">Disponible</label>
                                                <div className={"text-center"}>
                                                    <Tooltip title="Modifier la disponibilité">
                                                        <i className={this.state.iconAvailable} onClick={this.handleChangeAvailable}/>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <label htmlFor="new" className="form-label d-flex justify-content-between">Nouveauté</label>
                                                <div className={"text-center"}>
                                                <Tooltip title="Modifier la Nouveauté">
                                                    <i className={this.state.iconNew} onClick={this.handleChangeNew}/>
                                                </Tooltip>
                                                </div>
                                            </div>
                                            {/*<div className="mt-3">*/}
                                            {/*    <label htmlFor="endOfSeries" className="form-label">Fin de série</label>*/}
                                            {/*    <i className={this.state.iconEndOfSeries}></i>*/}
                                            {/*</div>*/}
                                        </div>

                                    </div>

                                    <div className={"row"}>
                                        <div className={"d-lg-flex justify-content-between"}>
                                            <div className="mt-3">
                                                <label htmlFor="quantity" className="form-label">Quantité:</label>
                                                <input type="number" id="quantity" name="quantity" value={this.state.quantity} onChange={this.handleChangeQuantity} className={'form-control'}/>
                                                {this.state.quantityError.length > 0 ? <ErrorFormLittle error={this.state.quantityError}/> : null}
                                            </div>

                                            <div className="mt-3">
                                                <label htmlFor="discount" className="form-label">Solde:</label>
                                                <input type="number" id="discount" name="discount" value={this.state.discount} onChange={this.handleChangeDiscount} className={'form-control'}/>
                                                {this.state.discountError.length > 0 ? <ErrorFormLittle error={this.state.discountError}/> : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"row"}>
                                        <div className={"d-lg-flex justify-content-between"}>
                                            <div className="mt-3">
                                                <label htmlFor="weight" className="form-label"><span className={"text-danger required"}>*</span> Poids:</label>
                                                <input type="number" id="weight" name="weight" value={this.state.weight} onChange={this.handleChangeWeight} className={'form-control'}/>
                                                {this.state.weightError.length > 0 ? <ErrorFormLittle error={this.state.weightError}/> : null}
                                            </div>

                                            <div className="mt-3">
                                                <label htmlFor="price" className="form-label"><span className={"text-danger required"}>*</span> Prix:</label>
                                                <input type="number" id="price" name="price" value={this.state.price} onChange={this.handleChangePrice} className={'form-control'}/>
                                                {this.state.priceError.length > 0 ? <ErrorFormLittle error={this.state.priceError}/> : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <label htmlFor="description" className="form-label"><span className={"text-danger required"}>*</span> Description:</label>
                                        <textarea id="description" name="description" value={this.state.description} onChange={this.handleChangeDescription} className={'form-control'}
                                                  rows={4}
                                                  cols={50}
                                        />
                                        {this.state.descriptionError.length > 0 ? <ErrorFormLittle error={this.state.descriptionError}/> : null}
                                    </div>
                                    { this.state.errorMsg && this.state.errorMsg.length > 0 ?
                                        <div className={"mt-2 d-flex justify-content-center"}>
                                            <ErrorForm error={this.state.errorMsg}/>
                                        </div>
                                        : null}
                                    <div className="row justify-content-center mt-3">
                                        <input type="submit" className={"btn mt-4 col-5 global_bgColor--blueSky global_fontColor--whiteSmoke NewProduct_create_btn"} value="Envoyer" />
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
