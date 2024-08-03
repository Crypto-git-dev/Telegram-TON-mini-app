import {instance} from '../instance';

class UserEndpointsList {
    async getUser(token) {
        return await instance.get(`/users/${token}`);
    }

    async example(body) {
        return await instance.post(`/example`, body);
    }


}

const UserEndpoints = new UserEndpointsList();
export default UserEndpoints;
