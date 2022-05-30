import React, { Component, Fragment } from 'react'
import './errorFormLittle.css';

class ErrorFormLittle extends Component {
    render() {
        const { error } = this.props
        return (
            <Fragment>
                <p className={"error"}>{error}</p>
            </Fragment>
        )
    }
}

export default ErrorFormLittle
