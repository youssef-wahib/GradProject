import React from "react";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Box from "@material-ui/core/Box";
function preventDefault(event) {
  event.preventDefault();
}
let todayDate = () => {
  let today = new Date();
  return `Date:  ${today.getDate()} - ${
    today.getMonth() + 1
  } - ${today.getFullYear()}`;
};

export default function Deposits() {
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
