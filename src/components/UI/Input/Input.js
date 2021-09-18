import React from 'react';

export const Input = props => {
    const inputType = props.type || "text";
    const htmlFor = `${inputType}-${Math.random()}`

    return(
        <div className="form-group">
            <label htmlFor={htmlFor} > {props.label} </label>
            <input
                className="form-control"
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.label}
            />
            <span className="invalid-feedback">{props.errorMessage}</span>
        </div>
    )
}