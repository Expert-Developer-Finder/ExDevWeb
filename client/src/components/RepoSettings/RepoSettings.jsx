import React, { useState } from "react";
import { Grid, Button, TextField, Typography, Container, Divider} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import useStyle from "./styles";
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

const RepoSettings = ({ repo, setSelectedRoute }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  let { id: repoId } = useParams();

  const { error, errorMessage } = useSelector((state) => state.repos);

  const [passwordForm, setPasswordForm] = useState(passwordChangeInitialState);
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const  handlePasswordSubmit =   (e) => {
    e.preventDefault();
    console.log(passwordForm);
    dispatch(changeSharedPass(passwordForm, repoId,  setSelectedRoute));

  };

  return (
    <Container className={classes.container}>
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
            runned?
          </Typography>
        </Grid>
        <Grid className={classes.mt} item xs={4}>
          <NumberPicker
            className={classes.picker}
            defaultValue={1}
            step={1}
            max={5}
            min={1}
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
          <NumberPicker
            className={classes.picker}
            defaultValue={1}
            step={1}
            max={5}
            min={1}
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
            defaultValue={1}
            step={1}
            max={5}
            min={1}
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
            defaultValue={1}
            step={1}
            max={5}
            min={1}
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
            defaultValue={1}
            step={1}
            max={5}
            min={1}
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

      {error && (
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
          <br />
        </>
      )}

      <form onSubmit={handlePasswordSubmit}>
        <TextField
          required
          type="password"
          margin="normal"
          name="oldPassword"
          variant="outlined"
          label="Current Shared Pass"
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
          label="New Shared Pass"
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
          label="Confirm New Shared Pass"
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
