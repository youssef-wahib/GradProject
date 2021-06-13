import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {database} from "../state/firebase"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useStore } from "../state/state";

// useEffect(() => {

// }, [])
// Generate Sales Data




function createData(time, amount) {
  return { time, amount };
}



const data = [
  createData("00:00", 110),
  createData("03:00", 300),
  createData("06:00", 200),
  createData("09:00", 150),
  createData("12:00", 210),
  createData("15:00", 200),
  createData("18:00", 260),
  createData("21:00", 180),
  createData("24:00", undefined),
];

export default function Chart() {
  const theme = useTheme();
  const {graph, setGraph} = useStore()
  
  
  let temp = [] 
  useEffect(() => {
    
    let starCountRef = database.ref('Readings/');
  starCountRef.on('value', (snapshot) => {
    const points = snapshot.val();
    
     
     
      for(let l in Object.keys(points)){
        
            temp.push(createData(Object.keys(points)[l], points[Object.keys(points)[l]]))
            
      }
      setGraph(temp)
      
  });
  }, [])
  
  
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
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              AQI Level
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
