import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import {useStore} from "../state/state"
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Warnings() {
  const {graph} = useStore()
  const classes = useStyles();
  if(graph.length>0){
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h1" color="initial">
          this is Warnings

        </Typography>
      </Container>
    </React.Fragment>
  );
  }else{
    return(
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        Please Make sure at least one node is installed correctly 
      </Container>
    </React.Fragment>
    );
  }
}
