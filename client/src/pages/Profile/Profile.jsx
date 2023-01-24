import React, {useEffect, useState} from 'react';
import { Button } from '@mui/material';
import { useDispatch , useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

const Profile = () => {

  const dispatch = useDispatch(); 
  const history = useHistory(); 

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const {authData} = useSelector((state)=> state.auth); 


  useEffect(()=> {
      // JWT...
      setUser(JSON.parse(localStorage.getItem("profile")));
  }, [authData]);
 

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