import axios from "axios";


class CartService {
  baseUrl = "http://localhost:8099/cart";

  addCartItem(data) {
    return axios.post(`${this.baseUrl}/add`, data);
  }

  getAll(user_Id) {
    return axios.get(`${this.baseUrl}/get/1`);
  }

  getUserById(user_Id) {
    return axios.get(`${this.baseUrl}/search/${user_Id}`);
  }
  deleteCartItem(bookId) {
    return axios.delete(`${this.baseUrl}/remove/${bookId}`);
  }

  
  // updateQuantity(cartId,data) {
  //   return axios.put(`${this.baseUrl}/update/${cartId}`, data);
  // }
  updateQuantity(cartId,quantity,totalPrice) {
    return axios.put(`${this.baseUrl}/update/${cartId}/${quantity}/${totalPrice}`);
  }
  emptyCart(data){
    return axios.delete(`${this.baseUrl}/empty`, data);
    }

}


export default new CartService();
