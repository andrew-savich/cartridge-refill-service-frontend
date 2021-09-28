import React from 'react';

export const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`;

    return(
        <div className="form-group my-2">
            <label htmlFor={htmlFor}>{props.label}</label>

            <select id={htmlFor} className="form-select" value={props.defaultValue} onChange={props.onChange} >

                {
                    props.items && props.items.map((item, index) => (
                        <option
                            key={item + index}
                            value={item.value}
                        >
                            {item}
                        </option>
                    ))
                }

            </select>

        </div>
    )
}