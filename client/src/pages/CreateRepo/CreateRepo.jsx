import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React, {useState} from 'react';
import useStyles from "./styles.js";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createRepo } from '../../actions/repos.js';

const CreateRepo = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const initialState = {repoURL: "", creator: JSON.parse(localStorage.getItem("profile")).result._id};
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e)=> {
    e.preventDefault();

    dispatch(createRepo(formData, history));

  }


  return (
    <Container className={classes.container}>
      <Typography variant='h3'>Create Repository</Typography>
      <Paper className={classes.page} elevation={3}>
        <form className={classes.form} >
          <TextField onChange={handleChange} name='repoURL' required label="Repository URL" variant='outlined' fullWidth></TextField>
          <Typography> Other options</Typography>
          <Button type='submit' variant='contained' onClick={handleSubmit}>Create Repo</Button>
        </form>
      </Paper>
      <Typography>TODO: private repo ise muhtemelen github token vs isteyebiliriz</Typography>
    </Container>
  )
}

export default CreateRepo