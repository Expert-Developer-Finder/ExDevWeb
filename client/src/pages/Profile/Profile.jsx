import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Profile = () => {

  const dispatch = useDispatch(); 
  const history = useHistory(); 

  const logout =()=> {
      dispatch({type: "LOGOUT"});
      history.push("/");


  };
  return (
    <div>
        <Button onClick={logout} >
            Logout
        </Button>
    </div>
  )
}

export default Profile