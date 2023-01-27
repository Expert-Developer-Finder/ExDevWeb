import { Container, Typography } from '@mui/material';
import React from 'react';
import {useSelector} from "react-redux";

const Workspace = () => {

  const  repos  = useSelector((state) => state.repos);
  console.log(repos);
  const user = JSON.parse(localStorage.getItem("profile")).result;

  return (
    <Container>
        <Typography variant='h3'>Welcome {user.name.split(" ")[0]} </Typography>


    </Container>
  )
}

export default Workspace