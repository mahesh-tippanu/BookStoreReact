import axios from "axios";

class BookService {
    baseUrl ="http://localhost:8099/book";

    addBook(data) {
        return axios.post(`${this.baseUrl}/add`, data);
      }
    
      getAllBooks() {
        return axios.get(`${this.baseUrl}/get`);
      }

      // getBookById(employeeId) {
      //   return axios.get(`${this.baseUrl}/search/${employeeId}`);
      // }

      updateEmployee(employeeId,data) {
        return axios.put(`${this.baseUrl}/edit/${employeeId}`, data);
      }

      deleteEmployee(employeeId) {
        return axios.delete(`${this.baseUrl}/remove/${employeeId}`);
      }sortByHigher

    // sortByHigher() {
    //   return axios.get(`${this.baseUrl}/get-high`);
    // }
    // sortByLower() {
    //   return axios.get(`${this.baseUrl}/get-low`);
    // }
}


export default new BookService();
