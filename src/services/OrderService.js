import axios from "axios";

class OrderService {

    baseUrl = "http://localhost:8099/order";
  
    addOrderedItems(data) {
      return axios.post(`${this.baseUrl}/add`, data);
    }
  
    getAll() {
      return axios.get(`${this.baseUrl}/get`);
    }
  
    getUserById() {
      return axios.get(`${this.baseUrl}/get`);
    }
  
    //   updateEmployee(employeeId,data) {
    //     return axios.put(`${this.baseUrl}/edit/${employeeId}`, data);
    //   }
    // deleteCartItem(bookId) {
    //       return axios.put(`${this.baseUrl}/delete/${bookId}`, {params:{token: token}});
    //     }
  
    deleteCartItem(bookId) {
      return axios.delete(`${this.baseUrl}/remove/${bookId}`);
    }
  
  }
  
  
  export default new OrderService();
  