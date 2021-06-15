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

  let temp = [];
  useEffect(() => {
    let starCountRef = database.ref("Readings/");
    starCountRef.on("value", (snapshot) => {
      const points = snapshot.val();
      for (let l in Object.keys(points)) {
        temp.push(
          createData(Object.keys(points)[l], points[Object.keys(points)[l]])
        );
      }
      setGraph(temp);
    });
  }, []);

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
