import axios from 'axios';

const MODEL_API_BASE_URL = "http://localhost:8080/model";

class ModelService {
    getModels() {
        return axios.get(MODEL_API_BASE_URL + '/all');
    };

    getModelById(modelId){
        return axios.get(MODEL_API_BASE_URL + '/get/' + modelId);
    };

    createModel(model){
        return axios.post(MODEL_API_BASE_URL + '/create', model);
    };

    updateModel(model, modelId){
        return axios.put(MODEL_API_BASE_URL + '/update/' + modelId, model);
    };

    deleteModel(modelId){
        return axios.delete(MODEL_API_BASE_URL + '/delete/' + modelId);
    }

    getModelColors(){
        return axios.get(MODEL_API_BASE_URL + '/colors');
    }

    getModelTypes(){
        return axios.get(MODEL_API_BASE_URL + '/types');
    }
}

export default new ModelService();