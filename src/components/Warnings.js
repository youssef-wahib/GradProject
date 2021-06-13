import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
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
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h1" color="initial">
          this is Warnings
        </Typography>
      </Container>
    </React.Fragment>
  );
}
