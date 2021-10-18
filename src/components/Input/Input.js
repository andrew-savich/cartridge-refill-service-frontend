import React from 'react';


function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched;
}

export const Input = props => {
    console.log(props);
    const inputType = props.type || "text";
    const htmlFor = `${inputType}-${Math.random()}`;
    let classes = "form-control ";

    if(isInvalid(props)){
        classes = classes + "is-invalid";
    }

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
            />

            {
                isInvalid(props)
                    ? <span className={"invalid-feedback"}> {props.errorMessage || 'Default error message'} </span>
                    : null
            }

        </div>
    )
}