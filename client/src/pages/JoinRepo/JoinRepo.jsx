import {   Divider, Grid, Paper,  Typography , Button} from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Input } from '../../components'
import useStyles from "./styles.js";


const JoinRepo = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
        <Grid container  >
            <Grid item sm={12} md={6} className={classes.left}>
                <Typography variant='h3'>Join a Repository</Typography>
                <Paper elevation={3} className={classes.page}>
                    <Typography variant='h5'>Enter Repository Information</Typography>
                    <Grid container>
                        <Input name="ownerName" label="Repository Owner" autoFocus half  />
                        <Input name="repoName" label="Repository Name"  half />
                    </Grid>
                    <Typography variant='h6' className={classes.or} >OR</Typography>
                    <Input name="repoURL" label="Repository URL"  />
                    <Divider/>
                    <br/>
                    <Typography variant='h5'>Enter Credentials</Typography>
                    <Grid container>
                        <Typography>If you were provided a shared secret credential for this repository, please enter it</Typography>
                        <Input name="password" label="Shared Secret"   />

                        
                    </Grid>
                    <br/>
                    <Typography>If you don't have a shared secret, send a joining request insted. Then, repository owner can admit you to the repository.</Typography>
                    <Button variant='contained' className={classes.button}>Send Request</Button>


                    
                </Paper>
            </Grid>
            <Grid item sm={12} md={6} >
                <img className={classes.img} alt="A man joining to GitHub"  src={require("../../assets/male02.svg")} />
            </Grid>



        </Grid>
    </Container>
  )
}

export default JoinRepo