import axios from 'axios';

const CARTRIDGE_API_BASE_URL = "http://localhost:8080/cartridge";

class CartridgeService {
    getCartridges() {
        return axios.get(CARTRIDGE_API_BASE_URL + '/all');
    };

    getCartridgeById(cartridgeId){
        return axios.get(CARTRIDGE_API_BASE_URL + '/get/' + cartridgeId);
    };

    createCartridge(cartridge){
        return axios.post(CARTRIDGE_API_BASE_URL + '/create', cartridge);
    };


    updateCartridge(cartridge, cartridgeId){
        return axios.put(CARTRIDGE_API_BASE_URL + '/update/' + cartridgeId, cartridge);
    };

    deleteCartridge(cartridgeId){
        return axios.delete(CARTRIDGE_API_BASE_URL + '/delete/' + cartridgeId);
    };

    getCartridgeByUniqueIdentify(uniqueIdentify){
        return axios.get(CARTRIDGE_API_BASE_URL + '/getByUniqueIdentofy/' + uniqueIdentify);
    };
}

export default new CartridgeService();