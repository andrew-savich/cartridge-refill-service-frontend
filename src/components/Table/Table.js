import React from 'react'

export const Table = ({entities}) => {
    console.log('entities: ', entities);
    const cellNames = Array.from(Object.keys(entities[0]));
    
    return (
        
        <div className="row">                    
            <table className="table table-striped table-hover ">
                <thead>
                    <tr>
                        {cellNames.map((cell, index) => <th key={cell + index}>{cell}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        entities.map(entity => 
                            <tr key={entity.id}>
                                {Array.from(Object.keys(entity)).map((field, index) => <td key = {entity[field] + index}>{entity[field]}</td>)}
                            </tr>
                        )
                    }

                </tbody>
            </table>
            
        </div>
    );
}