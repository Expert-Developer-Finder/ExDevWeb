import {  Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import OwnedRepoItem from './OwnedRepoItem/OwnedRepoItem';
import Loader from '../../constants/Loader';


const OwnedRepos = () => {
  const repos = useSelector((state)=>state.repos).ownedRepos.data;

  return (
    <Container>

        {
            repos? <>
              {
                repos.length == 0? <Typography  >You don't own any repositories. Add a repository from the "Create" tab first</Typography>
                :repos.map((repo)=> {
                  return (
                  <OwnedRepoItem key={repo._id} repo ={repo} />
                )})
              }
            </> :<Loader/>
        }
         

    </Container>
  )
}

export default OwnedRepos;