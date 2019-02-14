import React, { Component } from 'react';

export class CustomInput extends Component {

    render() {
        const { meta: { error, touched }, input, type, placeholder } = this.props

        let className = ''
        if (error && error.length > 0 && touched) {
            className += 'error'
        }

        return (
            <div>
                <input type={type} className={className} placeholder={placeholder} {...input} />
                { touched && error && <p className="error">{error}</p> }
            </div>
        );
    }
}