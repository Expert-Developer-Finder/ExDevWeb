import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
} from "@material-ui/core";
import useStyle from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import {RequestItem } from "../index";

const RepoJoinRequests = ({ repo }) => {
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
        requests.map((request)=>  (<RequestItem request={request} repoView={true} />))
      }

    </Container>
  );
};

export default RepoJoinRequests;
