import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import useStyle from "./styles";


const RequestItem = ({request, repoView}) => {
  const classes = useStyle();

  const getFormattedDate = (dateStr)=> {
    const date = new Date(dateStr);
    const res = date.getDate() +'/' + (date.getMonth()+1) + '/'+ date.getFullYear();
    return res + "";
  } 
  return (
    <Container className={classes.container}>
      <Grid container className={classes.gridContainer} >
        <Grid xs={6} item md = {3}>
          {repoView ?  request.userName :`${request.ownerName}/${request.repoName}`}
        </Grid>
        <Grid item xs={6} md = {3}>
          <Typography>{ getFormattedDate(request.createdAt)}</Typography>
        </Grid>
        <Grid  item xs={6} md = {3}>
          {
            repoView ? <Button  className={classes.button} variant='outlined' color='primary'> Visit Profile</Button> : <></>
          }
        </Grid>
        <Grid display="flex" xs={6}  justifyContent="flex-end" item md = {3}>
          {
            repoView ? <>
              <Button className={classes.button} variant='outlined' color='primary'>Accept</Button>
              <Button className={classes.button} variant="outlined" color='secondary'>Reject</Button>
            </> : 
            <Typography> {request.status} </Typography>
          }
        </Grid>
      </Grid>

      

      
    </Container>
  )
}

export default RequestItem