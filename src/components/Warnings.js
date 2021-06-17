import React, { useState } from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import {useStore} from "../state/state"
import { Alert, AlertTitle } from '@material-ui/lab';
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
  const [warning, setWarnings] = useState([
    "Air quality is satisfactory, and air pollution poses little or no risk.",
    "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
    "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
    "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
    "Health alert: The risk of health effects is increased for everyone.",
    "Health warning of emergency conditions: everyone is more likely to be affected."
])
const [security, setSecurity] = useState([
  "success",
  "success",
  "info",
  "warning",
  "error",
  "error"
])
const [title, setTitle]=useState([
  "Good",
  "Moderate",
  "Unhealthy for Sensitive Groups",
  "Unhealthy",
  "Very Unhealthy",
  "Hazardous",
])
const getIndex = (inp)=>{
  if(inp < 50){
    return 0;
  }else if(inp > 50 && inp < 100){
    return 1;
  }else if(inp > 100 && inp < 150){
    return 2;
  }else if(inp > 150 && inp < 200){
    return 3;
  }else if(inp > 200 && inp < 300){
    return 4;
  }else{
    return 5;
  }
}
  if(graph.length>0){
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
      <Alert severity={security[getIndex(graph[graph.length-1].amount)]}>
        <AlertTitle>{title[getIndex(graph[graph.length-1].amount)]}</AlertTitle>
        {warning[getIndex(graph[graph.length-1].amount)]}
      </Alert>
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
