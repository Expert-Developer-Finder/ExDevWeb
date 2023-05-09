import { Typography, Container } from '@mui/material';
import React, {useEffect, useState} from 'react'
import MemberItem from "../MemberItem/MemberItem";
import * as api from "../../api";
import Loader from '../../constants/Loader';
import {sleep} from "../../constants/helper"


const RepoMembers = ({repo, isMember}) => {

  const [members, setMembers ] = useState(null);

  useEffect(() => {

    const fcn = async ()  => {
      const {data} = await api.getJoinedMembers(repo._id);
      setMembers(data.joinedMembers);
    }

    fcn();
    
  }, []);
  

  return (
    <Container>

      {
        !members ? <Loader/> :
        members.length == 0 ? <Typography>No members</Typography> :
        <>

          {
            members.map((member)=> <MemberItem member={member} isMember={isMember}  isOwner ={isMember} repoId={repo._id} />

            )
          }
        </>
      }


    </Container>
  )
}

export default RepoMembers