import React from 'react'
import useStyle from "./styles";
import { Typography } from '@mui/material';
import { Avatar } from '@material-ui/core';

const UserItem = ({ name, ppUrl, text , rate , createdAt }) => {
    const classes = useStyle();
    const formatDate = () => {
      const date = new Date(createdAt);
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 

      };
      return date.toLocaleString('en-US', options);
    }

  return (
    <div className={classes.userItem}>
      <div className={classes.header}>
        <Avatar src={ppUrl} >?  </Avatar>
        <div className={classes.ml}></div>
        <Typography variant='h5'> {name} </Typography>
        <div className={classes.ml}></div>

        <Typography> <i>{ formatDate() } </i></Typography>
      </div>
      <Typography className={classes.ml} variant='h5'><i> "{text}"" </i></Typography>
      <Typography className={classes.ml}>{name} rated {rate}/5 </Typography>
      
    </div>
  )
}

export default UserItem