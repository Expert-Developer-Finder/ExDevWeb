import {  Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import OwnedRepoItem from './OwnedRepoItem/OwnedRepoItem';


export const OwnedRepos = () => {
  const repos = useSelector((state)=>state.repos).ownedRepos.data;

  return (
    <Container>

        {
            repos? <>
              {
                repos.length == 0? <p>No owned repos</p>
                :repos.map((repo)=> {
                  console.log(repo);
                  return (
                  <OwnedRepoItem key={repo._id} repo ={repo} />
                )})
              }
            </> :<>Loading</>
        }
         

    </Container>
  )
}
