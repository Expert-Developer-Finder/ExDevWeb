import {  Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import JoinedRepoItem from './JoinedRepoItem/JoinedRepoItem';
import Loader from "../../constants/Loader"

const JoinedRepos = () => {
  const repos = useSelector((state)=>state.repos).joinedRepos.data;


  return (
    <Container>

        {
            repos? <>
              {
                repos.length == 0? <Typography  >You haven't joined to any repositories. Join a repository from the "Join" tab first</Typography>
                :repos.map((repo)=> {
                  return (
                  <JoinedRepoItem key={repo._id} repo ={repo} />
                )})
              }
            </> : <Loader/>
        }

    </Container>
  )
}

export default JoinedRepos;