import { Button, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react';
import useStyle from "./styles";

const MemberItem = ({member, isOwner} ) => {

  const classes = useStyle();
  return (
    <Container className = {classes.container}>
      <Grid className={classes.grid} container>
        <Grid item xs = {3}>
          <Typography> {member.name} </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography> {member.email} </Typography>
        </Grid>
        <Grid item xs = {3}>
          <Button className={classes.button}  variant='outlined' color='primary' >
            Promote
          </Button>
        </Grid>

      </Grid>
    </Container>
  )
}

export default MemberItem