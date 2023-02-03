import { Container, Divider, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import { getOwnedRepos, getJoinedRepos } from '../../actions/repos';
import { JoinedRepos, OwnedRepos } from '../../components';
import useStyle from "./styles.js";

const Workspace = () => {
  const classes = useStyle();
  const user = JSON.parse(localStorage.getItem("profile")).result;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnedRepos(user._id));
    dispatch(getJoinedRepos(user._id));
  }, []);

  
  
  return (
    <Container className= {classes.container} >
        <Typography variant='h3'>Welcome {user.name.split(" ")[0]} </Typography>
        <Divider className={classes.divider} />
        
        <Typography variant='h4'>Owned Repositories </Typography>
        <OwnedRepos/>
        <Divider className={classes.divider}/>
        
        <Typography variant='h4'>Joined Repositories </Typography>
        <JoinedRepos />



    </Container>
  )
}

export default Workspace