import React, { Component, Fragment } from 'react'

class ErrorForm extends Component {
    render() {
        const { error } = this.props
        return (
            <Fragment>
                <p className={"alert alert-danger small"}>{error}</p>
            </Fragment>
        )
    }
}

export default ErrorForm
