import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
} from "@material-ui/core";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import {RequestItem } from "../index";

const RepoJoinRequests = ({ repo , isMember }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  let { id: repoId } = useParams();

  const requests = repo.join_requests;



  //  TODO çok istersen şurdak 3 butonu refactor edip navbar yap
  return (
    <Container className={classes.container}>
      <Typography variant="h3">Pending Requests</Typography>
      {
        requests.length ?
        requests.map((request)=>  (<RequestItem isMember={isMember}  request={request} repoView={true}  />)) :
        <Typography>No pending joining requests</Typography>
      }

    </Container>
  );
};

export default RepoJoinRequests;
