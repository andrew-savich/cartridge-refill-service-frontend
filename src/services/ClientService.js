import axios from 'axios';

const CLIENT_API_BASE_URL = "http://localhost:8080/client";

class ClientService {
    getClients() {
        return axios.get(CLIENT_API_BASE_URL + '/all');
    }
}

export default new ClientService();