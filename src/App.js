import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "react-router-dom/Route";
import "./App.css";
import Home from "./Components/HomePage/Home";
import NewReport from "./Components/CustomReports/NewReport";
import SavedReports from "./Components/CustomReports/SavedReports";
import SimilarTimePeriods from "./Components/TimePeriod/SimilarTimePeriods";
//import DataAnalysis from "./Components/Analysis/DataAnalysis";

function App() {
  // A render function handling routing from one componennt to the next
  return (
    <div className="My-App">
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/"
              render={() => <Home />}
              exact
            />

            <Route
              path="/new-report"
              render={() => <NewReport />}
              exact
            />

            <Route
              path="/saved-reports"
              render={() => <SavedReports />}
              exact
            />

            <Route
              path="/time-periods"
              render={() => <SimilarTimePeriods />}
              exact
            />

            {/* <Route
              path="/analysis"
              render={() => <DataAnalysis />}
              exact
            /> */}
            
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
