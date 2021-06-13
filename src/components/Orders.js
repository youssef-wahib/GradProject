import React, { useState } from "react";
import {
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Title from "./Title";

function createData(id, name, level, recomendedLevel) {
  return { id, name, level, recomendedLevel };
}

// save selected row (use Id )  use state selecte id ans use it to change color
const rows = [
  createData(0, "Reception", "201", "110"),
  createData(1, "Nursing room", "102", "110"),
  createData(2, "Emergency unit", "140", "110"),
  createData(3, "Patiaents rooms", "203", "110"),
  createData(4, "Emergency unit", "301", "110"),
];
function preventDefault(event) {
  event.preventDefault();
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

export default function Orders() {
  const classes = useStyles();
  const [Selected, setSelected] = useState(0);

  return (
    <React.Fragment>
      <Title>Recent Readings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell size="medium">Room</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Recomended Level</TableCell>
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
              <TableCell>{row.level}</TableCell>
              <TableCell>{row.recomendedLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more readings
        </Link>
      </div>
    </React.Fragment>
  );
}
