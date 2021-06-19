import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  Typography,
  ListItem,
  List,
  Paper,
} from "@material-ui/core";
import { useStore } from "../state/state";
import { Alert, AlertTitle } from "@material-ui/lab";
import { database } from "../state/firebase";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Warnings() {
  const { graph, loading } = useStore();
  const classes = useStyles();
  const [LP, setLP] = useState({});
  const [MP, setMP] = useState({});
  const [HP, setHP] = useState({});
  const [SP, setSP] = useState({});
  const [warning, setWarnings] = useState([
    "Air quality is satisfactory, and air pollution poses no risk.",
    "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
    "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
    "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
    "Health alert: The risk of health effects is increased for everyone. People with respiratory or heart diseases will be significantly affected and will experience reduced endurance in activities.",
    "Health warning of emergency conditions: Everyone is more likely to be affected.",
  ]);
  const [security, setSecurity] = useState([
    "success",
    "success",
    "info",
    "warning",
    "error",
    "error",
  ]);
  const [title, setTitle] = useState([
    "Excellent",
    "Good",
    "Lightly Polluted",
    "Moderately Polluted",
    "Heavily Polluted",
    "Severely Polluted",
  ]);
  const getIndex = (inp) => {
    if (inp < 50) {
      return 0;
    } else if (inp >= 50 && inp < 100) {
      return 1;
    } else if (inp >= 100 && inp < 150) {
      return 2;
    } else if (inp >= 150 && inp < 200) {
      return 3;
    } else if (inp >= 200 && inp < 300) {
      return 4;
    } else {
      return 5;
    }
  };

  const recommendationHandler = (level) => {
    if (level === 2) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h5" color="primary">
            List of Recommendations:
          </Typography>
          <List>
            {Object.entries(LP).map((item) => {
              const [[, id], [, { Recommendation: val }]] =
                Object.entries(item);
              if (val) {
                return (
                  <ListItem key={id}>
                    <ArrowRightIcon /> {val}
                  </ListItem>
                );
              }
            })}
          </List>
        </Paper>
      );
    } else if (level === 3) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h5" color="primary">
            List of Recommendations:
          </Typography>
          <List>
            {Object.entries(MP).map((item) => {
              const [[, id], [, { Recommendation: val }]] =
                Object.entries(item);
              if (val) {
                return (
                  <ListItem key={id}>
                    <ArrowRightIcon /> {val}
                  </ListItem>
                );
              }
            })}
          </List>
        </Paper>
      );
    } else if (level === 4) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h5" color="primary">
            List of Recommendations:
          </Typography>
          <List>
            {Object.entries(HP).map((item) => {
              const [[, id], [, { Recommendation: val }]] =
                Object.entries(item);
              if (val) {
                return (
                  <ListItem key={id}>
                    <ArrowRightIcon /> {val}
                  </ListItem>
                );
              }
            })}
          </List>
        </Paper>
      );
    } else if (level === 5) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h5" color="primary">
            List of Recommendations:
          </Typography>
          <List>
            {Object.entries(SP).map((item) => {
              const [[, id], [, { Recommendation: val }]] =
                Object.entries(item);
              if (val) {
                return (
                  <ListItem key={id}>
                    <ArrowRightIcon /> {val}
                  </ListItem>
                );
              }
            })}
          </List>
        </Paper>
      );
    } else {
    }
  };
  useEffect(() => {
    let readRecommend = database.ref("Category/");
    readRecommend.on("value", (snapshot) => {
      const data = snapshot.val();
      setHP(Object.values(data)[0]);
      setLP(Object.values(data)[1]);
      setMP(Object.values(data)[2]);
      setSP(Object.values(data)[3]);
    });
  }, [loading]);
  if (graph.length > 0) {
    return (
      <React.Fragment>
        <Container maxWidth="lg" className={classes.container}>
          <Alert severity={security[getIndex(graph[graph.length - 1].amount)]}>
            <AlertTitle>
              {title[getIndex(graph[graph.length - 1].amount)]}
            </AlertTitle>
            {warning[getIndex(graph[graph.length - 1].amount)]}
          </Alert>
          {recommendationHandler(getIndex(graph[graph.length - 1].amount))}
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Container maxWidth="lg" className={classes.container}>
          Please Make sure at least one node is installed correctly
        </Container>
      </React.Fragment>
    );
  }
}
