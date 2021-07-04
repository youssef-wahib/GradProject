import React from "react";
// import { database } from "../state/firebase";
import Chart from "./Chart";
import {
  makeStyles,
  Container,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import { useStore } from "../state/state";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paperFormat: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 640,
  },
}));
const Rooms = ["Emergency unit", "Nursing room", "Patient rooms", "Reception"];
export default function Users() {
  const classes = useStyles();
  const { Selected } = useStore();
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <Paper className={classes.paperFormat}>
              <Typography variant="h4" color="secondary">
                Predictions for {Rooms[Selected]}:
              </Typography>
              <Chart />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
