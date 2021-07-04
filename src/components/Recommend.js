import React, { useEffect, useState } from "react";
import { database } from "../state/firebase";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

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
    width: "60%",
  },
  selectCatLable: {
    marginLeft: theme.spacing(1.5),
  },
}));
export default function Recommend() {
  const writeNewPost = (categorie, body) => {
    // A post entry.
    let postData = {
      Recommendation: body,
    };
    let getRecommend = database.ref("Category/" + categorie);
    getRecommend.on("value", (snapshot) => {
      const data = snapshot.val();
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
  const [LP, setLP] = useState({});
  const [MP, setMP] = useState({});
  const [HP, setHP] = useState({});
  const [SP, setSP] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    writeNewPost(Category, Recommendation);
  };

  useEffect(() => {
    setLoading(true);
    let readRecommend = database.ref("Category/");
    readRecommend.on("value", (snapshot) => {
      const data = snapshot.val();
      setHP(Object.values(data)[0]);
      setLP(Object.values(data)[1]);
      setMP(Object.values(data)[2]);
      setSP(Object.values(data)[3]);
      setLoading(false);
    });
  }, [loading]);

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
            <Typography
              variant="h6"
              color="secondary"
              className={classes.titleSpace}
            >
              Lightly Polluted:
            </Typography>
            <List>
              {Object.entries(LP).map((item) => {
                const [[, id], [, { Recommendation: val }]] =
                  Object.entries(item);
                if (val) {
                  return (
                    <ListItem key={id}>
                      <ArrowRightIcon /> {val}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          if (Object.keys(LP).length > 1) {
                            database
                              .ref()
                              .child("/Category/Lightly Polluted/" + id)
                              .remove();
                          } else {
                            database
                              .ref()
                              .child("/Category/Lightly Polluted/" + id)
                              .remove();
                            database
                              .ref()
                              .child("/Category/")
                              .update({ "Lightly Polluted": "" });
                          }
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </ListItem>
                  );
                } else {
                }
              })}
            </List>
            <Typography
              variant="h6"
              color="secondary"
              className={classes.titleSpace}
            >
              Moderately Polluted:
            </Typography>
            <List>
              {Object.entries(MP).map((item) => {
                const [[, id], [, { Recommendation: val }]] =
                  Object.entries(item);
                if (val) {
                  return (
                    <ListItem key={id}>
                      <ArrowRightIcon /> {val}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          if (Object.keys(MP).length > 1) {
                            database
                              .ref()
                              .child("/Category/Moderately Polluted/" + id)
                              .remove();
                          } else {
                            database
                              .ref()
                              .child("/Category/Moderately Polluted/" + id)
                              .remove();
                            database
                              .ref()
                              .child("/Category/")
                              .update({ "Moderately Polluted": "" });
                          }
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </ListItem>
                  );
                }
              })}
            </List>
            <Typography
              variant="h6"
              color="secondary"
              className={classes.titleSpace}
            >
              Heavily Polluted:
            </Typography>
            <List>
              {Object.entries(HP).map((item) => {
                const [[, id], [, { Recommendation: val }]] =
                  Object.entries(item);

                if (val) {
                  return (
                    <ListItem key={id}>
                      <ArrowRightIcon /> {val}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          if (Object.keys(HP).length > 1) {
                            database
                              .ref()
                              .child("/Category/Heavily Polluted/" + id)
                              .remove();
                          } else {
                            database
                              .ref()
                              .child("/Category/Heavily Polluted/" + id)
                              .remove();
                            database
                              .ref()
                              .child("/Category/")
                              .update({ "Heavily Polluted": "" });
                          }
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </ListItem>
                  );
                }
              })}
            </List>
            <Typography
              variant="h6"
              color="secondary"
              className={classes.titleSpace}
            >
              Severely Polluted:
            </Typography>
            <List>
              {Object.entries(SP).map((item) => {
                const [[, id], [, { Recommendation: val }]] =
                  Object.entries(item);
                if (val) {
                  return (
                    <ListItem key={id}>
                      <ArrowRightIcon /> {val}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          if (Object.keys(SP).length > 1) {
                            database
                              .ref()
                              .child("/Category/Severely Polluted/" + id)
                              .remove();
                          } else {
                            database
                              .ref()
                              .child("/Category/Severely Polluted/" + id)
                              .remove();
                            database
                              .ref()
                              .child("/Category/")
                              .update({ "Severely Polluted": "" });
                          }
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </ListItem>
                  );
                }
              })}
            </List>
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
