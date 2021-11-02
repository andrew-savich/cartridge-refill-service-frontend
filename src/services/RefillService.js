import axios from 'axios';

const REFILL_API_BASE_URL = "http://localhost:8080/refill";

class RefillService {
    getRefills() {
        return axios.get(REFILL_API_BASE_URL + '/all');
    };

    getRefillById(refillId){
        return axios.get(REFILL_API_BASE_URL + '/get/' + refillId);
    };

    createRefill(refill){
        return axios.post(REFILL_API_BASE_URL + '/create', refill);
    };


    updateRefill(refill, refillId){
        return axios.put(REFILL_API_BASE_URL + '/update/' + refillId, refill);
    };

    deleteRefill(refillId){
        return axios.delete(REFILL_API_BASE_URL + '/delete/' + refillId);
    }
}

export default new RefillService();