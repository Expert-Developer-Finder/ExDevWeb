import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { checkAndGetRepoWithId } from '../../api';
import { Grid, TextField, InputAdornment, IconButton, Typography, Container, Box, Badge, Divider } from '@material-ui/core';
import useStyle from "./styles";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import { RepoMembers } from '../../components';

const RepoDetail = () => {
  let { id: repoId } = useParams();
  const user = JSON.parse(localStorage.getItem("profile")).result

  const classes = useStyle();

  const [repo, setRepo] = useState(null);
  const [showError, setShowError] = useState(false);
  
  useEffect( ()=> {
    
    const getRepo = async () => {
      try {
        const {data: {data}} = await checkAndGetRepoWithId(repoId, {userId: user._id}); 
        setRepo(data);
      } catch (error) {
        setShowError(true);
      }
    }

    getRepo();
  }, []);


  return (
    <>
    {showError? 
      <Container className={classes.unauthorisedContainer}>
        <Typography variant='h2'>{" It seems like you are not authorised to see this content :("}</Typography>
        <img  className={classes.img1} alt="A duck judging you"  src={require("../../assets/duck.png")} />
      </Container>:

      !repo? <Typography>Loading...</Typography> : 
        
      <Container className={classes.container}>
        
        <Box className={classes.menu} >
          <IconButton className={classes.mr}>
            <HomeIcon  color="primary" fontSize="large" />
          </IconButton>

          <IconButton className={classes.mr}>
            <Badge badgeContent={4} color="primary" >
              <NotificationsIcon fontSize="large"  color="action" />
            </Badge>
          </IconButton>

        <IconButton href={`${repoId}/settings`}>
          <SettingsIcon fontSize="large"  color="action"   />
        </IconButton>
        </Box>

        <Typography variant='h4' >{`${repo.ownerName}/${repo.repoName}`} </Typography>
        <Divider className={classes.divider} />

        <Typography variant='h4' >Members </Typography>
        <RepoMembers />
        <Divider className={classes.divider} />

        <Typography variant='h4' >Join Requests </Typography>
        <RepoMembers/>
      </Container>
      

      
    }
    </>

  );
}

export default RepoDetail