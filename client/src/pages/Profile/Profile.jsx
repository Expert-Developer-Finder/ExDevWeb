import React, { useState } from "react";
import { Avatar, Button, Container, Divider, Grid, TextField } from  "@mui/material";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import useStyles from "./styles.js";
import { Typography } from "@material-ui/core";
import AlertDialog from "../../components/AlertDialog/AlertDialog.jsx";
import { changePassword } from "../../actions/auth.js";


const passwordChangeInitialState = { oldPassword: "", newPassword: "" , newPasswordAgain:""};

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );

  const [passwordForm, setPasswordForm]  = useState(passwordChangeInitialState);
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log(passwordForm);
    dispatch(changePassword(passwordForm, history, userData._id));
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setOpen(false);
    history.push("/");
  };
  return (
    <Container>

      <AlertDialog open={open} setOpen={setOpen} 
        title="Do you want to log out?"
        message=""
        no = "Cancel"
        yes= "Log out"
        onNo= {()=>setOpen(false)}
        onYes= {logout}
      />

      <Typography className={classes.mt} variant="h3">Profile Settings</Typography>
      <Grid container>
        <Grid item sm={12} md={6}>
          <form autoComplete="off" noValidate onSubmit={()=>{}} className={classes.form}>
            <TextField margin="normal" name="name" variant="outlined" label="Name" fullWidth value={userData?.name} onChange={(e) => {   setUserData({ ...userData, name: e.target.value }); }}/>
            <TextField margin="normal" name="bio" variant="outlined" label="Biography" fullWidth value={userData?.bio} onChange={(e) => {   setUserData({ ...userData, bio: e.target.value })}} />
            <Button variant="contained" color="success" size="small" onClick={()=>{}} fullWidth> Update Profile</Button>
          </form>
        </Grid>
        <Grid display="flex"  alignItems="center"  item sm={12} md={6}>
          <div className={classes.square}>
            <Avatar className={classes.avatar}>?  </Avatar>
          </div>
        </Grid>
      </Grid>

      <Divider/>


      <Typography className={classes.mt}  variant="h3">Account Settings</Typography>
      <Typography  variant="h5"> Change Password </Typography>
      <Grid container >
        <Grid item sm={12} md={6} >
          <form autoComplete="off" noValidate onSubmit={()=>{}} className={classes.form}>
            <TextField type="password" margin="normal" name="oldPassword" variant="outlined" label="Current Password" fullWidth  value={passwordForm?.oldPassword} onChange={handlePasswordChange }/>
            <TextField type="password" margin="normal" name="newPassword" variant="outlined" label="New Password" fullWidth  value={passwordForm?.newPassword} onChange={handlePasswordChange }/>
            <TextField type="password" margin="normal" name="newPasswordAgain" variant="outlined" label="Confirm New Password" fullWidth  value={passwordForm?.newPasswordAgain} onChange={handlePasswordChange }/>
            <Button  variant="contained" color="success" size="small" onClick={handlePasswordSubmit} fullWidth> Change Password</Button>
          </form>
        </Grid>

        <Grid item xm={12} md = {6} className={`${classes.form} ${classes.mt}`} >
          <Typography variant="h5">Delete Accout</Typography>
          <Typography>
            When you delete your account, all of your personal data will be erased as well. Note that this action is non-recoverable 
          </Typography>
          <Button className={classes.mt} variant="contained" color="error" onClick={()=>{}} >Delete Account</Button>
          <br/>
          <br/>
          <Typography variant="h5">Safe Logout</Typography>
          <Button  className={classes.mt} variant="contained" onClick={()=>setOpen(true)}>Logout</Button>


        </Grid>
      </Grid>

      <Divider/>

     
    </Container>
  );
};

export default Profile;
