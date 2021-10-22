import React, {useState, useEffect} from 'react';
import { Button } from '../../components/Button/Button';
import { Table } from '../../components/Table/Table';
import { useHistory } from "react-router-dom";

const EntityList = props => {
    const[entities, setEntities] = useState([]);
    
    const history = useHistory();
    const currentPath = history.location.pathname;

    useEffect(() => {
        const init = async () => {
            const response = await props.getEntities();

            setEntities(response.data);
        };
        
        init();
    }, [props]);

    const addEntityHandler = () => {
        history.push(currentPath + "/add");
    };

    return (
        <div className="container">
            <h2 className="text-center">{props.entityName + "s"}</h2>

            <Button className="btn btn-primary" onClick={addEntityHandler} title={"Add " + props.entityName} />

            <div className="row">
                {
                    entities.length !== 0 ? <Table entities={entities} editEntityPath={currentPath + "/edit"} /> : <h3>Empty</h3>
                }
            </div>

        </div>
    )

}

export default EntityList;