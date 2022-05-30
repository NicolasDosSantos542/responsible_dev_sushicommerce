import React from "react";
import {Component, Fragment} from "react";
import {Redirect} from "react-router-dom";
import "./detailProduct.css"

export default class DetailProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
            realPrice: null,
            redirection: false
        }
        this.comeBack = this.comeBack.bind(this);
    }

    componentDidMount() {
        if(this.state.product.events.discount !== 0) {
            let item = this.state.product;
            let reduction = (item.price * item.events.discount) / 100;
            let realPrice = item.price - reduction;
            this.setState({realPrice: realPrice})
        }
    }

    comeBack(e) {
        e.preventDefault();
        this.setState({redirection: true});
    }

    render() {
        const {redirection} = this.state;

        if (redirection) {
            return <Redirect to={{pathname: "/admin/subCategory/" + this.state.product.subCategoryId._id, state: {name: this.state.product.subCategoryId.name}}}/>
        }
        return(
            <Fragment>
                <div className={"container"}>
                    <div className="box__detail mt-5 mb-5" role="alert">
                        <div className={"d-flex justify-content-center"}>
                            <h2 className={"text-center mt-2"}>Voir le produit {this.state.product.name}</h2>
                            <i className="fas fa-arrow-left btn btn-info text-center mt-3" style={{margin: "0 0.7em", height: "2em"}} onClick={this.comeBack}> Revenir </i>
                        </div>
                        <div className={"row"}>
                            <div className={"col-10 offset-1 mt-4"}>
                                <div className={"row"}>
                                    <div className={"col-6"}>
                                        <p className={"detail__category text-center"}>Catégorie: <span className={"category--bold"}>{this.state.product.subCategoryId.category.name}</span></p>
                                    </div>
                                    <div className={"col-6"}>
                                        <p className={"detail__category text-center"}>Sous catégorie: <span className={"category--bold"}>{this.state.product.subCategoryId.name}</span></p>
                                    </div>
                                </div>
                                {this.state.product.events.discount?
                                <div className={"row mt-2"}>

                                    <div className={"d-flex justify-content-center"}>
                                        <p className={"badge bg-danger"} style={{width: "min-content" ,fontSize: "1.1em"}}> -{this.state.product.events.discount}%</p>
                                    </div>
                                    <p className={"text-center"}>Prix actuel: <span className={"text-danger"} style={{fontWeight: "Bold"}}>{this.state.realPrice} €</span></p>

                                </div>: null
                                }

                                <div className={"row mt-4"}>
                                    <div className={"d-flex justify-content-between"}>
                                        <div className={"col-5"}>
                                            <div className={"d-flex justify-content-between"}>
                                                <p>Quantité: <span className={"text-bold"}>{this.state.product.quantity}</span></p>
                                                <p>Prix: <span className={"text-bold"}>{this.state.product.price} €</span></p>
                                            </div>
                                        </div>
                                        <div className={"col-5 offset-2"}>
                                            <div className={"d-flex justify-content-between"}>
                                                {this.state.product.sale?
                                                    <p>Nombre de vente: <span className={"text-bold"}>{this.state.product.sale}</span></p>
                                                    : <p>Nombre de vente: <span className={"text-bold"}>0</span></p>
                                                }

                                                <p>Nombre de vue: <span className={"text-bold"}>{this.state.product.views}</span></p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={"d-flex justify-content-around mt-4"}>
                                        <div className={""}>
                                            <p>Disponible</p>
                                        </div>
                                        <div className={""}>
                                            <p>Nouveauté</p>
                                        </div>
                                    </div>

                                </div>
                                <div className={"d-flex justify-content-around"}>
                                    {this.state.product.available ?
                                        <div>
                                            <i className="far fa-check-circle text-success icon--available"/>
                                        </div> :
                                        <div>
                                            <i className="fas fa-times-circle text-danger icon--available"/>
                                        </div>
                                    }
                                    {this.state.product.events.new ?
                                        <div>
                                            <i className="far fa-check-circle text-success icon--available"/>
                                        </div> :
                                        <div>
                                            <i className="fas fa-times-circle text-danger icon--available"/>
                                        </div>
                                    }
                                </div>
                                <div className={"ml-5"}>
                                    <div className={"d-flex justify-content-center mt-4"}>
                                        <img src={this.state.product.bigPicture} style={{height: "20em", margin: "1em 0.5em"}} alt={"Produit"}/>
                                    </div>
                                    <p className={"text-center"}>Description: {this.state.product.description}</p>
                                </div>
                                <div className={"row mt-4"}>
                                    <p>Marque: {this.state.product.brand}</p>
                                    <p>Poids: {this.state.product.weight} kg</p>
                                    <p>Couleur: {this.state.product.color}</p>
                                </div>
                                <h5 className={"text-center"}>Images</h5>
                                <div className={"d-md-flex justify-content-center mb-1"}>
                                    {this.state.product.pictures && this.state.product.pictures.length > 1?


                                        this.state.product.pictures.map((image, index) => {
                                            return <div key={index}>
                                                <img className={"ml-2"} style={{height: "10em", margin: "1em 0.5em"}} src={image.url} alt={index}/>
                                            </div>
                                        })
                                        :<p className={"text-center"}>Il n'y a pas d'image trouvé</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
