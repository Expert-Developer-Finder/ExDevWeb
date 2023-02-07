import { Badge, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useStyles from "./styles.js";

const JoinedRepoItem = ({repo}) => {
  const classes = useStyles();

  return (
    <Grid  container xs={12} className={classes.container} >
        <Grid item>
            <Typography> {`${repo.ownerName}/${repo.repoName}`} </Typography>
        </Grid>
        <Grid item className={classes.bottom} >
            <Button href = {`repo/${repo._id}`} variant='contained' color='secondary' className={classes.button}>Visit</Button>
        </Grid>
    </Grid>
  )
}

export default JoinedRepoItem