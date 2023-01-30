import { Container, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getOwnedRepos } from '../../actions/repos';
import { OwnedRepos } from '../../components';

const Workspace = () => {
;
  const user = JSON.parse(localStorage.getItem("profile")).result;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnedRepos(user._id));
  }, []);

  
  
  return (
    <Container>
        <Typography variant='h3'>Welcome {user.name.split(" ")[0]} </Typography>
        <Typography variant='h4'>Owned Repositories </Typography>
        <OwnedRepos />

        <Typography variant='h4'>Joined Repositories </Typography>



    </Container>
  )
}

export default Workspace