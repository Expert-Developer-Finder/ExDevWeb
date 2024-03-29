import { Alert, AlertTitle, Button, Container,  Paper, TextField, Typography, InputAdornment, IconButton, Switch } from '@mui/material';
import React, {useState} from 'react';
import useStyles from "./styles.js";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createRepo } from '../../actions/repos.js';
import { CLEAR_ERROR } from '../../constants/actionTypes.js';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { getBranches } from '../../api/index.js';

const CreateRepo = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const initialState = {
    repoURL: "", 
    sharedPass: "", 
    creator: JSON.parse(localStorage.getItem("profile")).result, 
    branch: "",
    hasSlack: true,
    slackUsername: "",
    slackURL: ""
  };
  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e)=> {
    e.preventDefault();
    if( !formData.sharedPass) {
      alert("Please provide a shared repository first!")
    }
    formData.branch = selectedBranch   
    dispatch(createRepo(formData, history));
  }

  const [branches, setBranches] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [hasSlack, setHasSlack] = useState(true);
  
  const showBranches = async (e)=> {
    if(!formData.repoURL) {
      alert("First provide a GitHub Repository URL");
      return;
    } 

    const repo = formData.repoURL.split("github.com/")[1];
    const repoOwner = repo.split("/")[0];
    const repoName = repo.split("/")[1];
      
    const {data} = await getBranches(repoOwner, repoName, {"token": formData.creator.githubPAT});

    if(data) {
      setBranches(data);
    }
    else {
      alert("This repository URL is not valid or it is a private repository that you do not have access to!");
    }     
    return;
  }

  const  {errorMessage, error}  = useSelector((state) => state.repos);

  return (
    <Container className={classes.container}>
      <Typography variant='h3'>Create Repository</Typography>
      {error && errorMessage && (
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

      <Paper className={classes.page} elevation={3}>
        <form className={classes.form} >
          <TextField onChange={handleChange} name='repoURL' required label="Repository URL" variant='outlined' fullWidth></TextField>
          <br/>
          
          <TextField 
          
            InputProps={{
            endAdornment: (
                <InputAdornment position='end'>
                    <IconButton onClick={()=>setShow(!show)} >
                        {!show ?  <Visibility/> :<VisibilityOff/>  }
                    </IconButton>
                </InputAdornment>
            )
            }}
            type={show?"text": "password"} onChange={handleChange} name='sharedPass' required label="Shared Pass" variant='outlined' fullWidth></TextField>
          <br/>

          <div className={classes.hasSlackHeader}>
            <Typography variant='h6'>Does this repository has a relevant Slack Workspace?</Typography>
            <div className={classes.switchContainer}>
              <p>No</p> <Switch defaultChecked onChange={()=>{
                if ( hasSlack ) {
                  setFormData({ ...formData, ["hasSlack"]: false });
                  setFormData({ ...formData, ["slackUsernames"]: "" });              
                  setFormData({ ...formData, ["slackURL"]: "" });              
                } else {
                  setFormData({ ...formData, ["hasSlack"]: true });
                }

                setHasSlack(!hasSlack);
              }}/> <p>Yes</p>
            </div>
          </div>
          {
            hasSlack? 
            <div className="">
              <Typography>Enter your repository's Slack URL and your Slack member id for that workspace. Don't know where to find these information?  
                <a
                  style={{textDecoration: "none", marginLeft:5, fontWeight: "bold"}} 
                  href={require("../../assets/slack_username_create_repo.pdf")}  target="_blank">
                  View this demo.
                </a>
              </Typography>
              <br />
              <TextField label= "Slack URL" name='slackURL' fullWidth required onChange={handleChange}></TextField>
              <br />
              <br />
              <TextField label= "Slack Member Id" name='slackUsername' fullWidth required onChange={handleChange}></TextField>
              <br />
              <br />

            </div> : <></>
          }
          {
            !selectedBranch ?
              branches ? 
              <>
                <Typography variant='h6'>Which is the main branch of your repository? (e.g. main, master, etc.)</Typography>
                <Typography><i>While making a recommendation, this repository will be used</i></Typography>
                {
                  branches?.map((branch)=> 
                    <div key={branch.name} className={classes.branchItem} onClick={()=>setSelectedBranch(branch.name)}>
                      <Typography> {branch.name}  </Typography>
                  </div>
                )}
              </>
              :  
              <Button variant='contained' onClick={showBranches}>Select Branch</Button>
            :
            <Typography>Selected Branch: {selectedBranch} </Typography>
          }
          <br/>
          {
            selectedBranch ? 
            <Button type='submit' variant='contained' onClick={handleSubmit}>Create Repo</Button> :
            <Button disabled="true" type='submit' variant='contained' onClick={handleSubmit}>Create Repo</Button>  
          }

        </form>
      </Paper>
    </Container>
  )
}

export default CreateRepo