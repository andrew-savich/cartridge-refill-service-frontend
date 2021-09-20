import React from 'react';
import styles from './Validation.module.css'


function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched;
}

export const Input = props => {
    const inputType = props.type || "text";
    const htmlFor = `${inputType}-${Math.random()}`;
    const classes = "form-control";

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
                    ? <span className={styles.invalid}> {props.errorMessage || 'Default error message'} </span>
                    : null
            }

        </div>
    )
}