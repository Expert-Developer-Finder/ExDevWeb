import { Button, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react';
import * as api from "../../api";
import useStyle from "./styles";

// Todo şu anda kendini falan demote edebiliyon ondan yana bir check yok
// repo da no owner kalabiliyo

const MemberItem = ({member, isOwner, repoId} ) => {

  const classes = useStyle();

  const promote = async () => {
    const user = JSON.parse(localStorage.getItem("profile")).result

    const data = {
      userId: member._id,
      repoId: repoId,
      ownerId: user._id
    }

    const res = await api.promote(data);
    if( res.status === 200) {
      window.location.reload();
    } else {
      alert(res.data);
    }

  }

  const demote = async () => {
    const user = JSON.parse(localStorage.getItem("profile")).result

    const data = {
      userId: member._id,
      repoId: repoId,
      ownerId: user._id
    }

    const res = await api.demote(data);
    if( res.status === 200) {
      window.location.reload();
    } else {
      alert(res.data);
    }

  }
  return (
    <Container className = {classes.container}>
      <Grid className={classes.grid} container>
        <Grid item xs = {4}>
          <Typography> {member.name} </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography> {member.email} </Typography>
        </Grid>
        <Grid item xs = {4} style={{display: "flex", justifyContent: "flex-end"}} >
         {
          isOwner ? 
          <Button className={classes.button} onClick={demote}  variant='outlined' color='primary' >
            Demote
          </Button> :
          <Button className={classes.button} onClick={promote}  variant='outlined' color='primary' >
            Promote
          </Button>
         }
        </Grid>

      </Grid>
    </Container>
  )
}

export default MemberItem