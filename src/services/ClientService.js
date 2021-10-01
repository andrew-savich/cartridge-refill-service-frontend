import axios from 'axios';

const CLIENT_API_BASE_URL = "http://localhost:8080/client";

class ClientService {
    getClients() {
        return axios.get(CLIENT_API_BASE_URL + '/all');
    };

    getClientById(clientId){
        return axios.get(CLIENT_API_BASE_URL + '/get/' + clientId);
    };

    createClient(client){
        return axios.post(CLIENT_API_BASE_URL + '/create', client);
    };


    updateClient(client, clientId){
        return axios.put(CLIENT_API_BASE_URL + '/update/' + clientId, client);
    };

    deleteClient(clientId){
        return axios.delete(CLIENT_API_BASE_URL + '/delete/' + clientId);
    }
}

export default new ClientService();