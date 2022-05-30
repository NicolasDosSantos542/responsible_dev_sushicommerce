import './bodyModal.css';
import axios from "axios";
import ErrorForm from "../../../../error/ErrorForm";
import ErrorFormLittle from "../../../../error/ErrorFormLittle";
import React, { useEffect, useState } from 'react';
import AuthService from "../../../../../services/auth.service";
import {environement} from "../../../../../Environment/environment";

export const ModalAdd = ({ handleCloseAdd, show, product }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [redirection, setRedirection] = useState(false);
    const [nbrError, setNbrError] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [nbrToAdd, setNbrToAdd] = useState('');
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState(null);
    const [productQuantity, setProductQuantity] = useState(null);

    useEffect(() => {
        if(show) {
            setProductId(product._id)
            setProductName(product.name)
            setProductQuantity(product.quantity)
        }
    }, [show, product._id, product.name, product.quantity]);

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        setNbrError("");
        setErrorMsg("");
        let canSend = true;
        if(isNaN(parseInt(nbrToAdd))) {
            setNbrError("Vous devez rentrer un chiffre" );
            canSend = false;
        } else if (parseInt(nbrToAdd) <= 0) {
            setNbrError("Votre nombre doit être supérieur à 0");
            canSend = false;
        }
        const headers = {
            'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
        }

        if(canSend) {
            axios.put(environement.backBase+"/product/addStock/"+productId, {
                quantity: parseInt(nbrToAdd)
            }, { headers: headers}).then( () => {
                setRedirection(true)
            }).catch( error => {
                console.log(error.response)
                if( error.response ) {
                    setErrorMsg(error.response.statusText);
                }
            })
        }
    }

    if (redirection) {
        window.location.reload();
    }

    return (
                <div className={showHideClassName}>
                    <section className="modal__main">
                        <div className={"box__add"}>
                            <div>
                                <h5 className={"add__title text-center"}>Ajouter la quantité à {productName}</h5>
                            </div>
                            <hr/>
                            <div className="add__body">
                                <p className={"text-center"}>quantité actuelle: <span
                                    className={"quantity--actual"}>{productQuantity}</span></p>
                                <form onSubmit={handleSubmitAdd}>
                                    <div className="form-group">

                                        <div className={"box__nbr"}>
                                            <label htmlFor={productId}>Quantité à àjouter</label>
                                            <input type="number" className="form-control input__nbr quantityToAdd"
                                                   onChange={event => setNbrToAdd(event.target.value)}
                                                   value={nbrToAdd}
                                                   id={productId}
                                            />
                                            {nbrError && nbrError.length > 1 ?
                                                <ErrorFormLittle error={nbrError}/>:null
                                            }
                                        </div>
                                        {errorMsg && errorMsg.length > 1 ?
                                            <ErrorForm error={errorMsg}/>:null
                                        }
                                        <div className={"d-flex justify-content-center"}>
                                            <button
                                                    className="btn global_bgColor--blueSky global_fontColor--whiteSmoke btn--submit"
                                                    type={"submit"}>Ajouter
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="deduce__footer">
                            <div className={"d-flex justify-content-end"}>
                                <button type="button" className="btn btn-warning" onClick={handleCloseAdd}>
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

    );
};
