import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import "../pages/Order.css";
  import CartService from "../services/CartService";
  import Header from "../pages/Header";
  import { Link,NavLink } from "react-router-dom";
   
  
  function AddToCart() {
    const [bagDetails, setBagDetails] = useState([]);
    const [totalOrderPrice, setTotal] = useState([]);
    
  
    useEffect(() => {
      fetchCartDetails();
    },[]);
  
    const fetchCartDetails = () => {
      CartService.getAll(1).then((response) => {
        console.log(response.data.data);
        setBagDetails(response.data.data);
        console.log(bagDetails);
        setTotalPrice();
      });
    };
  
    const updateQuantity = (e, cartId) => {
      let quantity = e.target.value;
      let totalPrice = e.target.value;
      CartService.updateCartQuantity(cartId, quantity, totalPrice).then(
        (response) => {
          console.log(response.data.data);
        }
      );
    };
  
      const setTotalPrice  =() => {
        let subTotal = bagDetails.map((book,index) => {
         return book.totalPrice;
       })
       console.log(subTotal);
       setTotal( subTotal.reduce((a,b) => a+b ))
       console.log(totalOrderPrice);
     }

    return (
      <div>
        <Header />
        <div className="cart-count_header">
          <span className="cart">Order Summery</span>
          <span className="cart-count">
            {" (" + bagDetails.length + " items)"}
          </span>
        </div>
  
        <div className="cart-container">
          {bagDetails.map((bagItem, i) => {
            return (
              <div key={i}>
                <div className="cart-box">
                  <div className="cart-body">
                    <div className="card-image-container">
                      <img
                        className="card-image"
                        src={bagItem.book.profilePic}
                        alt=""
                      />
                    </div>
  
                    <div className="card-title-author">
                      <h2 className="card-title" >{bagItem.book.bookName}</h2>
                      <span className="card-author">
                        by {bagItem.book.authorName}{" "}
                      </span>
                      <div>
                      <span className="card-price">Price: Rs {bagItem.book.price}</span>
                      </div>
                    </div>
                    <div>
                    <h5>Quantity</h5>
                    <div class="wrapper">
                      {/* <span class="minus" onClick={handleDecrement}>
                        -
                      </span> */}
                      {/* <button class="minus" onClick={ ()=>handleDecrement(bagItem.cartId,bagItem.quantity,bagItem.book.price)}>
                        -
                      </button> */}
                      <span
                        class="num"
                        id="root"
                        onClick={() => updateQuantity(bagItem.book.quantity)}
                      >
                        {bagItem.quantity}
                      </span>
                      {/* <button class="plus" onClick={ ()=>handleIncrement(bagItem.cartId,bagItem.quantity,bagItem.book.price)}>
                        +
                      </button> */}
                    </div>
                    <h4>
                      Total Price <br />
                      {bagItem.totalPrice }
                    </h4>
                    </div>
  
                    {/* <cd bspan className="card-price">Rs {bagItem.book.price}</cd>
  
                    
  
                    <div className="cart_quantity">
                      <label htmlFor="#"> QTY: </label>
                      <input
                        className="quantity_text"
                        type="text"
                        defaultValue={bagDetails[i].quantity}
                        onChange={(e) => updateQuantity(e, bagItem.cartId)}
                      />
                    </div> */}
  
                
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <mat-card class="card2">
        <div class="info">
            <span class=".addr-order-title">Order Summary</span>
            <div className="cart-container">
                   <div className="order-box">

                            <div className='order-body'>

                             <h2> OrderSummary: <br></br></h2>
                             
                                <button onClick={setTotalPrice}>TotalOrderPrice</button>
                                 <label  >  <h3 > SubTotal: </h3> {totalOrderPrice} </label>
                            </div>
                    </div>          
              </div>
        </div>       
     </mat-card>

<NavLink to='/cart' >
        <button
          className="emptyCart-button"
          variant="contained"
          size="small"
          // onClick={() => emptyCart()} 
        >
          Edit Cart
        </button>
        </NavLink>
  
        <div>
          <Link to = '/placeOrder'>
          <button className="placeorder-button" variant="contained" size="small">
            Place Order
          </button>
          </Link>
        </div>
  
        <div class="footer">
          <p>Copyright © 2020, Bookstore Private Limited. All Rights Reserved</p>
        </div>
      </div>
    );
  }
  
  export default AddToCart;
  