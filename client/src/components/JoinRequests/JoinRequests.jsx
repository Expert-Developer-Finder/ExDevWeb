import React from 'react';
import {  Container, Typography } from '@mui/material';
import RequestItem from '../RequestItem/RequestItem';

const JoinRequests = () => {
  const user = JSON.parse(localStorage.getItem("profile")).result;
  console.log(user);
  const requests = user.join_requests;
  console.log(requests);

  return (
<Container>

{
    requests? <>
      {
        requests.length == 0? <Typography  >You don't have any pendin joining requests. Join a repository from the "Join" tab first</Typography>
        :requests.map((request)=> {
          return (
          <RequestItem key={request._id} request ={request} repoView={false} />
        )})
      }
    </> :<>Loading...</>
}

</Container>  )
}

export default JoinRequests