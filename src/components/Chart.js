import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { database } from "../state/firebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useStore } from "../state/state";
function createData(time, amount) {
  return { time, amount };
}
export default function Chart() {
  const theme = useTheme();
  const { graph, setGraph } = useStore();
  const { Selected } = useStore();
  let temp = [];
  useEffect(() => {
    let roomReadings;
    if (Selected === 0) {
      roomReadings = database.ref("Reception_Readings/");
    } else if (Selected === 1) {
      roomReadings = database.ref("Nursing_Readings/");
    } else if (Selected === 2) {
      roomReadings = database.ref("Emergency_Readings/");
    } else {
      roomReadings = database.ref("Patient_Readings/");
    }
    roomReadings.on("value", (snapshot) => {
      const points = snapshot.val();
      Object.entries(points).map((values) => {
        temp.push(createData(values[0], values[1]));
      });

      setGraph(temp);
    });
  }, [Selected]);

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={graph}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.grey[900]} />
          <YAxis stroke={theme.palette.grey[900]}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
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
    </React.Fragment>
  );
}
