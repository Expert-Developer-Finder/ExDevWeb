import { Typography, Container } from '@mui/material';
import React, {useEffect, useState} from 'react'
import MemberItem from "../MemberItem/MemberItem";
import * as api from "../../api";
import Loader from '../../constants/Loader';
import { sleep } from '../../constants/helper';


const RepoOwners = ({repo, isMember}) => {

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
        !owners ? <Loader/>:
        owners.length == 0 ? <Typography>No owners</Typography> :
        <>

          {
            owners.map((member)=> <MemberItem member={member} isMember={isMember} isOwner ={true} repoId={repo._id} />

            )
          }
        </>
      }


    </Container>
  )
}

export default RepoOwners