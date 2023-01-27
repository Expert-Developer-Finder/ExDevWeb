import {   Divider, Grid, Paper,  Typography , Button, Checkbox, TextField,  InputAdornment, IconButton,} from '@mui/material'
import { Container } from '@mui/system'
import React, {useState} from 'react'
import { Input } from '../../components'
import useStyles from "./styles.js";
import VisibilityOff from "@material-ui/icons/VisibilityOff";


const initialState = {ownerName: "", repoName: "", repoURL: "", password: "", isChecked: false}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const JoinRepo = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordShow = () => setShowPassword(!showPassword);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckBox = ()=> {
    if (formData.isChecked) {
        setFormData({ ...formData, isChecked:false});
    } else {
        setFormData({ ...formData, isChecked:true, password: ""});

    }
  }

  const goodToGo = ()=> {
    var repoInfoOk = false;
    if ( (formData.ownerName !== "" && formData.repoName !== "") || formData.repoURL !== "" ) repoInfoOk = true;

    var credentailsOk = false;
    if ( formData.password !== "" || formData.isChecked) credentailsOk = true;
    
    return repoInfoOk && credentailsOk;
  }

  return (
    <Container className={classes.container}>
        <Grid container  >
            <Grid item sm={12} md={6} className={classes.left}>
                <Typography variant='h3'>Join a Repository</Typography>
                <Paper elevation={3} className={classes.page}>
                    <Typography variant='h5'>Enter Repository Information</Typography>
                    <Grid container>
                        <Input handleChange={handleChange} name="ownerName" label="Repository Owner" autoFocus half required={false}  />
                        <Input handleChange={handleChange} name="repoName" label="Repository Name"  half required={false} />
                    </Grid>
                    <Typography variant='h6' className={classes.or} >OR</Typography>
                    <Input handleChange={handleChange} name="repoURL" label="Repository URL" required={false}  />
                    <Divider/>
                    <br/>
                    <Typography variant='h5'>Enter Credentials</Typography>
                    <Grid container>
                        <Typography>If you were provided a shared secret credential for this repository, please enter it</Typography>
                        {formData.isChecked? 
                        <Grid item xs={12}   style={{paddingRight: 0, paddingLeft: 15, marginTop: 16 }} >
                            <TextField 
                                name="password" 
                                label="Shared Secret" 
                                value="" 
                                disabled fullWidth 
                                InputProps={{ endAdornment: ( 
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handlePasswordShow} ><VisibilityOff/></IconButton>
                                    </InputAdornment>
                                )}} />
                        </Grid>
                            :
                            <Input handlePasswordShow={handlePasswordShow} handleChange={handleChange} name="password" label="Shared Secret" required={false} type={showPassword ? "text" : "password"}  />
                        }
                    </Grid>
                    <br/>
                   
                   <Grid display={"flex"}>
                    <Checkbox {...label} checked = { formData.isChecked} onChange={handleCheckBox }  className={classes.mr} />
                    <Typography>Check this box if you don't have a shared secret. Then a joining request will be sent to the repository owners by yor name.</Typography>
                   </Grid>
                    {
                        goodToGo() ? 
                            <Button variant='contained' className={classes.button}> Join </Button>
                            :<Button variant='contained' disabled className={classes.button}>Join</Button>
                    }
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