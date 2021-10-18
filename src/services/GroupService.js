import axios from 'axios';

const GROUP_API_BASE_URL = "http://localhost:8080/group";

class GroupService {
    getGroups() {
        return axios.get(GROUP_API_BASE_URL + '/all');
    };

    getGroupById(groupId){
        return axios.get(GROUP_API_BASE_URL + '/get/' + groupId);
    };

    createGroup(group){
        return axios.post(GROUP_API_BASE_URL + '/create', group);
    };

    updateGroup(group, groupId){
        return axios.put(GROUP_API_BASE_URL + '/update/' + groupId, group);
    };

    deleteGroup(groupId){
        return axios.delete(GROUP_API_BASE_URL + '/delete/' + groupId);
    }
}

export default new GroupService();