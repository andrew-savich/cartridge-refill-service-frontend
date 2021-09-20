import React from 'react'

export const Button = props => {
    return(
        <button
            onClick={props.onClick}
            className={props.className}
            disabled={props.disabled}
        >
            {props.title}
        </button>
    )
}