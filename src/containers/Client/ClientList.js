import React, {useState, useEffect} from 'react';
import { Button } from '../../components/Button/Button';
import { Table } from '../../components/Table/Table';
import ClientService from '../../services/ClientService';


const ClientList = props => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const init = async () => {
            const response = await ClientService.getClients();
            setClients(response.data);
        };

        init();
    }, []);

    const addClientHandler = () => {
        props.history.push('/add-client');
    };

    return (
        <div className="container">
            <h2 className="text-center">Clients</h2>

            <Button className="btn btn-primary" onClick={addClientHandler} title="Add Client" />

            <div className="row">
                {
                    clients.length !== 0 ? <Table entities={clients} editEntityPath="/edit-client"/> : <h3>Empty</h3>
                }
            </div>

        </div>
    )

}

export default ClientList;