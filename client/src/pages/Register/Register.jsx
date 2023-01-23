import React, {useState} from 'react'
import { Container,  Grid, Typography } from '@mui/material'
import useStyles from "./styles.js";
import { Input } from '../../components';
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import { signup } from '../../actions/auth.js';
import { Button } from '@material-ui/core';

const initialState = {firstName: "", lastName: "", email:"", password:"", confirmPassword: "" } ;
const Register = () => {
    const classes = useStyles(); 

    const dispatch =  useDispatch();
    const history = useHistory(); 
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  
    const [formData, setFormData] = useState(initialState);
    const handleSubmit = (e)=> {
      e.preventDefault();
      console.log(formData);
      dispatch(signup(formData, history));
    };

    const handleChange  = (e)=> {
      setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handlePasswordShow  = ()=>  setShowPassword(! showPassword);
    const handleConfirmPasswordShow  = ()=>  setShowConfirmPassword(! showConfirmPassword);

  
  
   
  
  return (
    <Container className={classes.container} >  
        <img className={classes.img} src={require("../../assets/female01.svg")} />

        <div>
            
            <Typography variant='h3' >Register Now</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2} maxWidth={500}>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                    <Input name="email" label="Email Address" handleChange={handleChange}  type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange}  type={showPassword?"text": "password"} handlePasswordShow= {handlePasswordShow} />
                    <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange}  type={showConfirmPassword?"text": "password"} handlePasswordShow= {handleConfirmPasswordShow} />
                </Grid>  

                <Button type="submit" fullWidth variant="contained" color="primary" className= {classes.submit}>Register</Button>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Button > Don't have an account? Sign up</Button>
                    </Grid>
                </Grid>
            
            </form>
        </div>

           
    </Container>
  )
}

export default Register