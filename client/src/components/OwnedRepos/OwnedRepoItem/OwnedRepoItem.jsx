import { Badge, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useStyles from "./styles.js";



const OwnedRepoItem = ({repo}) => {
  const classes = useStyles();

  return (
    <Grid  container xs={12} className={classes.container}  >
        <Grid item>
            <Typography> {`${repo.ownerName}/${repo.repoName}`} </Typography>
        </Grid>
        {
          repo.status == "creating"?
          <Grid item> <Typography> <i> Creating Graph </i>  </Typography> </Grid> :
          <></>
        }
        <Grid item className={classes.bottom} >
            <Badge badgeContent={repo.join_requests.length} color="primary">
                <NotificationsIcon color="action" />
            </Badge>
            {
              repo.status == "creating"?
              <Button disabled="true" variant='contained' href={`repo/${repo._id}`} className={classes.button}  >Visit</Button> :
              <Button variant='contained' href={`repo/${repo._id}`} className={classes.button}  >Visit</Button> 
            }
        </Grid>
    </Grid>
  )
}

export default OwnedRepoItem