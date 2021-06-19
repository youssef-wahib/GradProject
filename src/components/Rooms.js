import React, { useEffect, useState } from "react";
import { database } from "../state/firebase";
import { useStore } from "../state/state";
import Title from "./Title";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

function createData(id, name) {
  return { id, name };
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  selectedRoom: {
    backgroundColor: "#c5cae9",
    border: "solid black 1px",
  },
}));

export default function Rooms() {
  const getIndex = (inp) => {
    if (inp < 50) {
      return "Excellent";
    } else if (inp >= 50 && inp < 100) {
      return "Good";
    } else if (inp >= 100 && inp < 150) {
      return "Lightly Polluted";
    } else if (inp >= 150 && inp < 200) {
      return "Moderately Polluted";
    } else if (inp >= 200 && inp < 300) {
      return "Heavily Polluted";
    } else {
      return "Severely Polluted";
    }
  };

  const rows = [
    createData(0, "Emergency unit"),
    createData(1, "Nursing room"),
    createData(2, "Patient rooms"),
    createData(3, "Reception"),
  ];

  const classes = useStyles();
  const { Selected, setSelected, loading, setLoading } = useStore();
  let temp = [];
  useEffect(() => {
    let readRecommend = database.ref("/");
    readRecommend.on("value", (snapshot) => {
      const data = snapshot.val();
      Object.values(data).map((titles) => {
        temp.push(Object.values(titles)[Object.values(titles).length - 1]);
      });
      temp.shift();
      setLevel(temp);
      setLoading(false);
    });
  }, [loading]);
  const [Level, setLevel] = useState(temp);
  return (
    <React.Fragment>
      <Title>Recent Readings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell size="medium">Room</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Room Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className={row.id === Selected ? classes.selectedRoom : ""}
              key={row.id}
              onClick={() => {
                setSelected(row.id);
              }}
            >
              <TableCell size="medium">{row.name}</TableCell>
              <TableCell>{Level[row.id]}</TableCell>
              <TableCell>{getIndex(Level[row.id])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <div className={classes.seeMore} />
      </Table>
    </React.Fragment>
  );
}
