import React from 'react';


function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched;
}

export const Input = props => {
    const inputType = props.type || "text";
    const htmlFor = `${inputType}-${Math.random()}`;
    let classes = "form-control ";

    if(isInvalid(props)){
        classes = classes + "is-invalid";
    }

    const renderTextInput = () => {
        return(
            <div className="form-group my-2">
                <label htmlFor={htmlFor} > {props.label} </label>
                <input
                    className={classes}
                    type={inputType}
                    id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.label}
                    disabled={props.disabled}
                />
                {
                isInvalid(props)
                    ? <span className={"invalid-feedback"}> {props.errorMessage || 'Default error message'} </span>
                    : null
                }
            </div>
        )
    };

    const renderCheckboxInput = () => {
        
        return(
            <div className={`"form-check" + ${props.inline ? " form-check-inline" : ""}`}>
                <input
                    className="form-check-input"
                    type={inputType}
                    value={props.value}
                    id={htmlFor}
                    onChange={props.onChange}
                />
                <label className="form-check-label" htmlFor={htmlFor}> {props.label} </label>
            </div>
        )
    };

    return(
        
         inputType === "checkbox" ? renderCheckboxInput() : renderTextInput()
        
    )
}