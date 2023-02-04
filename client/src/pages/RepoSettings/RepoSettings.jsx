import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  IconButton,
  Typography,
  Container,
  Box,
  Badge,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory ,useParams} from "react-router-dom";

import useStyle from "./styles";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import "react-widgets/styles.css";
import NumberPicker from "react-widgets/NumberPicker";
import { changeSharedPass } from "../../actions/repos";
import { Alert, AlertTitle } from "@mui/material";
import { CLEAR_ERROR } from "../../constants/actionTypes";

const passwordChangeInitialState = {
  oldPassword: "",
  newPassword: "",
  newPasswordAgain: "",
};


const RepoSettings = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  let { id: repoId } = useParams();

  const {error, errorMessage} = useSelector((state)=> state.repos);

  const [passwordForm, setPasswordForm] = useState(passwordChangeInitialState);
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log(passwordForm);
    dispatch(changeSharedPass(passwordForm, history, repoId));
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.menu}>
        <IconButton className={classes.mr} href={`/repo/${repoId}`}>
          <HomeIcon color="action" fontSize="large" />
        </IconButton>

        <IconButton className={classes.mr}>
          <Badge badgeContent={4} color="primary">
            <NotificationsIcon fontSize="large" color="action" />
          </Badge>
        </IconButton>

        <IconButton>
          <SettingsIcon fontSize="large" color="primary" />
        </IconButton>
      </Box>

      <Typography variant="h3">Settings</Typography>

      <Grid
        container
        className={classes.mt}
        alignItems="center"
        flexDirection="row"
      >
        <Grid item xs={12}>
          <Typography variant="h5">
            How many developers should be recommended after the algroithm is
            runned?{" "}
          </Typography>
        </Grid>
        <Grid className={classes.mt} item xs={4}>
          {" "}
          <NumberPicker
            className={classes.picker}
            defaultValue={0}
            step={1}
            max={5}
            min={0}
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />

      <Typography variant="h5">
        Assign importance value to software practitioners
      </Typography>

      <Grid
        container
        className={classes.mt}
        alignItems="center"
        flexDirection="row"
      >
        <Grid item xs={7} md={4}>
          <Typography>Developers who modified the code part</Typography>
        </Grid>
        <Grid item xs={4}>
          {" "}
          <NumberPicker
            className={classes.picker}
            defaultValue={0}
            step={1}
            max={5}
            min={0}
          />
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.mt}
        alignItems="center"
        flexDirection="row"
      >
        <Grid item xs={7} md={4}>
          <Typography>Testers who tested the code part</Typography>
        </Grid>
        <Grid item xs={4}>
          <NumberPicker
            className={classes.picker}
            defaultValue={0}
            step={1}
            max={5}
            min={0}
          />
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.mt}
        alignItems="center"
        flexDirection="row"
      >
        <Grid item xs={7} md={4}>
          <Typography>Reviewers of pull requests of that code part</Typography>
        </Grid>
        <Grid item xs={4}>
          <NumberPicker
            className={classes.picker}
            defaultValue={0}
            step={1}
            max={5}
            min={0}
          />
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.mt}
        alignItems="center"
        flexDirection="row"
      >
        <Grid item xs={7} md={4}>
          <Typography>
            Developers who opened issues about the code part
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <NumberPicker
            className={classes.picker}
            defaultValue={0}
            step={1}
            max={5}
            min={0}
          />
        </Grid>
      </Grid>

      <Button
        className={classes.mt}
        fullWidth
        variant="contained"
        color="primary"
      >
        Save
      </Button>

      <Divider className={classes.divider} />
      
      <Typography variant="h4"> Change Shared Pass</Typography>

      {error  && (
          <>
            <Alert
              severity="error"
              onClose={() => {
                dispatch({ type: CLEAR_ERROR });
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {errorMessage} — <strong>Try again</strong>
            </Alert>
            <br/>
          </>
        )}

      <form onSubmit={handlePasswordSubmit}>
      <TextField
        required
        type="password"
        margin="normal"
        name="oldPassword"
        variant="outlined"
        label="Current Password"
        fullWidth
        value={passwordForm?.oldPassword}
        onChange={handlePasswordChange}
      />
      <TextField
        required
        type="password"
        margin="normal"
        name="newPassword"
        variant="outlined"
        label="New Password"
        fullWidth
        value={passwordForm?.newPassword}
        onChange={handlePasswordChange}
      />
      <TextField
        required
        type="password"
        margin="normal"
        name="newPasswordAgain"
        variant="outlined"
        label="Confirm New Password"
        fullWidth
        value={passwordForm?.newPasswordAgain}
        onChange={handlePasswordChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        fullWidth
      >
        Change Password
      </Button>

      </form>
      <Divider className={classes.divider} />

      <Typography variant="h4" className={classes.mt}>
        Delete Repository
      </Typography>
      <Typography>Note that this action cannot be reverted</Typography>
      <Button className={classes.mt} color="secondary" variant="contained">
        Delete
      </Button>
    </Container>
  );
};

export default RepoSettings;
