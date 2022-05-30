import React from "react";
import {Component, Fragment} from "react";
import Promotion from "../../Components/Home/Promotion/promotion";
import MostSold from "../../Components/Product/mostSold";


export default class ChangeProduct extends Component {

    render() {
        return(
            <Fragment>
                <MostSold data={{name: "Lets Shop", id: "all"}}/>
                <Promotion/>
            </Fragment>
        )
    }
}
