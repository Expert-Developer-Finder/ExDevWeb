import React from 'react'
import { Grid, Button, TextField, InputAdornment, IconButton, Typography, Container, Box, Badge, Divider, Paper } from '@material-ui/core';
import { } from  "@mui/material";

import useStyle from "./styles";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import { useParams } from 'react-router-dom';
import "react-widgets/styles.css";
import NumberPicker from "react-widgets/NumberPicker";




const RepoSettings = () => {

  const classes = useStyle();
  let { id: repoId } = useParams();

  ;

  return (
    <Container className={classes.container} >
        <Box className={classes.menu} >
          <IconButton className={classes.mr} href={`/repo/${repoId}`} >
            <HomeIcon  color="action" fontSize="large" />
          </IconButton>

          <IconButton className={classes.mr}>
            <Badge badgeContent={4} color="primary" >
              <NotificationsIcon fontSize="large"  color="action" />
            </Badge>
          </IconButton>

        <IconButton >
          <SettingsIcon fontSize="large"  color="primary"   />
        </IconButton>
        </Box>

        <Typography variant='h3'>Settings</Typography>
      
        <Paper className={classes.paper} elevation={3} >
          <Grid container className={classes.mt}  alignItems="center" flexDirection="row">
            <Grid item xs={12}>
              <Typography variant='h5' >How many developers should be recommended after the algroithm is runned? </Typography>
            </Grid>
            <Grid  className={classes.mt} item xs={4}> <NumberPicker className={classes.picker}  defaultValue={0} step={1} max={5} min={0}/></Grid>
          </Grid>
          <Divider className={classes.divider}/>


          <Typography variant='h5' >Assign importance value to software practitioners</Typography>

          <Grid container className={classes.mt}  alignItems="center" flexDirection="row">
            <Grid item xs={7} md={4}><Typography >Developers who modified the code part</Typography></Grid>
            <Grid item xs={4}> <NumberPicker className={classes.picker}  defaultValue={0} step={1} max={5} min={0}/></Grid>
          </Grid>

          <Grid container className={classes.mt}  alignItems="center" flexDirection="row">
            <Grid item xs={7} md={4}><Typography >Testers who tested the code part</Typography></Grid>
            <Grid item xs={4}> <NumberPicker className={classes.picker}  defaultValue={0} step={1} max={5} min={0}/></Grid>
          </Grid>

          <Grid container className={classes.mt}  alignItems="center" flexDirection="row">
            <Grid item xs={7} md={4}><Typography >Reviewers of pull requests of that code part</Typography></Grid>
            <Grid item xs={4}> <NumberPicker className={classes.picker}  defaultValue={0} step={1} max={5} min={0}/></Grid>
          </Grid>

          <Grid container className={classes.mt}  alignItems="center" flexDirection="row">
            <Grid item xs={7} md={4}><Typography >Developers who opened issues a bout the code part</Typography></Grid>
            <Grid item xs={4}> <NumberPicker className={classes.picker}  defaultValue={0} step={1} max={5} min={0}/></Grid>
          </Grid>

          <Button className={classes.mt}  fullWidth variant='contained' color="primary" >Save</Button>

        </Paper>

        <Divider/>

        <Typography variant='h4' className={classes.mt} >Delete Repository</Typography>
        <Typography>Note that this action cannot be reverted</Typography>
        <Button className={classes.mt} color='secondary' variant='contained'>Delete</Button>
        
    </Container>
  )
}

export default RepoSettings