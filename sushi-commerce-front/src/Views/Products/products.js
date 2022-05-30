import React from "react"
import {Component, Fragment} from "react";
import './products.css'
import DisplayResearchProducts from "../../Components/DisplayProducts/displayResearchProducts";
export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state= {
                    research : this.props.match.params.research
        }
    }

    render() {
        return(
            <Fragment>
                <DisplayResearchProducts research={this.state.research}/>
            </Fragment>
        )
    }

}
