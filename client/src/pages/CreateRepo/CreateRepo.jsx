import { Alert, AlertTitle, Button, Container,  Paper, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import React, {useState} from 'react';
import useStyles from "./styles.js";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createRepo } from '../../actions/repos.js';
import { CLEAR_ERROR } from '../../constants/actionTypes.js';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const CreateRepo = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const initialState = {repoURL: "", sharedPass: "", creator: JSON.parse(localStorage.getItem("profile")).result};
  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e)=> {
    e.preventDefault();
    dispatch(createRepo(formData, history));
  }

  const  {errorMessage, error}  = useSelector((state) => state.repos);

  return (
    <Container className={classes.container}>
      <Typography variant='h3'>Create Repository</Typography>
      {error && errorMessage && (
        <>
          <Alert
          severity="error"
          onClose={() => {
              dispatch({ type: CLEAR_ERROR });
          }}
          >
          <AlertTitle>Error</AlertTitle>
          {errorMessage} — <strong>Try again</strong>
          </Alert>
          <br/>
        </>
      )}

      <Paper className={classes.page} elevation={3}>
        <form className={classes.form} >
          <TextField onChange={handleChange} name='repoURL' required label="Repository URL" variant='outlined' fullWidth></TextField>
          <br/>
          
          <TextField 
          
            InputProps={{
            endAdornment: (
                <InputAdornment position='end'>
                    <IconButton onClick={()=>setShow(!show)} >
                        {!show ?  <Visibility/> :<VisibilityOff/>  }
                    </IconButton>
                </InputAdornment>
            )
            }}
            type={show?"text": "password"} onChange={handleChange} name='sharedPass' required label="Shared Pass" variant='outlined' fullWidth></TextField>
          <br/>
        
          <Button type='submit' variant='contained' onClick={handleSubmit}>Create Repo</Button>
        </form>
      </Paper>
    </Container>
  )
}

export default CreateRepo