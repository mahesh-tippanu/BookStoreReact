import React, { useState, useEffect } from "react";
import { useNavigate,useParams, Link } from "react-router-dom";
import UserService from '../services/UserService';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import CardContent from '@mui/material';
import ForgetPassword from "./Forget";
import './Login.css';


const Login= (props) => {
  const navigate = useNavigate();
  let initialValue = {
    password: "",
    emailId: "",
    error: {
      password: "",
      emailId: "",
    },
  };
  const [formValue, setForm] = useState(initialValue);

  const setData = (obj) => {
    console.log();
    setForm({
      ...formValue,
      ...obj,

      password: obj.password,
      emailId: obj.emailId,
    });
    console.log(formValue);
  };

  const changeValue = (event) => {
    setForm({ ...formValue, [event.target.name]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault();

    let object = {
      password: formValue.password,
      emailId: formValue.emailId,
    };
       console.log(object);
      UserService.userLogin(object)
      .then((response) => {
        console.log(response);
        localStorage.setItem("Token",response.data.data)
        alert("Login Successfully", response);
        navigate("/home")
      })
      .catch((error) => {
        console.log(error);
        alert("User Not Login!!");
      });
  };

  
  const reset = () => {
    setForm({
      ...initialValue,
      id: formValue.id,
      isUpdate: formValue.isUpdate,
    });
  };

  return (
   
     <div align = "center" className="form-content"> 
    <Card sx={{ minWidth: 800 }}>
    <form action="#" className="form" onSubmit={login} onReset={reset} align="center" >
     <div className='content'>
      <div className='content-box'>
      <TextField sx={{ width: 300 }} id="filled-basic" label="EmailID" variant="filled"  name="emailId"
       value={formValue.emailId} onChange={changeValue}/>
      </div>
      <div className='content-box'>
      <TextField sx={{ width: 300 }} id="filled-basic" label="Password" type="password" variant="filled"  name='password'
       value={formValue.password} onChange={changeValue} />
      </div>
      <div className='button'>
      <Button sx={{ width: 150 }} variant="contained" color="success" onClick={login}>Sign In</Button>
      <div className="link">
      <Link to="/register" className="link">
           {" "}
             New User? Click Here {" "}
           </Link>
         </div> 
         <div className="link">
      <Link to="/Forget" className="link">
           {" "}
             Forget Password? Click Here {" "}
           </Link>
         </div> 
         {/* <div>
          <Link href='/'>Sign Up</Link>
      </div> */}
      </div> 
   </div>
    </form>
    </Card>
    </div>
  )
} 
export default Login;