import axios from 'axios';

const CLIENT_API_BASE_URL = "http://localhost:8080/client";

class ClientService {
    getClients() {
        return axios.get(CLIENT_API_BASE_URL + '/all');
    };

    getClientById(clientId){
        return axios.get(CLIENT_API_BASE_URL + '/' + clientId);
    };

    createClient(client){
        return axios.post(CLIENT_API_BASE_URL + '/create', client);
    };


    updateClient(client, clientId){
        return axios.put(CLIENT_API_BASE_URL + '/' + clientId, client);
    };
}

export default new ClientService();