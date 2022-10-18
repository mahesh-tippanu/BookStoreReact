import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Grid,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import "../pages/Cart.css";
  
  import CartService from "../services/CartService";
  import Header from "./Header";
  import { Link } from "react-router-dom";
  import { useParams, useNavigate, NavLink } from 'react-router-dom';
  import AddressService from "../services/AddressService";
  function AddToCart(props) {
    // const AddressForm = (props) => {
      let initialValue = {
          name: '',
          pincode: '',
          address: '',
          city: '',
          locality: '',
          landmark: '',
          id: '',
          isUpdate: false,
          error: {
              name: '',
              pincode: '',
              address: '',
              locality: '',
              city: '',
              landmark: '',
          }
      }
   
    const [bagDetails, setBagDetails] = useState([]);
  
    useEffect(() => {
      fetchCartDetails();
    },[]);
  
    const fetchCartDetails = () => {
      CartService.getAll(1).then((response) => {
        console.log(response.data.data);
        setBagDetails(response.data.data);
        console.log(bagDetails);
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
  
    const removeItemFromCart = (cartId) => {
      CartService.deleteCartItem(cartId).then((response) => {
        console.log(response.data.data);
      });
    };
  
    const [qty, setQty] = useState(0);
    const handleDecrement = (cartId,quantity,price)=> {
      console.log(cartId,quantity,price);
      let qty = quantity-1;
      let totalPrice = price*qty;
      console.log(cartId,qty,totalPrice);
      CartService.updateQuantity(cartId,qty,totalPrice).then((response) =>{
        console.log(response.data.data);
        setBagDetails(response.data.data);
        window.location.reload();
      });
    }
    const handleIncrement =(cartId,quantity,price)=> {
      console.log(cartId,quantity,price);
      let qty = quantity+1;
      let totalPrice = price*qty;
      console.log(cartId,qty,totalPrice);
      CartService.updateQuantity(cartId,qty,totalPrice).then((response) =>{
        console.log(response.data.data);
        setBagDetails(response.data.data);
        window.location.reload();
      });
    }
    
   
      const [formValue, setForm] = useState(initialValue);
      const params = useParams();
      
  
        const setData = (obj) => {
           setForm({
             ...formValue,
             ...obj,
             id: obj.personId,
             name: obj.name,
             pincode: obj.pincode,
             address: obj.address,
             locality: obj.locality,
             city: obj.city,
             landmark: obj.landmark,
           });
         };
         const changeValue = (event) => {
          setForm({ ...formValue, [event.target.name]: event.target.value })
  
      }
      let navigate = useNavigate();
      const save = async (event) => {
          event.preventDefault();
          
          let object = {
  
              name: formValue.name,
              pincode: formValue.pincode,
              address: formValue.address,
              city: formValue.city,
              locality: formValue.locality,
              landmark: formValue.landmark,
              userId:1,
            };
            AddressService
            .addAddress(object)
            .then((response) => {
              console.log(response);
              alert("Data Added successfully!!",response)
              navigate('/order');
              // props.history.push("");
            })
            .catch(error => {
              console.log(error);
                alert.error("WARNING!! Error while adding the data!");
            })
               
     }
     const reset = () => {
      setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
      } 

  
      const emptyCart = () => {
      CartService.emptyCart().then((response) => {
        console.log(response.data.data);
        fetchCartDetails();
      });
      };
  


    return (
      <div>
      <div>
        <Header />
        <div className="cart-count_header">
          <span className="cart">My Cart</span>
          <span className="cart-count">
            {" (" + bagDetails.length + " items)"}
          </span>
        </div>
  
        <div className="cart-container">
          {bagDetails.map((bagItem, i) => {
            return (
              <div key={i}>
                {/* <div className="cart-box"> */}
                  <div className="cart-body">
                    <div className="card-image-container">
                      <img
                        className="card-image"
                        src={bagItem.book.profilePic}
                        alt=""
                      />
                    
  
                    <div className="card-title-author">
                      <h2 className="card-title" >{bagItem.book.bookName}</h2>
                      <span className="card-author">
                        by {bagItem.book.authorName}{" "}
                      </span>
                      <div>
                      
                      <span className="card-price">Price: Rs {bagItem.book.price}</span>
                      </div>
                    </div>
                    </div>
                    <div>
                  

                    <div class="wrapper"> 
                      {/* <span class="minus" onClick={handleDecrement}>
                        -
                      </span> */}
                      <button class="minus" onClick={ ()=>handleDecrement(bagItem.cartId,bagItem.quantity,bagItem.book.price)}>
                        -
                      </button>
                      <span
                        class="num"
                        id="root"
                        onClick={() => updateQuantity(bagItem.book.quantity)}
                      >
                        {bagItem.quantity}
                      </span>
                      <button class="plus" onClick={ ()=>handleIncrement(bagItem.cartId,bagItem.quantity,bagItem.book.price)}>
                        +
                      </button>
                     
                    
          
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => removeItemFromCart(bagItem.cartId)}
                      >
                        remove
                      </Button>
                      <div className="placeorder">
                      <Button
                        variant="contained"
                      >
                        placeorder
                      </Button>
                      </div>
                    
                      




                    {/* <h4>
                 
                    
                      Total Price <br />
                      {bagItem.totalPrice }
                    </h4> */}
                     
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
  
                    {/* <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => removeItemFromCart(bagItem.cartId)}
                      >
                        remove
                      </Button>
                    </CardActions> */}
                  </div>
                {/* </div> */}
              </div>
                
            );
           
          })}
         
        </div>
  
      
  
        <div>
       
        
          {/* <button
            className="emptyCart-button"
            variant="contained"
            size="small"
            onClick={() => emptyCart()} 
          >
            Empty Cart
          </button> */}
    
          {/* <Link to = '/addressForm'>
          <button className="placeorder-button" variant="contained" size="small">
            Continue
          </button>
          </Link> */}
        </div>
  
         
        </div>
        <div style={{ padding: 30 }} >
        <Grid container spacing={10} justify="center">
            .....
        </Grid>
    </div>
        <div>
        {/* <div className="address-container"> */}
         {/* <div className="address-body">  */}
          <div className="addresscontainer">
          {/* <Header /> */}
         
      <div className="form-content">
    <form className="form"  action="#" onReset={reset} onSubmit={save}>
        {/* <div className="form-head-content">
            <div className="form-head">Shopping Cart Address
            </div>
            <div className="form-logo-content">
            </div>
            
        </div> */}
        <div>
       <center><h2>Shopping Cart Address</h2></center>
            </div>
        <div className="row-content">

            {/* name */}

            <label className="label text" htmlFor="name">  Name  </label>
            <input
                className="input"
                type="text"
                name="name"
                id="fistName"
                value={formValue.name} 
                onChange={changeValue}
                placeholder="Your name.." 
                required
            />
            <error-output className="name-error" htmlFor="text" />
        </div>
        

       <div className="row-content">
       {/* Landmark */}

      <label className="label text" htmlFor="pincode">  Landmark </label>
       <input
       className="input"
       type="text"
       name="landmark"
       id="landmark"
       value={formValue.landmark} 
       onChange={changeValue}
       placeholder="Your Landmark" 
       required
      />
     <error-output className="name-error" htmlFor="text" />
     </div>

       
    

        {/* ADDRESS */}

        <div className="row-content">
            <label className="label text" htmlFor="address"> Address </label>
            <textarea
                className="input"
                id="address"
                name="address"
                value={formValue.address} 
                onChange={changeValue}
                style={{ height: "100px" }}
                />

        </div>

        {/* CITY */}

        <div className="row-content-exp">
            <div className="oneRow-content">
                <label className="label text" htmlFor="city"> City  </label>
                <select
                    className="select-input"
                    id="city"
                    name="city"
                    typeof="text"
                    value={formValue.city}
                    onChange={changeValue}
                    required
                >
                    <option value selected disabled hidden> Select City </option>
                    <option value="Allahabad">Allahabad</option>
                    <option value="Amritsar">Amritsar</option>
                    <option value="Bhubneswa">Bhubneswar</option>
                    <option value="Cuttack">Cuttack</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Mumbai">Navi Mumbai</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Patna">Patna</option>
                    <option value="Ranchi">Ranchi</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Vaishali">Vaishali</option>
                    <option value="Ramgarh">Ramgarh</option>
                    <option value="Hajipur">Hajipur</option>
                </select>
            </div>

            {/* locality */}

            <div className="oneRow-content">
                <label className="label text" htmlFor="locality"> Locality </label>
                <select
                    className="select-input"
                    id="locality"
                    name="locality"
                    value={formValue.locality}
                    onChange={changeValue}
                    required
                >
                    <option value selected disabled hidden> Select locality </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands"> Andaman and Nicobar Islands </option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli"> Dadar and Nagar Haveli </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                </select>
            </div>

            {/* Pincode*/}

            <div className="oneRow-content">
                <label className="label text" htmlFor="landmark"> Pincode </label>
                <input
                    className="input"
                    type="text"
                    name="pincode"
                    id="pincode"
                    value={formValue.pincode}
                    onChange={changeValue}
                    required
                />
            </div>
        </div>

        
        {/* BUTTONS */}

        <div className="add-reset">
          
            <NavLink to = '/cart' ><button type="reset"  className="resetButton button">Back </button> </NavLink>
            <button  type="submit" className="button addButton" id="submitButton">Submit   </button> 
      
        </div>
        
    </form>
    {/* </div> */}
    </div>
    <div class="footer">
          <p>Copyright © 2020, Bookstore Private Limited. All Rights Reserved</p>
        </div>
</div>
          </div>
        </div>

        
    // </div>

   
    );
  }
  

export default AddToCart;
