import React from 'react';
import styles from './Validation.module.css'


function isInvalid(){

}

export const Input = props => {
    const inputType = props.type || "text";
    const htmlFor = `${inputType}-${Math.random()}`;
    const classes = "form-control";

    // if(isInvalid(props)){
    //     classes += " "
    // }

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
            <span className={styles.invalid}>{props.errorMessage}</span>
        </div>
    )
}