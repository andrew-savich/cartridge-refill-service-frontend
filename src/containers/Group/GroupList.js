import React, {useState, useEffect} from 'react';
import { Button } from '../../components/Button/Button';
import { Table } from '../../components/Table/Table';
import GroupService from '../../services/GroupService'

const GroupList = props => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const init = async () => {
            const response = await GroupService.getGroups();
            setGroups(response.data);
        };
        
        init();
    }, []);


    const addGroupHandler = () => {
        props.history.push('/add-group');
    };


    return (
        <div className="container">
            <h2 className="text-center">Groups</h2>

            <Button className="btn btn-primary" onClick={addGroupHandler} title="Add Group" />

            <div className="row">
                {
                    groups.length !== 0 ? <Table entities={groups} editEntityPath="/edit-group"/> : <h3>Empty</h3>
                }
            </div>

        </div>
    )
}

export default GroupList;