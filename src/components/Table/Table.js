import React from 'react'
import { useHistory } from 'react-router-dom';
import { getColumnNamesFromEntityKeys, camelCaseToNormalWords } from '../../utils/Utills';
import { Button } from '../Button/Button';
import tick from '../../icons/tick.png';


const Table = props => {

    const columnNames = getColumnNamesFromEntityKeys(props.entities[0]);

    const history = useHistory();

    const editEntityHandler = id => {
        history.push(`${props.editEntityPath}/${id}`);
    }

    const isBoolean = value => 'boolean' === typeof value;

    const insertTick = value => {
        if(value){
            return (
                <img src={tick} width="20"/>
            )
        }
    };

    return (
        
        <div className="row">                    
            <table className="table table-striped table-hover table-bordered">
                <thead align="center">
                    <tr>
                        {columnNames.map((column, index) => <th key={column + index}>{camelCaseToNormalWords(column)}</th>)}
                        <th>Action</th>
                    </tr>                    
                </thead>
                <tbody align="center">
                    {   
                        props.entities.map(entity => 
                            <tr key={entity.id}>
                                {Array.from(Object.keys(entity)).map((field, index) =>

                                    
                                        <td key = {Math.random() + index}>{isBoolean(entity[field]) ? insertTick(entity[field]) : entity[field] }</td>
                                        
                                    )}
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

export default Table;