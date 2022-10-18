import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../services/UserService";
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import { Card } from '@mui/material';
import CardContent from '@mui/material';


const Register = (props) => {
  let initialValue = {
    userName: "",
    password: "",
    emailId: "",
    error: {
      userName: "",
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
      // isUpdate:true,
      // id: obj.empId,

      userName: obj.userName,
      password: obj.password,
      emailId: obj.email,
    });
    console.log(formValue);
  };

  const changeValue = (event) => {
    setForm({ ...formValue, [event.target.name]: event.target.value });
  };

  const save = async (event) => {
    event.preventDefault();

    let object = {
      userName: formValue.userName,
      password: formValue.password,
      emailId: formValue.emailId,
    };
    console.log(object);

    UserService.addUser(object)
      .then((response) => {
        console.log(response);
        alert("User registration is Added", response);
      })
      .catch((error) => {
        console.log(error);
        // alert("Not Added User!!");
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
   
   <div align="center">
     <Card sx={{ minWidth: 600}}>
       <form action="#" className="form" onSubmit={save} onReset={reset}>
        <div className="wrapper"><h2>Registration</h2></div>
        <div className='content'>
     <div className='content-box'>
      </div>
      <div className='content-box'>
      <TextField sx={{ width: 300 }} id="filled-basic" label="EmailID" variant="filled" onChange={changeValue} value={formValue.emailId} name="emailId"/>
      </div>
      <div className='content-box'>
      <TextField sx={{ width: 300 }} id="filled-basic" label="UserName" variant="filled" value={formValue.userName} onChange={changeValue}  name="userName"/>
      </div>
      <div className='content-box'>
      <TextField sx={{ width: 300 }} id="filled-basic" label="Password" type="password" variant="filled" onChange={changeValue} value={formValue.password} name="password"/>
      </div>
      <div className='button'>
      <Button sx={{ width: 150 }} variant="contained" color="success" type ="submit" >Sign Up</Button>
      <div>
          <Link to ='/login'>Sign In</Link>
      </div>
      </div>
     </div>
   </form>
   </Card>
    </div>  
  )
}
export default Register;
