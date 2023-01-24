import { Container, Typography } from '@mui/material'
import React from 'react'

const Workspace = () => {

    const user = JSON.parse(localStorage.getItem("profile")).result;

  return (
    <Container>
        <Typography variant='h3'>Welcome {user.name.split(" ")[0]} </Typography>

    </Container>
  )
}

export default Workspace