import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { acceptJoinRequest, rejectJoinRequest } from '../../actions/repos';
import useStyle from "./styles";


const RequestItem = ({request, repoView, isMember }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const getFormattedDate = (dateStr)=> {
    const date = new Date(dateStr);
    const res = date.getDate() +'/' + (date.getMonth()+1) + '/'+ date.getFullYear();
    return res + "";
  } 

  const accept = ()=>{
    dispatch(acceptJoinRequest(request.repoId, request.userId));
  }

  const reject = ()=>{
    dispatch(rejectJoinRequest(request.repoId, request.userId));
  }
  return (
    <Container className={classes.container}>
      <Grid container className={classes.gridContainer} >
        <Grid xs={6} item md = {3}>
          <Typography>{repoView ?  request.userName :`${request.ownerName}/${request.repoName}`}</Typography>
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
            isMember ? <></> : repoView ? <>
              <Button onClick={accept} className={classes.button} variant='outlined' color='primary'>Accept</Button>
              <Button onClick={reject} className={classes.button} variant="outlined" color='secondary'>Reject</Button>
            </> : 
            <Typography> {request.status} </Typography>
          }
        </Grid>
      </Grid>

      

      
    </Container>
  )
}

export default RequestItem