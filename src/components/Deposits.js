import React from "react";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Box from "@material-ui/core/Box";
import { useStore } from "../state/state";

let todayDate = () => {
  let today = new Date();
  return `Date:  ${today.getDate()} - ${
    today.getMonth() + 1
  } - ${today.getFullYear()}`;
};

export default function Deposits() {
  const { graph } = useStore();
  if (graph && graph.length > 0) {
    return (
      <React.Fragment>
        <Title>AQI Level of Room: </Title>

        <Box>
          <Typography component="p" variant="h4">
            {graph[graph.length - 1].amount}
          </Typography>

          <Typography color="textSecondary">{todayDate()}</Typography>
        </Box>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Title>AQI Level of Room: </Title>

        <Box>
          <Typography component="p" variant="h4">
            118
          </Typography>

          <Typography color="textSecondary">{todayDate()}</Typography>
        </Box>
      </React.Fragment>
    );
  }
}
