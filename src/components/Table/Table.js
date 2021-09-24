import React from 'react'
import { useHistory } from 'react-router-dom';
import { getColumnNamesFromEntityKeys, camelCaseToNormalWords } from '../../utils/Utills';
import { Button } from '../Button/Button';


export const Table = ({entities}) => {

    const columnNames = getColumnNamesFromEntityKeys(entities[0]);

    const history = useHistory();

    const editEntityHandler = id => {
        history.push(`/edit-employee/${id}`);
    }

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
                                <td>
                                    <Button className="btn btn-primary btn-sm" onClick={ () => editEntityHandler(entity.id) } title="Edit" />
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
            
        </div>
    );
}