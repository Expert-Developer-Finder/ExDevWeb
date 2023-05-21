import React, { useEffect, useState } from "react";
import { Grid, Button, TextField, Typography, Container, Divider} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import useStyle from "./styles";
import "react-widgets/styles.css";
import NumberPicker from "react-widgets/NumberPicker";
import { changeSharedPass } from "../../actions/repos";
import { Alert, AlertTitle } from "@mui/material";
import { CLEAR_ERROR } from "../../constants/actionTypes";
import * as api from "../../api";
import Loader from "../../constants/Loader";


const passwordChangeInitialState = {
  oldPassword: "",
  newPassword: "",
  newPasswordAgain: "",
};

const RepoSettings = ({ repo, setSelectedRoute , isMember }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  let { id: repoId } = useParams();

  const { error, errorMessage } = useSelector((state) => state.repos);

  const [passwordForm, setPasswordForm] = useState(passwordChangeInitialState);
  const [devNo, setDevNo] = useState(null);
  const [wCommit, setWCommit] = useState(null);
  const [wPR, setWPR] = useState(null);
  const [wRecency, setWRecency] = useState(null);
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const  handlePasswordSubmit =   (e) => {
    e.preventDefault();
    console.log(passwordForm);
    dispatch(changeSharedPass(passwordForm, repoId,  setSelectedRoute));

  };

  useEffect(()=> {
    
    const fcn = async ()  => {
      const res = await api.getWeights({"repoId": repo._id})
      const oldWeights = res.data;
      setDevNo(oldWeights.devNo);
      setWCommit(oldWeights.weightCommit);
      setWRecency(oldWeights.weightRecency);
      setWPR(oldWeights.weightPR);
    }

    fcn();
  
  }, [])

  const saveChanges = async()=> {
    
    const newWeights = {
      "repoId": repo._id,
      "devNo": devNo,
      "weightCommit": wCommit,
      "weightPR": wPR,
      "weightRecency": wRecency
    }

    const {data} = await api.updateWeights( repo.ownerName, repo.repoName, newWeights)

    alert("Saved Changes");

  }


  if (isMember) {
    return <>
      <Container>
        <Typography variant="h2" >You are not a repository owner!</Typography>
      </Container>
    </>
  }


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
            How many developers should be recommended after the algorithm is
            ran?
          </Typography>
        </Grid>
        <Grid className={classes.mt} item xs={4}>
          <NumberPicker
            className={classes.picker}
            value={devNo} 
            onChange={(value)=>setDevNo(value)}
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
            value={wCommit} 
            onChange={(value)=>setWCommit(value)}
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
            value={wPR} 
            onChange={(value)=>setWPR(value)}
            step={1}
            max={5}
            min={1}
          />
        </Grid>
      </Grid>


      <Divider className={classes.divider} />
      <Typography variant="h5">
        To what extend, the recency is important? For example, 
        to what extend do you think that someone who committed 
        one year ago is less knowledgeable than someone who committed one year ago? 
      </Typography>

      <Grid
        container
        className={classes.mt}
        alignItems="center"
        flexDirection="row"
      >
        <Grid item xs={7} md={4}>
          <Typography>Enter a number between 0 and 1 (0 means don't care about the recency at all)</Typography>
        </Grid>
        <Grid item xs={4}>
          <NumberPicker
            className={classes.picker}
            value={wRecency} 
            onChange={(value)=>setWRecency(value)}
            step={0.1}
            max={1}
            min={0}
          />
        </Grid>
      </Grid>
      <Button
        className={classes.mt}
        fullWidth
        variant="contained"
        onClick={saveChanges}
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
