import React from 'react';

export const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`;

    return(
        <div className="form-group">
            <label htmlFor={htmlFor}>{props.label}</label>

            <select htmlFor={htmlFor} className="form-select mb-2" value={props.defaultValue} onChange={props.onChange} >

                {
                    props.items.map((item, index) => (
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