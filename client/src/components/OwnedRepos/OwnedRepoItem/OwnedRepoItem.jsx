import { Badge, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useStyles from "./styles.js";

const OwnedRepoItem = ({repo}) => {
  const classes = useStyles();

  return (
    <Grid  container xs={12} className={classes.container} >
        <Grid item>
            <Typography> {`${repo.ownerName}/${repo.repoName}`} </Typography>
        </Grid>
        <Grid item className={classes.bottom} >
            <Badge badgeContent={4} color="primary">
                <NotificationsIcon color="action" />
            </Badge>
            <Button variant='contained' className={classes.button}>Visit</Button>
        </Grid>
    </Grid>
  )
}

export default OwnedRepoItem