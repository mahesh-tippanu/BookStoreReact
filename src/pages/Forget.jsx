import { InputAdornment, TextField } from '@mui/material'
import React, { Component } from 'react'
import { Button } from '@mui/material'
import { Link, useParams ,withRouter} from 'react-router-dom'
import './components/Forget.css';
//import { ResetPasswordService } from '../../Services/UserService'
// import { IconButton, Snackbar } from '@mui/material'
import { IconButton,Snackbar } from '@mui/material'


 class ForgetPassword extends Component {

    constructor(props) {
      super(props)
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
       // this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        //this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.state = {
          passwordError: "",
          conformPasswordError:"",
          password : "",
          confirmPassword :"",
          showPassword :false
        }
      }


      SnackbarClose() {
        this.setState(
          {
            SnackbarOpen: false
          }
        )
      }

      passwordHandler =  (event)=>{

        let id =  event.target.id;
          if(id==="password_id"){
          
          let password =  event.target.value;

          let regexpassword =   new RegExp('[^\\@\\$\\%\\&\\*][0-9 A-Z a-z]+');
          if(!regexpassword.test(password)){
            this.setState(
              {
                passwordError : "password is incorrect"
              }
          ) 
          }
          else{
            this.setState(
                {
                    password :event.target.value,
                    passwordError : ""
                }
            )
              }
      }
else if(id==="conform_Password_id"){
  let password =  event.target.value;

          let regexpassword =   new RegExp('[^\\@\\$\\%\\&\\*][0-9 A-Z a-z]+');
          if(!regexpassword.test(password)){
            this.setState(
              {
                conformPasswordError : "password is incorrect"
              }
          ) 
          }
          else{
            this.setState(
                {
                  confirmPassword :event.target.value,
                  conformPasswordError : ""
                }
            )
              }

}

    }

      handleClickShowPassword = () => {
        console.log("hello world");

          let passwordstate = this.state.showPassword;
        this.setState({
          showPassword: !passwordstate
        })
      }

       handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
 submitHandler = async ()=>{
    let fundooPassword = this.state.password;
    let fundoConfirmPassword = this.state.confirmPassword;

    if(fundooPassword!= fundoConfirmPassword){
      this.setState({
        SnackbarOpen : true,
        SnackbarMessage : "password and confirm password not match"
      })
        return;
    }
    else{
  let data = {
    newPassword :this.state.password
    }

//  let token = this.props.match.params.id;
// console.log(token);
//    await ResetPasswordService(data,token).then((res)=>{
//     let message
//       console.log('res',res);
//       if(res.status == 204){
//        message = "Request was successful"
//       this.props.history.push('/');
//       }
//       this.setState({
//         SnackbarOpen : true,
//         SnackbarMessage : message
//       })
//    })
//    .catch((error) =>{
//     console.log(error);
//     this.setState({
//       SnackbarOpen : true,
//       SnackbarMessage : error.message
//     })
//   });
}
}

    render() {
      
   // console.log(this.props.match.params.id);
        return (
            <div className="mainContent">
                <div className="topContent"></div>
                    <div className="subContent">
                        <div className="leftContent"></div>
                        <div className="centerContent">
                            <div className="outerBroder">
                                <div className="form">
                                    <div className="Hearder"><h2>BookStore</h2></div>
                                    <div className="paragraphContent">
                                    <h4 id="new_pass">Create New Password</h4>
                                    </div>
                                    {/* <div className="subParagraphContent">
                                        Enter New Password
                                    </div> */}
                                    <div className="PasswordContent">
                                      
                                    {/* <div className='onclicks' onClick={this.handleClickShowPassword}><i id='eye_icon' className="fa fa-eye" ></i></div> */}
                                    <TextField  type={this.state.showPassword ? 'text' : 'password'} id="password_id" variant="standard" placeholder='password' onChange={this.passwordHandler} helperText={this.state.passwordError} fullWidth required
                                   />

                                    </div>
                                    <div className="Conform_password">
                                    <TextField  type="password" id="conform_Password_id" variant="standard" placeholder='conform password' onChange={this.passwordHandler} helperText={this.state.conformPasswordError} fullWidth required/>
                                    </div>
                                    <div className="bottomContent">
                                    <Button className="txtbtn" onClick={() =>this.submitHandler()} variant="contained">submit</Button>
                                    </div>
                                    <div className="BackButton">
                                    <Link to="/">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rightContent"></div>
                        <Snackbar 
            anchorOrigin={{vertical : 'bottom',horizontal :"left"}} 
             open ={this.state.SnackbarOpen} autoHideDuration={3000} 
             message ={<span id="message-id">{this.state.SnackbarMessage}</span>}
            action={[
               <IconButton key="close"  color ="inherit"  onClick={() =>this.SnackbarClose()} aria-label='Close' > X </IconButton>

             ]
             }
            />
                    </div>
               
            </div>
    
        )
      }
}


export default  ForgetPassword;