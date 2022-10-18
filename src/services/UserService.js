import axios from "axios";
const id=localStorage.getItem('Authorization')
const userId = JSON.parse(id);
const token=localStorage.getItem('Token')
class UserService {
    baseUrl ="http://localhost:8099/user";

    addUser(data) {
        return axios.post(`${this.baseUrl}/register`, data);
      } 
      getAllBooks() {
        return axios.get(`${this.baseUrl}/get`);
      }

      getUserById(user_Id) {
        return axios.get(`${this.baseUrl}/getuser/{user_Id}`,{params:{token: token}});
      }
      getUserEmailId(data) {
        return axios.get(`${this.baseUrl}/user`, data);
      }

    userLogin(data) {
      return axios.post(`${this.baseUrl}/login`,data);
    }

}


export default new UserService();
