import React, { useEffect, useState } from "react";
import { database } from "../state/firebase";
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormHelperText,
  List,
  ListItem,
  IconButton,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%",
  },
  titleSpace: {
    marginBottom: theme.spacing(2),
  },
  field: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    display: "block",
  },
  selectEmpty: {
    marginTop: theme.spacing(-0.5),
    width: "30%",
  },
  selectCatLable: {
    marginLeft: theme.spacing(1.5),
  },
}));
export default function Recommend() {
  let temp = [];
  useEffect(() => {
    let setRecommend = database.ref("Category/");
    setRecommend.on("value", (snapshot) => {
      const points = snapshot.val();
      for (let l in Object.keys(points)) {
        temp.push(points[Object.keys(points)[l]]);
      }
    });
  }, []);

  const writeNewPost = (categorie, body) => {
    // A post entry.
    let postData = {
      Recommendation: body,
    };
    let getRecommend = database.ref("Category/" + categorie);
    getRecommend.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });

    // Get a key for a new Post.
    let newPostKey = database.ref().child("Category").push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates["/Category/" + categorie + "/" + newPostKey] = postData;

    return database.ref().update(updates);
  };
  const Categories = [
    "Lightly Polluted",
    "Moderately Polluted",
    "Heavily Polluted",
    "Severely Polluted",
  ];
  const classes = useStyles();
  const [Category, setCategory] = useState("Lightly Polluted");
  const [Recommendation, setRecommendation] = useState("");
  const [LP, setLP] = useState();
  const [MP, setMP] = useState();
  const [HP, setHP] = useState();
  const [SP, setSP] = useState();
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    writeNewPost(Category, Recommendation);
  };

  useEffect(() => {
    let readRecommend = database.ref("Category/");
    readRecommend.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log({data})
      setHP(Object.values(data)[0]);
      setLP(Object.values(data)[1]);
      setMP(Object.values(data)[2]);
      setSP(Object.values(data)[3]);
      // used for adding or removing
      setLoading(false)

    });
  }, [loading]);

  if (loading)
    return "Loading...";

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              color="primary"
              className={classes.titleSpace}
            >
              Create a New Recommendation
            </Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                color="secondary"
                id="newRecommendation"
                label="New Recommendation"
                variant="filled"
                value={Recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                fullWidth
                required
                helperText="Please Write your Recommendation"
              />
              <FormControl className={classes.field}>
                <InputLabel
                  color="secondary"
                  className={classes.selectCatLable}
                  required
                >
                  Select Category
                </InputLabel>

                <Select
                  id="Category"
                  color="secondary"
                  labelId="Select Category"
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                  variant="filled"
                  className={classes.selectEmpty}
                >
                  {Categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText className={classes.selectCatLable}>
                  Please select your Category
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                endIcon={<AddCircleOutlineIcon />}
              >
                Add Recommendation
              </Button>
            </form>
          </Paper>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              color="primary"
              className={classes.titleSpace}
            >
              List of Recommendations:
            </Typography>
            <List>
              <ListItem>
                <IconButton edge="end" aria-label="delete">
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
