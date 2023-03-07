import React, {useState} from 'react'
import { Container,  Grid, Typography , Alert, AlertTitle} from '@mui/material'
import useStyles from "./styles.js";
import { Input } from '../../components';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { signup } from '../../actions/auth.js';
import { Button } from '@material-ui/core';
import { LOGOUT } from '../../constants/actionTypes.js';

const initialState = {
  firstName: "", 
  lastName: "", 
  email:"", 
  password:"", 
  confirmPassword: "",
  githubUsername: "",
  githubPAT: ""  
} ;
const Register = () => {
    const classes = useStyles(); 

    const dispatch =  useDispatch();
    const history = useHistory(); 
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  
    const [formData, setFormData] = useState(initialState);
    const handleSubmit = (e)=> {
      e.preventDefault();
      
      console.log("Data being sent (Register.jsx):");
      console.log(formData);
      dispatch(signup(formData, history));

    };

    const handleChange  = (e)=> {
      setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handlePasswordShow  = ()=>  setShowPassword(! showPassword);
    const handleConfirmPasswordShow  = ()=>  setShowConfirmPassword(! showConfirmPassword);
    const { authData, error } = useSelector((state) => state.auth);
  
  return (
    <Container className={classes.container} >  
        <img alt="A welcoming woman" className={classes.img} src={require("../../assets/female01.svg")} />

        <div>
            <Typography variant='h3' >Register Now</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2} maxWidth={500}>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                    <Input name="email" label="Email Address" handleChange={handleChange}  type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange}  type={showPassword?"text": "password"} handlePasswordShow= {handlePasswordShow} />
                    <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange}  type={showConfirmPassword?"text": "password"} handlePasswordShow= {handleConfirmPasswordShow} />
                    <Input name="githubUsername" label="GitHub Username" handleChange={handleChange}  type="text" />
                    
                    <Typography className={classes.pat}> 
                      For the section belove, you need to create a Personal Access Token (PAT) from GitHub.
                      The steps on how to create a PAT and the reason why we need it is explained in this file:
                      <a
                        style={{textDecoration: "none", marginLeft:5, fontWeight: "bold"}} 
                        href={require("../../assets/GitHub_PAT_Tutorial.pdf")}  target="_blank">
                        How to get PAT
                      </a>
                    </Typography>
                    <Input name="githubPAT" label="GitHub PAT" handleChange={handleChange}  type="text" />
                </Grid>  

                {error && authData && (
                  <>
                    <Alert
                      severity="error"
                      onClose={() => {
                        dispatch({ type: LOGOUT });
                      }}
                    >
                      <AlertTitle>Error</AlertTitle>
                      {authData} — <strong>Try again</strong>
                    </Alert>
                    <br/>
                  </>
                )}

                <Button type="submit" fullWidth variant="contained" color="primary" className= {classes.submit}>Register</Button>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Button href='login'> Don't have an account? Sign up</Button>
                    </Grid>
                </Grid>
            </form>
        </div>

           
    </Container>
  )
}

export default Register