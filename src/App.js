import Login from "./components/Login";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "./components/Register";
import { CircularProgress } from "@material-ui/core";
import { authh } from "./state/firebase";
import { useStore } from "./state/state";
import Layout from "./components/Layout";
import Recommend from "./components/Recommend";
import MainDashboard from "./components/MainDashboard";
import Users from "./components/Users";
import Warnings from "./components/Warnings";
import {database} from "./state/firebase"
function createData(time, amount) {
  return { time, amount };
}
function App() {
  const { user, loading, setUser, setLoading } = useStore();
  const { graph, setGraph } = useStore();

  let temp = [];
  useEffect(() => {
    let starCountRef = database.ref("Readings/");
    starCountRef.on("value", (snapshot) => {
      const points = snapshot.val();
      Object.entries(points).map((values) => {
        temp.push(createData(values[0], values[1]));
      });

      setGraph(temp);
    });
  }, []);
  useEffect(() => {
    const unsubscribe = authh.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  if (loading) {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <CircularProgress style={{ margin: "auto" }} />
      </div>
    );
  }
  return (
    <Router>
      {!user ? (
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      ) : (
        <Layout>
          <Switch>
            <Route exact path="/">
              <MainDashboard />
            </Route>
            <Route path="/Recommendations">
              <Recommend />
            </Route>
            <Route path="/Users">
              <Users />
            </Route>
            <Route path="/Warnings">
              <Warnings />
            </Route>
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Layout>
      )}
    </Router>
  );
}

export default App;
