import { Typography, Container } from '@mui/material';
import React, {useEffect, useState} from 'react'
import MemberItem from "../MemberItem/MemberItem";
import * as api from "../../api";


const RepoOwners = ({repo}) => {

  const [owners, setOwners ] = useState(null);

  useEffect(() => {

    const fcn = async ()  => {
      const {data} = await api.getRepoOwners(repo._id);

      console.log(data.repoOwners);
      setOwners(data.repoOwners);
    }

    fcn();
    
  }, []);
  

  return (
    <Container>

      {
        !owners ? <Typography>Loading...</Typography> :
        owners.length == 0 ? <Typography>No owners</Typography> :
        <>

          {
            owners.map((member)=> <MemberItem member={member} isOwner ={true} repoId={repo._id} />

            )
          }
        </>
      }


    </Container>
  )
}

export default RepoOwners