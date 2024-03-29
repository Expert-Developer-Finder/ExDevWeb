import { Container, Divider, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import { getOwnedRepos, getJoinedRepos } from '../../actions/repos';
import { JoinedRepos, OwnedRepos , JoinRequests} from '../../components';
import useStyle from "./styles.js";
import Loader from '../../constants/Loader';

const Workspace = () => {
  const classes = useStyle();
  const user = JSON.parse(localStorage.getItem("profile")).result;
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnedRepos(user._id));
    dispatch(getJoinedRepos(user._id));
  }, []);

  
  
  return (
   <>
     { !user ? <Loader/> : 
      <Container className= {classes.container} >
        <Typography variant='h3'>Welcome {user.name.split(" ")[0]} </Typography>
        <Divider className={classes.divider} />
        
        <Typography variant='h4'>Owned Repositories </Typography>
        <OwnedRepos/>
        <Divider className={classes.divider}/>
        
        <Typography variant='h4'>Joined Repositories </Typography>
        <JoinedRepos />
        <Divider className={classes.divider}/>

        <Typography variant='h4'>Join Requests </Typography>
        <JoinRequests/>

    </Container>
    }
   </>
   
  )
}

export default Workspace