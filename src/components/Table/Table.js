import React from 'react'
import { getColumnNamesFromEntityKeys, camelCaseToNormalWords } from '../../utils/Utills';

export const Table = ({entities}) => {
    console.log('creating table with entities: ', entities);

    const columnNames = getColumnNamesFromEntityKeys(entities[0]);
    
    return (
        
        <div className="row">                    
            <table className="table table-striped table-hover ">
                <thead>
                    <tr>
                        {columnNames.map((column, index) => <th key={column + index}>{camelCaseToNormalWords(column)}</th>)}
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