import { Typography, Container } from '@mui/material';
import React, {useEffect, useState} from 'react'
import MemberItem from "./MemberItem/MemberItem";
import * as api from "../../api";


const RepoMembers = ({repo}) => {

  const [members, setMembers ] = useState([]);

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
        !members ? <Typography>No members</Typography> :
        <>

          {
            members.map((member)=> <MemberItem member={member} isOwner ={false} />

            )
          }
        </>
      }


    </Container>
  )
}

export default RepoMembers