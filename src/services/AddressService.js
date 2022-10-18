import axios from 'axios';

class AddressService{

    baseUrl = "http://localhost:8080/address";

    addAddress(data){
        return axios.post(`${this.baseUrl}/add`,data);
    }

    

}

export default new AddressService();