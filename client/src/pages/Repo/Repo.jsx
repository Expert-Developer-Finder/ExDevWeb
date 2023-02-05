import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { checkAndGetRepoWithId } from '../../api';
import {  IconButton, Typography, Container, Box, Badge } from '@material-ui/core';
import useStyle from "./styles";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import { RepoDetail, RepoJoinRequests,  RepoSettings } from '../../components';


const Repo = () => {
    let { id: repoId } = useParams();
    const user = JSON.parse(localStorage.getItem("profile")).result
  
    const classes = useStyle();
  
    const [repo, setRepo] = useState(null);
    const [showError, setShowError] = useState(false);

    const [selectedRoute, setSelectedRoute] = useState("/");
    
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
        <Container className={classes.appBar}>
            <Typography variant='h4' >{`${repo.ownerName}/${repo.repoName}`} </Typography>
            <Box className={classes.menu} >

            <IconButton className={classes.mr} onClick={()=> setSelectedRoute("/")} >
                <HomeIcon   color= {selectedRoute === "/" ? "primary": "action"}  fontSize="large" />
            </IconButton>

            <IconButton  onClick={()=> setSelectedRoute("/requests")} className={classes.mr}>
                <Badge badgeContent={repo.join_requests.length } color="primary" >
                <NotificationsIcon fontSize="large"  color= {selectedRoute === "/requests" ? "primary": "action"} />
                </Badge>
            </IconButton>

            <IconButton  onClick={()=> setSelectedRoute("/settings")}>
                <SettingsIcon fontSize="large"  color= {selectedRoute === "/settings" ? "primary": "action"}  />
            </IconButton>
        </Box>
        </Container>

        {
            selectedRoute === "/settings" ? 
            <RepoSettings repo={repo} /> :
            selectedRoute === "/requests" ?
            <RepoJoinRequests  repo={repo} setSelectedRoute={setSelectedRoute} />:
            <RepoDetail  repo={repo} />

        }

        

      </Container>
      

      
    }
    </>
  )
}

export default Repo