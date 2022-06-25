import React, {Component, Fragment} from "react";
import Promotion from "../../Components/Home/Promotion/promotion";
import MostSold from "../../Components/Product/mostSold";

export default class ChangeProduct extends Component {

    render() {
        return(
            <Fragment>
                <div className="cls-mostSold">
                    <MostSold data={{name: "Lets Shop", id: "all"}}/>
                </div>

                <div className="cls-promotion">
                    <Promotion/>
                </div>
            </Fragment>
        )
    }
}
