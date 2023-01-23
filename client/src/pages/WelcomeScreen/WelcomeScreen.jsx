import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import useStyles from "./styles.js";

const WelcomeScreen = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} >
      <div >
        <Typography variant='h2'>Welcome to ExDev</Typography>
        <Typography color="secondary" className={classes.subtitle}  ><i> Get help from the best experts</i> </Typography>
        <div className={classes.buttons}>
          <Button className={classes.button}  variant='contained' >Register</Button>
          <Button className={classes.button} variant='outlined'>Log In</Button>

        </div>
      </div>
      <img className={classes.img} src={require("../../assets/male01.svg")} />

    </Container>
  )
}

export default WelcomeScreen