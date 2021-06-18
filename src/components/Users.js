import React from "react";
import { database } from "../state/firebase";
import clsx from "clsx";
import {
  makeStyles,
  Container,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
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
export default function Users() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xs={12}>
            <Paper className={fixedHeightPaper}>
              <Typography variant="h4" color="secondary">
                this is a test
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
