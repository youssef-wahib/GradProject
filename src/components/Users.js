import React, { useEffect, useState } from "react";
// import { database } from "../state/firebase";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useStore } from "../state/state";
import {
  makeStyles,
  Container,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";
function createData(time, amount) {
  return { time, amount };
}
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
  const theme = useTheme();
  const [data, setData] = useState([])
  useEffect(() => {
    setData([
      createData(0, 13),
      createData(1, 23),
      createData(2, 50),
      createData(3, 70),
      createData(4, 45),
      createData(5, 50),
      createData(6, 55),
      createData(7, 60)
      
    ])
  }, [])
  
  console.log(data)
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
              <ResponsiveContainer>
                <LineChart
                  data={data}
                  margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                  }}
                >
                  <XAxis dataKey="time" stroke={theme.palette.grey[900]}>
                    <Label
                      angle={0}
                      position="Center"
                      style={{
                        textAnchor: "middle",
                        fill: theme.palette.text.primary,
                      }}
                    >
                      Predicted Time(h)
                    </Label>
                  </XAxis>
                  <YAxis stroke={theme.palette.grey[900]}>
                    <Label
                      angle={270}
                      position="left"
                      style={{
                        textAnchor: "middle",
                        fill: theme.palette.text.primary,
                      }}
                    >
                      AQI Level
                    </Label>
                  </YAxis>
                  <CartesianGrid
                    stroke={theme.palette.grey[200]}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke={theme.palette.primary.main}
                    dot={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
