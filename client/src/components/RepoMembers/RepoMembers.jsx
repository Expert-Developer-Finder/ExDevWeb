import { Typography, Container } from '@mui/material';
import React, {useEffect, useState} from 'react'
import MemberItem from "../MemberItem/MemberItem";
import * as api from "../../api";


const RepoMembers = ({repo}) => {

  const [members, setMembers ] = useState(null);

  useEffect(() => {

    const fcn = async ()  => {
      const {data} = await api.getJoinedMembers(repo._id);

      console.log(data.joinedMembers);
      setMembers(data.joinedMembers);
    }

    fcn();
    
  }, []);
  

  return (
    <Container>

      {
        !members ? <Typography>Loading...</Typography> :
        members.length == 0 ? <Typography>No members</Typography> :
        <>

          {
            members.map((member)=> <MemberItem member={member} isOwner ={false} repoId={repo._id} />

            )
          }
        </>
      }


    </Container>
  )
}

export default RepoMembers